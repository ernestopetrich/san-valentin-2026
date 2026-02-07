<script setup>
import { ref, onMounted } from 'vue';
import { config } from '../data';

const daysTogether = ref(0);

// Pequeña lógica de ingeniería: Calcular días exactos
const calculateDays = () => {
    const start = new Date(config.startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    daysTogether.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};

onMounted(() => {
    calculateDays();
});
</script>

<template>
  <section class="hero">
    <div class="content">
        <h1>{{ config.coupleName }}</h1>
        <p>Construyendo recuerdos desde hace</p>
        <div class="counter">
            <span class="number">{{ daysTogether }}</span>
            <span class="label">Días</span>
        </div>
        <button @click="$emit('start')" class="btn-start">Ver Nuestra Historia ↓</button>
    </div>
    <div class="overlay"></div>
  </section>
</template>

<style scoped>
.hero {
    height: 100vh; /* Pantalla completa */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    /* Pon aquí una foto tuya y de ella de fondo */
    background-image: url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2'); 
    background-size: cover;
    background-position: center;
    color: white;
}

.overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4); /* Filtro oscuro */
    z-index: 1;
}

.content {
    position: relative;
    z-index: 2; /* Encima del filtro */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

h1 {
    font-size: 4rem;
    font-weight: bold;
    margin: 0;
    /* Si importas una fuente cursiva, úsala aquí */
}

.counter {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    padding: 1rem 2rem;
    border-radius: 12px;
    display: inline-block;
}

.number {
    font-size: 3rem;
    font-weight: 800;
    display: block;
}

.btn-start {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-start:hover {
    transform: scale(1.05);
}
</style>