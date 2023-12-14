import React, { useState, useEffect } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import logo from '../../../assets/logoFC.png';
import cedula from '../../../assets/account/loanChirographic/cedula.png';
import formularioImagen from '../../../assets/account/loanChirographic/formulario.png';
import pagare from '../../../assets/account/loanChirographic/pagare.png';
import contrato from '../../../assets/account/loanChirographic/contrato_adhesion.png';
import libreta from '../../../assets/account/loanChirographic/libreta.png';
import confidencial from '../../../assets/account/loanChirographic/confidencial.png';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import TextField from '@mui/material/TextField';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyAppBar from '../../MyComponents/myAppBar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Carousel from 'react-material-ui-carousel';
import TtyIcon from '@mui/icons-material/Tty';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicationIcon from '@mui/icons-material/Medication';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import home from '../../../styles/pages/home';
import loan from '../../../styles/pages/loan';
import login from '../../../styles/pages/login';
import appbar from '../../../styles/components/appbar';
import { useRef } from 'react';
import { Document, Page } from 'react-pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocument, rgb } from 'pdf-lib';
import Select from 'react-select';
import MenuItem from '@mui/material/MenuItem';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { cardLoanChirographic } from '../accountConstants';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import account from '../../../styles/pages/account';
import buttons from '../../../styles/buttons';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from '@mui/material/Modal';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#005F8F',
        },
        tertiary: {
            main: '#b0d626',
        },
    },
});


function App() {
    const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
    const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);
    const [isAlertErrorEmptyNewOpen, setIsAlertErrorEmptyNewOpen] = useState(false);
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if(!userAuth || userAuth.user_role !== 'usuario'){
            window.location.href = '/prohibido';
        }
    },[]); 
    const uploadFilesData = [
        {
            index: 0,
            title: "Cargar solicitud de crédito",
            image: formularioImagen,
            download: true,
            url: '/files/solicitud_credito_quirografario.pdf',
            namePDF: "solicitud_credito_quirografario.pdf"

        },
        {
            index: 1,
            title: "Cargar copia de cédula",
            image: cedula,
            download: false,


        },
        {
            index: 2,
            title: "Cargar último confidencial",
            image: confidencial,
            download: false,

        },
        {
            index: 3,
            title: "Cargar libreta de la cuenta bancaria",
            image: libreta,
            download: false,

        },
        {
            index: 4,
            title: "Cargar pagaré ",
            image: pagare,
            download: true,
            url: '/files/pagare.pdf',
            namePDF: "Pagare.pdf",
        },
        {
            index: 5,
            title: "Cargar contrato de adhesión",
            image: contrato,
            download: false,
        },
    ]

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [selectedFiles, setSelectedFiles] = useState(Array(uploadFilesData.length).fill(null));

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles[index] = file;
        setSelectedFiles(newSelectedFiles);
    };


    const handleFileUpload = async () => {
        if (selectedFiles.every(file => file)) {

            const formData = new FormData();

            // Agregar cada archivo al formData
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append(`pdfs`, selectedFiles[i]);
            }

            try {
                // Enviar formData al servidor
                await axios.post('http://localhost:3000/api/uploadPdf', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setIsAlertSuccessNewOpen(true);
                setIsAlertErrorNewOpen(false);
                setIsAlertErrorEmptyNewOpen(false);
            } catch (error) {
                setIsAlertSuccessNewOpen(false);
                setIsAlertErrorNewOpen(true);
                setIsAlertErrorEmptyNewOpen(false);
            }

            setTimeout(() => {
                // Realizar acciones después de esperar 5 segundos
                setIsAlertErrorNewOpen(false);
                setIsAlertSuccessNewOpen(false);
                setIsAlertErrorEmptyNewOpen(false);
            }, 5000);

        } else {
            setIsAlertErrorEmptyNewOpen(true);
            setIsAlertErrorNewOpen(false);
            setIsAlertSuccessNewOpen(false);
            setTimeout(() => {
                setIsAlertErrorNewOpen(false);
                setIsAlertSuccessNewOpen(false);
                setIsAlertErrorEmptyNewOpen(false);
            }, 5000);
        }
    };


    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);

    const handleOpen = (item, index) => {
        setSelectedCard(index);
        setSelectedForm(index);
        setIsModalSucessOpen(true);
    };

    const handleClose = () => {
        setIsModalSucessOpen(false);
    };

    function handleClickDownloadDocuments(url, name) {
        //const url = 'prueba.pdf'; // Reemplaza con la ruta correcta de tu documento

        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box marginTop="2rem">
                    <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                        <Box display={'flex'} justifyContent={'center'} >
                            <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                                <Box flexDirection={'column'} justifyContent="center" sx={{ display: 'flex', paddingBottom: '1%' }}>
                                    <Typography sx={home.homeTextH3Light}
                                    >
                                        A continuación los documentos que se deben subir para completar el proceso:<br />
                                    </Typography>
                                    <Typography sx={home.homeTextH4LeftLight}
                                    >
                                        <br />
                                        <li>Solicitud de crédito con datos personales, firma del deudor y garantes (s)</li>
                                        <li>Copia a color de cédula de ciudadanía o identidad actual del deudor y garante (s)</li>
                                        <li>Último confidencial del deudor y garante (s)</li>
                                        <li>Copia de certificado, copia de libreta o documento electrónico de la cuenta bancaria (cuando sea diferente a la cuenta detallada en el confidencial del deudor);</li>
                                        <li>Pagaré con firma del deudor y garante (s)</li>
                                        <li>Contrato de adhesión.</li>

                                    </Typography>

                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Box>
                <Box flexDirection={'column'} alignItems="center" sx={{ margin: '0 15% 2% 15%', justifyContent: 'center' }}>
                    {uploadFilesData.map((item, index) => (
                        <Paper key={index} sx={account.uploadFormatCardLoan} elevation={5}>
                            <Box display="flex" flexDirection={"row"} justifyContent={"space-between"}>
                                {item.download && (
                                    <Button
                                        onClick={() => handleClickDownloadDocuments(item.url, item.namePDF)}
                                        size="small" variant="outlined" color="secondary" sx={buttons.appBarButtonText} component="label" startIcon={<DownloadForOfflineIcon />}>
                                        Descargar
                                    </Button>
                                )}
                                {!item.download && (
                                    <Box width={'12%'}></Box>
                                )}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={buttons.accountLoanChirographic}
                                    component="label"
                                    startIcon={<CloudUploadIcon />}>
                                    {item.title}
                                    <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event, index)} />
                                </Button>
                                {selectedFiles[index] && <div><Typography sx={home.homeTextH3Light}
                                >Archivo seleccionado: </Typography> {selectedFiles[index].name}</div>}
                                <Button
                                    variant="contained"
                                    color="tertiary"
                                    sx={buttons.accountLoanChirographicImage}
                                    onClick={() => handleOpen(item, index)}
                                    component="label" >
                                    Ver ejemplo
                                </Button>

                            </Box>
                        </Paper>
                    ))}
                </Box>

                {uploadFilesData.map((item) => (
                    selectedForm === item.index && <div key={item.index}>
                        <Modal
                            open={isModalSucessOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        //sx={{ opacity: '50%' }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 500,
                                bgcolor: 'background.paper',
                                border: '0px solid #000',
                                boxShadow: 20,
                                p: 4,
                            }}>
                                <Box display="flex" flexDirection={"row"} justifyContent={"space-around"} sx={{ maxHeight: '400px', overflowY: 'auto' }}>

                                    <img src={item.image} alt="Descripción de la imagen" width="390" height="auto" />

                                </Box>
                            </Box>
                        </Modal >
                    </div>
                ))}
              
                    <Stack sx={{  width: '46%',  margin:'0 27% 0 27%'  }} >
                        {isAlertSuccessNewOpen && (
                            <Alert
                                open={isAlertSuccessNewOpen}
                                severity="success"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                Archivos enviados correctamente, espera la respuesta de nuestros trabajadores.
                            </Alert>
                        )}
                    </Stack>
                    <Stack sx={{  width: '30%',  margin:'0 35% 0 35%'  }} >
                        {isAlertErrorNewOpen && (
                            <Alert
                                open={isAlertErrorNewOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                Los archivos no pudieron ser enviados, intenta de nuevo.
                            </Alert>
                        )}
                    </Stack>
                    <Stack sx={{ width: '30%',  margin:'0 35% 0 35%' }} >
                        {isAlertErrorEmptyNewOpen && (
                            <Alert
                                open={isAlertErrorNewOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                Sube todos los archivos antes de subirlos.
                            </Alert>
                        )}
                    </Stack>
                  

                
                <Box display="flex" flexDirection={"row"} alignItems="center" justifyContent={"center"} margin={'0 0 50px 0 '}>
                   
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={buttons.accountLoanChirographic}
                        component="label"
                        onClick={handleFileUpload}
                    >
                        Completar el proceso

                    </Button>

                </Box>


            </ThemeProvider>
        </div >
    );
}

export default App;
