import iconoFondo from '../../assets/register/icono_register.png';
import fondo from '../../assets/login/fondoLogin.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MyToolBar from '../../components/MyComponents/myToolBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import myTheme from '../../components/MyComponents/myTheme';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { theme, validarCedulaEcuatoriana } from './registerConstants';
import home from '../../styles/pages/home';
import buttons from '../../styles/buttons';
import login from '../../styles/pages/login';
import registerStyle from '../../styles/pages/register';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import { PDFDownloadLink } from '@react-pdf/renderer';


function Register() {

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [isModalUserConfirmOpen, setIsModalUserConfirmOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlertUserOpen, setIsAlertUserOpen] = useState(false);

    const [iconNameColor, setIconNameColor] = useState('action.active');
    const [iconIdColor, setIconIdColor] = useState('action.active');
    const [iconNumberColor, setIconNumberColor] = useState('action.active');
    const [iconEmailColor, setIconEmailColor] = useState('action.active');
    const [iconDirColor, setIconDirColor] = useState('action.active');

    const nameInputRef = useRef(null);
    const idInputRef = useRef(null);
    const numberInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const emailPersonalInputRef = useRef(null);
    const dirInputRef = useRef(null);

    const navigate = useNavigate();

    const textFieldRegister = [

        {
            icon: AssignmentIndIcon,
            iconColor: iconNameColor,
            textLabel: "Nombres y Apellidos",
            textError: " * Solo letras",
            inputRef: nameInputRef,

        },
        {
            icon: BadgeIcon,
            iconColor: iconIdColor,
            textLabel: "Cédula de ciudadanía",
            textError: " *Cédula Inválida",
            inputRef: idInputRef,

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico de la ESPE",
            textError: " *Correo Inválido",
            inputRef: emailInputRef,

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico Personal",
            textError: " *Correo Inválido",
            inputRef: emailPersonalInputRef,

        },
        {
            icon: ContactPhoneIcon,
            iconColor: iconNumberColor,
            textLabel: "Teléfono Celular",
            textError: " * Solo números",
            inputRef: numberInputRef,

        },
        {
            icon: HomeIcon,
            iconColor: iconDirColor,
            textLabel: "Dirección de domicilio",
            textError: "",
            inputRef: dirInputRef,

        },

    ];

    const securityQuestions = [

        {
            questionLabel: "¿Cuál es su cantante favorito?",
        },
        {
            questionLabel: "¿Cómo se llamó su primera mascota?",
        }
    ]

    const handleOpenQuestion = (event) => {
        event.preventDefault(); // Detener la redirección predeterminada del botón
        const nameValue = nameInputRef.current.value.trim().toLowerCase();
        const idValue = idInputRef.current.value.trim().toLowerCase();
        const numberValue = numberInputRef.current.value.trim().toLowerCase();
        const emailValue = emailInputRef.current.value.trim().toLowerCase();
        const emailPersonalValue = emailPersonalInputRef.current.value.trim().toLowerCase();
        const dirValue = dirInputRef.current.value.trim().toLowerCase();
        let flag1 = false;
        let flag2 = false;
        let flag3 = false;
        let flag4 = false;
        let flag5 = false;
        

      /*if (nameValue.length === 0 || idValue.length === 0 || numberValue.length === 0 || dirValue.length === 0 || emailValue.length === 0 || emailPersonalValue.length == 0) {
            // setIsModalEmptyOpen(true);
            //flagEmpty = true;
            setIsAlertOpen(true);
        }
        if else (buscarUsuario(idValue) ) {            
           setIsAlertUserOpen(true);
           setIsAlertOpen(false);
        }
        else {
            setIsAlertOpen(false);
            setIsAlertUserOpen(false);
            if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
                setIconNameColor('error.main');
                flag1 = false;
            }
            else {
                setIconNameColor('action.active');
                flag1 = true;
            }

            if (!/^\d+$/.test(idValue)) {
                setIconIdColor('error.main');
                flag2 = false;
            }
            else {

                if (validarCedulaEcuatoriana(idValue)) {
                    flag2 = true;
                    setIconIdColor('action.active');
                }
                else {
                    flag2 = false;
                    setIconIdColor('error.main');
                }
            }
            if (!/^\d+$/.test(numberValue)) {
                setIconNumberColor('error.main');
                flag3 = false;
            }
            else {
                setIconNumberColor('action.active');
                flag3 = true;
            }

            if (!emailValue.endsWith('@espe.edu.ec')) {
                // El correo electrónico no es válido, abre el modal Email
                setIconEmailColor('error.main');
                flag4 = false;
            }
            else {
                setIconEmailColor('action.active');
                flag4 = true
            }

            if (!emailPersonalValue.endsWith('.com')) {
                // El correo electrónico no es válido, abre el modal Email
                setIconEmailColor('error.main');
                flag5 = false;
            }
            else {
                setIconEmailColor('action.active');
                flag5 = true
            }

        }

        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true) {
          */  setIsModalSucessOpen(true);
        /* setTimeout(() => {
             setIsModalSucessOpen(false);
             navigate('/login');
         }, 3000);
          }*/

    }

    const handleCloseQuestion = () => {
        setIsAlertOpen(false);
        setIsAlertUserOpen(false);
        setIsModalSucessOpen(false);
    };

    const handleOpenUserConfirm = (event) => {

        setIsModalUserConfirmOpen(true);
    }
    const handleCloseUserConfirm = () => {
        setIsModalUserConfirmOpen(false);
    };

    function handleClickDownloadDocuments() {
        const url = 'prueba.pdf'; // Reemplaza con la ruta correcta de tu documento

        const link = document.createElement('a');
        link.href = url;
        link.download = 'prueba.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <ThemeProvider theme={theme} >
            <AppBar color="primary" sx={{ zIndex: 2 }}>
                <Box><MyToolBar title="ToolBar Component" /></Box>
            </AppBar>
            <Box sx={{
                backgroundImage: `url(${fondo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '120vh',
                position: 'absolute'
            }}>
                <Box sx={{ mt: 15, position: 'relative' }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ mt: 10 }} item xs={12} sm={5} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5} md={2}></Grid>
                                <Grid item xs={12} sm={5} md={10}>
                                    <Typography variant="subtitle1" sx={home.homeTextH4Left}>Para poder afiliarte al Fondo de Cesantía de la Universidad de las Fuerzas Armadas debes tener: </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                        <CheckIcon sx={{ color: myTheme.palette.common.customSecondary, mr: 1, my: 0.5 }} />
                                        <Typography variant="subtitle1" sx={home.homeTextH4Left}>El correo oficial como miembro de la ESPE (@espe.edu.ec) </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                        <CheckIcon sx={{ color: myTheme.palette.common.customSecondary, mr: 1, my: 0.5 }} />
                                        <Typography variant="subtitle1" sx={home.homeTextH4Left}>Cédula Ecuatoriana </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5} md={2}></Grid>
                                <Grid item xs={12} sm={5} md={7.6}>
                                    <img src={iconoFondo} alt="Descripción de la imagen" width="65%" height="90%" marginLeft='10%' />
                                </Grid>
                                <Grid item xs={12} sm={5} md={2.4}></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={7} md={6}>
                            <Paper sx={login.cardLogin}>
                                <Typography variant="subtitle1" sx={home.homeTextH3Light}>Registro de cuenta</Typography>
                                {textFieldRegister.map((item) => (
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                        <TextField id="input-with-sx" label={<Typography
                                            sx={{
                                                fontFamily: "Cairo",
                                                textTransform: 'none',
                                                fontSize: "16px",
                                                width: '100%',
                                                color: item.iconColor
                                            }} >{item.textLabel}{item.iconColor === 'error.main' ? item.textError : ''} </Typography>} inputRef={item.inputRef}
                                            variant="standard" fullWidth margin="normal" />
                                    </Box>
                                ))}

                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertOpen && (
                                        <Alert
                                            open={isAlertOpen}
                                            onClose={handleCloseQuestion}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ningún campo debe estar vacío.
                                        </Alert>
                                    )}
                                    {isAlertUserOpen && (
                                        <Alert
                                            open={isAlertUserOpen}
                                            onClose={handleCloseQuestion}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                           Este usuario ya está registrado.
                                        </Alert>
                                    )}
                                </Stack>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                                    <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQuestion} sx={buttons.registerButton} href="/login">
                                        Completar mi afiliación
                                    </Button>
                                    <Modal
                                        open={isModalSucessOpen}
                                        onClose={handleCloseQuestion}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={registerStyle.registerModalSuccess}>

                                            <Typography id="modal-modal-title" sx={home.homeTextH4Left}>
                                                A continuación, responde las siguientes preguntas de seguridad.
                                            </Typography>

                                            <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-end', }}>
                                                <Typography sx={registerStyle.questionText} >{securityQuestions[0].questionLabel} </Typography>
                                                <TextField id="input-with-sx" variant="standard" fullWidth margin="normal" />
                                                <Typography sx={registerStyle.questionText} >{securityQuestions[1].questionLabel} </Typography>
                                                <TextField id="input-with-sx" variant="standard" fullWidth margin="normal" />
                                            </Box>

                                            <Button size="medium" variant="contained" color="secondary"
                                                onClick={() => {

                                                    handleOpenUserConfirm();
                                                }} sx={buttons.registerButton} >
                                                Continuar
                                            </Button>
                                            <Modal
                                                open={isModalUserConfirmOpen}
                                                onClose={handleCloseUserConfirm}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={registerStyle.registerModalMessage}>
                                                    <Box><MyToolBar title="ToolBar Component" /></Box>
                                                    <Typography id="modal-modal-title" sx={home.homeTextH1}>
                                                        ¡Bienvenido, ahora eres miembro de la página web del Fondo de Cesantía!
                                                    </Typography>

                                                    <Typography id="modal-modal-description" sx={registerStyle.messageText}
                                                    >
                                                        <br />No olvides que para acceder a los beneficios de esta plataforma debes estar afiliado al Fondo de Cesantía de la ESPE. <br />Si <span style={{ fontWeight: 'bold' }}>no te has afiliado aún</span>,
                                                        completa los siguientes documentos, <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleClickDownloadDocuments} >dando click aquí </span>
                                                        y acércate a nuestra sucursal en la Universidad.<br /><br />
                                                    </Typography>

                                                    <Button size="medium" variant="contained" color="secondary"
                                                        onClick={() => {
                                                            handleCloseQuestion();
                                                            handleCloseUserConfirm();
                                                        }}
                                                        href='/login'
                                                        sx={buttons.registerButton} >
                                                        Continuar
                                                    </Button>
                                                </Box>


                                            </Modal>

                                        </Box>

                                    </Modal>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Register;