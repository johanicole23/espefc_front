
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
import styled from '@emotion/styled';

import axios from 'axios';
import {
    theme,
    textFieldEducation,
} from './accessConstants';


function AccessEducation() {


    const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
    const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);
    const [isAlertSuccessPDFOpen, setIsAlertSuccessPDFOpen] = useState(false);
    const [isAlertErrorPDFOpen, setIsAlertErrorPDFOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados




    const [educationData, setEducationData] = useState([
        {
            education_id: '1',
            education_videoId: 'dQw4w9WgXcQ',
            education_titlePdf: '¿Qué es el Fondo de Cesantía?',
            education_pdf: 'Documento_1_Fondo_Concepto',
        },
        {
            education_id: '2',
            education_videoId: '9bZkp7q19f0',
            education_titlePdf: 'Educación Financiera: Modulo 1',
            education_pdf: 'Educacion_financiera_1',
        },


    ]);

    //Función que actualiza el estado del selectId
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setFileData({ name: '', type: '', size: 0 });
        setSelectedId(selectedValue);
        console.log('ID seleccionado:', selectedValue);
    };


    // Actualiza el estado de selectedData cuando se selecciona un nuevo ID 
    useEffect(() => {
        if (selectedId !== undefined) {
            const educationDataForSelectedId = educationData.find(item => item.education_id === selectedId);
            setSelectedData(educationDataForSelectedId || {});
        }
    }, [selectedId, educationData]);

    // Función que envía los datos de noticia editados al backend
    const handleFormSubmitInfo = async (selectedId) => {
        //e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/editEducation', {
                education_id: selectedId,
                education_videoId: educationData[selectedId].education_videoId,
                education_titlePdf: educationData[selectedId].education_titlePdf,
                education_pdf: educationData[selectedId].education_pdf,
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
                education_videoId: educationData[selectedId].education_videoId,
                education_titlePdf: educationData[selectedId].education_titlePdf,
                education_pdf: educationData[selectedId].education_pdf,
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
    function handleTextFieldChange(event, key, education_id) {

        const newValue = event.target.value;

        // Encuentra el índice del objeto en newData con el new_id correspondiente
        const dataIndex = educationData.findIndex(item => item.education_id === education_id);

        // Actualiza solo la propiedad específica en educationData
        setEducationData(prevData => {
            const updatedData = [...prevData];
            updatedData[dataIndex] = {
                ...updatedData[dataIndex],
                [key]: newValue,
            };
            return updatedData;
        });
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


    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Página de préstamos: Educación Financiera </Typography>
                <TextField
                    id="standard-select-currency"
                    select
                    label={<Typography sx={login.textoInput} >Elige un video  </Typography>}

                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                >

                    {educationData.map((option) => (
                        <MenuItem key={option.education_id} value={option.education_id}>
                            Video Educacional #{option.education_id}
                        </MenuItem>
                    ))}

                </TextField>

                <div>
                    {selectedId !== undefined ? (
                        textFieldEducation.map((item, index) => (
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
                                    disabled={item.disabled}
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
                    {selectedId !== undefined && (
                        <div>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={buttons.adminUploadPdf}
                                    component="label"
                                    startIcon={<CloudUploadIcon />}>
                                    Cargar un pdf diferente
                                    <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event, selectedId)} />
                                </Button>
                                <div><Typography sx={home.homeTextH4}
                                >Archivo seleccionado: {fileData.name}</Typography> </div>
                            </Box>
                        </div>
                    )}
                </div>


                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                    <Button size="medium" variant="contained" color="secondary"
                        onClick={() => handleFormSubmitInfo(selectedId)}
                        sx={buttons.appBarButtonLogin} >
                        Editar información
                    </Button>
                    <Button size="medium" variant="contained" color="terciary"
                        onClick={() => handleFormSubmitPDF(selectedId)}
                        sx={buttons.appBarButtonRegister} >
                        Editar PDF
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

                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertSuccessPDFOpen && (
                        <Alert
                            open={isAlertSuccessPDFOpen}
                            severity="success"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                           PDF actualizado con éxito
                        </Alert>
                    )}
                </Stack>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertErrorPDFOpen && (
                        <Alert
                            open={isAlertErrorPDFOpen}
                            severity="error"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            El PDF no se pudo actualizar.
                        </Alert>
                    )}
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}
export default AccessEducation;