import React, { useEffect } from 'react';
import AppBarDrawer from './AppBarDrawer';
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
import fondo from '../../assets/forbidden/error.png';
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
    const [counter, setCounter] = React.useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((counter) => counter - 1);
        }, 2500);
        setTimeout(() => {
            const authUser = JSON.parse(localStorage.getItem('user'));
            if (authUser) {
                if (authUser.user_role === 'admin') {
                    window.location.href = "/admin-cuenta";
                }else if (authUser.user_role === 'usuario') {
                    window.location.href = "/cuenta";
                }
            }else {
                window.location.href = "/login";
            }
            
        }, 5000);

    }, [])
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
                                    <Typography id="modal-modal-title" sx={home.homeTextH1SecondaryRed}>
                                        ¡Acceso Denegado! 
                                    </Typography>
                                    <Typography id="modal-modal-title" sx={home.homeTextH1SecondaryRed}>
                                        Espera {counter} segundos para ser redireccionado al inicio de sesión.
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={home.homeTextH3Light}>
                                        No tienes acceso a este contenido, si crees que esto es un error, se te redireccionará al inicio de sesión.
                                    </Typography>

                                </Box>



                            </Paper>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '70vh',
                                    marginTop: '1rem', // Esto ajusta la altura al 100% de la altura de la ventana
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
