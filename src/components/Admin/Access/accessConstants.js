
import salario from '../../../assets/credit/salario.png';
import auto from '../../../assets/credit/auto.png';
import education from '../../../assets/credit/educacion.png';
import salud from '../../../assets/credit/salud.png';
import { createTheme, } from '@mui/material/styles';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TitleIcon from '@mui/icons-material/Title';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import NotesIcon from '@mui/icons-material/Notes';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#b0d626'
        },
    },
});
export const checked = true;

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
};

export const textFieldNews = [

    {
        icon: TitleIcon,
        iconColor: '#005f8f',
        textLabel: "Título de la noticia",
        key: 'new_title',
    },
    {
        icon: NotesIcon,
        iconColor: '#005f8f',
        textLabel: "Contenido de la noticia",
        key: 'new_content',
    },
    {
        icon: FormatColorTextIcon,
        iconColor: '#005f8f',
        textLabel: "Contenido de la noticia",
        key: 'new_phrase',
    },

];

export const textFieldEducation = [

    {
        icon: AddLinkIcon,
        iconColor: '#005f8f',
        textLabel: "Enlace final del video",
        key: 'education_videoId',
        disabled: false,
    },
    

];


export const carsBrands = [
    'Chevrolet',
    'Citroen',
    'Fiat',
    'Ford',
    'Hyundai',
    'Jeep',
    'Kia',
    'Mazda',
    'Nissan',
    'Peugeot',
    'Renault',
    'Toyota',
  ];
  
  export const textFieldCars = [

    {
        icon: AddLinkIcon,
        iconColor: '#005f8f',
        textLabel: "Enlace del video promocional",
        key: 'car_videoId',
        disabled: false,
    },
    {
        icon: TitleIcon,
        iconColor: '#005f8f',
        textLabel: "Nombre del vehículo",
        key: 'car_name',
        disabled: true,
    },
    {
        icon: EditCalendarIcon,
        iconColor: '#005f8f',
        textLabel: "Año del vehículo",
        key: 'car_year',
        disabled: false,
    },
    {
        icon: EditRoadIcon,
        iconColor: '#005f8f',
        textLabel: "Kilómetros del vehículo",
        key: 'car_km',
        disabled: false,
    },
    {
        icon: AttachMoneyIcon,
        iconColor: '#005f8f',
        textLabel: "Costo del vehículo",
        key: 'car_price',
        disabled: false,
    },
    {
        icon: PictureAsPdfIcon,
        iconColor: '#005f8f',
        textLabel: "Enlace a la página oficial del vehículo",
        key: 'car_href',
        disabled: false,
    },

];

