// src/data.js

export const memories = [
    {
        type: "photo",
        id: 1,
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536150/20231027_235723_ovt2f2.jpg",
        title: "Primer foto juntos",
        date: "2023-10-27",
        description: "Nuestra primer foto decente."
    },
    {
        type: "photo",
        id: 2,
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20231029-WA0009_wyjdaq.jpg",
        title: "Primera Juntada con amigos",
        date: "2023-10-29",
        description: "Fuimos a casa de juani, a escuchar 1989 taylor's version, y a comer cosas ricas."
    },
    {
        type: "album",
        id: "album1",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20231029-WA0024_f6sgle.jpg",
        title: "Fotitos lindas de nosotros",
        date: "2023-11-04",
        description: "Un album con fotos lindas de nosotros.",
        photos: [
            {   url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20231029-WA0024_f6sgle.jpg",
                caption: "1"
            },
            {   url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536149/20231104_164756_u5dsz6.jpg",
                caption: "2"
            },
            {   url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536146/20231104_164835_amlcn3.jpg",
                caption: "3"
            },
            {   url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536076/IMG-20231105-WA0018_zl6fxt.jpg",
                caption: "4"
            }
        ]
    },
    {
        id: 3,
        type: "photo",
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536141/20240101_030828_pmmbcl.jpg",
        title: "Año Nuevo 2024",
        date: "2024-01-01",
        description: "Nuestro primer año nuevo juntos."
    },
    {
        type: "album",
        id: "album2",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726272/20240126_115915_clblca.jpg",
        title: "Viaje a Santa Rosa",
        date: "2024-01-26",
        description: "Nuestra primer escapada juntos.",
        photos: [
            {   
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726272/20240126_115915_clblca.jpg",
                caption: "1"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726228/20240126_114309_loo1ii.jpg",
                caption: "2"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726227/IMG-20240126-WA0019_scg24x.jpg",
                caption: "3"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20240128-WA0026_pjanam.jpg",
                caption: "4"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536139/20240128_121731_thfrtv.jpg",
                caption: "5"
            }
        ]
    }
    
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

export const loveStory = memories; // Procesamos las fotos al exportarlas