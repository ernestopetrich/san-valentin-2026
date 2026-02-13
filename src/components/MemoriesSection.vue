<script setup>
import { ref, computed, onMounted } from 'vue';
import { memories } from '../data';

// --- ESTADO GENERAL ---
const isViewerOpen = ref(false);
const isLetterOpen = ref(false); // Nuevo estado para la carta

// Datos para el visor de fotos
const currentViewerPhotos = ref([]); 
const currentPhotoIndex = ref(0);
const viewerMetadata = ref({ title: '', date: '' });
const transitionName = ref('slide-next');

// Datos para la carta
const currentLetterContent = ref({});

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

// Ordenar cronológicamente (antiguas a nuevas)
const sortedMemories = computed(() => {
    return [...memories].sort((a, b) => new Date(a.date) - new Date(b.date));
});

// --- ANIMACIÓN SCROLL REVEAL ---
onMounted(() => {
    const observerOptions = {
        threshold: 0.1, // Se activa al ver el 10%
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Solo anima una vez
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- LÓGICA DE APERTURA (FOTOS / ALBUM) ---
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

// --- LÓGICA DE APERTURA (CARTA) ---
const openLetter = (item) => {
    currentLetterContent.value = item;
    isLetterOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeLetter = () => {
    isLetterOpen.value = false;
    document.body.style.overflow = 'auto';
};
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
                <div class="dot-inner" :class="{ 'heart-dot': item.type === 'letter' }"></div>
                <span class="timeline-date">{{ formatDate(item.date) }}</span>
            </div>

            <div 
                v-if="item.type === 'letter'" 
                class="timeline-content letter-card" 
                @click="openLetter(item)"
            >
                <div class="content-preview letter-preview">
                    <div class="letter-icon">💌</div>
                    <div class="content-info">
                        <h3>{{ item.title }}</h3>
                        <p class="click-hint">Toca para abrir</p>
                    </div>
                </div>
            </div>

            <div 
                v-else 
                class="timeline-content" 
                @click="openItem(item)"
            >
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

    <Transition name="fade">
        <div v-if="isLetterOpen" class="letter-overlay" @click.self="closeLetter">
            <div class="letter-paper">
                <button class="btn-close-letter" @click="closeLetter">✕</button>
                <div class="letter-body">
                    <h2>{{ currentLetterContent.title }}</h2>
                    <span class="letter-date">{{ formatDate(currentLetterContent.date) }}</span>
                    
                    <p class="letter-text">{{ currentLetterContent.content }}</p>
                    
                    <div class="letter-footer">❤️</div>
                </div>
            </div>
        </div>
    </Transition>

  </section>
</template>

<style scoped>
/* --- ESTILOS GENERALES --- */
.timeline-wrapper {
    padding: 4rem 1rem;
    background-color: #fff0f3;
    min-height: 100vh;
    overflow-x: hidden;
}

h2 {
    text-align: center;
    color: #e63946;
    margin-bottom: 4rem;
    font-size: 2.5rem;
    font-family: 'Dancing Script', cursive; /* Asegúrate de importar la fuente */
}

/* --- ESTRUCTURA TIMELINE --- */
.timeline-container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 150px;
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
    margin-bottom: 200px; /* Distancia amplia entre puntos */
    min-height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Scroll Reveal */
.scroll-hidden { opacity: 0; transform: translateY(100px); transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.show { opacity: 1; transform: translateY(0); }

/* --- PUNTOS Y FECHAS (Corrección Transparencia) --- */
.timeline-dot {
    position: absolute;
    z-index: 2;
    background: transparent; /* Transparente para no cortar sombras */
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
}

.dot-inner {
    width: 20px;
    height: 20px;
    background: #e63946;
    border-radius: 50%;
    border: 4px solid #fff0f3; /* Borde del color de fondo simula el recorte */
    box-shadow: 0 0 0 1px rgba(230, 57, 70, 0.3);
    transition: transform 0.3s;
}

.timeline-item:hover .dot-inner { transform: scale(1.4); background: white; border-color: #e63946; }

/* Punto especial Corazón (Carta) */
.heart-dot {
    background: #e63946 !important;
    border-color: #e63946 !important;
    animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
    0% { transform: scale(1); }
    15% { transform: scale(1.3); }
    30% { transform: scale(1); }
    45% { transform: scale(1.15); }
    60% { transform: scale(1); }
}

.timeline-date {
    margin-top: 8px;
    font-weight: bold;
    color: #e63946;
    background: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    white-space: nowrap;
    z-index: 3;
}

/* --- TARJETAS (FOTOS/ALBUMS/CARTAS) --- */
.timeline-content {
    position: absolute;
    width: 320px;
    /* Corrección PC: Distancia fija desde el centro */
    left: calc(50% + 110px);
    top: -10px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

/* Pares a la izquierda */
.timeline-item:nth-child(even) .timeline-content {
    left: auto;
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

.content-preview:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(230, 57, 70, 0.2); }

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

/* Triángulos PC */
.content-preview::before {
    content: ''; position: absolute; top: 25px; left: -14px; /* Ajustado */
    width: 0; height: 0;
    border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 14px solid white;
}
.timeline-item:nth-child(even) .content-preview::before {
    left: auto; right: -14px;
    border-right: none; border-left: 14px solid white;
}

/* Estilos específicos Carta */
.letter-preview {
    background: #e63946;
    color: white;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 150px; border: 2px solid #ffccd5;
}
.letter-icon { font-size: 3rem; margin-bottom: 10px; }
.letter-preview .content-info h3 { color: white; text-align: center; }
.click-hint { font-size: 0.8rem; color: #ffccd5; margin-top: 5px; animation: pulse 2s infinite; }

/* --- VISOR FOTOS (PC) --- */
.viewer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
.viewer-content { display: flex; align-items: center; width: 100%; height: 100%; justify-content: space-between; padding: 50px;}
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

/* --- MODAL CARTA (PAPEL) --- */
.letter-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 4000;
    display: flex; align-items: center; justify-content: center; padding: 20px;
}
.letter-paper {
    background: #fffdf7; width: 100%; max-width: 600px; padding: 40px; border-radius: 5px;
    box-shadow: 0 0 50px rgba(0,0,0,0.5); position: relative; max-height: 90vh; overflow-y: auto;
}
.letter-body { text-align: center; font-family: 'Playfair Display', serif; }
.letter-body h2 { color: #e63946; font-size: 2.5rem; margin-bottom: 10px; }
.letter-date { display: block; color: #888; font-family: sans-serif; font-size: 0.9rem; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; }
.letter-text { font-size: 1.2rem; line-height: 1.5rem; color: #444; white-space: pre-line; text-align: left; }
.letter-footer { font-size: 2rem; margin-top: 40px; }
.btn-close-letter { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.5rem; color: #aaa; cursor: pointer; }

/* --- TRANSICIONES --- */
.slide-next-enter-active, .slide-next-leave-active, .slide-prev-enter-active, .slide-prev-leave-active { transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease; }
.slide-next-enter-from { transform: translate(100%, 0); opacity: 0; } .slide-next-leave-to { transform: translate(-100%, 0); opacity: 0; }
.slide-prev-enter-from { transform: translate(-100%, 0); opacity: 0; } .slide-prev-leave-to { transform: translate(100%, 0); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; } .fade-enter-from, .fade-leave-to { opacity: 0; }
@keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }

/* --- VERSIÓN MÓVIL (CORREGIDA COMPLETA) --- */
@media (max-width: 768px) {


    


    /* Timeline ajustado */
    .timeline-container { padding-left: 0; }
    .timeline-line { left: 25px; transform: none; }
    .timeline-item { justify-content: flex-start; margin-bottom: 150px; padding-left: 0; }
    .timeline-dot { position: absolute; left: 6.5px; top: 0; background: none; padding: 0; }
    .timeline-date { position: absolute; left: 45px; top: -6px; }
    .timeline-content { position: relative; left: 50px; top: 40px; width: calc(100% - 70px); right: auto; text-align: left; }
    .timeline-item:nth-child(even) .timeline-content { left: 50px; right: auto; text-align: left; }
    .content-preview::before { display: none; }
    
    /* VISOR INMERSIVO Y CENTRADO */
    .viewer-content { padding: 0; position: relative; width: 100%; height: 100%; }
    
    .image-stage { 
        height: 100dvh; width: 100vw; background: black;
        display: flex; justify-content: center; align-items: center; 
    }
    .main-photo { 
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
        object-fit: contain; z-index: 1; 
    }

    /* BOTONES FLOTANTES */
    .nav-btn {
        position: absolute; top: 50%; transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.15); width: 50px; height: 50px;
        border-radius: 50%; display: flex; align-items: center; justify-content: center;
        font-size: 1.5rem; z-index: 3005; padding: 0;
        border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px);
    }
    .prev { left: 10px; } .next { right: 10px; }
    .btn-close { top: 20px; right: 20px; background: rgba(0, 0, 0, 0.5); width: 40px; height: 40px; z-index: 3010; }

    /* INFO BOX CENTRADA */
    .info-box {
        position: absolute; bottom: 0; left: 0; right: 0; width: auto;
        box-sizing: border-box; text-align: center;
        display: flex; flex-direction: column; align-items: center;
        padding: 60px 20px 40px 20px;
        background: linear-gradient(to top, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.5) 70%, transparent 100%);
        z-index: 3003;
    }
    .info-header { width: 100%; display: flex; flex-direction: column; align-items: center; margin-bottom: 8px; }
    .info-header h3 { font-size: 1.3rem; margin-bottom: 4px; color: white; margin-left: 0; margin-right: 0; }
    .caption, .info-date { text-align: center; margin-left: 0; margin-right: 0; }
    .caption { font-size: 1rem; line-height: 1.5; color: #eee; max-width: 90%; }
    .counter { margin-top: 10px; font-size: 0.8rem; opacity: 0.6; width: 100%; text-align: center; }

    /* Ajuste modal carta */
    /* --- ARREGLO DEL PAPEL ABIERTO (MODAL) --- */
    
    .letter-paper {
        /* 1. Ancho seguro: 90% del ancho de pantalla (deja margen a los lados) */
        width: 90vw !important; 
        
        /* 2. Centrado automático horizontal */
        margin: 0 auto !important;
        
        /* 3. Evita que se salga de la pantalla */
        left: 0 !important;
        right: 0 !important;
        
        /* 4. IMPORTANTE: Que el padding no agrande el ancho total */
        box-sizing: border-box !important;
        
        /* Ajustes visuales para móvil */
        padding: 25px 20px !important; /* Menos relleno para aprovechar espacio */
        max-height: 85vh; /* Que no sea más alto que la pantalla */
    }
    
    /* Aseguramos que el contenedor padre (el fondo oscuro) centre todo */
    .letter-overlay {
        padding: 0 !important; /* Quitamos padding del contenedor para evitar conflictos */
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    

    .letter-text { font-size: 1.2rem; }
}
</style>