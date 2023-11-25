
import React, { useState, useRef, useEffect } from 'react';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

import axios from 'axios';
import {
    theme,
    textFieldCars,
    carsBrands,
} from './accessConstants';


function AccessCars() {


    const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
    const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);
    const [isAlertSuccessPDFOpen, setIsAlertSuccessPDFOpen] = useState(false);
    const [isAlertErrorPDFOpen, setIsAlertErrorPDFOpen] = useState(false);
    const [isModalAddCarOpen, setIsModalAddCarOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados
    const [selectedIdBrand, setSelectedIdBrand] = useState(undefined);
    const [selectedIdBrandAddCar, setSelectedIdBrandAddCar] = useState(undefined);
    const [filteredCars, setFilteredCars] = useState([]);

    const [selectedDataAddCar, setSelectedDataAddCar] = useState({

        car_videoId: '',
        car_name: '',
        car_year: '',
        car_km: '',
        car_price: '',
        car_brand: selectedIdBrandAddCar,
        car_pdf: '',
    });


    const [carsData, setCarsData] = useState([
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

    //Función que actualiza el estado del selectId
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setFileData({ name: '', type: '', size: 0 });
        setSelectedId(selectedValue);
        console.log('ID seleccionado:', selectedValue);
    };

    //Función que actualiza el estado del selectIdBrand
    const handleChangeBrand = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdBrand(selectedValue);
        console.log('ID de marca seleccionado:', selectedValue);

        const filteredCars = carsData.filter(car => car.car_brand === selectedValue);
        console.log('Objetos filtrados:', filteredCars);
        setFilteredCars(filteredCars)
    };

    //Función que actualiza el estado del selectIdBrandAddCar
    const handleBrandAddCar = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdBrandAddCar(selectedValue);
        const updatedSelectedDataAddCar = { ...selectedDataAddCar };
        updatedSelectedDataAddCar.car_brand = selectedValue;
        setSelectedDataAddCar(updatedSelectedDataAddCar);

    };

    //Función del modal para agregar un nuevo vehículo
    const handleButtonAddCar = (event) => {
        console.log('Objeto creado:', selectedDataAddCar);
    }



    // Actualiza el estado de selectedData cuando se selecciona un nuevo ID 
    useEffect(() => {
        if (selectedId !== undefined) {
            const carsDataForSelectedId = filteredCars.find(item => item.car_name === selectedId);
            setSelectedData(carsDataForSelectedId || {});
            console.log('Objeto selectedData:', selectedData);
        }
    }, [selectedId, filteredCars]);

    // Función que envía los datos de noticia editados al backend
    const handleFormSubmitInfo = async (selectedId) => {
        //e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/editEducation', {
                education_id: selectedId,
                education_videoId: carsData[selectedId].education_videoId,
                education_titlePdf: carsData[selectedId].education_titlePdf,
                education_pdf: carsData[selectedId].education_pdf,
            });

            if (response.data.success) {
                console.log('Noticia actualizada con éxito:', response.data.customer);
                setIsAlertSuccessNewOpen(true);
                setIsAlertErrorNewOpen(false);

            } else {
                console.error('Error al actualizar noticia:', response.data.message);
                setIsAlertErrorNewOpen(true);
                setIsAlertSuccessNewOpen(false);
            }
        } catch (error) {
            console.error('Error en la noticia:', error);
            setIsAlertErrorNewOpen(true);
            setIsAlertSuccessNewOpen(false);
        }
    };

    const handleFormSubmitPDF = (selectedId) => {
        //e.preventDefault();
        if (fileData.name !== '') {
            setIsAlertErrorPDFOpen(false);
            setIsAlertSuccessPDFOpen(true);
        } else {
            setIsAlertErrorPDFOpen(true);
            setIsAlertSuccessPDFOpen(false);
        }
        /*try {
            const response = await axios.post('http://localhost:3000/api/editEducation', {
                education_id: selectedId,
                education_videoId: carsData[selectedId].education_videoId,
                education_titlePdf: carsData[selectedId].education_titlePdf,
                education_pdf: carsData[selectedId].education_pdf,
            });

            if (response.data.success) {
                console.log('Noticia actualizada con éxito:', response.data.customer);
                setIsAlertSuccessNewOpen(true);
                setIsAlertErrorNewOpen(false);

            } else {
                console.error('Error al actualizar noticia:', response.data.message);
                setIsAlertErrorNewOpen(true);
                setIsAlertSuccessNewOpen(false);
            }
        } catch (error) {
            console.error('Error en la noticia:', error);
            setIsAlertErrorNewOpen(true);
            setIsAlertSuccessNewOpen(false);
        }*/
    };



    //Función que actualiza el estado de los campos de texto
    function handleTextFieldChangeCar(event, key, car_name) {

        const newValue = event.target.value;

        // Encuentra el índice del objeto en newData con el new_id correspondiente
        const dataIndex = filteredCars.findIndex(item => item.car_name === car_name);

        // Actualiza solo la propiedad específica en filteredCars
        setFilteredCars(prevData => {
            const updatedData = [...prevData];
            updatedData[dataIndex] = {
                ...updatedData[dataIndex],
                [key]: newValue,
            };
            return updatedData;
        });
    }

    //Función que actualiza el estado de los campos de texto en AddCar
    function handleTextFieldChange(event, key) {

        const newValue = event.target.value;
        const updatedSelectedDataAddCar = { ...selectedDataAddCar };
        updatedSelectedDataAddCar[key] = newValue;
        setSelectedDataAddCar(updatedSelectedDataAddCar);
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [fileData, setFileData] = useState({
        name: '', // Agrega más propiedades según sea necesario
    });
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];

        // Hacer algo con el archivo, como enviarlo al servidor o almacenarlo en el estado

        // Ejemplo: almacenar información sobre el archivo en el estado
        setFileData((prevData) => ({
            ...prevData,
            [index]: file,
            name: file.name,
        }));

    };

    const handleOpenAddCar = () => {
        setIsModalAddCarOpen(true);
    };

    const handleCloseAddCar = () => {
        setIsModalAddCarOpen(false);
    };

    return (
        <ThemeProvider theme={theme} >
            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Página de vehículos: Vehículos disponibles </Typography>
                <Button size="medium" variant="outlined" color="secondary"
                    sx={buttons.appBarButtonText}
                    endIcon={<AddIcon />}
                    onClick={handleOpenAddCar}
                >
                    Agregar Vehículo
                </Button>
                <TextField
                    id="standard-select-currency"
                    select
                    label={<Typography sx={login.textoInput} >Elige una marca  </Typography>}
                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                    variant="standard"
                    fullWidth
                    onChange={handleChangeBrand}
                >

                    {carsBrands.map((brand, index) => (
                        <MenuItem key={index} value={brand}>
                            <Typography marginLeft={'20px'} sx={login.textoInput} >{brand}  </Typography>
                        </MenuItem>

                    ))}

                </TextField>
                <br />
                <br />
                <div>
                    {selectedIdBrand !== undefined ? (
                        <TextField
                            id="standard-select-currency"
                            select
                            label={<Typography sx={login.textoInput} >Elige un vehículo para editar  </Typography>}
                            // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                            variant="standard"
                            fullWidth
                            onChange={handleChange}

                        >

                            {filteredCars.map((car) => (
                                <MenuItem key={car.car_id} value={car.car_name}>
                                    <Typography marginLeft={'20px'} sx={login.textoInput} >{car.car_name} </Typography>
                                </MenuItem>
                            ))}

                        </TextField>


                    ) : (
                        <Typography sx={home.homeTextH4Left} margin={'1rem 0'}
                        >Por favor, selecciona una opción para cargar los datos.</Typography>
                    )}
                </div>
                <div>
                    {selectedId !== undefined ? (
                        textFieldCars.map((item, index) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} key={index}>
                                <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                <TextField
                                    id={`input-${item.key}-with-sx`}
                                    label={
                                        <Typography
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textTransform: 'none',
                                                fontSize: '16px',
                                                width: '100%',
                                                color: item.iconColor,
                                            }}
                                        >
                                            {item.textLabel}
                                        </Typography>
                                    }
                                    variant="standard"
                                    fullWidth
                                    disabled={item.disabled}
                                    margin="normal"
                                    value={selectedData[item.key] || ''} // Usar los datos de selectedData
                                    onChange={(event) => handleTextFieldChangeCar(event, item.key, selectedId)}
                                />

                            </Box>
                        ))
                    ) : (
                        <Typography sx={home.homeTextH4Left} margin={'1rem 0'}
                        ></Typography>
                    )}
                    
                </div>

                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                    <Button size="medium" variant="contained" color="secondary"
                        onClick={() => handleFormSubmitInfo(selectedId)}
                        sx={buttons.registerButton}
                        endIcon={<EditIcon />} >
                        Editar información
                    </Button>                   

                </Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertSuccessNewOpen && (
                        <Alert
                            open={isAlertSuccessNewOpen}
                            severity="success"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            Información actualizada con éxito
                        </Alert>
                    )}
                </Stack>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertErrorNewOpen && (
                        <Alert
                            open={isAlertErrorNewOpen}
                            severity="error"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            La información no se pudo actualizar.
                        </Alert>
                    )}
                </Stack>

              
            </Paper>
            <Modal
                open={isModalAddCarOpen}
                onClose={handleCloseAddCar}
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

                        <Typography margin={'1rem 0'} id="modal-modal-title" sx={home.homeTextH3}>
                            Agregar un nuevo vehículo
                        </Typography>
                        <TextField
                            id="standard-select-currency"
                            select
                            label={<Typography sx={login.textoInput} >Elige una marca  </Typography>}
                            // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                            variant="standard"
                            fullWidth
                            onChange={handleBrandAddCar}
                        >

                            {carsBrands.map((brand, index) => (
                                <MenuItem key={index} value={brand}>
                                    <Typography marginLeft={'20px'} sx={login.textoInput} >{brand}  </Typography>
                                </MenuItem>

                            ))}

                        </TextField>
                        {textFieldCars.map((item, index) => (
                             (
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} key={index}>
                                    <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                    <TextField
                                        id={`input-${item.key}-with-sx`}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Cairo',
                                                    textTransform: 'none',
                                                    fontSize: '16px',
                                                    width: '100%',
                                                    color: item.iconColor,
                                                }}
                                            >
                                                {item.textLabel}
                                            </Typography>
                                        }
                                        variant="standard"
                                        fullWidth

                                        margin="normal"
                                        value={selectedDataAddCar[item.key] || ''}// Usar los datos de selectedData
                                        onChange={(event) => handleTextFieldChange(event, item.key)}
                                    />

                                </Box>
                            )
                        ))}
                      
                        <Box margin={'2rem 0'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                            <Button size="medium" variant="contained" color="secondary"
                                onClick={handleButtonAddCar}
                                sx={buttons.appBarButtonLogin}
                                endIcon={<AddIcon />} >
                                Agregar vehículo
                            </Button>
                        </Box>



                    </div>
                </Box>
            </Modal >
        </ThemeProvider>
    );
}
export default AccessCars;