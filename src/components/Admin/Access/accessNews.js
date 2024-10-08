
import React, { useState, useRef, useEffect } from 'react';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import {
    theme,
    textFieldNews,
} from './accessConstants';


function AccessNews() {


    const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
    const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados


    const [newData, setNewData] = useState([]);
    const newDataRef = useRef([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [token, setToken] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        new_id: 1,
        new_title: '',
        new_content: '',
        new_phrase: '',
    });

    useEffect(() => {
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
    }, []);
    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getNews');
                setNewData(response.data.news);
                newDataRef.current = response.data.news; // Guardar en la ref

            } catch (error) {
                console.error('Error al obtener las noticias', error);
            }
        };

        obtenerNoticias();
    }, [token]);

    //Función que actualiza el estado del selectId
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedId(selectedValue);
        console.log('ID seleccionado:', selectedValue);
        // Verifica que newDataRef.current esté definido y tenga elementos
        if (newDataRef.current && newDataRef.current.length > 0) {
            // Encuentra el objeto correspondiente al nuevo ID seleccionado
            const selectedData = newDataRef.current.find((item) => item.new_id === selectedValue);

            // Actualiza el estado de updatedData con los nuevos valores
            setUpdatedData({
                new_id: selectedData.new_id,
                new_title: selectedData.new_title,
                new_content: selectedData.new_content,
                new_phrase: selectedData.new_phrase,
            });
        }
    };

    
    // Actualiza el estado de selectedData cuando se selecciona un nuevo ID 
    useEffect(() => {
        if (selectedId !== undefined) {
            const newDataForSelectedId = newDataRef.current.find(item => item.new_id === selectedId);
            setSelectedData(newDataForSelectedId || {});
        }
    }, [selectedId, newDataRef.current]);


    async function updateNewsOnServer() {
        try {
            const response = await axios.post('http://localhost:3000/api/updateNew', {
                new_id: updatedData.new_id,
                new_title: updatedData.new_title,
                new_content: updatedData.new_content,
                new_phrase: updatedData.new_phrase,
                authorization: token,
            });

            console.log(newDataRef.current[selectedId].new_title, selectedId);
            if (response.data.success) {
                console.log('Noticia actualizada con éxito:', response.data.customer);
                setIsAlertSuccessNewOpen(true);
                setIsAlertErrorNewOpen(false);

            } else {
                console.error('Error al actualizar noticia:', response.data.message);
                setIsAlertErrorNewOpen(true);
                setIsAlertSuccessNewOpen(false);
            }// Puedes manejar la respuesta según tus necesidades
        } catch (error) {
            console.error('Error al actualizar la noticia', error);
            console.error('Error en la noticia:', error);
            setIsAlertErrorNewOpen(true);
            setIsAlertSuccessNewOpen(false);
        }

        //Esperar 5 segundos
        setTimeout(() => {
            // Realizar acciones después de esperar 5 segundos
            setIsAlertErrorNewOpen(false);
            setIsAlertSuccessNewOpen(false);
            setSelectedId(undefined);
        }, 5000);
    }


    // Función que actualiza el estado de los campos de texto
    function handleTextFieldChange(event, key, newId) {
        const newValue = event.target.value;

        // Encuentra el índice del objeto en newDataRef.current con el new_id correspondiente
        const dataIndex = newDataRef.current.findIndex(item => item.new_id === newId);

        // Actualiza solo la propiedad específica en newDataRef.current
        newDataRef.current[dataIndex] = {
            ...newDataRef.current[dataIndex],
            [key]: newValue,
        };

        // Actualiza el estado de selectedData si el ID actual es igual al seleccionado
        if (newId === selectedId) {
            setSelectedData(newDataRef.current[dataIndex]);
        }

        // Marca que los datos han cambiado
        setDataChanged(true);

        setUpdatedData(prevData => ({
            ...prevData,
            [key]: newValue,
        }));
    }


    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Página principal:  Noticias </Typography>
                <TextField
                    id="standard-select-currency"
                    select
                    label={<Typography sx={login.textoInput} >Elige una diapositiva  </Typography>}

                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                >

                    {newDataRef.current && newDataRef.current.map((option) => (
                        <MenuItem key={option.new_id} value={option.new_id}>
                            <Typography marginLeft={'20px'} sx={login.textoInput} > Diapositiva #{option.new_id} </Typography>
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
                        onClick={() => updateNewsOnServer()}
                        sx={buttons.registerButton}
                        endIcon={<EditIcon />}  >
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
                            Noticia actualizada con éxito
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
                            La noticia no se pudo actualizar.
                        </Alert>
                    )}
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}
export default AccessNews;