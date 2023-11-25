import React from 'react';
import AppBarDrawer from './AppBarDrawer';
import variacion from '../../assets/account/variation.png';
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
import { Box, Paper, Chip } from '@mui/material';
import { cardLoan, cardLoanSimulator, cardLoanPassword } from './accountConstants';
import CardMedia from '@mui/material/CardMedia';
import fondo from '../../assets/account/fondoAccount.png';
import { Link } from 'react-router-dom';
import { flexbox } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadIcon from '@mui/icons-material/Download';

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

const normativeDocs = [    
    {
        id: 1,
        title: 'Código de buen gobierno corporativo ESPE V2',
        url: '/files/normativos/codigo_buen_gobierno.pdf',
        name: 'Código de buen gobierno corporativo ESPE V2.pdf',      
    },
    {
        id: 2,
        title: 'Código de Ética ESPE V2',
        url: '/files/normativos/codigo_etica.pdf',
        name: 'Código de Ética ESPE V2.pdf',        
    },
    {
        id: 3,
        title: 'Instructivo del Procedimiento para la Atención de Consultas, Quejas y Reclamos de los Participes ESPE V2',
        url: '/files/normativos/instructivo_de_quejas.pdf',
        name: 'Instructivo del Procedimiento para la Atención de Consultas, Quejas y Reclamos.pdf',      
    },
    {
        id: 4,
        title: 'Manual de ARLAFDT ESPE V2',
        url: '/files/normativos/manual_arlafdt.pdf',
        name: 'Manual de ARLAFDT ESPE V2.pdf',      
    },
    {
        id: 5,
        title: 'Manual de Funciones ESPE V2',
        url: '/files/normativos/manual_funciones.pdf',
        name: 'Manual de Funciones ESPE V2.pdf',      
    },
    {
        id: 6,
        title: 'Manual de Procedimientos de Préstamos ESPE V5',
        url: '/files/normativos/manual_prestamos.pdf',
        name: 'Manual de Procedimientos de Préstamos ESPE V5.pdf',      
    },
    {
        id: 7,
        title: 'Manual de Procedimientos de Refinanciamiento y Reestructuración ESPE V2',
        url: '/files/normativos/manual_refinanciamiento.pdf',
        name: 'Manual de Procedimientos de Refinanciamiento y Reestructuración ESPE V2.pdf',      
    },
    {
        id: 8,
        title: 'Manual de Reclutamiento, Selección y Desvinculación de Personal ESPE V2',
        url: '/files/normativos/manual_reclutamiento.pdf',
        name: 'Manual de Reclutamiento, Selección y Desvinculación de Personal ESPE V2.pdf',      
    },
    {
        id: 9,
        title: 'Manual de Usuario Aplicativo Web BIESS ESPE V2',
        url: '/files/normativos/manual_usuario.pdf',
        name: 'Manual de Usuario Aplicativo Web BIESS ESPE V2.pdf',      
    },
    {
        id: 10,
        title: 'Política de Gobierno Corporativo ESPE V2',
        url: '/files/normativos/politica_gobierno.pdf',
        name: 'Política de Gobierno Corporativo ESPE V2.pdf',      
    },
    {
        id: 11,
        title: 'Política de Inversiones No Privativas ESPE V2',
        url: '/files/normativos/politica_inversiones.pdf',
        name: 'Política de Inversiones No Privativas ESPE V2.pdf',        
    },
    {
        id: 12,
        title: 'Política de Vacaciones ESPE V1',
        url: '/files/normativos/politica_vacaciones.pdf',
        name: 'Política de Vacaciones ESPE V1.pdf',      
    },
    {
        id: 13,
        title: 'Reglamento Contrataciones ESPE V2',
        url: '/files/normativos/reglamento_contrataciones.pdf',
        name: 'Reglamento Contrataciones ESPE V2.pdf',      
    },
    {
        id: 14,
        title: 'Reglamento de Anticipo de Remuneraciones ESPE V1',
        url: '/files/normativos/reglamento_anticipo.pdf',
        name: 'Reglamento de Anticipo de Remuneraciones ESPE V1.pdf',      
    },
    {
        id: 15,
        title: 'Reglamento de Lavado de Activos ESPE V2',
        url: '/files/normativos/reglamento_lavado.pdf',
        name: 'Reglamento de Lavado de Activos ESPE V2.pdf',      
    },
    {
        id: 16,
        title: 'Reglamento Interno de Trabajo ESPE V2',
        url: '/files/normativos/reglamento_interno.pdf',
        name: 'Reglamento Interno de Trabajo ESPE V2.pdf',      
    },
    {
        id: 17,
        title: 'Reglamento para el Manejo de Caja Chica ESPE V1',
        url: '/files/normativos/reglamento_manejo_caja.pdf',
        name: 'Reglamento para el Manejo de Caja Chica ESPE V1.pdf',      
    },
    {
        id: 18,
        title: 'Reglamento para el Pago de Viáticos, Movilizaciones y Subsistencias ESPE V2',
        url: '/files/normativos/reglamento_pago_viaticos.pdf',
        name: 'Reglamento para el Pago de Viáticos, Movilizaciones y Subsistencias ESPE V2pdf',      
    },
   
];

const financialState = [    
    {
        id: 1,
        title: 'Balance General',
        url: '/files/normativos/codigo_buen_gobierno.pdf',
        name: 'Balance General.pdf',      
    },
    {
        id: 2,
        title: 'Estado de resultados',
        url: '/files/normativos/codigo_etica.pdf',
        name: 'Estado de resultados.pdf',        
    },

];

const auditoryInform = [    
    {
        id: 1,
        title: 'Último Trimestral',
        url: '/files/normativos/codigo_buen_gobierno.pdf',
        name: 'Último Trimestral.pdf',      
    },
    {
        id: 2,
        title: 'Auditoría Externa',
        url: '/files/normativos/codigo_etica.pdf',
        name: 'Auditoría Externa.pdf',        
    },

];



function handleClickDownloadDocuments(url, name) {

    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
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
                    height: '120vh',
                    position: 'absolute',


                }}>
                    <Box display="flex" justifyContent="center" alignItems="center"  >
                        <Accordion sx={{ width: '85%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" sx={home.homeTextH3Light}>Documentos Normativos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {normativeDocs.map((item, index) => (
                                    <Box marginBottom={'10px'} >
                                        <Paper width='80%' sx={{ height: '3rem' }}>
                                            <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection={'row'} >
                                                <Box width={'800px'} margin='0 50px 0 70px '  display="flex" justifyContent="flex-start" >
                                                    <Typography  sx={{ ...home.homeTextH4Left, }}>{item.title} </Typography>
                                                </Box>
                                                <Box width={'300px'} >
                                                    <Button size="small" variant="contained" color="secondary"
                                                        sx={{ ...buttons.appBarButtonLogin, width: '150px' }} endIcon={<DownloadIcon />}
                                                        onClick={() => handleClickDownloadDocuments(item.url, item.name)}>
                                                        Descargar
                                                    </Button>
                                                </Box>




                                            </Box>
                                        </Paper>
                                    </Box>
                                ))}



                            </AccordionDetails>
                        </Accordion>

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" margin={'3rem 0'} >
                        <Accordion sx={{ width: '85%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" sx={home.homeTextH3Light}>Estados Financieros</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {financialState.map((item, index) => (
                                    <Box marginBottom={'10px'} >
                                        <Paper width='80%' sx={{ height: '3rem' }}>
                                            <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection={'row'} >
                                                <Box width={'800px'} margin='0 50px 0 70px '  display="flex" justifyContent="flex-start" >
                                                    <Typography  sx={{ ...home.homeTextH4Left, }}>{item.title} </Typography>
                                                </Box>
                                                <Box width={'300px'} >
                                                    <Button size="small" variant="contained" color="terciary"
                                                        sx={{ ...buttons.appBarButtonRegister, width: '150px' }} endIcon={<DownloadIcon />}
                                                        onClick={() => handleClickDownloadDocuments(item.url, item.name)}>
                                                        Descargar
                                                    </Button>
                                                </Box>




                                            </Box>
                                        </Paper>
                                    </Box>
                                ))}



                            </AccordionDetails>
                        </Accordion>

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" margin={'3rem 0'} >
                        <Accordion sx={{ width: '85%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2" sx={home.homeTextH3Light}>Informes de auditoría</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {auditoryInform.map((item, index) => (
                                    <Box marginBottom={'10px'} >
                                        <Paper width='80%' sx={{ height: '3rem' }}>
                                            <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection={'row'} >
                                                <Box width={'800px'} margin='0 50px 0 70px '  display="flex" justifyContent="flex-start" >
                                                    <Typography  sx={{ ...home.homeTextH4Left, }}>{item.title} </Typography>
                                                </Box>
                                                <Box width={'300px'} >
                                                    <Button size="small" variant="contained" color="secondary"
                                                        sx={{ ...buttons.appBarButtonRegister, width: '150px' }} endIcon={<DownloadIcon />}
                                                        onClick={() => handleClickDownloadDocuments(item.url, item.name)}>
                                                        Descargar
                                                    </Button>
                                                </Box>




                                            </Box>
                                        </Paper>
                                    </Box>
                                ))}



                            </AccordionDetails>
                        </Accordion>

                    </Box>
                    



                </Box>

            </ThemeProvider>
        </div>
    );
}

export default App;
