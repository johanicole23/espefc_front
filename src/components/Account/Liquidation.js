import React from 'react';
import AppBarDrawer from './AppBarDrawer';
import liquidacion from '../../assets/account/liquidation.png';
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
import { Box, Paper } from '@mui/material';
import { cardLoan, cardLoanSimulator, cardLoanPassword } from './accountConstants';
import CardMedia from '@mui/material/CardMedia';
import fondo from '../../assets/account/fondoAccount.png';
import { Link } from 'react-router-dom';
import { flexbox } from '@mui/system';
import variacion from '../../assets/account/variation.png';
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
            main: '#b0d626'

        },
    },
});
function handleClickDownloadDocuments(url, name) {

    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function App() {
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if (!userAuth || userAuth.user_role !== 'usuario') {
            window.location.href = '/prohibido';
        }
    }, []);
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box sx={{
                    backgroundImage: `url(${fondo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '120vh',
                    position: 'absolute',


                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                        <Grid item xs={12} sm={5} md={8}>
                            <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '1rem' }}>
                                <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                                    ¿Para qué sirve la solicitud de Liquidación de Cesantía?
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>Sirve para proporcionar una red de seguridad financiera a los empleados en caso de que se enfrenten a la pérdida de empleo, a menudo debido a recortes de personal, cambios en la estructura de la institución, o cualquier otra circunstancia que resulte en la terminación del contrato de trabajo.
                                    <br />Estos fondos están destinados a proteger los derechos y la estabilidad financiera de los empleados, especialmente aquellos que han dedicado años de servicio a la institución. </Typography>
                                <Typography sx={home.homeTextH4Left}
                                >
                                   <br />   A continuación los requisitos para este proceso<br />
                                </Typography>
                                <Typography sx={home.homeTextH4Left}
                                >
                                    <br />                                 
                                    <li>Copia a color de cédula de ciudadanía o identidad actual </li>
                                    <li>Certificado bancario</li>
                                    <li>Aviso de salida</li>                            

                                </Typography>
                            </Paper>


                        </Grid>
                        <Grid item xs={12} sm={5} md={2}></Grid>
                    </Grid>
                    <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ margin: '0 15%' }} >

                        <Card sx={account.formularyFormatCardLoan}  >
                            <CardActionArea>
                                <CardMedia
                                    sx={account.formularyCardLoanLogo} image={liquidacion} alt="Descripción de la imagen" />
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Typography variant="subtitle1" sx={home.homeTextH3}>Liquidación de Cesantía</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>Obtén aquí el formulario de solicitud</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                            <CardActions >
                                <Box margin={'0 18%'} >
                                    <Button variant="contained" color="terciary" sx={buttons.accountLiquidationButton}
                                        onClick={() => handleClickDownloadDocuments('/files/liquidacion_cesantia.pdf', "liquidacion_cesantia.pdf")}>
                                        Descargar archivo
                                    </Button>
                                </Box>
                            </CardActions>

                        </Card>
                        <Card sx={account.formularyFormatCardLoan}  >
                            <CardActionArea>
                                <CardMedia
                                    sx={account.formularyCardLoanLogo} image={variacion} alt="Descripción de la imagen" />
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Typography variant="subtitle1" sx={home.homeTextH3}>Solicitud de Rendimiento</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>Obtén aquí el formulario de solicitud</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                            <CardActions >
                                <Box margin={'0 18%'} >
                                    <Button variant="contained" color="terciary" sx={buttons.accountLiquidationButton}
                                        onClick={() => handleClickDownloadDocuments('/files/liquidacion_cesantia.pdf', "liquidacion_cesantia.pdf")}>
                                        Descargar archivo
                                    </Button>
                                </Box>
                            </CardActions>

                        </Card>

                    </Box>




                </Box>

            </ThemeProvider>
        </div>
    );
}

export default App;
