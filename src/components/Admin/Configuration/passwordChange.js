import React, { useState, useRef } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import {
    ThemeProvider, createTheme, TextField, Alert,
    Stack, Typography, Box, Button, Paper, Popover
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';
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
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if(!userAuth || userAuth.user_role !== 'admin'){
            window.location.href = '/prohibido';
        }
    },[]);
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [passwordNow, setPasswordNow] = useState('');
    const [isAlertPasswordHOpen, setIsAlertPasswordHOpen] = useState(false);
    const [isAlertPasswordMOpen, setIsAlertPasswordMOpen] = useState(false);
    const [isAlertPasswordDOpen, setIsAlertPasswordDOpen] = useState(false);
    const [isAlertPasswordAgainOKOpen, setIsAlertPasswordAgainOKOpen] = useState(false);
    const [isAlertPasswordAgainOpen, setIsAlertPasswordAgainOpen] = useState(false);
    const [isAlertChangeOk, setIsAlertChangeOk] = useState(false);
    const [isAlertChangeNot, setIsAlertChangeNot] = useState(false);
    const passwordInputRef = useRef(null);
    const passwordAgainInputRef = useRef(null);
    const alertSecurity = [
        {
            message: 'Seguridad Alta',
            severity: 'success',
            open: isAlertPasswordHOpen,
        },
        {
            message: 'Seguridad Media',
            severity: 'warning',
            open: isAlertPasswordMOpen,
        },
        {
            message: 'Seguridad Baja',
            severity: 'error',
            open: isAlertPasswordDOpen,
        }

    ]

    const passwordCompare = [
        {
            message: 'Las contraseñas coinciden',
            severity: 'success',
            open: isAlertPasswordAgainOKOpen,
        },

        {
            message: 'Las contraseñas no coinciden',
            severity: 'error',
            open: isAlertPasswordAgainOpen,
        }

    ]
    const message = [
        {
            message: 'Contraseña cambiada existosamente',
            severity: 'success',
            open: isAlertChangeOk,
        },

        {
            message: 'Contraseña actual incorrecta',
            severity: 'error',
            open: isAlertChangeNot,
        }

    ]
    const [customerData, setCustomerData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const newCustomerData = window.localStorage.getItem('customer');
        const newUserData = window.localStorage.getItem('user');
        console.log(newCustomerData);
        if (newCustomerData&&newUserData) {
            setCustomerData(JSON.parse(newCustomerData));
            setUserData(JSON.parse(newUserData));
            console.log(newCustomerData,newUserData);
        }
        
    }, []);

    const getPasswordStrength = () => {
        const password = passwordInputRef.current.value.trim().toLowerCase();

        const lengthRegex = /.{8,}/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[@$!%*?&#]/;

        const isLongEnough = lengthRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasDigit = digitRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);

        if (isLongEnough && hasLowercase && hasDigit && hasSpecialChar) {
            setIsAlertPasswordHOpen(true);
            setIsAlertPasswordMOpen(false);
            setIsAlertPasswordDOpen(false);
        } else if (isLongEnough && ((hasUppercase && hasLowercase) || (hasUppercase && hasDigit) || (hasLowercase && hasDigit))) {
            setIsAlertPasswordHOpen(false);
            setIsAlertPasswordMOpen(true);
            setIsAlertPasswordDOpen(false);

        } else {
            setIsAlertPasswordHOpen(false);
            setIsAlertPasswordMOpen(false);
            setIsAlertPasswordDOpen(true);
        }
    };

    const compareNewPasswords = () => {
        const password = passwordInputRef.current.value.trim().toLowerCase();
        const passwordAgain = passwordAgainInputRef.current.value.trim().toLowerCase();
        if (password === passwordAgain) {
            setIsAlertPasswordAgainOKOpen(true);
            setIsAlertPasswordAgainOpen(false);
        } else {
            setIsAlertPasswordAgainOKOpen(false);
            setIsAlertPasswordAgainOpen(true);
        }
    }
    const handleChangePassword = async (e) => {

        e.preventDefault();
        console.log(passwordNow, password);
        try {
            const response = await axios.post('http://localhost:3000/api/changePassword',
                {
                    user_ci: userData.user_ci,
                    user_password: passwordNow,
                    user_new_password: password,
                });
            console.log(response.data);
            setIsAlertChangeOk(true);
            setIsAlertChangeNot(false);
        } catch (error) {
            setIsAlertChangeNot(true);
            setIsAlertChangeOk(false);
        }

    };

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        passwordNow: false,
        passwordAgain: false,
    });

    const handleShowPassword = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field],
        });
    };
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box display={'flex'} alignItems="center" flexDirection={'column'}  >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                        <Typography
                            sx={home.homeTextH4Left}
                        >Para cambiar la contraseña, ingresa la contraseña actual y luego la nueva contraseña dos veces.</Typography>
                    </Paper>
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2, paddingRight: '50%' }}>
                            <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField
                                type={showPasswords.password ? 'text' : 'password'}
                                sx={login.textoContrasena}
                                id="passwordNow"
                                label={<Typography sx={login.textoInput} >Contraseña Actual</Typography>}
                                variant="standard"
                                size="small"
                                inputRef={passwordInputRef}
                                value={passwordNow}
                                onChange={(e) => {
                                    setPasswordNow(e.target.value);
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
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2, paddingRight: '50%' }}>
                            <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField type={showPasswords.passwordNow ? 'text' : 'password'} sx={login.textoContrasena} id="password" label={<Typography sx={login.textoInput} >Contraseña Nueva</Typography>}
                                variant="standard"
                                size='small'
                                inputRef={passwordInputRef}
                                value={password}
                                onChange={(e) => {
                                    getPasswordStrength(e); // Llama a la primera función
                                    setPassword(e.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <div
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            onClick={() => handleShowPassword('passwordNow')}
                                        >
                                            {showPasswords.passwordNow ? (
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
                        {alertSecurity.map((item) => (
                            <Stack sx={{ width: '100%', paddingRight: '50%' }} spacing={2}>
                                {item.open && (
                                    <Alert
                                        open={item.open}
                                        severity={item.severity}
                                        sx={{
                                            fontFamily: 'Cairo',
                                            textAlign: 'Right',
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.message}
                                    </Alert>
                                )}
                            </Stack>
                        ))}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2, paddingRight: '50%' }}>
                            <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField type={showPasswords.passwordAgain ? 'type' : 'password'} sx={login.textoContrasena} id="passwordAgain" label={<Typography sx={login.textoInput} >Contraseña Nueva (otra vez)</Typography>}
                                variant="standard"
                                size='small'
                                inputRef={passwordAgainInputRef}
                                value={passwordAgain}
                                onChange={(e) => {
                                    compareNewPasswords(e); // Llama a la primera función
                                    setPasswordAgain(e.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <div
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            onClick={() => handleShowPassword('passwordAgain')}
                                        >
                                            {showPasswords.passwordAgain ? (
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
                        {passwordCompare.map((item) => (
                            <Stack sx={{ width: '100%', paddingRight: '50%' }} spacing={2}>
                                {item.open && (
                                    <Alert
                                        open={item.open}
                                        severity={item.severity}
                                        sx={{
                                            fontFamily: 'Cairo',
                                            textAlign: 'Right',
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.message}
                                    </Alert>
                                )}
                            </Stack>
                        ))}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2, paddingRight: '25%' }}>

                            <Button
                                variant="contained"
                                color="secondary"
                                sx={buttons.accountLoanChirographic}
                                component="label"
                                onClick={handleChangePassword}
                            >
                                Cambiar contraseña

                            </Button>

                        </Box>
                        {message.map((item) => (
                            <Stack sx={{ width: '100%', paddingRight: '50%' }} spacing={2}>
                                {item.open && (
                                    <Alert
                                        open={item.open}
                                        severity={item.severity}
                                        sx={{
                                            fontFamily: 'Cairo',
                                            textAlign: 'Right',
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.message}
                                    </Alert>
                                )}
                            </Stack>
                        ))}




                    </Paper>
                </Box>


            </ThemeProvider>
        </div >
    );
}

export default App;

