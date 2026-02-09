<script setup>
import { ref } from 'vue';
import HeroSection from './components/HeroSection.vue';
import MemoriesSection from './components/MemoriesSection.vue'; // <-- El nuevo
import MusicPlayer from './components/MusicPlayer.vue';

const playerRef = ref(null);

const scrollToMemories = () => {
    if (playerRef.value) playerRef.value.playMusic();
    
    // Ahora buscamos el ID 'memories'
    const section = document.getElementById('memories');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <main>
    <HeroSection @start="scrollToMemories" />
    
    <MemoriesSection />

    <MusicPlayer ref="playerRef" song-src="/music/song.mp3" />
  </main>
</template>