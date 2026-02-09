// src/data.js
export const rawPhotos = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536150/20231027_235723_ovt2f2.jpg", // Foto temporal
        title: "Primer foto juntos",
        date: "2023-10-27",
        description: "Nuestra primer foto decente."
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20231029-WA0009_wyjdaq.jpg",
        title: "Primera Juntada con amigos",
        date: "2023-10-29",
        description: "Fuimos a casa de juani, a escuchar 1989 taylor's version, y a comer cosas ricas."
    },
    {
        id: 3,

    }
];


export const album = [
    {
        id: 1,
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536150/20231027_235723_ovt2f2.jpg", // Foto temporal
        title: "Fotitos lindas de nosotros",
        photos: [
            "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20231029-WA0024_f6sgle.jpg",
            "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536149/20231104_164756_u5dsz6.jpg",
            "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536146/20231104_164835_amlcn3.jpg",
            "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536076/IMG-20231105-WA0018_zl6fxt.jpg",
        ]
    },
];

// Función procesadora
/*const processPhotos = (photos) => {
    return photos.map(photo => {
        return {
            ...photo, // Copiamos las propiedades existentes
            // Sobreescribimos la URL con la optimizada
            image: photo.image.replace('/upload/', '/upload/f_auto,q_auto,w_800/') 
        };
    });
};
*/

// Configuración global (para no hardcodear en los componentes)
export const config = {
    coupleName: "Ernesto & Luana", // Pon el nombre de ella
    startDate: "2023-09-22" // La fecha en que empezaron a salir (YYYY-MM-DD)
};

export const loveStory = rawPhotos; // Procesamos las fotos al exportarlas