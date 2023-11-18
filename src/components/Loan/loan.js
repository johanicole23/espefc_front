import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Grow from '@mui/material/Grow';
import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import home from '../../styles/pages/home';
import loan from '../../styles/pages/loan';
import buttons from '../../styles/buttons';
import MyToolBar from '../MyComponents/myToolBar';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import Modal from '@mui/material/Modal';
import {
    theme,
    cardLoan,
    checked,
} from './loanConstants';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';
import education from '../../assets/loans/finance.png';

function Loans() {

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [isModalEducationOpen, setIsModalEducationOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);

    const handleOpen = (item, index) => {
        setSelectedCard(index);
        setSelectedForm(index);
        setIsModalSucessOpen(true);
    };

    const handleClose = () => {
        setIsModalSucessOpen(false);
    };

    const handleOpenEducation = () => {
        setIsModalEducationOpen(true);
    };

    const handleCloseEducation = () => {
        setIsModalEducationOpen(false);
    };

    const videoIds = [
        'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up (Rickroll)
        'KMU0tzLwhbE', // Alan Walker - Faded
        '9bZkp7q19f0', // PSY - Gangnam Style
        'JGwWNGJdvx8', // Luis Fonsi - Despacito ft. Daddy Yankee
    ];

    // Opciones comunes para todos los reproductores de YouTube
    const commonOpts = {
        height: '100',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    return (
        <ThemeProvider theme={theme} >

            <div><MyAppBar title="Mi aplicación" /></div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ padding: '1rem 0', marginTop: 12.5 }}>
                <Typography variant="body2" sx={home.homeTextH1}>Servicios Financieros</Typography>
                <Typography variant="body2" sx={home.homeTextH3Light}>¡Potencia tus proyectos y metas con nuestras opciones financieras diseñadas para tu bienestar!</Typography>
                <Typography variant="body2" sx={home.homeTextH4}>Descubre los préstamos que el Fondo de Cesantía ESPE tiene para ti. </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '2rem' }}>
                <Card sx={{ width: '65%', ...loan.loanFormatCardEducationFinance }}>
                    <Box display="flex" flexDirection={'column'}>
                        <CardContent >

                            <Typography variant="subtitle1" sx={home.homeTextH3}>Educación Financiera</Typography>
                            <Typography variant="body2" sx={home.homeTextH4}>
                                ¡Descubre el camino hacia la libertad financiera con nuestros videos educativos! Empodérate con conocimientos sólidos sobre manejo de dinero, inversiones y planificación financiera. ¡Tu futuro financiero comienza aquí!
                            </Typography>

                        </CardContent>
                        <Box marginLeft="30%" >
                            <Button size="small" variant="contained" color="terciary"
                                sx={buttons.loanButtonFinance}
                                onClick={handleOpenEducation}>
                                Más información
                            </Button>
                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: '200px' }}
                        image={education}
                        alt="Live from space album cover"
                    />
                </Card>
            </Box>

            <Modal
                open={isModalEducationOpen}
                onClose={handleCloseEducation}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '700px',
                    bgcolor: 'background.paper',
                    border: '0px solid #000',
                    boxShadow: 20,
                    p: 4,
                }}>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <Box><MyToolBar title="ToolBar Component" /></Box>
                        <Typography margin={'1rem 0'} id="modal-modal-title" sx={home.homeTextH3}>
                            ¡Bienvenid@ a nuestra plataforma de Educación Financiera!
                        </Typography>
                        <Typography marginBottom={'2rem'} id="modal-modal-title" sx={home.homeTextH4Left}>
                            Empodérate con conocimientos sólidos sobre manejo de dinero, inversiones y planificación financiera. Explora nuestros recursos educativos, desde videos instructivos hasta artículos detallados, diseñados para guiarte hacia un futuro financiero sólido y próspero.
                        </Typography>
                        {videoIds.map((videoId, index) => (
                            <Box key={index} marginBottom="1rem">
                                <Typography variant="subtitle1" component="div">
                                    Video #{index + 1}
                                </Typography>
                                <YouTube videoId={videoId} opts={commonOpts} />
                            </Box>
                        ))}

                        <Button size="medium" variant="contained" color="secondary" sx={buttons.registerButton} href="/login">
                            Llenar documentos online
                        </Button>
                    </div>
                </Box>
            </Modal >


            <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>


                <Grid container spacing={2}>

                    {cardLoan.map((item, index) => (

                        <Grid item xs={6}>
                            <Box margin={'2rem 0'} display="flex" justifyContent="space-around" alignItems="center" sx={{ marginLeft: item.marginLeft, marginRight: item.marginRight }} >

                                <Card key={index} sx={loan.loanFormatCardLoan}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={loan.loanCardLoanLogo} image={item.image} alt="Descripción de la imagen" />
                                        <CardContent >
                                            <Box display="flex" flexDirection={'column'} >
                                                <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                                <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions >
                                        <Box marginLeft="30%" >
                                            <Button size="small" variant="outlined" color="secondary" onClick={() => handleOpen(item, index)} sx={buttons.appBarButtonText} >
                                                Quiero saber más
                                            </Button>
                                        </Box>



                                    </CardActions>
                                </Card>


                            </Box>
                        </Grid>

                    ))}


                </Grid>

            </Grow>
            {cardLoan.map((item) => (
                selectedForm === item.index && <div key={item.index}>
                    <Modal
                        open={isModalSucessOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    //sx={{ opacity: '50%' }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '0px solid #000',
                            boxShadow: 20,
                            p: 4,
                        }}>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Box><MyToolBar title="ToolBar Component" /></Box>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Monto :
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.monto}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Plazo:
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.plazo}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Tasa de Financiamiento:
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.tasa}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Requisitos:
                                </Typography>
                                <ul>
                                    {item.requisitos.map((requisito, index) => (
                                        <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                            <li key={index} id={`modal-modal-description-${index}`} >

                                                {requisito}

                                            </li>
                                            <br></br>
                                        </Typography>
                                    ))}

                                </ul>
                                <Button size="medium" variant="contained" color="secondary" sx={buttons.registerButton} href="/login">
                                    Llenar documentos online
                                </Button>
                            </div>
                        </Box>
                    </Modal >
                </div>
            ))}



            <div><MyFooter title="Pie de página" /></div>





        </ThemeProvider >
    );
}

export default Loans;