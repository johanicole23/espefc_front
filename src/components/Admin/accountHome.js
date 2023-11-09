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
import fondo from '../../assets/admin/fondoAdmin.png';
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
                    height: '80vh',
                    position: 'absolute',


                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                        <Grid item xs={12} sm={5} md={10}>
                            <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                                Bienvenid@, Administrador
                            </Typography>
                            <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                Selecciona una opción de control:
                            </Typography>
                        </Grid>
                    </Grid>
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
                </Box>

            </ThemeProvider>
        </div>
    );
}

export default App;
