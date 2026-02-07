// src/data.js
export const loveStory = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7", // Foto temporal
        title: "Nuestro Comienzo",
        date: "2023-02-14",
        description: "El día que todo cambió."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1621888002931-4b10e5272a81",
        title: "Primera Escapada",
        date: "2023-06-20",
        description: "Viaje inolvidable a la montaña."
    }
    // Luego agregarás tus fotos reales aquí
];

// Configuración global (para no hardcodear en los componentes)
export const config = {
    coupleName: "Ernesto & Luana", // Pon el nombre de ella
    startDate: "2023-09-22" // La fecha en que empezaron a salir (YYYY-MM-DD)
};