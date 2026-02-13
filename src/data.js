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
                caption: "Que lindos que estamos cuando estamos juntos"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726228/20240126_114309_loo1ii.jpg",
                caption: "Fuimos a la hoya"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770726227/IMG-20240126-WA0019_scg24x.jpg",
                caption: "Me fleche todo"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536077/IMG-20240128-WA0026_pjanam.jpg",
                caption: "El mirador de santa rosa"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536139/20240128_121731_thfrtv.jpg",
                caption: "Volviendooo"
            }
        ]
    },
    {
        id: 4,
        type: "photo",
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536075/IMG-20240427-WA0045_geggih.jpg",
        title: "Tu cumple, mi vida",
        date: "2024-04-28",
        description: "Celebramos tu cumple juntos por primera vez."
    },
    {
        id: "album3",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770767404/IMG-20240430-WA0014_qkxmze.jpg",
        title: "Familia de 3",
        date: "2024-04-30",
        description: "Fotos con la Vienna",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770767404/IMG-20240430-WA0014_qkxmze.jpg",
                caption: "1"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770947565/20240824_194434_kd3ikm.jpg",
                caption: "2"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770946467/IMG-20241013-WA0001_vavv9w.jpg",
                caption: "3"
            }
        ]
    },
    {
        id: "album4",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770767404/IMG-20240504-WA0044_nnlxi1.jpg",
        title: "Mates y charlas",
        date: "2024-05-04",
        description: "Una de las tantas veces que fuimos a tomar mates al Palacio Ferreira",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770767404/IMG-20240504-WA0044_nnlxi1.jpg",
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770767405/20240504_162445_bablx5.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536154/20240504_162316_kbuyps.jpg"
            }
        ]
    },
    {
        id: 5,
        type: "photo",
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536164/20240504_225653_zfbxee.jpg",
        title: "Noche de Vino",
        date: "2024-05-04",
        description: "Que pedo me agarre esa noche"
    },
    {
        id: "album5",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536145/20240830_224220_enoiit.jpg",
        title: "Tiernos",
        date: "2024-08-30",
        description: "Fotos de un beso",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536145/20240830_224220_enoiit.jpg",
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536134/20240830_224228_xjpfri.jpg"
            }
        ]
    },
    {
        id: "album6",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536148/20241025_220740_aojgkc.jpg",
        title: "Nuestro Primer Aniversario",
        date: "2024-10-25",
        description: "Celebramos nuestro primer año juntos y coleccion de fotos de ese octubre",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536148/20241025_220740_aojgkc.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770948948/20241011_114659_m4ehoq.jpg",
                caption: "Sos la mejor Fotografa del mundo"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770948840/20241011_113921_knhcd7.jpg",
                caption: "El modelo no ayuda a veces"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770948902/IMG-20241013-WA0011_klalef.jpg",
                caption: "Club Paraguay!!!"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949095/IMG-20241014-WA0003_wplijb.jpg",
                caption: "TORTAAAAA QUE RICOOOO"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949105/IMG-20241014-WA0015_kxtr5y.jpg",
                caption: "Que sexy estaba jskajskaj"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949113/20241014_095715_znxt5g.jpg",
                caption: "Que hermoso regalo me hiciste, te amo."
            }
        ]
    },
    {
        id: "album7",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949486/IMG_5800_fsxhrq.jpg",
        title: "Vacaciones en Monte Hermoso!",
        date: "2025-01-03",
        description: "Nuestro primer viaje juntos a la playa, que hermoso estuvo. Sacamos muchisimas fotos",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949486/IMG_5800_fsxhrq.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536127/20250106_152606_qisffp.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949738/IMG-20250104-WA0004_zvzroj.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949728/IMG_5801_ro9lvm.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949726/DSC02743_xvpitb.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949719/IMG_5923_oizfg2.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949711/DSC02813_g3vdfv.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949705/20250109_232209_yzd9zu.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949684/IMG_6168_vyn4qm.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949677/IMG_6213_vdnt6x.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949671/IMG_6215_e9j3ux.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770949665/IMG_6231_es8lsa.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536074/IMG_6080_nq6zxa.jpg"
            }
        ]
    },
    {
        id: "album8",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950215/20250316_200716_swbp7j.jpg",
        title: "La Ginto",
        date: "2025-03-16",
        description: "Tantos domingos que pasamos en la ginto, que lindo lugar y que lindo haberlo vivido con vos.",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950215/20250316_200716_swbp7j.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950056/20250316_202001_nf8vhg.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536134/20250316_200623_er6kpo.jpg"
            },
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950055/20250510_220854_i5ksvw.jpg"
            }
        ]
    },
    {
        id: 6,
        type: "photo",
        url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770536137/20250427_025302_lfrfpy.jpg",
        title: "Infernales",
        date: "2025-04-27",
        description: "Fuimos a ver Infernales con coto y cata, que bien la pasamos."
    },
    {
        id: "album9",
        type: "album",
        cover: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950400/20251116_195813_cpzjqe.jpg",
        title: "Café",
        date: "2025-11-16",
        description: "Algunos de tantos cafés que tomamos.",
        photos: [
            {
                url: "https://res.cloudinary.com/dwl2dp9xo/image/upload/v1770950400/20251116_195813_cpzjqe.jpg"
            },
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