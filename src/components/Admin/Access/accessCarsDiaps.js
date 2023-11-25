
import React, { useState, useRef, useEffect } from 'react';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';
import {
    theme,
    textFieldNews,
} from './accessConstants';


function AccessCarsDiaps() {


    const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
    const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados


    const [newData, setNewData] = useState([
        {
            new_id: '1',
            new_title: '¡Convierte tu auto en efectivo!',
            new_content: 'Tu vehículo puede actuar como garantía o "prenda" para el préstamo. ¡El 80% del financiamiento a cargo de la concesionaria y el 20% a cargo de nosotros!',
            new_phrase: 'Pide tu préstamo ahora',
          },
      
          {
            new_id: '2',
            new_title: 'Perfecciona tu suscripción',
            new_content: ' Deja que tus sueños tomen el volante, mientras nosotros te guiamos hacia un futuro más próspero. Descubre el poder de conducir tus aspiraciones con confianza. ¡Bienvenido al camino del éxito financiero!',
            new_phrase: 'Prueba nuestros préstamos prendarios',
      
          },
          {
            new_id: '3',
            new_title: 'Préstamos Prendarios',
            new_content: 'Conducimos tus sueños hacia la realidad. Nuestros préstamos prendarios te brindan el impulso económico que necesitas para avanzar. Con cada giro de llave, transformamos el valor de tu vehículo en una llave hacia nuevas oportunidades financieras. ',
            new_phrase: '¡Transforma tu vehículo en seguridad financiera! ',
          },
    ]);

    //Función que actualiza el estado del selectId
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedId(selectedValue);
        console.log('ID seleccionado:', selectedValue);
    };


    // Actualiza el estado de selectedData cuando se selecciona un nuevo ID 
    useEffect(() => {
        if (selectedId !== undefined) {
            const newDataForSelectedId = newData.find(item => item.new_id === selectedId);
            setSelectedData(newDataForSelectedId || {});
        }
    }, [selectedId, newData]);

    // Función que envía los datos de noticia editados al backend
    const handleFormSubmitNews = async (selectedId) => {
        //e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/editDiapCar', {
                new_id: selectedId,
                new_title: newData[selectedId].new_title,
                new_content: newData[selectedId].new_content,
                new_phrase: newData[selectedId].new_phrase,
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


    //Función que actualiza el estado de los campos de texto
    function handleTextFieldChange(event, key, newId) {

        const newValue = event.target.value;

        // Encuentra el índice del objeto en newData con el new_id correspondiente
        const dataIndex = newData.findIndex(item => item.new_id === newId);

        // Actualiza solo la propiedad específica en newData
        setNewData(prevData => {
            const updatedData = [...prevData];
            updatedData[dataIndex] = {
                ...updatedData[dataIndex],
                [key]: newValue,
            };
            return updatedData;
        });
    }

    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Página de vehículos: Diapositivas </Typography>
                <TextField
                    id="standard-select-currency"
                    select
                    label={<Typography sx={login.textoInput} >Elige una diapositiva  </Typography>}

                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                >

                    {newData.map((option) => (
                        <MenuItem key={option.new_id} value={option.new_id}>
                           <Typography marginLeft={'20px'}  sx={login.textoInput} > Diapositiva #{option.new_id} </Typography> 
                        </MenuItem>
                    ))}

                </TextField>

                <div>
                    {selectedId !== undefined ? (
                        textFieldNews.map((item, index) => (
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
                                    multiline={index === 1}
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    value={selectedData[item.key] || ''} // Usar los datos de selectedData
                                    onChange={(event) => handleTextFieldChange(event, item.key, selectedId)}
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography sx={home.homeTextH4Left} margin={'1rem 0'}
                        >Por favor, selecciona una opción para cargar los datos.</Typography>
                    )}
                </div>


                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                    <Button size="medium" variant="contained" color="secondary"
                        onClick={() => handleFormSubmitNews(selectedId)}
                        sx={buttons.registerButton} >
                        Editar Noticia
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
                            Diapositiva actualizada con éxito
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
                            La diapositiva no se pudo actualizar.
                        </Alert>
                    )}
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}
export default AccessCarsDiaps;