import React from 'react';
import AppBarDrawer from './AppBarDrawer';
import bienvenida from '../../assets/account/welcome.png';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
import { cardLoan, cardLoanSimulator, cardLoanPassword } from './accountConstants';
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
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box sx={{
                    backgroundImage: `url(${fondo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '90vh',
                    position: 'absolute',
                    marginTop: '10vh',


                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                        <Grid item xs={12} sm={5} md={8}>
                            <Typography id="modal-modal-title" sx={home.homeTextH1Secondary}>
                                Bienvenida, Johanna Molina
                            </Typography>
                            <Typography id="modal-modal-description" sx={home.homeTextH2LeftLightBigger}>
                                Actualmente tu cuenta se encuentra en construcción, por favor espera a que un administrador la apruebe.
                                Si deseas agilizar tu proceso puedes acercarte a nuestra sucursal más cercana.
                            </Typography>
                            <Typography id="modal-modal-title" sx={home.homeTextH1}>
                                ¡GRACIAS POR TU VISITA!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                    </Grid>
                    



                </Box>

            </ThemeProvider>
        </div>
    );
}

export default App;
