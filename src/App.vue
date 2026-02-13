<script setup>
import { ref } from 'vue';
import HeroSection from './components/HeroSection.vue';
import MemoriesSection from './components/MemoriesSection.vue'; // <-- El nuevo
import MusicPlayer from './components/MusicPlayer.vue';

const playerRef = ref(null);

// --- FUNCIÓN DE SCROLL SUAVE Y LENTO ---
const scrollToMemories = () => {
    // 1. Iniciar música si no está sonando
    if (playerRef.value) playerRef.value.playMusic();
    
    // 2. Buscar la sección
    const target = document.getElementById('memories');
    if (!target) return;

    // 3. Configuración del Scroll
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 900; // <--- TIEMPO EN MILISEGUNDOS (0.9 segundos)
    let startTime = null;

    // Función de animación (Easing)
    // Esto hace que arranque lento, acelere y frene suave al final
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    // El bucle de animación
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
};


</script>

<template>
  <main>
    <HeroSection @start="scrollToMemories" />
    
    <MemoriesSection />

    <MusicPlayer ref="playerRef" song-src="/music/The Police Every Breath You Take.mp3" />
  </main>
</template>