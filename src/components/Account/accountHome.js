import React from 'react';
import AppBarDrawer from './AppBarDrawer';
import bienvenida from '../../assets/account/welcome.png';
import {
    Button, Chip, Modal, Grid, Typography, Card, CardContent, CardActionArea,
    CardActions, CardMedia
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import home from '../../styles/pages/home';
import buttons from '../../styles/buttons';
import account from '../../styles/pages/account';
import Box from '@mui/material/Box';
import { cardLoan, cardLoanSimulator, cardLoanPassword } from './accountConstants';
import fondo from '../../assets/account/fondoAccount.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoanHistory from './loanHistory';
import ErrorPage from '../Forbidden/accountHome';
import PasswordChange from '../Account/Configuration/passwordFunctions';
import axios from 'axios';

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
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if (!userAuth || !userAuth.user_role || userAuth.user_role !== 'usuario') {
            Forbiden();
        }

    }, []);
    
useEffect(() => {
    const newCustomerData = window.localStorage.getItem('customer');
    if (newCustomerData) {
        setCustomerData(JSON.parse(newCustomerData));
    }

}, []);

const Forbiden = () => {
    const userAuth = JSON.parse(window.localStorage.getItem('user'));
    if (!userAuth || userAuth.user_role !== 'usuario') {
        console.log(userAuth);
        window.location.href = '/prohibido';
    }
}

const [userData, setUserData] = useState([]);
useEffect(() => {
    const newUserData = window.localStorage.getItem('user');
    if (newUserData) {
        setUserData(JSON.parse(newUserData));
    }
}, []);

useEffect(() => {

    setIsModalPasswordOpen(userData.user_first_time);


}, [userData]);



const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);


const handleCloseModal = () => {
    const newUserData = window.localStorage.getItem('user');
    if (newUserData) {
        setUserData(JSON.parse(newUserData));
    }
    if (!userData.user_first_time) {
        setIsModalPasswordOpen(false);
    }


};


return (
    <div>
        <AppBarDrawer />
        <ThemeProvider theme={theme}>
            <Box sx={{
                backgroundImage: `url(${fondo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '250vh',
                position: 'absolute',


            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={2}></Grid>
                    <Grid item xs={12} sm={5} md={10}>
                        <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                            Bienvenid@, {customerData.customer_name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                            Descubre todas las facilidades a las que ahora eres capaz de acceder.
                        </Typography>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent={"space-around"} marginBottom={"2rem"}  >

                    <Card sx={account.formularyFormatCardLoan}>
                        <CardActionArea>
                            <CardContent >
                                <Box display="flex" flexDirection={'column'} >
                                    <Typography marginBottom={'2rem'} variant="subtitle1" sx={home.homeTextH3}>Saldo disponible en tu cuenta individual</Typography>
                                    <Chip style={{ borderColor: '#b0d626' }} icon={<PaidIcon style={{ color: '#b0d626' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>{userData.user_balance}</Typography>} />

                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {cardLoanPassword.map((item) => (
                        <Card sx={account.formularyFormatCardLoan}>
                            <CardActionArea>

                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                            <CardActions >
                                <Box marginLeft="58px" >
                                    <Button size="medium" variant="contained" fullWidth color="secondary" sx={buttons.accountButtonTextPrimary} href="/cuenta/configuracion/contrasena">
                                        {item.button}
                                    </Button>
                                </Box>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <LoanHistory></LoanHistory>
                <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ margin: '0 15%' }} >
                    {cardLoan.map((item) => (
                        <Card sx={account.formularyFormatCardLoan}  >
                            <CardActionArea href={item.link}>
                                <CardMedia
                                    sx={account.formularyCardLoanLogo} image={item.image} alt="Descripción de la imagen" />
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                            <CardActions >
                                <Box marginLeft="90px" >
                                    <Button size="small" variant="outlined" color="secondary" sx={buttons.appBarButtonText} href={item.link}>
                                        Más Información
                                    </Button>
                                </Box>
                            </CardActions>

                        </Card>
                    ))}
                </Box>

                <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ margin: '0 15%' }} >


                    {cardLoanSimulator.map((item) => (
                        <Card sx={account.formularyFormatCardLoan}>
                            <CardActionArea href={item.link}>
                                <CardMedia
                                    sx={account.formularyCardLoanLogo} image={item.image} alt="Descripción de la imagen" />
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    ))}


                </Box>
                <Modal
                    open={isModalPasswordOpen}

                    aria-labelledby="modal-modal-title"
                    sx={{ zIndex: 1 }}
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={{
                        position: 'absolute',

                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '800px',
                        bgcolor: 'background.paper',
                        border: '0px solid #000',
                        boxShadow: 20,
                        p: 4,
                    }}>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>

                            <Typography margin={'1rem 0'} id="modal-modal-title" sx={home.homeTextH3}>
                                Editar Contraseña
                            </Typography>
                            <PasswordChange />

                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={buttons.passwordChange}
                                    component="label"
                                    onClick={handleCloseModal}

                                    fullWidth
                                >
                                    Cerrar

                                </Button>

                            </Box>

                        </div>
                    </Box>
                </Modal >



            </Box>

        </ThemeProvider>
    </div>
);




}

export default App;
