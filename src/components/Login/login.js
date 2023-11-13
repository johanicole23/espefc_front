
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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PasswordIcon from '@mui/icons-material/Password';
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

    const securityQuestions = [

        {
            questionLabel: "¿Cuál es su cantante favorito?",
        },
        {
            questionLabel: "¿Cómo se llamó su primera mascota?",
        }
    ]

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
    const [iconNumberColor, setIconNumberColor] = useState('action.active');

    const [inputValue, setInputValue] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const idInputRef = useRef(null);
    const idRecuperationInputRef = useRef(null);

    const [iconIdColor, setIconIdColor] = useState('action.active');

    const [formData, setFormData] = useState({
        user_ci: "",
        user_password: ""
    })

    function numberToArray(number) {

        // Convierte el número en una cadena
        const numberString = number.toString();

        // Divide la cadena en un arreglo de caracteres y luego convierte cada carácter de nuevo en número
        const digitArray = numberString.split('').map(Number);

        return digitArray;
    }
    const handleOpenCodeConfirm = (event) => {
        if (true) {
            setIsAlertCredentialsOpen(true);
        }
        else {
            setIsAlertCredentialsOpen(false);
            event.preventDefault();
            setIsModalCodeConfirmOpen(true);
        }


    }


    const handleCloseCodeConfirm = () => {
        //setIsModalCodeConfirmOpen(false);
    };


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
                window.location.href = '/cuenta';
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


    const handleCodeAgain = () => {
        const emptyVerificationCode = ['', '', '', '', '', ''];
        setVerificationCode(emptyVerificationCode);
        setIsAlertEmptyCodeOpen(false);
    };



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

                const { success, customer, token, code, message } = response.data;

                if (response.data.success) {
                    console.log('Inicio de sesión exitoso');
                    //console.log('Datos del cliente:', customer);
                    console.log('Token:', token);
                    //console.log('Código de verificación:', code);
                    setcodeJSON(code);
                    //console.log(response.data.message);
                    setIsAlertCredentialsOpen(false);
                    setIsModalCodeConfirmOpen(true);
                    //console.log('Usuario:', formData.user_ci);
                   // console.log('Contraseña:', formData.user_password);
                } else {
                    // La solicitud no fue exitosa
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



    };

    const handlePasswordForget = () => {
        setIsModalForgetPasswordOpen(true);

    };

    const handleClosePasswordForget = () => {
        setIsModalForgetPasswordOpen(false);
    };


    // Cuando se hace clic en el TextField de Cedula (Modal Forget Password) establece el valor en una cadena vacía  abre el modal de cedula inválida
    const handleTextFieldClick = () => {
        setInputValue('');
        setIsAlertIdOpen(false);
    };

    // función para mensaje de revisar el correo con nueva contraseña 
    const handleCheckEmailSuccessOpen = (event) => {
        if (true) {
            setIsAlertCheckEmailWrongOpen(true);
            //setIsAlertCheckEmailOpen(true);
        }

        /*else  (true) {
             setIsAlertIdOpen(true);
         }*/
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleChangeIdLogin = (event) => {
        const id = idInputRef.current.value.trim().toLowerCase();
        setIsAlertIdLoginOpen(!validarCedulaEcuatoriana(id));
    }

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



    const handleIdOpen = async () => {
        try {
            // Hacer la solicitud POST para obtener las preguntas del usuario
            const responsePost = await axios.post('http://localhost:3000/api/userQuestions', { user_ci: userCiRecuperation });

            // Extraer las preguntas de la respuesta POST
            const questions = responsePost.data;

            // Si todo sale bien en la solicitud POST, realizar una solicitud GET adicional
            const responseGet = await axios.get('http://localhost:3000/api/questions');
            const data = responseGet.data;

            if (Array.isArray(data)) {
                setQuestionsRecuperation(data);
            } else {
                console.error('La respuesta del servidor no es un array:', data);
            }
            // Manejar la respuesta de la solicitud GET según tus necesidades
            console.log('Respuesta GET:', responseGet.data);

            // Realizar otras acciones después de obtener las preguntas y la respuesta GET
            setIsAlertIdOpen(false);
            setIsAlertIdSuccessOpen(false);
        } catch (error) {
            console.error('Error al obtener las preguntas', error);
            setIsAlertIdOpen(true);
        }
    };





    const [userData, setUserData] = useState({
        user_ci: "",
        user_answers_body: [
            {
                question_id: 1,
                user_answer: ""
            },
            {
                question_id: 2,
                user_answer: ""
            }
        ]
    });

    const handleUserAnswerChange = (e, index) => {
        const { value } = e.target;
        const updatedUserData = { ...userData };
        updatedUserData.user_answers_body[index].user_answer = value;
        setUserData(updatedUserData);
    };

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

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
                                            setUsuario(event.target.value)

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

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2 }}>
                                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField type="password" sx={login.textoContrasena} id="user_password" label={<Typography sx={login.textoInput} >Contraseña</Typography>}
                                        variant="standard"
                                        name={'user_password'}
                                        value={formData.user_password}
                                        onChange={(event) => {
                                            handleInputChange(event);

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
                                            onClose={handleCodeAgain}
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
                                        onClose={handleCloseCodeConfirm}
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
                                                        onClose={handleCodeAgain}
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