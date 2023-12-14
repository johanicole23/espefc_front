
import iconoFondo from '../../assets/login/iconoLogin.png';
import fondo from '../../assets/login/fondoLogin.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MyToolBar from '../MyComponents/myToolBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';
import home from '../../styles/pages/home';
import loan from '../../styles/pages/loan';
import buttons from '../../styles/buttons';
import login from '../../styles/pages/login';
import registerStyle from '../../styles/pages/register';
import { Component, useEffect } from 'react';
import axios from 'axios';
import { validarCedulaEcuatoriana } from '../Register/registerConstants';
function Login() {
    const theme = createTheme({
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

    const [isModalCodeConfirmOpen, setIsModalCodeConfirmOpen] = useState(false);
    const [isModalForgetPasswordOpen, setIsModalForgetPasswordOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [codeJSON, setcodeJSON] = useState('');
    const textFieldsRef = useRef([]);
    const [isAlertEmptyCodeOpen, setIsAlertEmptyCodeOpen] = useState(false);
    const [isAlertCodeOpen, setIsAlertCodeOpen] = useState(false);
    const [isAlertCredentialsOpen, setIsAlertCredentialsOpen] = useState(false);
    const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
    const [isAlertIdLoginOpen, setIsAlertIdLoginOpen] = useState(false);
    const [isAlertIdSuccessOpen, setIsAlertIdSuccessOpen] = useState(false);
    const [isAlertCheckEmailOpen, setIsAlertCheckEmailOpen] = useState(false);
    const [isAlertCheckEmailWrongOpen, setIsAlertCheckEmailWrongOpen] = useState(false);
    const [questionsRecuperation, setQuestionsRecuperation] = useState([]);
    const [userCiRecuperation, setUserCiRecuperation] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [iconNumberColor, setIconNumberColor] = useState('action.active');
    const [iconIdColor, setIconIdColor] = useState('action.active');
    const [password, setPassword] = useState('');
    const passwordInputRef = useRef(null);
    const [customer, setCustomer] = useState({});
    const [user, setUser] = useState({});

    const idInputRef = useRef(null);
    const idRecuperationInputRef = useRef(null);

    const [formData, setFormData] = useState({
        user_ci: "",
        user_password: ""
    })

    const [userData, setUserData] = useState({
        user_ci: "",
        user_answers_body: [
            {
                question_id: 0,
                user_answer: ""
            },
            {
                question_id: 1,
                user_answer: ""
            }
        ]
    });

    function numberToArray(number) {
        const numberString = number.toString();
        const digitArray = numberString.split('').map(Number);
        return digitArray;
    }

    // Función para manejar el cambio de los campos en el codigo de verificación
    const handleChange = (index, event) => {
        const newValue = event.target.value;
        if (/^[0-9]*$/.test(newValue)) {
            const newVerificationCode = [...verificationCode];
            newVerificationCode[index] = newValue;
            setVerificationCode(newVerificationCode);

            // Enfocar el siguiente campo de texto
            if (index < textFieldsRef.current.length - 1) {
                textFieldsRef.current[index + 1].focus();
            }
        }
    };

    //Comparar el código ingresado con el código enviado por correo
    const handleSubmit = () => {
        const emptyVerificationCode = ['', '', '', '', '', ''];
        setVerificationCode(emptyVerificationCode);
        setIsAlertEmptyCodeOpen(false);
        setIsAlertCodeOpen(false);

        if (verificationCode.every((code) => code !== '')) {
            // Aquí puedes realizar la acción deseada con el código completo
            const completeCode = verificationCode.join('');
            const digitArray = numberToArray(codeJSON)
            if (verificationCode.join() === digitArray.join()) {
                console.log("Código coincide:");
                window.localStorage.setItem('user', JSON.stringify(user));
                window.localStorage.setItem('customer', JSON.stringify(customer));
                if(user.user_role === 'admin'){
                    window.location.href = '/admin-cuenta';
                }
                if(user.user_role === 'usuario' && user.user_state === true){
                    window.location.href = '/cuenta';
                }
                if(user.user_role === 'usuario' && user.user_state === false){
                    window.location.href = '/cuenta-en-construccion';
                }
            }
            else {
                console.log("Código no coincide:");
                setVerificationCode(emptyVerificationCode);
                setIsAlertCodeOpen(true)
                setIsAlertEmptyCodeOpen(false);
            }

        } else {
            setIsAlertEmptyCodeOpen(true);
            setIsAlertCodeOpen(false)
        }
    };

    

    //Conexión con el backend para el inicio de sesión
    const handleLogin = async () => {

        const emptyVerificationCode = ['', '', '', '', '', ''];
        setVerificationCode(emptyVerificationCode);
        setIsAlertEmptyCodeOpen(false);
        setIsAlertCodeOpen(false);

        try {
            if (formData.user_ci.trim() === '' || formData.user_password.trim() === '') {
                setIsAlertCredentialsOpen(true);
            }

            else {
                const response = await axios.post('http://localhost:3000/api/loginUser', formData);

                const { success, user, customer, code, message } = response.data;

                if (response.data.success) {
                    console.log('Inicio de sesión exitoso');
                    setcodeJSON(code);
                    setCustomer(customer);
                    setUser(user);
                    setIsAlertCredentialsOpen(false);
                    setIsModalCodeConfirmOpen(true);
                } else {
                    setIsAlertCredentialsOpen(true);
                    if (response.data.error === 'Contraseña inválida') {
                        console.error('Contraseña inválida:', response.data.message);
                    } else if (response.data.error === 'Usuario no encontrado') {
                        console.error('Usuario no encontrado:', response.data.message);
                    } else {
                        console.error('Error desconocido:', response.data.message);
                    }
                }

            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error de red:', error.message);
            setIsAlertCredentialsOpen(true);
        }
        setTimeout(() => {
            // Realizar acciones después de esperar 5 segundos
            setIsAlertCredentialsOpen(false);
        }, 5000);

    };

    //Función para abrir el modal de recuperación de contraseña
    const handlePasswordForget = () => {
        setIsModalForgetPasswordOpen(true);

    };

    //Función para cerrar el modal de recuperación de contraseña
    const handleClosePasswordForget = () => {
        setIsModalForgetPasswordOpen(false);
    };

    //Función para manejar el cambio de los campos de usuario y contraseña
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Función para manejar el cambio del campo de cédula en el Login y comprobar si es válida
    const handleChangeIdLogin = (event) => {
        const id = idInputRef.current.value.trim().toLowerCase();
        setIsAlertIdLoginOpen(!validarCedulaEcuatoriana(id));
    }

    //Función para manejar el cambio del campo de cédula en la recuperación de contraseña
    const handleUserCiChange = (event) => {
        const id = idRecuperationInputRef.current.value.trim().toLowerCase();
        setUserCiRecuperation(event.target.value);
        if (validarCedulaEcuatoriana(id)) {
            setIsAlertIdOpen(false);
            setIsAlertIdSuccessOpen(true);
        }
        else {
            setIsAlertIdOpen(true);
            setIsAlertIdSuccessOpen(false);
        }

    };

    //Conexión con el backend para comprobar que el id exista en la BD y obtener las preguntas de seguridad
    const handleIdOpen = async () => {
        try {
            // Hacer la solicitud POST para obtener las preguntas del usuario
            const responsePost = await axios.post('http://localhost:3000/api/userQuestions', { user_ci: userCiRecuperation });

            const questions = responsePost.data;

            const responseGet = await axios.get('http://localhost:3000/api/questions');

            const data = responseGet.data.questions;

            if (Array.isArray(data)) {

                setQuestionsRecuperation(data);
            } else {

                console.error('La respuesta del servidor no es un array:', data);
            }

            console.log('Respuesta GET:', responseGet.data);
            setIsAlertIdOpen(false);
            setIsAlertIdSuccessOpen(false);

        } catch (error) {
            console.error('Error al obtener las preguntas', error);
            setIsAlertIdOpen(true);
        }
    };

    //Función para manejar el cambio de las respuestas de seguridad
    const handleUserAnswerChange = (e, index) => {
        const { value } = e.target;
        const updatedUserData = { ...userData };
        updatedUserData.user_answers_body[index].user_answer = value;
        setUserData(updatedUserData);
    };

    //Conexión con el backend para enviar las respuestas de seguridad y obtener la nueva contraseña
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        userData.user_ci = userCiRecuperation;
        try {
            // Enviar el formulario al servidor utilizando Axios
            const response = await axios.post('http://localhost:3000/api/userAnswers', userData);
            if (response.data.success) {
                setIsAlertCheckEmailOpen(true);
                setIsAlertCheckEmailWrongOpen(false);
                setIsSubmitDisabled(true);
            }
            else {
                setIsAlertCheckEmailWrongOpen(true);
                setIsAlertCheckEmailOpen(false);
            }
            // Manejar la respuesta del servidor según tus necesidades
            console.log(response.data);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setIsAlertCheckEmailWrongOpen(true);
            setIsAlertCheckEmailOpen(false);
        }
    };

    const handleShowPassword = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field],
        });
    };
    const [showPasswords, setShowPasswords] = useState({
        password: false,       
    });

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
                height: '100vh',
                position: 'absolute'
            }}>
                <Box sx={{ mt: 20, position: 'relative' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={1} />
                        <Grid item xs={12} sm={5} md={5}>
                            <img src={iconoFondo} alt="Descripción de la imagen" width="auto" height="auto" marginLeft='10%' />
                        </Grid>
                        <Grid item xs={12} sm={7} md={6}>
                            <Paper sx={login.cardLogin}>
                                <Typography variant="subtitle1" sx={home.homeTextH3Light}>Inicio de Sesión</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2 }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                                    <TextField id="user_ci" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconIdColor
                                        }} >Usuario (Cédula de Ciudadanía)</Typography>}
                                        type="number"
                                        inputRef={idInputRef}
                                        name={'user_ci'}
                                        value={formData.user_ci}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangeIdLogin(event); // Llama a la primera función


                                        }}
                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertIdLoginOpen && (
                                        <Alert
                                            open={isAlertIdLoginOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Cédula inválida
                                        </Alert>
                                    )}
                                </Stack>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2}}>
                                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                                    <TextField
                                        type={showPasswords.password ? 'text' : 'password'}
                                        sx={login.textoContrasena}
                                        id="user_password"
                                        label={<Typography sx={login.textoInput} >Contraseña</Typography>}
                                        variant="standard"
                                        size="large"
                                        inputRef={passwordInputRef}
                                        value={formData.user_password}
                                        name={'user_password'}
                                        
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            handleInputChange(e);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <div
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    onClick={() => handleShowPassword('password')}
                                                >
                                                    {showPasswords.password ? (
                                                        <VisibilityIcon
                                                            sx={{ fontSize: '20px', cursor: 'pointer', color: '#005f8f' }}
                                                        />
                                                    ) : (
                                                        <VisibilityIcon
                                                            sx={{ fontSize: '20px', cursor: 'pointer', color: 'action.active' }}
                                                        />
                                                    )}
                                                </div>
                                            ),
                                        }}
                                    />


                                </Box>
                                <Typography variant="subtitle1" onClick={handlePasswordForget} sx={login.textoPregunta}>¿Olvidaste tu contraseña?</Typography>
                                <Modal
                                    open={isModalForgetPasswordOpen}
                                    onClose={handleClosePasswordForget}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >

                                    <Box sx={login.loginModalSuccess}>
                                        <Typography id="modal-modal-title" sx={home.homeTextH4Left}>
                                            Ingrese su número de cédula:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', my: 2 }}>
                                            <TextField
                                                type="number"
                                                sx={login.textoInputCedula}
                                                id="userCiRecuperation"
                                                label={<Typography sx={login.textoInput} >Cédula</Typography>}
                                                inputRef={idRecuperationInputRef}
                                                name={'userCiRecuperation'}
                                                value={userCiRecuperation}
                                                onChange={handleUserCiChange}
                                                variant="standard" fullWidth margin="normal" />

                                            <Button size="small" variant="contained" color="terciary" onClick={handleIdOpen} sx={login.textoBotonCedula}>
                                                Verificar
                                            </Button>
                                        </Box>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {isAlertIdOpen && (
                                                <Alert
                                                    open={isAlertIdOpen}

                                                    severity="error"
                                                    sx={{
                                                        fontFamily: 'Cairo',
                                                        textAlign: 'Right',
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Cédula inválida
                                                </Alert>
                                            )}
                                        </Stack>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {isAlertIdSuccessOpen && (
                                                <Alert
                                                    open={isAlertIdSuccessOpen}
                                                    severity="success"
                                                    sx={{
                                                        fontFamily: 'Cairo',
                                                        textAlign: 'Right',
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Cédula válida
                                                </Alert>
                                            )}
                                        </Stack>

                                        <Typography id="modal-modal-title" sx={home.homeTextH4Left} >
                                            A continuación, responde las siguientes preguntas de seguridad.
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: "column", }}>

                                            <Box sx={{ display: 'flex', flexDirection: "column", }}>
                                                {questionsRecuperation.map((question, index) => (
                                                    <div key={question.question_id}>
                                                        <Typography variant="body1" sx={home.homeTextH4Left}>
                                                            {question.question_description}
                                                        </Typography>
                                                        <TextField
                                                            label={<Typography
                                                                sx={{
                                                                    fontFamily: "Cairo",
                                                                    textTransform: 'none',
                                                                    fontSize: "16px",
                                                                    width: '100%',
                                                                    color: iconNumberColor
                                                                }} > {`Respuesta ${index + 1}`}</Typography>}
                                                            value={userData.user_answers_body[index].user_answer || ''}
                                                            onChange={(e) => handleUserAnswerChange(e, index)}
                                                            variant="standard"
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </div>
                                                ))}
                                            </Box>
                                        </Box>

                                        <Button size="medium" variant="contained" color="secondary"
                                            onClick={handleFormSubmit}
                                            sx={buttons.registerButton}
                                            disabled={isSubmitDisabled}>
                                            Continuar
                                        </Button>
                                        <br />
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {isAlertCheckEmailOpen && (
                                                <Alert
                                                    open={isAlertCheckEmailOpen}
                                                    severity="success"
                                                    sx={{
                                                        fontFamily: 'Cairo',
                                                        textAlign: 'Right',
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Revisa tu correo, se te asignó una nueva contraseña
                                                </Alert>
                                            )}
                                        </Stack>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {isAlertCheckEmailWrongOpen && (
                                                <Alert
                                                    open={isAlertCheckEmailWrongOpen}
                                                    severity="error"
                                                    sx={{
                                                        fontFamily: 'Cairo',
                                                        textAlign: 'Right',
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Las respuestas ingresadas no coinciden con las registradas
                                                </Alert>
                                            )}
                                        </Stack>


                                    </Box>
                                </Modal>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertCredentialsOpen && (
                                        <Alert
                                            open={isAlertCredentialsOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Usuario y/o contraseña inválidos.
                                        </Alert>
                                    )}
                                </Stack>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', my: 2, mt: 2 }}>

                                    <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} href="/registro">
                                        Registrarse
                                    </Button>
                                    <Button size="small" variant="contained" color="secondary" onClick={handleLogin} sx={login.textoBoton} >
                                        Ingresar
                                    </Button>
                                    <Modal
                                        open={isModalCodeConfirmOpen}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={login.loginModalSuccess}>

                                            <Typography id="modal-modal-title" sx={home.homeTextH4Left}>
                                                Se acaba de enviar un mensaje con un código de verificación de 6 dígitos a tu correo personal y al educativo. Escribe el código a continuación.
                                            </Typography>

                                            <Grid container spacing={1}>
                                                {verificationCode.map((code, index) => (
                                                    <Grid item xs={2} key={index}>
                                                        <TextField
                                                            id={`input-with-sx-${index}`}
                                                            variant="standard"
                                                            fullWidth
                                                            margin="normal"
                                                            value={code}
                                                            onChange={(event) => handleChange(index, event)}
                                                            inputProps={{
                                                                maxLength: 1,
                                                                style: { textAlign: 'center' },
                                                            }}
                                                            inputRef={(el) => (textFieldsRef.current[index] = el)}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Stack sx={{ width: '100%' }} spacing={2}>
                                                {isAlertEmptyCodeOpen && (
                                                    <Alert
                                                        open={isAlertEmptyCodeOpen}
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
                                            </Stack>
                                            <Stack sx={{ width: '100%' }} spacing={2}>
                                                {isAlertCodeOpen && (
                                                    <Alert
                                                        open={isAlertCodeOpen}
                                                        severity="error"
                                                        sx={{
                                                            fontFamily: 'Cairo',
                                                            textAlign: 'Right',
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Código inválido
                                                    </Alert>
                                                )}
                                            </Stack>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', my: 2, mt: 2 }}>
                                                <Button size="small" variant="outlined" color="secondary" width="30%" onClick={handleLogin} sx={login.textoBoton} >
                                                    Enviar de nuevo
                                                </Button>
                                                <Button size="small" variant="contained" color="secondary" onClick={handleSubmit} sx={login.textoBoton} >
                                                    Verificar
                                                </Button>
                                            </Box>

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
}
export default Login;