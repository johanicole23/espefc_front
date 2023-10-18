import prendary from '../../assets/account/form_prendary.png';
import quiro from '../../assets/account/form_quiro.png';
import simulator from '../../assets/account/welcome.png';
import UploadIcon from '@mui/icons-material/Upload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


export const cardLoan = [    
    {
        image: prendary,
        title: "Proceso para Préstamos Prendarios",
        description: "Llena el formulario, descarga tu pdf y envíanos todos los archivos necesarios para iniciar tu proceso de solicitud de préstamo.",
        link: '/cuenta/proceso-quirografario'
    },
    {
        image: quiro,
        title: "Formularios Préstamos Quirografarios",
        description: "Llena el formulario, descarga tu pdf y envíanos todos los archivos necesarios para iniciar tu proceso de solicitud de préstamo.",
        link: '/cuenta/proceso-quirografario'
    },
];


export const cardLoanSimulator= [    
    
    {
        image: simulator,
        title: "Simulador Personalizado",
        description: "Visualiza tus préstamos y valores correspondientes.",
        link: '/cuenta/simulador-personalizado'
       
    },
];

export const cardLoanPassword= [    
    {
     
        title: "¿Necesitas cambiar la contraseña?",
        description: "Configúrala aquí en un paso",
        button: "Cambiar contraseña "
    },
   
];


export const cardLoanChirographic= [    
    
    {
       
        title: "Subir archivos",
        description: "Carga todos los archivos requeridos aquí.",
        link: '/cuenta/proceso-quirografario/archivos-quirografario',
        icon :UploadIcon,
        color:'#b0d626',
    },
    {
        
        title: "Completar Formulario de Préstamo",
        description: "Llena el formulario y luego descarga tu pdf.",
        link: '/cuenta/proceso-quirografario/formulario-quirografario',
        icon :PictureAsPdfIcon,
        color:'#005f8f'
    },
]; 