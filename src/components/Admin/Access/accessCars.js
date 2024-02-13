
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
    const [isAlertSuccessAddOpen, setIsAlertSuccessAddOpen] = useState(false);
    const [isAlertErrorAddOpen, setIsAlertErrorAddOpen] = useState(false);
    const [isModalAddCarOpen, setIsModalAddCarOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados
    const [selectedIdBrand, setSelectedIdBrand] = useState(undefined);
    const [selectedIdBrandAddCar, setSelectedIdBrandAddCar] = useState(undefined);
    const [filteredCars, setFilteredCars] = useState([]);
    const [token, setToken] = useState(null);

    const [selectedDataAddCar, setSelectedDataAddCar] = useState({

        car_videoId: '',
        car_video_name: '',
        car_video_year: '',
        car_video_km: '',
        car_video_price: '',
        car_video_href: '',
        car_video_brand: selectedIdBrandAddCar
    });


    const [carsData, setCarsData] = useState([]);

    //Función que actualiza el estado del selectId
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedId(selectedValue);
        console.log('ID seleccionado:', selectedValue);
    };

    //Función que actualiza el estado del selectIdBrand
    const handleChangeBrand = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdBrand(selectedValue);
        console.log('ID de marca seleccionado:', selectedValue);

        const filteredCars = carsData.filter(car => car.car_video_brand.trim().toLowerCase() === selectedValue.trim().toLowerCase());
        console.log('Objetos filtrados:', filteredCars);
        setFilteredCars(filteredCars)
    };

    //Función que actualiza el estado del selectIdBrandAddCar
    const handleBrandAddCar = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdBrandAddCar(selectedValue);
        console.log('ID de marca seleccionado:', selectedValue);
        const updatedSelectedDataAddCar = { ...selectedDataAddCar };
        updatedSelectedDataAddCar.car_video_brand = selectedValue;
        setSelectedDataAddCar(updatedSelectedDataAddCar);

    };

    useEffect(() => {
        
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
    }, []);
    
    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getCarVideos', { authorization: token });
                setCarsData(response.data.car_videos);
                console.log(response.data.car_videos);// Guardar en la ref

            } catch (error) {
                console.error('Error al obtener vehículos', error);
            }
        };

        getCars();
    }, [token]);

    //Función del modal para agregar un nuevo vehículo
    async function handleButtonAddCar() {

        try {
            // Datos del carro para enviar al servidor

            // Realizar la solicitud al servidor
            const response = await axios.post('http://localhost:3000/api/createCarVideo', {
                car_videoId: selectedDataAddCar.car_videoId,
                car_video_name: selectedDataAddCar.car_video_name,
                car_video_year: selectedDataAddCar.car_video_year,
                car_video_km: selectedDataAddCar.car_video_km,
                car_video_price: selectedDataAddCar.car_video_price,
                car_video_href: selectedDataAddCar.car_video_href,
                car_video_brand: selectedDataAddCar.car_video_brand,
                authorization: token
            });

            // Manejar la respuesta del servidor
            console.log('Objeto creado.', response.data, selectedDataAddCar);
            setIsAlertErrorAddOpen(false);
            setIsAlertSuccessAddOpen(true);

        } catch (error) {
            console.error(error);
            setIsAlertErrorAddOpen(true);
            setIsAlertSuccessAddOpen(false);

        }
        setTimeout(() => {
            // Realizar acciones después de esperar 5 segundos
            setIsAlertErrorAddOpen(false);
            setIsAlertSuccessAddOpen(false);
        }, 5000);
    }



    // Actualiza el estado de selectedData cuando se selecciona un nuevo ID 
    useEffect(() => {
        if (selectedId !== undefined) {
            const carsDataForSelectedId = filteredCars.find(item => item.car_video_name === selectedId);
            setSelectedData(carsDataForSelectedId || {});
            console.log('Objeto selectedData:', selectedData);
        }
    }, [selectedId, filteredCars]);

    // Función que envía los datos de noticia editados al backend
    const handleFormSubmitInfo = async (selectedId) => {
        //e.preventDefault();
       console.log('ID seleccionado:', selectedId);
       console.log('selectedData videoId:', selectedData.car_videoId);
        try {
           const response = await axios.post('http://localhost:3000/api/updateCarVideo', {
                car_video_id: selectedData.car_video_id,
                car_videoId: selectedData.car_videoId,
                car_video_name: selectedData.car_video_name,
                car_video_year: selectedData.car_video_year,
                car_video_km: selectedData.car_video_km,
                car_video_price: selectedData.car_video_price,
                car_video_href: selectedData.car_video_href,
                car_video_brand: selectedData.car_video_brand,
                authorization: token
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
        //Esperar 5 segundos
        setTimeout(() => {
            // Realizar acciones después de esperar 5 segundos
            setIsAlertErrorNewOpen(false);
            setIsAlertSuccessNewOpen(false);
            setSelectedId (undefined);
        }, 5000);

    };


    //Función que actualiza el estado de los campos de texto
    function handleTextFieldChangeCar(event, key, car_name) {

        const newValue = event.target.value;

        // Encuentra el índice del objeto en newData con el new_id correspondiente
        const dataIndex = filteredCars.findIndex(item => item.car_video_name === car_name);

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
        setIsAlertErrorAddOpen(false);
        setIsAlertSuccessAddOpen(false);

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
                                <MenuItem key={car.car_video_id} value={car.car_video_name}>
                                    <Typography marginLeft={'20px'} sx={login.textoInput} >{car.car_video_name} </Typography>
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
                                    value={selectedData[item.key] !== 0 ? selectedData[item.key] || '' : '0'}  // Usar los datos de selectedData
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

                        <Box marginTop={'2rem'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                            <Button size="medium" variant="contained" color="secondary"
                                onClick={handleButtonAddCar}
                                sx={buttons.appBarButtonLogin}
                                endIcon={<AddIcon />} >
                                Agregar vehículo
                            </Button>
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertSuccessAddOpen && (
                                <Alert
                                    open={isAlertSuccessAddOpen}
                                    severity="success"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Vehículo agregado con éxito
                                </Alert>
                            )}
                        </Stack>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertErrorAddOpen && (
                                <Alert
                                    open={isAlertErrorAddOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    No se pudo agregar el vehículo.
                                </Alert>
                            )}
                        </Stack>




                    </div>
                </Box>
            </Modal >
        </ThemeProvider>
    );
}
export default AccessCars;