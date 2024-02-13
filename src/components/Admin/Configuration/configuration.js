import React, { useState, useRef } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import {
    ThemeProvider, createTheme, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import axios from 'axios';
import { useEffect } from 'react';
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

    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
    const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);

    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if (!userAuth || userAuth.user_role !== 'admin') {
            window.location.href = '/prohibido';
        }
    }, []);

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

            isDisabled: true,
            key: 'customer_name',

        },
        {
            icon: BadgeIcon,
            iconColor: iconIdColor,
            textLabel: "Cédula de ciudadanía",
            textError: " *Cédula Inválida",
            inputRef: idInputRef,

            isDisabled: true,
            key: 'user_ci',

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico de la ESPE",
            textError: " *Correo Inválido",
            inputRef: emailInputRef,

            isDisabled: true,
            key: 'customer_espe_email',

        },
        {
            icon: EmailIcon,
            iconColor: iconEmailColor,
            textLabel: "Correo Electrónico Personal",
            textError: " *Correo Inválido",
            inputRef: emailPersonalInputRef,

            isDisabled: false,
            key: 'customer_personal_email',


        },
        {
            icon: ContactPhoneIcon,
            iconColor: iconNumberColor,
            textLabel: "Teléfono Celular",
            textError: " * Solo números",
            inputRef: numberInputRef,

            isDisabled: false,
            key: 'customer_phone',


        },
        {
            icon: HomeIcon,
            iconColor: iconDirColor,
            textLabel: "Dirección de domicilio",
            textError: "",
            inputRef: dirInputRef,

            isDisabled: false,
            key: 'customer_direction',


        },

    ];

    const [formData, setFormData] = useState({
        customer_name: '',
        user_ci: '',
        customer_espe_email: '',
        customer_personal_email: '',
        customer_phone: '',
        customer_direction: '',
    })

    const [customerData, setCustomerData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState(null);

    useEffect(() => {
        const newCustomerData = window.localStorage.getItem('customer');
        const newUserData = window.localStorage.getItem('user');
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
        if (newCustomerData && newUserData) {
            setCustomerData(JSON.parse(newCustomerData));
            setUserData(JSON.parse(newUserData));
            setCurrentUser({
                customer_name: JSON.parse(newCustomerData).customer_name,
                user_ci: JSON.parse(newUserData).user_ci,
                customer_espe_email: JSON.parse(newCustomerData).customer_espe_email,
                customer_personal_email: JSON.parse(newCustomerData).customer_personal_email,
                customer_phone: JSON.parse(newCustomerData).customer_phone,
                customer_direction: JSON.parse(newCustomerData).customer_direction,
            });
            console.log(newCustomerData, newUserData);
        }

    }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/editUser', {
                user_ci: currentUser.user_ci,
                customer_personal_email: currentUser.customer_personal_email,
                customer_phone: currentUser.customer_phone,
                customer_direction: currentUser.customer_direction,
                authorization: token,
            });

            if (response.data.success) {
                console.log('Usuario actualizado con éxito:', response.data.customer);
                //setIsModalSucessOpen(true);
                window.localStorage.setItem('customer', JSON.stringify(currentUser));
                setIsAlertSuccessOpen(true);
                setIsAlertErrorOpen(false);

            } else {
                console.error('Error al actualizar usuario:', response.data.message);
                setIsAlertErrorOpen(true);
                setIsAlertSuccessOpen(false);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setIsAlertErrorOpen(true);
            setIsAlertSuccessOpen(false);
        }
    };




    const handleInputChange = (event, key) => {
        const newValue = event.target.value;
        // Crea una copia del objeto formData y actualiza el valor del campo específico
        setCurrentUser((prevData) => ({
            ...prevData,
            [key]: newValue,
        }));
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
                        >Si deseas editar algún campo correspondiente a tu información personal, hazlo aquí.</Typography>
                    </Paper>


                    <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>

                        <Typography variant="subtitle1" sx={home.homeTextH3Light}>Datos Personales</Typography>
                        {textFieldRegister.map((item, index) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} key={index}>
                                <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    label={
                                        <Typography
                                            sx={{
                                                fontFamily: "Cairo",
                                                textTransform: 'none',
                                                fontSize: "16px",
                                                width: '100%',
                                                color: item.iconColor
                                            }}
                                        >
                                            {item.textLabel}{item.iconColor === 'error.main' ? item.textError : ''} </Typography>}

                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    value={currentUser[item.key] || ''}// Ajusta la clave según tu estructura de datos
                                    onChange={(event) => handleInputChange(event, item.key)}
                                    disabled={item.isDisabled}
                                />
                            </Box>
                        ))}

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                            <Button size="medium" variant="contained" color="secondary" onClick={handleFormSubmit} sx={buttons.registerButton} >
                                Editar
                            </Button>

                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertSuccessOpen && (
                                <Alert
                                    open={isAlertSuccessOpen}
                                    severity="success"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Información actualizada con éxito
                                </Alert>
                            )}
                        </Stack>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertErrorOpen && (
                                <Alert
                                    open={isAlertErrorOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Información no actualizada
                                </Alert>
                            )}
                        </Stack>
                    </Paper>

                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                        <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                            Cambio de contraseña
                        </Typography>
                        <Typography
                            sx={home.homeTextH4Left}
                        >Si deseas cambiar la contraseña y aumentar la seguridad de la misma, ingresa aquí.</Typography>
                        <Button fullWidth variant="outlined" color="secondary" sx={buttons.appBarButtonText}
                            href='/admin-cuenta/configuracion/contrasena'>
                            Editar contraseña
                        </Button>
                    </Paper>

                </Box>


            </ThemeProvider >
        </div >
    );
}

export default App;

