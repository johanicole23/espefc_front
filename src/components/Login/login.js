
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
    const textFieldsRef = useRef([]);
    const [isAlertEmptyCodeOpen, setIsAlertEmptyCodeOpen] = useState(false);
    const [isAlertCredentialsOpen, setIsAlertCredentialsOpen] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

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
        if (verificationCode.every((code) => code !== '')) {
            // Aquí puedes realizar la acción deseada con el código completo
            const completeCode = verificationCode.join('');
            console.log("Código completo:", completeCode);
        } else {
            setIsAlertEmptyCodeOpen(true);
        }
    };


    const handleCodeAgain = () => {
        const emptyVerificationCode = ['', '', '', '', '', ''];
        setVerificationCode(emptyVerificationCode);
        setIsAlertEmptyCodeOpen(false);
    };



    const handleLogin = () => {
        if (usuario.trim() === '' || contrasena.trim() === '') {
            setIsAlertCredentialsOpen(true);
        } else {
            setIsAlertCredentialsOpen(false);
            setIsModalCodeConfirmOpen(true);
            console.log('Usuario:', usuario);
            console.log('Contraseña:', contrasena);
        }
    };

    const handlePasswordForget = () => {
        setIsModalForgetPasswordOpen(true);

    };

    const handleClosePasswordForget = () => {
        setIsModalForgetPasswordOpen(false);
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
                                    <TextField id="user" label={<Typography sx={login.textoInput} >Usuario</Typography>}
                                        variant="standard" sx={login.textoInput}
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />

                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2 }}>
                                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField type="password" sx={login.textoContrasena} id="password" label={<Typography sx={login.textoInput} >Contraseña</Typography>}
                                        variant="standard"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)} />

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
                                            <TextField type="password" sx={login.textoInputCedula} id="password" label={<Typography sx={login.textoInput} >Cédula</Typography>}
                                                variant="standard"
                                                value={contrasena}
                                                onChange={(e) => setContrasena(e.target.value)} />
                                            <Button size="small" variant="contained" color="terciary" onClick={handleSubmit} sx={login.textoBotonCedula}>
                                                Verificar
                                            </Button>
                                        </Box>
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


                                            }} sx={buttons.registerButton} >
                                            Continuar
                                        </Button>



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

                                    <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} href="/">
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
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', my: 2, mt: 2 }}>
                                                <Button size="small" variant="outlined" color="secondary" width="30%" onClick={handleCodeAgain} sx={login.textoBoton} >
                                                    Enviar de nuevo
                                                </Button>
                                                <Button size="small" variant="contained" color="secondary" onClick={handleSubmit} sx={login.textoBoton}>
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