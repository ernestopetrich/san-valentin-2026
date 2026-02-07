<script setup>
import { ref } from 'vue';
import { loveStory } from '../data'; // Importamos tu base de datos

// Estado para el modal (Lightbox)
const selectedPhoto = ref(null);

const openPhoto = (photo) => {
    selectedPhoto.value = photo;
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
};

const closePhoto = () => {
    selectedPhoto.value = null;
    document.body.style.overflow = 'auto'; // Reactiva el scroll
};
</script>

<template>
  <section id="gallery" class="gallery-container">
    <h2>Nuestros Momentos</h2>
    
    <div class="masonry-grid">
        <div 
            v-for="item in loveStory" 
            :key="item.id" 
            class="photo-card"
            @click="openPhoto(item)"
        >
            <img :src="item.image" :alt="item.title" loading="lazy">
            <div class="photo-info">
                <span>{{ item.date }}</span>
                <h3>{{ item.title }}</h3>
            </div>
        </div>
    </div>

    <Transition name="fade">
        <div v-if="selectedPhoto" class="lightbox" @click.self="closePhoto">
            <div class="lightbox-content">
                <button class="close-btn" @click="closePhoto">×</button>
                <img :src="selectedPhoto.image" :alt="selectedPhoto.title">
                <div class="caption">
                    <h3>{{ selectedPhoto.title }}</h3>
                    <p class="date">{{ selectedPhoto.date }}</p>
                    <p class="desc">{{ selectedPhoto.description }}</p>
                </div>
            </div>
        </div>
    </Transition>
  </section>
</template>

<style scoped>
.gallery-container {
    padding: 4rem 2rem;
    background-color: #fff0f3; /* Fondo suave */
    min-height: 100vh;
}

h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #e63946;
}

/* --- ESTRATEGIA MASONRY CON CSS PURO --- */
.masonry-grid {
    column-count: 3; /* 3 Columnas en PC */
    column-gap: 1.5rem;
}

.photo-card {
    break-inside: avoid; /* Evita que la foto se corte entre columnas */
    margin-bottom: 1.5rem;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.photo-card:hover {
    transform: translateY(-5px);
}

.photo-card img {
    width: 100%;
    display: block; /* Elimina espacio fantasma debajo de imagenes */
    border-radius: 15px;
}

/* Efecto hover con información */
.photo-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    padding: 20px 15px;
    opacity: 0;
    transition: opacity 0.3s;
}

.photo-card:hover .photo-info {
    opacity: 1;
}

/* --- ESTILOS DEL LIGHTBOX (MODAL) --- */
.lightbox {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.lightbox-content {
    background: white;
    padding: 10px;
    border-radius: 10px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto; /* Scroll si el texto es muy largo */
}

.lightbox-content img {
    width: 100%;
    height: auto;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 5px;
}

.caption {
    padding: 20px;
    text-align: center;
    color: #333;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;
    z-index: 10;
}

/* Animación de entrada suave */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* --- RESPONSIVE --- */
@media (max-width: 900px) {
    .masonry-grid { column-count: 2; }
}

@media (max-width: 600px) {
    .masonry-grid { column-count: 1; }
    .photo-info { opacity: 1; background: linear-gradient(transparent, rgba(0,0,0,0.5)); }
}
</style>