import carruselP1 from '../../assets/CarruselPrincipal/CarruselP1.png';
import carruselP2 from '../../assets/CarruselPrincipal/CarruselP2.png';
import carruselP3 from '../../assets/CarruselPrincipal/CarruselP3.jpg';
import carruselP4 from '../../assets/CarruselPrincipal/CarruselP4.jpg';
import carruselP5 from '../../assets/CarruselPrincipal/Carrusel5.jpg';
import carruselP6 from '../../assets/CarruselPrincipal/Carrusel5.jpg';
import new1 from '../../assets/CarruselNews/Noticia1.png';
import new1Mobile from '../../assets/CarruselNews/Noticia1Mobile.png';
import new2 from '../../assets/CarruselNews/Noticia2.png';
import new2Mobile from '../../assets/CarruselNews/Noticia2Mobile.png';
import new3 from '../../assets/CarruselNews/Noticia3.png';
import new3Mobile from '../../assets/CarruselNews/Noticia3Mobile.png';
import new4 from '../../assets/CarruselNews/Noticia4.png';
import mazda from '../../assets/marcas/mazda.png';
import kia from '../../assets/marcas/kia.png';
import lg from '../../assets/marcas/lg.png';
import hyundai from '../../assets/marcas/hyundai.png';
import bolsa from '../../assets/opcionesPrincipal/bolsaDinero.png';
import diamante from '../../assets/opcionesPrincipal/diamante.png';

export const images = [
    {
        src: carruselP1,
        alt: 'Descripción de la imagen 3',
        titulo: '¿Quiénes Somos? ',
        subtitulo: 'Conocenos y conoce nuestra historia',
        boton: 'Leer Ahora',
        href: '/historia'
    },
    {
        src: carruselP2,
        alt: 'Descripción de la imagen 1',
        titulo: 'Horarios de Atención',
        subtitulo: 'Revisa los horarios para visitar nuestra agencia',
        boton: 'Revisar Horarios',
        href:'/historia#horarios'
    },
    {
        src: carruselP3,
        alt: 'Descripción de la imagen 2',
        titulo: 'Accede a un préstamo cuando desees',
        subtitulo: 'Completa los formularios disponibles',
        boton: 'Comenzar una cuenta',
        href:'/login'
    },

    {
        src: carruselP4,
        alt: 'Descripción de la imagen 3',
        titulo: 'Mándonos tus sugerencias cuando quieras',
        subtitulo: 'O las preguntas que te hayas olvidado de realizar',
        boton: 'Visualizar formulario',
        href:'/historia#sugerencias'
    },
];

export const imagesCel = [
    {
        src: carruselP4,
        alt: 'Descripción de la imagen 1',

    },
    {
        src: carruselP5,
        alt: 'Descripción de la imagen 2',

    },

];

export const cards = [
    {
        image: mazda,
        description: "Conoce nuestros autos. Elige tu favorito y cotízalo."
    },
    {
        image: kia,
        description: "Conoce nuestros autos. Elige tu favorito y cotízalo."
    },
    {
        image: hyundai,
        description: "Conoce nuestros autos. Elige tu favorito y cotízalo."
    },
    {
        image: lg,
        description: "Conoce nuestros autos. Elige tu favorito y cotízalo."
    }
];

export const cardLoan = [
    {
        image: bolsa,
        title: "Préstamos Quirografarios",
        description: "¿Complicaciones? Nuestros préstamos quirografarios son la respuesta. Obtén el dinero que necesitas de manera ágil y sencilla." ,
    },
    {
        image: diamante,
        title: "Préstamos Prendarios",
        description: "Ofrecemos condiciones flexibles, plazos de pago ajustados a tus necesidades y tasas de interés competitivas para tu vehículo",
    },
];

export const imagesNews = [
    {
        src: new1,
        alt: 'Descripción de la noticia 1',
    },
    {
        src: new2,
        alt: 'Descripción de la noticia 2',
    },
    {
        src: new3,
        alt: 'Descripción de la noticia 3',
    },

];

export const newImages = [
    {
      key: '1',
      src: new1,
      alt: 'Descripción de la imagen 1',
      href: ''
    },
    {
      key: '2',
      src: new2,
      alt: 'Descripción de la imagen 2',
      href: ''
    },
    {
        key: '3',
        src: new3,
        alt: 'Descripción de la imagen 2',
        href: ''
      },
      {
        key: '4',
        src: new4,
        alt: 'Descripción de la imagen 2',
        href: ''
      },
 
  ];

  export const newImagesMobile = [
    {
      key: '1',
      src: new1Mobile,
      alt: 'Descripción de la imagen 1',
      href: ''
    },
    {
      key: '2',
      src: new2Mobile,
      alt: 'Descripción de la imagen 2',
      href: ''
    },
    {
        key: '3',
        src: new3Mobile,
        alt: 'Descripción de la imagen 2',
        href: ''
      },
 
  ];



export const carImages = [
    { image: mazda, description: "Conoce nuestros autos. Elige tu favorito y cotízalo." },
    { image: kia, description: "Conoce nuestros autos. Elige tu favorito y cotízalo." },
    { image: hyundai, description: "Conoce nuestros autos. Elige tu favorito y cotízalo." },
    { image: lg, description: "Conoce nuestros autos. Elige tu favorito y cotízalo." }
];

export const loanCards = [
    { image: bolsa, title: "Préstamos Quirografarios", description: " Nuestros préstamos quirografarios son la respuesta. Obtén el dinero que necesitas de manera ágil y sencilla." },
    { image: diamante, title: "Préstamos Prendarios", description: "Ofrecemos condiciones flexibles, plazos de pago ajustados a tus necesidades y tasas de interés competitivas." }
];
export const style = {
  
    bgcolor: 'background.paper',
  };
