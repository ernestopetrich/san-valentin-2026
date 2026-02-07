<script setup>
import { ref, onMounted } from 'vue';

const audioRef = ref(null);
const isPlaying = ref(false);
const volume = ref(0.5); // Volumen al 50% para no asustar

const props = defineProps({
  songSrc: {
    type: String,
    required: true
  }
});

// Función expuesta para que el padre pueda darle play (Truco del Hero)
const playMusic = () => {
    if (audioRef.value) {
        audioRef.value.volume = volume.value;
        audioRef.value.play()
            .then(() => {
                isPlaying.value = true;
            })
            .catch(error => {
                console.log("Autoplay prevenido por el navegador, esperando interacción.");
            });
    }
};

const togglePlay = () => {
    if (isPlaying.value) {
        audioRef.value.pause();
    } else {
        playMusic();
    }
    isPlaying.value = !isPlaying.value;
};

// Exponemos la función 'playMusic' para usarla desde fuera
defineExpose({ playMusic });
</script>

<template>
    <div class="music-container">
        <audio ref="audioRef" loop>
            <source :src="songSrc" type="audio/mp3">
        </audio>

        <button @click="togglePlay" class="music-btn" :class="{ 'playing': isPlaying }">
            <span v-if="!isPlaying">🎵</span> <span v-else>❚❚</span>       </button>
    </div>
</template>

<style scoped>
.music-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    cursor: pointer;
    z-index: 1000; /* Siempre encima de todo */
    font-size: 1.2rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e63946;
}

.music-btn:hover {
    transform: scale(1.1);
    background: white;
}

/* Animación cuando está sonando (latido) */
.playing {
    animation: pulse-border 2s infinite;
    background: #ffe4e6; /* Un rosa suave */
}

@keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(230, 57, 70, 0); }
    100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); }
}
</style>