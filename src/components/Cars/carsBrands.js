import React, { useState,  useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import buttons from '../../styles/buttons';
import home from '../../styles/pages/home'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { Grid } from '@mui/material';
import MyToolBar from '../MyComponents/myToolBar';
import { theme, cardMarks } from './carsConstants';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import {
    Chip
} from '@mui/material';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import axios from 'axios';

function Home() {


    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const [carsData, setCarsData] = useState([]);

    useEffect(() => {
        const getCarsbyBrand = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/getCarVideoByBrand', {
                    car_video_brand: 'Mazda',

                });
                console.log(response.data.car_videos);
                setCarsData(response.data.car_videos);
                setSelectedCar(response.data.car_videos);
                console.log(response.data.car_videos);// Guardar en la ref

            } catch (error) {
                console.error('Error al obtener vehículos', error);
            }
        };

        getCarsbyBrand();
    }, []);


    const openModal = async (carBrand) => {
        try {
            const response = await axios.post('http://localhost:3000/api/getCarVideoByBrand', {
                car_video_brand: carBrand,

            });
            setCarsData(response.data.car_videos);
            setSelectedCar(response.data.car_videos);
            console.log(response.data.car_videos);// Guardar en la ref
            setModalOpen(true);

        } catch (error) {
            console.error('Error al obtener vehículos', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCar(null);
    };

    // Opciones comunes para todos los reproductores de YouTube
    const commonOpts = {
        height: '200px',
        width: '380px',
        playerVars: {
            autoplay: 0,
        },
    };
    return (
        <ThemeProvider theme={theme}>

            <Box display="flex" justifyContent="space-evenly" alignItems="center" sx={{ margin: '0 15%' }} >
                <Grid container spacing={2}>
                    {/* Mapeo para elementos regulares */}
                    {cardMarks.slice(0, -1).map((item, index) => (
                        <Grid item xs={12} sm={3} key={item.title}>
                            <Box sx={{
                                '@media screen and (max-width: 600px)': {
                                   margin: '0 10%',
                                },
                            }}>
                                <Card sx={home.carsFormatCardLoan}>
                                    <CardActionArea onClick={() => openModal(item.title)}>
                                        <CardMedia sx={home.carsCardLogo} image={item.image} alt="Descripción de la imagen" />
                                    </CardActionArea>
                                </Card>
                            </Box>

                        </Grid>
                    ))}

                    {/* Mapeo para el último elemento */}
                    {cardMarks.slice(-1).map((item) => (
                        <Grid item xs={12} key={item.title}>
                            <Card sx={home.carsFormatCardLoanOthers}>
                                <CardActionArea onClick={() => openModal(item.title)}>
                                    <CardMedia sx={home.carsCardLogoOthers} image={item.image} alt="Descripción de la imagen" />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Modal
                open={isModalOpen} onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    bgcolor: 'background.paper',
                    border: '0px solid #000',
                    boxShadow: 20,
                    p: 4,
                    '@media screen and (max-width: 600px)': {
                       width: '80%',
                       padding: '1.5rem',
                     },

                }}>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <Box><MyToolBar title="ToolBar Component" /></Box>
                        <Typography margin={'1rem 0'} sx={home.homeTextH3}>
                            Resultados de nuestros convenios
                        </Typography>
                        {selectedCar ? (
                            selectedCar.map((car) => (
                                <div key={car.car_id} >
                                    <Card
                                        sx={{
                                            maxWidth: '400px',
                                            marginTop: '2rem',
                                            marginLeft: '5%',
                                            zIndex: 1,
                                            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
                                            '@media screen and (max-width: 600px)': {
                                                marginLeft: '0',
                                              },
                         

                                        }}>
                                        <CardActionArea>
                                            <CardMedia
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }} alt="Descripción de la imagen" >
                                                <Box marginTop="1rem">
                                                    <YouTube videoId={car.car_videoId} opts={commonOpts} />
                                                </Box>
                                            </CardMedia>
                                            <CardContent >
                                                <Box display="flex" flexDirection={'column'} >
                                                    <Typography marginBottom='0.5rem' variant="subtitle1" sx={home.homeTextH4W700}>{car.car_video_name}</Typography>
                                                    <Box display="flex" flexDirection={'row'}  >
                                                        <Chip style={{ borderColor: '#005f8f', width: '80px' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14Light }}>{car.car_video_year}</Typography>} />
                                                        <Typography marginLeft={'10px'} variant="body2" sx={home.homeTextH4}> {car.car_video_km} Kilómetros recorridos</Typography>
                                                    </Box>
                                                    <Typography marginTop='0.5rem' sx={home.homeTextH4W600}>$ {car.car_video_price}  <span style={{ ...home.homeTextH14Light, fontStyle: 'italic', marginLeft: '5px' }}>Negociable</span></Typography>

                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions >
                                            <Button size="medium" variant="contained" color="secondary"
                                                sx={buttons.registerButton}
                                                endIcon={<CallMissedOutgoingIcon />}
                                                href={car.car_video_href}>
                                                Ir al sitio oficial
                                            </Button>



                                        </CardActions>
                                    </Card>


                                </div>
                            ))
                        ) : (
                            <Typography variant="body1">No hay datos disponibles</Typography>
                        )}
                    </div>
                </Box>

            </Modal>



        </ThemeProvider >
    );
}

export default Home;