<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { config } from '../data';

const emit = defineEmits(['start']);

// --- LÓGICA DEL CONTADOR (AÑOS/MESES/DIAS) ---
const timeTogether = ref({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
let timerInterval = null;

const calculateTime = () => {
    const start = new Date(config.startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    // Ajuste de horas/minutos/segundos
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    // Lógica de "préstamo" para restas negativas (Matemática de fechas)
    
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Obtenemos cuántos días tuvo el mes ANTERIOR para saber cuánto sumar
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    timeTogether.value = { years, months, days, hours, minutes, seconds };
};

// --- COMPUTED PARA NOMBRE ---
const displayName = computed(() => {
    if (config.coupleName.includes('&')) {
        return config.coupleName.split('&')[1].trim();
    }
    return config.coupleName;
});

onMounted(() => {
    calculateTime();
    timerInterval = setInterval(calculateTime, 1000);
});

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});

const startExperience = () => {
    emit('start');
};
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
        <img src="https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949677/IMG_6213_vdnt6x.jpg" alt="Portada">
        <div class="overlay"></div>
    </div>

    <div class="hero-content">
        <h1 class="title">Hola, {{ displayName }} ❤️</h1>
        <p class="subtitle">Cada segundo a tu lado cuenta...</p>

        <div class="timer-box">
            <div class="timer-grid">
                <div class="time-unit" v-if="timeTogether.years > 0">
                    <span class="number">{{ timeTogether.years }}</span>
                    <span class="label">Años</span>
                </div>
                
                <div class="time-unit" v-if="timeTogether.years > 0 || timeTogether.months > 0">
                    <span class="number">{{ timeTogether.months }}</span>
                    <span class="label">Meses</span>
                </div>

                <div class="time-unit">
                    <span class="number">{{ timeTogether.days }}</span>
                    <span class="label">Días</span>
                </div>

                <div class="time-unit">
                    <span class="number">{{ timeTogether.hours }}</span>
                    <span class="label">Hs</span>
                </div>

                <div class="time-unit">
                    <span class="number">{{ timeTogether.minutes }}</span>
                    <span class="label">Min</span>
                </div>

                <div class="time-unit">
                    <span class="number">{{ timeTogether.seconds }}</span>
                    <span class="label">Seg</span>
                </div>
            </div>
        </div>
        <div>
            <button class="start-btn" @click="startExperience">
                <span class="icon">▶</span> Ver Nuestra Historia
            </button>
        </div>
    </div>

    <div class="scroll-indicator"><span>👇</span></div>
  </section>
</template>

<style scoped>
/* Estilos base */
.hero { position: relative; height: 100vh; width: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Poppins', sans-serif; }
.hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; animation: kenBurns 20s infinite alternate; }
.overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)); }
@keyframes kenBurns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }

/* Contenido */
.hero-content { position: relative; z-index: 10; text-align: center; max-width: 800px; padding: 20px; animation: fadeInUp 1.5s ease-out; }
.title { font-family: 'Dancing Script', cursive; font-size: 4rem; margin-bottom: 5px; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.subtitle { font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9; font-weight: 300; letter-spacing: 1px; }

/* TIMER BOX */
.timer-box {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 20px 10px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.2);
    margin-bottom: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    display: inline-block; /* Para que se ajuste al contenido */
}

.timer-grid {
    display: flex;
    justify-content: center;
    gap: 15px; /* Espacio entre números */
    flex-wrap: wrap; /* Importante para móvil: si no entran, bajan */
}

.time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
}

.number {
    font-size: 1.8rem; /* Un poco más chico para que entren todos */
    font-weight: bold;
    font-family: monospace;
    line-height: 1;
}

.label {
    font-size: 0.65rem;
    text-transform: uppercase;
    margin-top: 5px;
    opacity: 0.8;
}

/* Botón */
.start-btn { background: #e63946; color: white; border: none; padding: 12px 35px; font-size: 1.1rem; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(230, 57, 70, 0.5); display: inline-flex; align-items: center; gap: 10px; }
.start-btn:hover { transform: translateY(-3px) scale(1.05); background: #ff4d5a; }

/* Animaciones */
.scroll-indicator { position: absolute; bottom: 30px; z-index: 10; font-size: 2rem; animation: bounce 2s infinite; opacity: 0.7; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }

/* RESPONSIVE */
@media (max-width: 600px) {
    .title { font-size: 2.8rem; }
    .timer-grid { gap: 10px; max-width: 300px; margin: 0 auto; }
    .number { font-size: 1.4rem; }
    .time-unit { min-width: 40px; }
    /* Ajuste para que en celular queden 3 arriba y 3 abajo si no entran */
    .timer-box { padding: 15px 5px; }
}
</style>