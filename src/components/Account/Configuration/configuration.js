import React, { useState, useRef } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import {
    ThemeProvider, createTheme, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';
import buttons from '../../../styles/buttons';
import registerStyle from '../../../styles/pages/register';
import account from '../../../styles/pages/account';
import { validarCedulaEcuatoriana } from '../../Register/registerConstants';
const theme = createTheme({
    palette: {
        primary: {
            main: '#005f8f'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#005F8F'

        },
    },
});

function App() {
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
            default: 'Johanna Molina',
            isDisabled: true,

        },
        {
            icon: BadgeIcon,
            iconColor: iconIdColor,
            textLabel: "Cédula de ciudadanía",
            textError: " *Cédula Inválida",
            inputRef: idInputRef,
            default: '1751040716',
            isDisabled: true,

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico de la ESPE",
            textError: " *Correo Inválido",
            inputRef: emailInputRef,
            default: 'jnmolinaa.espe.edu.ec',
            isDisabled: true,

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico Personal",
            textError: " *Correo Inválido",
            inputRef: emailPersonalInputRef,
            default: 'johaniky12hotmail.com',
            isDisabled: false,


        },
        {
            icon: ContactPhoneIcon,
            iconColor: iconNumberColor,
            textLabel: "Teléfono Celular",
            textError: " * Solo números",
            inputRef: numberInputRef,
            default: '0984132920',
            isDisabled: false,


        },
        {
            icon: HomeIcon,
            iconColor: iconDirColor,
            textLabel: "Dirección de domicilio",
            textError: "",
            inputRef: dirInputRef,
            default: 'San Fernando N51-111',
            isDisabled: false,


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
        setIsModalSucessOpen(true);



    }



    const [textFieldData, setTextFieldData] = useState(textFieldRegister.map((item) => item.default));

    const handleInputChange = (event, index) => {
        const updatedData = [...textFieldData];
        updatedData[index] = event.target.value;
        setTextFieldData(updatedData);
    };


    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box display={'flex'} alignItems="center" flexDirection={'column'}  >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                        <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                            Configuración de Cuenta
                        </Typography>
                        <Typography
                            sx={home.homeTextH4Left}
                        >Si deseas editar algún campo correspondiente a tu infromación personal, hazlo aquí.</Typography>
                    </Paper>


                    <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>

                        <Typography variant="subtitle1" sx={home.homeTextH3Light}>Datos Personales</Typography>
                        {textFieldRegister.map((item, index) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} key={index}>
                                <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label={<Typography
                                    sx={{
                                        fontFamily: "Cairo",
                                        textTransform: 'none',
                                        fontSize: "16px",
                                        width: '100%',
                                        color: item.iconColor
                                    }} >{item.textLabel}{item.iconColor === 'error.main' ? item.textError : ''} </Typography>}
                                    inputRef={item.inputRef}
                                    variant="standard" fullWidth margin="normal"

                                    value={textFieldData[index]}
                                    onChange={(event) => handleInputChange(event, index)}
                                    disabled={item.isDisabled} />
                            </Box>
                        ))}

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                            <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQuestion} sx={buttons.registerButton} href="/login">
                                Editar
                            </Button>
                            <Modal
                                open={isModalSucessOpen}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >

                                <Box sx={account.accountEditModalMessage}>

                                    <Typography id="modal-modal-title" sx={home.homeTextH3Light}>
                                        Has editado tu información de manera exitosa.
                                    </Typography>

                                    <Button size="medium" variant="contained" color="secondary"

                                        href='/cuenta'
                                        sx={buttons.registerButton} >
                                        Continuar
                                    </Button>
                                </Box>




                            </Modal>
                        </Box>

                    </Paper>

                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                        <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                            Cambio de contraseña
                        </Typography>
                        <Typography
                            sx={home.homeTextH4Left}
                        >Si deseas cambiar la contraseña y aumentar la seguridad de la misma, ingresa aquí.</Typography>
                        <Button fullWidth  variant="outlined" color="secondary" sx={buttons.appBarButtonText}
                            href='/cuenta/configuracion/contrasena'>
                            Editar contraseña
                        </Button>
                    </Paper>

                </Box>


            </ThemeProvider >
        </div >
    );
}

export default App;

