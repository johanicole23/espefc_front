import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import buttons from '../../styles/buttons';
import home from '../../styles/pages/home'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { Grid } from '@mui/material';
import MyToolBar from '../MyComponents/myToolBar';
import { theme, cardMarks } from './carsConstants';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import {
    Chip, Paper,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

function Home() {


    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);


    const [carData, setCarData] = useState([
        {
            car_id: '0',
            car_videoId: 'ZwFeAVVISgY',
            car_name: 'Mazda CX 30 ',
            car_year: '2024',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Mazda',
            car_href: 'https://www.mazda.com.ec/',
        },
        {
            car_id: '1',
            car_videoId: 'J8jJoGR2d88',
            car_name: 'Chevrolet Trax',
            car_year: '2024',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Chevrolet',
            car_href: 'https://www.chevrolet.com.ec/',
        },
        {
            car_id: '2',
            car_videoId: '1ujmqroAqcM',
            car_name: 'Hyundai Tucson XG ',
            car_year: '2021',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Hyundai',
            car_href: 'https://www.hyundai.com.ec/',
        },
        {
            car_id: '3',
            car_videoId: 'z0O-7fQJu6k',
            car_name: 'Kia Sportage GT Line',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Kia',
            car_href: 'https://www.kia.com/ec/',
        },
        {
            car_id: '4',
            car_videoId: 'P4Pso6qlSLI',
            car_name: 'Nissan X-Trail',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Nissan',
            car_href: 'https://www.nissan.com.ec/',
        },
        {
            car_id: '5',
            car_videoId: 'yqateYxDlkY',
            car_name: 'Toyota Corolla Cross',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Toyota',
            car_href: 'https://www.casabaca.com/',
        },
        {
            car_id: '6',
            car_videoId: 'NQ8qVo-kD8Y',
            car_name: 'Renault Clio V6',
            car_year: '2022',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Renault',
            car_href: 'https://www.renault.ec/',
        },
        {
            car_id: '7',
            car_videoId: 'ozgO45QUGuo',
            car_name: 'Fiat Fastback',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Fiat',
            car_href: 'https://www.fiat.ec/',
        },
        {
            car_id: '8',
            car_videoId: 'xPaj80omXgc',
            car_name: 'Jeep Renegade',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Jeep',
            car_href: 'https://www.jeep.com/ec/',
        },
        {
            car_id: '9',
            car_videoId: '0y4Wki7JL1g',
            car_name: 'Peugeot LANDTREK',
            car_year: '2023',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Peugeot',
            car_href: 'https://www.peugeot.com.ec/',
        },
        {
            car_id: '10',
            car_videoId: 'hPxg4dnjJzQ',
            car_name: 'CITROËN C3',
            car_year: '2022',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Citroen',
            car_href: 'https://www.citroen.com.ec/',
        },
        {
            car_id: '11',
            car_videoId: 'Eo3-KZVXW3A',
            car_name: 'Ford Expedition Platinum',
            car_year: '2022',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Ford',
            car_href: 'https://www.ford.com.ec/',
        },
        {
            car_id: '12',
            car_videoId: 'xt_ejR1U9rg',
            car_name: 'Mazda CX-5',
            car_year: '2024',
            car_km: '50 000',
            car_price: '1.000.000',
            car_brand: 'Mazda',
            car_href: 'https://www.mazda.com.ec/',
        },
        {
            car_id: '13',
            car_videoId: 'hupdciQGrtY',
            car_name: 'Hyundai New Accent',
            car_year: '2023',
            car_km: '10 000',
            car_price: '1.000.000',
            car_brand: 'Hyundai',
            car_href: 'https://www.hyundai.com.ec/',
        },
        {
            car_id: '14',
            car_videoId: '3kHmQTQgA1M',
            car_name: 'Hyundai Accent HB20S',
            car_year: '2024',
            car_km: '0',
            car_price: '1.000.000',
            car_brand: 'Hyundai',
            car_href: 'https://www.hyundai.com.ec/',
        },

    ]);


    const openModal = (carBrand) => {
        setModalOpen(true);
        const carsByBrand = carData.filter((car) => car.car_brand === carBrand);
        setSelectedCar(carsByBrand);
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
                    {cardMarks.map((item) => (
                        <Grid item xs={3} key={item.title}>
                            <Card sx={home.carsFormatCardLoan}>
                                <CardActionArea onClick={() => openModal(item.title)}>
                                    <CardMedia
                                        sx={home.carsCardLogo} image={item.image} alt="Descripción de la imagen" />
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
                                                    <Typography marginBottom='0.5rem' variant="subtitle1" sx={home.homeTextH4W700}>{car.car_name}</Typography>
                                                    <Box display="flex" flexDirection={'row'}  >
                                                        <Chip style={{ borderColor: '#005f8f', width: '80px' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14Light }}>{car.car_year}</Typography>} />
                                                        <Typography marginLeft={'10px'} variant="body2" sx={home.homeTextH4}> {car.car_km} Kilómetros recorridos</Typography>
                                                    </Box>
                                                    <Typography marginTop='0.5rem' sx={home.homeTextH4W600}>$ {car.car_price}  <span style={{ ...home.homeTextH14Light, fontStyle: 'italic', marginLeft: '5px' }}>Negociable</span></Typography>

                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions >
                                            <Button size="medium" variant="contained" color="secondary" 
                                            sx={buttons.registerButton} 
                                            endIcon={<CallMissedOutgoingIcon />}
                                            href={car.car_href}>
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