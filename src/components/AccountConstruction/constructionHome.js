import React, { useState, useEffect } from 'react';
import AppBarDrawer from './AppBarDrawerConstruction';
import bienvenida from '../../assets/account/welcome.png';
import Grid from '@mui/material/Grid';
import { Typography, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import home from '../../styles/pages/home';
import buttons from '../../styles/buttons';
import account from '../../styles/pages/account';
import Box from '@mui/material/Box';

import CardMedia from '@mui/material/CardMedia';
import fondo from '../../assets/accountConstruction/fondoAccount.png';
import { Link } from 'react-router-dom';


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
        if(!userAuth || userAuth.user_role !== 'usuario'){
            window.location.href = '/prohibido';
        }
    },[]); 


    useEffect(() => {
        const newCustomerData = window.localStorage.getItem('customer');
        console.log(newCustomerData);
        if (newCustomerData) {
            setCustomerData(JSON.parse(newCustomerData));
            console.log(newCustomerData);
        }

    }, []);
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box sx={{
                 
                    width: '100%',
                    height: '90vh',
                    position: 'absolute',
                    marginTop: '10vh',


                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                        <Grid item xs={12} sm={5} md={8}>
                            <Paper >
                                <Box justify-content={'center'} padding={'10px 10%'}>
                                    <Typography id="modal-modal-title" sx={home.homeTextH1Secondary}>
                                        Bienvenid@, {customerData.customer_name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={home.homeTextH3Light}>
                                        Actualmente tu cuenta se encuentra en construcción, por favor espera a que un administrador la apruebe.
                                        Si deseas agilizar tu proceso puedes acercarte a nuestra sucursal más cercana.
                                    </Typography>
                                    <Typography id="modal-modal-title" sx={home.homeTextH2LeftLightBigger}>
                                        ¡GRACIAS POR TU VISITA!
                                    </Typography>
                                </Box>

                            </Paper>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '90vh',
                                    marginTop:'1rem' // Esto ajusta la altura al 100% de la altura de la ventana
                                }}
                            >
                                <img
                                    src={fondo} // Reemplaza con la ruta de tu imagen
                                    alt="Tu imagen"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                    }}
                                />
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                    </Grid>




                </Box>

            </ThemeProvider>
        </div>
    );
}

export default App;
