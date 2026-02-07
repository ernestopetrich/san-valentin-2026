<script setup>
import { ref } from 'vue';
import HeroSection from './components/HeroSection.vue';
import GallerySection from './components/GallerySection.vue'; // <-- Importamos
import MusicPlayer from './components/MusicPlayer.vue';

const playerRef = ref(null);

const scrollToGallery = () => {
    // 1. Iniciar música
    if (playerRef.value) {
        playerRef.value.playMusic();
    }
    
    // 2. Scroll suave hasta la galería
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
  <main>
    <HeroSection @start="scrollToGallery" />
    
    <GallerySection />

    <MusicPlayer 
        ref="playerRef" 
        song-src="/music/song.mp3" 
    />
  </main>
</template>