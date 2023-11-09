import cliente from '../../assets/admin/cliente.png';
import quiro from '../../assets/account/form_quiro.png';
import simulator from '../../assets/account/welcome.png';
import UploadIcon from '@mui/icons-material/Upload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


export const cardLoan = [    
    {
        image: cliente,
        title: "Gestión de Clientes",
        description: "Aceptar a los clientes afiliados al Fondo de Cesantía ESPE o rechazar a los que aun no pertenezcan.",
        link: '/cuenta/proceso-prendario'
    },
    {
        image: quiro,
        title: "Gestión de Préstamos",
        description: "Seleccionar el estado en el que se encuentran los diferentes procesos de solicitud de préstamos en el sistema.",
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

export const cardLoanCollateral= [    
    
    {
       
        title: "Subir archivos",
        description: "Carga todos los archivos requeridos aquí.",
        link: '/cuenta/proceso-prendario/archivos-prendario',
        icon :UploadIcon,
        color:'#b0d626',
    },
    {
        
        title: "Completar Formulario de Préstamo",
        description: "Llena el formulario y luego descarga tu pdf.",
        link: '/cuenta/proceso-prendario/formulario-prendario',
        icon :PictureAsPdfIcon,
        color:'#005f8f'
    },
]; 