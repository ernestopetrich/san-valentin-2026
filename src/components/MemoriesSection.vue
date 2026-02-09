<script setup>
import { ref, computed } from 'vue';
import { album } from '../data';

// --- ESTADO DE LA VISTA ---
const currentView = ref('albums'); // 'albums' o 'masonry'

// --- ESTADO DEL VISOR (LIGHTBOX) ---
const isViewerOpen = ref(false);
const currentViewerPhotos = ref([]); // La lista de fotos que se está viendo
const currentPhotoIndex = ref(0);

// --- LÓGICA: APLANAR DATOS ---
// Extraemos TODAS las fotos de todos los álbumes en una sola lista para el Masonry
const allPhotos = computed(() => {
    return albums.flatMap(album => album.photos);
});

// --- FUNCIONES ---
const getOptimizedUrl = (url, width = 800) => {
    if (!url || !url.includes('cloudinary')) return url;
    if (url.includes('f_auto,q_auto')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

// Abrir un Álbum específico
const openAlbum = (album) => {
    currentViewerPhotos.value = album.photos;
    currentPhotoIndex.value = 0;
    isViewerOpen.value = true;
    document.body.style.overflow = 'hidden';
};

// Abrir foto desde el Masonry (Carga TODAS las fotos en el visor)
const openFromMasonry = (index) => {
    currentViewerPhotos.value = allPhotos.value;
    currentPhotoIndex.value = index;
    isViewerOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeViewer = () => {
    isViewerOpen.value = false;
    document.body.style.overflow = 'auto';
};

const nextPhoto = () => {
    if (currentPhotoIndex.value < currentViewerPhotos.value.length - 1) {
        currentPhotoIndex.value++;
    } else {
        currentPhotoIndex.value = 0; // Loop
    }
};

const prevPhoto = () => {
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
    } else {
        currentPhotoIndex.value = currentViewerPhotos.value.length - 1;
    }
};

// Foto actual para mostrar en el modal
const currentPhoto = computed(() => {
    return currentViewerPhotos.value[currentPhotoIndex.value];
});
</script>

<template>
  <section id="memories" class="memories-container">
    <h2>Nuestra Historia</h2>

    <div class="tabs-control">
        <button 
            :class="{ active: currentView === 'albums' }" 
            @click="currentView = 'albums'"
        >
            📂 Por Momentos
        </button>
        <button 
            :class="{ active: currentView === 'masonry' }" 
            @click="currentView = 'masonry'"
        >
            💖 Todo Junto
        </button>
    </div>

    <Transition name="fade" mode="out-in">
        <div v-if="currentView === 'albums'" class="albums-grid">
            <div 
                v-for="album in albums" 
                :key="album.id" 
                class="album-card"
                @click="openAlbum(album)"
            >
                <div class="cover-wrapper">
                    <img :src="getOptimizedUrl(album.cover, 500)" :alt="album.title">
                    <div class="count-badge">{{ album.photos.length }}</div>
                </div>
                <h3>{{ album.title }}</h3>
            </div>
        </div>

    <div v-else class="masonry-grid">
            <div 
                v-for="(photo, index) in allPhotos" 
                :key="index" 
                class="photo-card"
                @click="openFromMasonry(index)"
            >
                <img :src="getOptimizedUrl(photo.url, 600)" loading="lazy">
            </div>
        </div>
    </Transition>

    <Transition name="fade">
        <div v-if="isViewerOpen" class="viewer-overlay">
            <button class="btn-close" @click="closeViewer">✕</button>
            
            <div class="viewer-content">
                <button class="nav-btn prev" @click.stop="prevPhoto">❮</button>
                
                <div class="photo-wrapper">
                    <img :src="getOptimizedUrl(currentPhoto.url, 1200)" class="main-photo">
                    <p class="caption">{{ currentPhoto.caption }}</p>
                    <p class="counter">{{ currentPhotoIndex + 1 }} / {{ currentViewerPhotos.length }}</p>
                </div>

                <button class="nav-btn next" @click.stop="nextPhoto">❯</button>
            </div>
        </div>
    </Transition>

  </section>
</template>

<style scoped>
.memories-container {
    padding: 4rem 1rem;
    background-color: #fff0f3;
    min-height: 100vh;
}

h2 {
    text-align: center;
    color: #e63946;
    margin-bottom: 2rem;
    font-size: 2.5rem;
}

/* --- TABS --- */
.tabs-control {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
}

.tabs-control button {
    padding: 10px 20px;
    border: 2px solid #e63946;
    background: transparent;
    color: #e63946;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.tabs-control button.active, .tabs-control button:hover {
    background: #e63946;
    color: white;
}

/* --- GRID ÁLBUMES --- */
.albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.album-card { cursor: pointer; text-align: center; }
.cover-wrapper {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    aspect-ratio: 1;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}
.album-card:hover .cover-wrapper { transform: scale(1.03); }
.cover-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.count-badge {
    position: absolute; top: 10px; right: 10px;
    background: rgba(0,0,0,0.6); color: white;
    padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;
}

/* --- GRID MASONRY --- */
.masonry-grid {
    column-count: 3;
    column-gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
}
@media (max-width: 768px) { .masonry-grid { column-count: 2; } }

.photo-card {
    break-inside: avoid;
    margin-bottom: 1rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: zoom-in;
}
.photo-card img { width: 100%; display: block; transition: transform 0.3s; }
.photo-card:hover img { transform: scale(1.05); }

/* --- VISOR (Igual que antes) --- */
.viewer-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.95); z-index: 3000;
    display: flex; align-items: center; justify-content: center;
}
.viewer-content { display: flex; align-items: center; width: 100%; justify-content: space-between; padding: 0 10px;}
.photo-wrapper { text-align: center; flex: 1; }
.main-photo { max-height: 80vh; max-width: 100%; object-fit: contain; }
.caption { color: white; margin-top: 10px; font-size: 1.1rem; }
.nav-btn { background: none; border: none; color: white; font-size: 3rem; cursor: pointer; padding: 0 20px; }
.btn-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; }

/* Animaciones */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style> 