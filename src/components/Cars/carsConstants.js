import carruselP1 from '../../assets/CarruselPrincipal/CarruselP1.png';
import carruselP2 from '../../assets/CarruselPrincipal/CarruselP2.png';
import carruselP3 from '../../assets/CarruselPrincipal/CarruselP3.jpg';
import carruselP4 from '../../assets/CarruselPrincipal/CarruselP4.jpg';
import carruselP5 from '../../assets/CarruselPrincipal/Carrusel5.jpg';
import carruselP6 from '../../assets/CarruselPrincipal/Carrusel5.jpg';
import chevrolet from '../../assets/cars/Chevrolet.png';
import citroen from '../../assets/cars/Citroen.png';
import fiat from '../../assets/cars/Fiat.png';
import ford from '../../assets/cars/Ford.png';
import hyundai from '../../assets/cars/Hyundai.png';
import jeep from '../../assets/cars/Jeep.png';
import kia from '../../assets/cars/Kia.png';
import mazda from '../../assets/cars/Mazda.png';
import nissan from '../../assets/cars/Nissan.png';
import peugeot from '../../assets/cars/Peugeot.png';
import renault from '../../assets/cars/Renault.png';
import toyota from '../../assets/cars/Toyota.png';

import new1 from '../../assets/cars/diapo1.png';
import new2 from '../../assets/cars/diapo2.png';
import new3 from '../../assets/cars/diapo3.png';


import bolsa from '../../assets/opcionesPrincipal/bolsaDinero.png';
import diamante from '../../assets/opcionesPrincipal/diamante.png';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#005F8F'

        },
    },
});


export const cardMarks = [
    {
        image: mazda,
        title: "Mazda",       
    },
    {
        image: chevrolet,
        title: "Chevrolet",       
    },
    {
        image: hyundai,
        title: "Hyundai",       
    },
    {
        image: kia,
        title: "Kia",       
    },
    {
        image: nissan,
        title: "Nissan",       
    },
    {
        image: toyota,
        title: "Toyota",       
    },
    {
        image: renault,
        title: "Renault",       
    },
    {
        image: fiat,
        title: "Fiat",       
    },
    {
        image: jeep,
        title: "Jeep",       
    },
    {
        image: peugeot,
        title: "Peugeot",       
    },
    {
        image: citroen,
        title: "Citroen",       
    },
    {
        image: ford,
        title: "Ford",       
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
 
  ];


export const style = {
  
    bgcolor: 'background.paper',
  };
