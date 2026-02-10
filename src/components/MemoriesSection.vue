<script setup>
import { ref, computed, onMounted } from 'vue';
import { memories } from '../data';

// --- ESTADO ---
const isViewerOpen = ref(false);
const currentViewerPhotos = ref([]); 
const currentPhotoIndex = ref(0);
const viewerMetadata = ref({ title: '', date: '' });
const transitionName = ref('slide-next');

// --- UTILIDADES ---
const getOptimizedUrl = (url, width = 800) => {
    if (!url || !url.includes('cloudinary')) return url;
    if (url.includes('f_auto,q_auto')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-AR', options);
};

const getCover = (item) => item.type === 'album' ? item.cover : item.url;

// Ordenar cronológicamente
const sortedMemories = computed(() => {
    return [...memories].sort((a, b) => new Date(a.date) - new Date(b.date));
});

// --- ANIMACIÓN SCROLL REVEAL ---
onMounted(() => {
    // Configuración del "Ojo":
    // threshold: 0.1 -> Se activa apenas se ve el 10% del elemento (muy sensible para móvil)
    // rootMargin: "0px 0px -50px 0px" -> Margen de seguridad para que no aparezca pegado al borde
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Opcional: Dejar de observar una vez que ya apareció (ahorra recursos)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- LÓGICA DE APERTURA ---
const openItem = (item) => {
    if (item.type === 'album') {
        currentViewerPhotos.value = item.photos;
        viewerMetadata.value = { 
            title: item.title, 
            date: formatDate(item.date),
            description: item.description 
        };
    } else {
        currentViewerPhotos.value = [item];
        viewerMetadata.value = { 
            title: item.title, 
            date: formatDate(item.date),
            description: '' 
        };
    }
    currentPhotoIndex.value = 0;
    isViewerOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeViewer = () => {
    isViewerOpen.value = false;
    document.body.style.overflow = 'auto';
};

const nextPhoto = () => {
    transitionName.value = 'slide-next';
    if (currentPhotoIndex.value < currentViewerPhotos.value.length - 1) {
        currentPhotoIndex.value++;
    } else {
        currentPhotoIndex.value = 0; 
    }
};

const prevPhoto = () => {
    transitionName.value = 'slide-prev';
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    } else {
        currentPhotoIndex.value = currentViewerPhotos.value.length - 1;
    }
};

const currentPhoto = computed(() => currentViewerPhotos.value[currentPhotoIndex.value]);
const currentCaption = computed(() => {
    const photo = currentPhoto.value;
    return photo.caption || photo.description || viewerMetadata.value.description;
});
</script>

<template>
  <section id="memories" class="timeline-wrapper">
    <h2>Nuestra Historia</h2>

    <div class="timeline-container">
        <div class="timeline-line"></div>

        <div 
            v-for="(item, index) in sortedMemories" 
            :key="item.id" 
            class="timeline-item scroll-hidden" 
        >
            <div class="timeline-dot">
                <div class="dot-inner"></div>
                <span class="timeline-date">{{ formatDate(item.date) }}</span>
            </div>

            <div class="timeline-content" @click="openItem(item)">
                <div class="content-preview">
                    <span v-if="item.type === 'album'" class="album-badge">📂 Álbum</span>
                    <img :src="getOptimizedUrl(getCover(item), 400)" loading="lazy">
                    <div class="content-info">
                        <h3>{{ item.title }}</h3>
                        <p v-if="item.description" class="desc-mini">{{ item.description }}</p>
                    </div>
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
                            <img :src="getOptimizedUrl(currentPhoto.url, 1200)" class="main-photo" :key="currentPhoto.url">
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
.timeline-wrapper {
    padding: 4rem 1rem;
    background-color: #fff0f3;
    min-height: 100vh;
    overflow-x: hidden;
}

h2 {
    text-align: center;
    color: #e63946;
    margin-bottom: 4rem; /* Más espacio bajo el título */
    font-size: 2.5rem;
    font-family: 'Dancing Script', cursive;
}

/* --- ESTRUCTURA TIMELINE --- */
.timeline-container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 100px; /* Espacio extra al final */
}

.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #e63946;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 15px rgba(230, 57, 70, 0.2);
}

.timeline-item {
    position: relative;
    /* ESPACIO AUMENTADO: Esto es clave para que no se vean juntas */
    margin-bottom: 200px; 
    /* ALTURA MÍNIMA: Reserva espacio antes de cargar la imagen */
    min-height: 200px;
    
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* --- ANIMACIÓN SCROLL REVEAL --- */
.scroll-hidden {
    opacity: 0;
    transform: translateY(100px); /* Empieza 100px más abajo */
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.show {
    opacity: 1;
    transform: translateY(0);
}

/* --- PUNTO Y FECHA --- */
.timeline-dot {
    position: absolute;
    z-index: 2;
    
    /* CORRECCIÓN 1: Fondo transparente para no tapar sombras */
    background: transparent; 
    
    padding: 0; /* Quitamos padding innecesario */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px; /* Ancho fijo para centrar bien */
}

.dot-inner {
    width: 20px;
    height: 20px;
    background: #e63946;
    border-radius: 50%;
    
    /* CORRECCIÓN 2: El borde grueso del color del fondo (#fff0f3) hace el recorte */
    border: 4px solid #fff0f3; 
    
    /* Una sombra suave para que destaque sobre la línea */
    box-shadow: 0 0 0 1px rgba(230, 57, 70, 0.3); 
    
    transition: transform 0.3s;
}

/* Efecto al pasar el mouse por el punto */
.timeline-item:hover .dot-inner {
    transform: scale(1.4);
    background: white;
    border-color: #e63946;
}

.timeline-date {
    margin-top: 8px; /* Un poco de aire entre punto y fecha */
    font-weight: bold;
    color: #e63946;
    background: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    
    /* Sombra para que la fecha flote bonita sobre la línea */
    box-shadow: 0 4px 10px rgba(0,0,0,0.15); 
    
    white-space: nowrap;
    z-index: 3; /* Asegura que la fecha esté encima de la línea */
}

/* --- LA TARJETA (CONTENT) --- */
.timeline-content {
    position: absolute;
    width: 320px;

    /* CORRECCIÓN: Usamos calc() para asegurar una distancia fija de 110px */
    left: calc(50% + 110px); 
    
    top: -10px; /* Un pequeño ajuste vertical para que se alinee mejor con el punto */
    cursor: pointer;
    transition: transform 0.3s ease;
}

/* Pares a la izquierda */
.timeline-item:nth-child(even) .timeline-content {
    left: auto; /* Reseteamos el left */
    
    /* CORRECCIÓN: Lo mismo para la derecha */
    right: calc(50% + 110px);
    
    text-align: right;
}

.content-preview {
    background: white;
    padding: 12px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(230, 57, 70, 0.1);
    position: relative;
    overflow: hidden;
}

.content-preview:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(230, 57, 70, 0.2);
}

.content-preview img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
}

.album-badge {
    position: absolute; top: 20px; right: 20px;
    background: rgba(0,0,0,0.7); color: white;
    padding: 5px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: bold; z-index: 5;
    backdrop-filter: blur(2px);
}

.content-info h3 { margin: 0; font-size: 1.1rem; color: #222; }
.desc-mini { font-size: 0.85rem; color: #666; margin: 5px 0 0 0; line-height: 1.4; }

/* Triángulos */
.content-preview::before {
    content: ''; 
    position: absolute; 
    top: 25px; 
    
    /* Lo movemos más afuera para alcanzar la línea */
    left: -14px; 
    
    width: 0; height: 0;
    
    /* Hacemos el triángulo un poco más largo */
    border-top: 10px solid transparent; 
    border-bottom: 10px solid transparent; 
    border-right: 14px solid white; /* Antes era 10px, ahora 14px */
}

.timeline-item:nth-child(even) .content-preview::before {
    left: auto; 
    right: -14px; /* Lo mismo para el lado derecho */
    border-right: none; 
    border-left: 14px solid white;
}

/* --- MÓVIL (Ajustado para que funcione la animación) --- */
@media (max-width: 768px) {
    .timeline-container { padding-left: 0; }
    
    /* Línea bien a la izquierda */
    .timeline-line { left: 25px; transform: none; }
    
    .timeline-item {
        justify-content: flex-start;
        /* Reducimos un poco el margen en móvil, pero sigue siendo amplio */
        margin-bottom: 150px; 
        padding-left: 0;
    }

    .timeline-dot {
        position: absolute;
        left: 7px; /* Alineado al centro de la línea (25px) */
        top: 0;
        background: none;
        padding: 0;
    }
    
    .timeline-date {
        position: absolute;
        left: 40px; /* Fecha al lado */
        top: -6px;
    }

    .timeline-content {
        position: relative;
        left: 50px; /* Separado de la línea */
        top: 40px; /* Debajo de la fecha */
        width: calc(100% - 70px); /* Ocupa el resto de la pantalla */
        right: auto;
        text-align: left;
    }
    
    .timeline-item:nth-child(even) .timeline-content {
        left: 50px;
        right: auto;
        text-align: left;
    }

    .content-preview::before { display: none; }
}

/* --- VISOR STYLES (Canvas Fijo) --- */
.viewer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
.viewer-content { display: flex; align-items: center; width: 100%; height: 100%; justify-content: space-between; padding: 20px;}
.photo-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 900px; margin: auto; }
.image-stage { width: 100%; height: 75vh; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; }
.main-photo { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)); will-change: transform, opacity; }
.info-box { margin-top: 15px; text-align: center; color: white; width: 100%; }
.info-header h3 { margin: 0; font-size: 1.5rem; color: #fff; }
.info-date { font-size: 0.9rem; color: #ffccd5; display: block; margin-bottom: 5px; }
.caption { font-size: 1rem; margin-top: 5px; font-weight: 300; }
.counter { color: #888; font-size: 0.8rem; margin-top: 10px; }
.nav-btn { background: none; border: none; color: white; font-size: 3rem; cursor: pointer; padding: 0 20px; z-index: 3001; }
.btn-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; z-index: 3001; }
.slide-next-enter-active, .slide-next-leave-active, .slide-prev-enter-active, .slide-prev-leave-active { transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease; }
.slide-next-enter-from { transform: translate(100%, 0); opacity: 0; } .slide-next-leave-to { transform: translate(-100%, 0); opacity: 0; }
.slide-prev-enter-from { transform: translate(-100%, 0); opacity: 0; } .slide-prev-leave-to { transform: translate(100%, 0); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; } .fade-enter-from, .fade-leave-to { opacity: 0; }
</style>