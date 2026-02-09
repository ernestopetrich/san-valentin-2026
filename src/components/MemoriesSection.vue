<script setup>
import { ref, computed } from 'vue';
import { memories } from '../data'; 

// ... tus imports y variables anteriores (memories, isViewerOpen, etc)

// NUEVO: Variable para controlar la dirección de la animación
const transitionName = ref('slide-next');

// ... funciones openAlbum, openSinglePhoto igual que antes ...

// MODIFICAMOS NEXT Y PREV PARA CAMBIAR LA DIRECCIÓN
const nextPhoto = () => {
    transitionName.value = 'slide-next'; // La nueva entra desde la derecha
    if (currentPhotoIndex.value < currentViewerPhotos.value.length - 1) {
        currentPhotoIndex.value++;
    } else {
        currentPhotoIndex.value = 0;
    }
};

const prevPhoto = () => {
    transitionName.value = 'slide-prev'; // La nueva entra desde la izquierda
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    } else {
        currentPhotoIndex.value = currentViewerPhotos.value.length - 1;
    }
};

// ... resto de tu código (computed, etc)

// --- ESTADO ---
const isViewerOpen = ref(false);
const currentViewerPhotos = ref([]); 
const currentPhotoIndex = ref(0);

// Metadatos extra para el visor (Titulo del álbum o fecha)
const viewerMetadata = ref({ title: '', date: '' });

// --- UTILIDADES ---
// 1. Optimización de imágenes (Cloudinary)
const getOptimizedUrl = (url, width = 800) => {
    if (!url || !url.includes('cloudinary')) return url;
    if (url.includes('f_auto,q_auto')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

// 2. Formateador de Fechas (Para que se vea bonito)
const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-AR', options);
};

// --- LÓGICA DE APERTURA ---

// A. ABRIR ÁLBUM
const openAlbum = (album) => {
    // Guardamos las fotos del álbum
    currentViewerPhotos.value = album.photos;
    // Guardamos el contexto (Título del álbum y fecha del álbum)
    viewerMetadata.value = { 
        title: album.title, 
        date: formatDate(album.date),
        description: album.description // Descripción general del álbum
    };
    
    currentPhotoIndex.value = 0;
    isViewerOpen.value = true;
    document.body.style.overflow = 'hidden';
};

// B. ABRIR FOTO SUELTA
const openSinglePhoto = (photo) => {
    // La convertimos en una lista de 1 elemento
    currentViewerPhotos.value = [photo];
    // El contexto es la propia foto
    viewerMetadata.value = { 
        title: photo.title, 
        date: formatDate(photo.date),
        description: '' // No usamos descripción general, usaremos la de la foto
    };

    currentPhotoIndex.value = 0;
    isViewerOpen.value = true;
    document.body.style.overflow = 'hidden';
};

// --- CONTROLES ---
const closeViewer = () => {
    isViewerOpen.value = false;
    document.body.style.overflow = 'auto';
};



// Foto actual computada
const currentPhoto = computed(() => {
    return currentViewerPhotos.value[currentPhotoIndex.value];
});

// Texto a mostrar en el visor (Inteligente: caption O description)
const currentCaption = computed(() => {
    const photo = currentPhoto.value;
    // Si es foto de álbum tiene 'caption', si es suelta tiene 'description'
    return photo.caption || photo.description || viewerMetadata.value.description;
});
</script>

<template>
  <section id="memories" class="mixed-container">
    <h2>Nuestros Momentos</h2>

    <div class="masonry-grid">
        <div v-for="(item, index) in memories" :key="index" class="grid-item">
            
            <div 
                v-if="item.type === 'album'" 
                class="card album-card"
                @click="openAlbum(item)"
            >
                <div class="media-wrapper">
                    <img :src="getOptimizedUrl(item.cover, 600)" :alt="item.title">
                    <div class="album-badge">📂 {{ item.photos.length }} fotos</div>
                </div>
                <div class="card-footer">
                    <span class="date-tag">{{ formatDate(item.date) }}</span>
                    <h3>{{ item.title }}</h3>
                    <p class="desc-preview">{{ item.description }}</p>
                </div>
            </div>

            <div 
                v-else 
                class="card photo-card"
                @click="openSinglePhoto(item)"
            >
                <div class="media-wrapper">
                    <img :src="getOptimizedUrl(item.url, 600)" loading="lazy">
                </div>
                <div class="card-footer">
                    <span class="date-tag">{{ formatDate(item.date) }}</span>
                    <h3 v-if="item.title">{{ item.title }}</h3>
                    <p class="desc-preview">{{ item.description }}</p>
                </div>
            </div>

        </div>
    </div>

    <Transition name="fade">
        <div v-if="isViewerOpen" class="viewer-overlay">
            <button class="btn-close" @click="closeViewer">✕</button>
            
            <div class="viewer-content">
                <button v-if="currentViewerPhotos.length > 1" class="nav-btn prev" @click.stop="prevPhoto">❮</button>
                
                <div class="photo-wrapper">
                    <div class="image-stage">
                        <Transition :name="transitionName">
                            <img 
                                :src="getOptimizedUrl(currentPhoto.url, 1200)" 
                                class="main-photo"
                                :key="currentPhoto.url" 
                                alt="Foto del recuerdo"
                            >
                        </Transition>
                    </div>
                    
                    <div class="info-box">
                        <div class="info-header">
                            <h3>{{ viewerMetadata.title }}</h3>
                            <span class="info-date">{{ viewerMetadata.date }}</span>
                        </div>
                        
                        <Transition name="fade" mode="out-in">
                            <p class="caption" :key="currentCaption">{{ currentCaption }}</p>
                        </Transition>

                        <p v-if="currentViewerPhotos.length > 1" class="counter">
                            {{ currentPhotoIndex + 1 }} / {{ currentViewerPhotos.length }}
                        </p>
                    </div>
                </div>

                <button v-if="currentViewerPhotos.length > 1" class="nav-btn next" @click.stop="nextPhoto">❯</button>
            </div>
        </div>
    </Transition>

  </section>
</template>

<style scoped>
.mixed-container {
    padding: 2rem 1rem;
    background-color: #fff0f3;
    min-height: 100vh;
}

h2 {
    text-align: center;
    color: #e63946;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-family: 'Dancing Script', cursive; /* Asegúrate de importar la fuente si te gusta */
}

/* MASONRY */
.masonry-grid {
    column-count: 3;
    column-gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}
@media (max-width: 900px) { .masonry-grid { column-count: 2; } }
@media (max-width: 600px) { .masonry-grid { column-count: 1; } }

.grid-item { break-inside: avoid; margin-bottom: 1.5rem; }

/* ESTILO TARJETAS */
.card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
    cursor: pointer;
}
.card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

.media-wrapper { position: relative; }
.media-wrapper img { width: 100%; display: block; }

.album-badge {
    position: absolute; top: 10px; right: 10px;
    background: rgba(0,0,0,0.7); color: white;
    padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;
    backdrop-filter: blur(4px);
}

.card-footer { padding: 15px; }

/* NUEVO: Estilo de Fecha en Tarjeta */
.date-tag {
    display: block;
    font-size: 0.75rem;
    color: #e63946;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    letter-spacing: 1px;
}

.card-footer h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    color: #2c3e50;
    line-height: 1.3;
}

.desc-preview {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
}

/* VISOR ESTILOS */
.viewer-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.95); z-index: 3000;
    display: flex; align-items: center; justify-content: center;
}
.viewer-content { display: flex; align-items: center; width: 100%; height: 100%; justify-content: space-between; padding: 20px;}
/* --- CSS ACTUALIZADO DEL VISOR --- */

/* ... estilos de viewer-overlay y viewer-content siguen igual ... */

/* EL CONTENEDOR DE LA FOTO */
.photo-wrapper { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 100%;
    max-width: 900px;
    margin: auto; /* Centrado horizontal */
}

/* --- 1. EL ESCENARIO (Canvas Fijo) --- */
.image-stage {
    /* Define el tamaño MÁXIMO que tendrá la foto en pantalla. */
    width: 100%;
    height: 75vh; /* Ocupa el 75% de la altura de la pantalla siempre */
    
    position: relative; /* Necesario para que las fotos absolutas se queden aquí */
    overflow: hidden;   /* Corta lo que salga durante la animación */
    
    /* Centrado opcional por si acaso */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* --- 2. LA FOTO (Capa Absoluta) --- */
.main-photo {
    /* TRUCO MAESTRO: */
    position: absolute; /* Saca la foto del flujo normal */
    top: 0;
    left: 0;
    width: 100%;  /* Fuerza a la etiqueta IMG a llenar el escenario */
    height: 100%; /* Fuerza a la etiqueta IMG a llenar el escenario */
    
    /* Pero la imagen visual DENTRO de la etiqueta se comporta así: */
    object-fit: contain; /* SE ASEGURA DE QUE SE VEA ENTERA SIEMPRE */
    
    /* Optimizaciones visuales */
    filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
    will-change: transform, opacity; /* Acelera la GPU */
}

/* --- 3. ANIMACIONES (Suaves y sin rebotes) --- */
/* Como las fotos ahora son capas del mismo tamaño exacto (el tamaño del stage),
   la transición será perfecta sin importar si la foto es vertical u horizontal */

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease;
}

/* --- DIRECCIÓN: SIGUIENTE (-->) --- */
.slide-next-enter-from {
    transform: translate(100%, 0); /* Entra desde la derecha */
    opacity: 0;
}
.slide-next-leave-to {
    transform: translate(-100%, 0); /* Sale hacia la izquierda */
    opacity: 0;
}

/* --- DIRECCIÓN: ANTERIOR (<--) --- */
.slide-prev-enter-from {
    transform: translate(-100%, 0); /* Entra desde la izquierda */
    opacity: 0;
}
.slide-prev-leave-to {
    transform: translate(100%, 0); /* Sale hacia la derecha */
    opacity: 0;
}

/* CAJA DE INFO EN EL VISOR */
.info-box {
    margin-top: 15px;
    text-align: center;
    color: white;
    width: 100%;
}

.info-header h3 { margin: 0; font-size: 1.5rem; color: #fff; }
.info-date { font-size: 0.9rem; color: #ffccd5; margin-bottom: 10px; display: block;}
.caption { font-size: 1.1rem; margin-top: 10px; font-weight: 300; line-height: 1.4; }
.counter { color: #888; font-size: 0.8rem; margin-top: 15px; }

.nav-btn { background: none; border: none; color: white; font-size: 3rem; cursor: pointer; padding: 0 20px; opacity: 0.5; transition: 0.3s; }
.nav-btn:hover { opacity: 1; transform: scale(1.1); }
.btn-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; z-index: 3001; }

@media (max-width: 768px) {
    .nav-btn { position: absolute; top: 50%; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 50%; font-size: 2rem; }
    .prev { left: 10px; } .next { right: 10px; }
    .info-header h3 { font-size: 1.2rem; }
    .caption { font-size: 0.95rem; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>