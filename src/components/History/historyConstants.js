import logo from '../../assets/logoFC.png'
import espe from '../../assets/history/Espe.png';
import mision from '../../assets/history/mision.png';
import vision from '../../assets/history/vision.png';
import security from '../../assets/history/seguridad.png';
import fcespeP1 from '../../assets/history/fcespe1.png';
import fcespeP2 from '../../assets/history/fcespe2.png';
import { createTheme, } from '@mui/material/styles';

function createData(name, phone, email) {
  return { name, phone, email };
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const rows = [
  createData('Contacto General', '3989400 ext. 3260', 'fondoespe@espe.edu.ec'),
  createData('Byron Bermeo', '0998213636', 'bybeoliveros@gmail.com'),
  createData('Guillermo Smith', '099-5503091', 'drobalino@fcpcespe.com.ec'),
  createData('Diana Robalino', '099-5503091', 'drobalino@fcpcespe.com.ec'),
];

const theme = createTheme({
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

const cardMisionVision = [

  {
    image: vision,
    title: "Visión",
    description: "Garantizar un adecuado manejo del patrimonio previsional de nuestros partícipes, mediante una asesoría integral, trabajo honesto y con la mejor administración de sus recursos.",
  },
  {
    image: mision,
    title: "Misión",
    description: "Administrar con eficacia, eficiencia y economía los recursos del Fondo Complementario Previsional Cerrado de Cesantía de la Universidad de las Fuerzas Armadas ESPE, con honestidad y seguridad.",
  },


];
const cardFinality = [

  {
    image: security,
    title: "Finalidad",
    descriptionP1: "Mejorar la protección social de los partícipes del Fondo, mediante el otorgamiento de las prestaciones de cesantía establecidas en el Estatuto en forma complementaria e independiente a la prevista por el Seguro Social Obligatorio administrado por el Instituto Ecuatoriano de Seguridad Social.",
    descriptionP2: "También tiene el fin de promover la inversión de los recursos del Fondo bajo criterios de seguridad, solvencia, diversificación del riesgo, rentabilidad y liquidez.",
  },
];


const checked = true;

export {
  logo,
  espe,
  mision,
  vision,
  security,
  fcespeP1,
  fcespeP2,
  createData,
  label,
  rows,
  theme,
  cardMisionVision,
  cardFinality,
  checked
};
