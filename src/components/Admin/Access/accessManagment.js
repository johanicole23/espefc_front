import MyFooter from '../../MyComponents/myFooter';
import { Fade } from '@mui/material';
import AppBarDrawer from '../AppBarDrawer';
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
  checked,
  textFieldNews,
} from './accessConstants';


function SimulatorLoan() {


  const [isAlertSuccessNewOpen, setIsAlertSuccessNewOpen] = useState(false);
  const [isAlertErrorNewOpen, setIsAlertErrorNewOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(undefined);
  const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados


  const [newData, setNewData] = useState([
    {
      new_id: '1',
      new_title: 'Límite de pagos en efectivo',
      new_content: 'Recuerda que el límite de pagos en efectivo es de $10.000,00. Si deseas realizar un pago mayor a este monto, puedes hacerlo a través de transferencia bancaria o cheque de gerencia. No olvides que puedes realizar tus formularios en línea a través de nuestra página web.',
      new_phrase: 'Acércate a nuestras oficinas',
    },

    {
      new_id: '2',
      new_title: 'Brigada de salud visual',
      new_content: 'Invitamos al personal docente, adminsitrativo y civil de la ESPE a participar los dias 5,16 y 17 de Novimebre de 08:00 a 17:00 horas en el edificio académico.Disponemos lentes de lectura, distancia, bifocales, progresivos, filtro azul, antireflejo y transición. EXAMEN VISUAL GRATIS',
      new_phrase: 'Adquiere tus lentes por 5 centavos diarios',

    },
    {
      new_id: '3',
      new_title: 'Educación financiera',
      new_content: 'Edúcate en nuestro nuevo módulo de educación financiera. Aprende a manejar tus finanzas personales y a realizar tus formularios en línea. Además, conoce los beneficios de nuestros préstamos y los requisitos para acceder a ellos.',
      new_phrase: 'En la sección de préstamos',
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
      const response = await axios.post('http://localhost:3000/api/editNew', {
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
      <AppBarDrawer />
      <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
        <Box>
          <Box display="flex" flexDirection="column"
            sx={{
              position: 'relative',
              maxWidth: '100%',

            }} >
            <Box display={'flex'} alignItems="center" flexDirection={'column'}  >
              <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                  Edición de Accessos
                </Typography>
                <Typography
                  sx={home.homeTextH4Left}
                >Actualización de títulos, cotenidos, pdfs y links de la página.</Typography>
              </Paper>


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

                  {newData.map((option) => (
                    <MenuItem key={option.new_id} value={option.new_id}>
                      Diapositiva #{option.new_id}
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

              <Paper elevation={5} sx={{ padding: '2% 4% ', width: '80%', marginBottom: '2rem' }}>
                <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
                  Cambio de contraseña
                </Typography>
                <Typography
                  sx={home.homeTextH4Left}
                >Si deseas cambiar la contraseña y aumentar la seguridad de la misma, ingresa aquí.</Typography>
                <Button fullWidth variant="outlined" color="secondary" sx={buttons.appBarButtonText}
                  href='/admin-cuenta/configuracion/contrasena'>
                  Editar contraseña
                </Button>
              </Paper>

            </Box>


          </Box>





        </Box>
      </Fade>
      <Box><MyFooter title="Pie de página" /></Box>
    </ThemeProvider>
  );
}
export default SimulatorLoan;