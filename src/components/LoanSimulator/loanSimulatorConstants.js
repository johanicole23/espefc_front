
import salario from '../../assets/credit/salario.png';
import auto from '../../assets/credit/auto.png';
import education from '../../assets/credit/educacion.png';
import salud from '../../assets/credit/salud.png';
import { createTheme, } from '@mui/material/styles';
import { width } from '@mui/system';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'

        },
        secondary: {
            main: '#005F8F'
        },
    },
});
export const checked = true;
export const cardFinality = [

    {
        image: salario,
        title: "Préstamo Quirografario",
        descriptionP1: "Préstamo destinado a la compra de tu casa y/o departamento",
        interes: 9,

    },

    {
        image: auto,
        title: "Préstamo Prendario",
        descriptionP1: "Para que adquieras el bien que deseas obtener",
        interes: 10,

    },

    {
        image: education,
        title: "Préstamo  Educativo",
        descriptionP1: "Para obtener préstamo y pagar tus estudios en otro país",
        interes: 7,

    },
    {
        image: salud,
        title: "Préstamo de Salud",
        descriptionP1: "Para obtener una ayuda en una emergencia de salud",
        interes: 7,
    }
];

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 20,
    p: 4,
    '@media screen and (max-width: 600px)': {
        width: '80%',
        p: 2,
    },
};