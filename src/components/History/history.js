// Importaciones de bibliotecas y componentes
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';
import { Box, Typography, Button } from '@mui/material';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Grow } from '@mui/material';
import { InputLabel } from '@material-ui/core';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';

import axios from 'axios';
// Importaciones de recursos
import home from '../../styles/pages/home';
import history from '../../styles/pages/history';
import login from '../../styles/pages/login';
import buttons from '../../styles/buttons';
import MyAppBar from '../MyComponents/myAppBar';
import MyMobileAppBar from '../MyComponents/myMobileAppBar';
import MyFooter from '../MyComponents/myFooter';
import MyFooterMobile from '../MyComponents/myFooterMobile';
import {
  fcespeP1,
  fcespeP2,
  rows,
  theme,
  cardMisionVision,
  cardFinality,
  checked
} from './historyConstants';

// Otras importaciones
import TextField from '@mui/material/TextField';

function History() {
  const [suggestion, setSuggestion] = useState({
    name: '',
    mail: '',
    cellphone: '',
    message: '',
  });

  const handleInputChange = (field) => (event) => {
    setSuggestion({
      ...suggestion,
      [field]: event.target.value,
    });
  };

  const enviarSugerencia = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/sendSuggestion', { suggestion });
      console.log(response.data);
      // Manejar la respuesta del servidor según tus necesidades en el cliente
    } catch (error) {
      console.error('Error al enviar la sugerencia:', error);
      // Manejar el error según tus necesidades en el cliente
    }
  };
  return (
    <ThemeProvider theme={theme} >

      {window.innerWidth > 600 && <div><MyAppBar title="AppBar Component" /></div>}
      {window.innerWidth <= 600 && <div><MyMobileAppBar /></div>}
      <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
        <Box>
          <Paper sx={{
            height: '454px',
            position: 'relative',
            maxWidth: '100%',
            marginTop: '6rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            '@media screen and (max-width: 599px)': {
              marginTop: '5rem',
              height: '370px',
              '& img': {
                width: '100%',
                height: '100px',
                marginTop: '1rem'

              },
            },

          }}>
            <img src={fcespeP1} alt="Espe imagen" width={"100%"} height={450} />
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              padding: '1rem',
              margin: '18% 10% 0 50%',
              '@media screen and (max-width: 599px)': {
                margin: '150px 10% 0 10%',
                padding: '0',
              },

            }}>
              <Typography variant="body2" sx={home.homeTextH4}>El Fondo de Cesantía ESPE es una empresa que nace para mejorar la protección social de sus partícipes, mediante el otorgamiento de las prestaciones previstas en el Estatuto y reglamentos vigentes. Su registro se realizó en la Superintendencia de Bancos, de acuerdo con la resolución SBS-2011-914 del 09 noviembre del 2011. </Typography>

            </Box>
          </Paper>

          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
            sx={{
              margin: '5rem 0 2rem 0 ',
              '@media screen and (max-width: 600px)': {
                padding: '0 10%',

              },
            }}>
            <Typography variant="body2" sx={home.homeTextH4}>Como empresa brindamos toda la atención y dirección a nuestros clientes.</Typography>
            <Typography variant="body2" sx={home.homeTextH1}>¿Qué es lo que buscamos?</Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <Box display="flex" flexDirection={'column'} sx={{
                  margin: '0 20%',
                  '@media screen and (max-width: 600px)': {
                    margin: '0 10%',
                  },

                }} >
                  {cardMisionVision.map((item) => (
                    <Card sx={home.homeFormatCardLoan}>
                      <CardActionArea>
                        <CardMedia
                          sx={home.homeCardLoanLogo} image={item.image} alt="Descripción de la imagen" />
                        <CardContent >
                          <Box display="flex" flexDirection={'column'} >
                            <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                            <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>

                    </Card>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Box display="flex" flexDirection={'column'} alignItems="left" sx={{
                  margin: '0 10%',
                  '@media screen and (max-width: 600px)': {
                    margin: '0 10%',
                  },

                }}  >
                  {cardFinality.map((item) => (
                    <Card sx={history.historyFormatCardFinality}>
                      <CardActionArea>
                        <CardMedia
                          sx={history.historyCardLogo} image={item.image} alt="Descripción de la imagen" />
                        <CardContent >
                          <Box display="flex" flexDirection={'column'} sx={{ padding: '1rem' }} >
                            <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                            <Typography variant="body2" sx={home.homeTextH4}>{item.descriptionP1}</Typography>

                          </Box>
                        </CardContent>
                      </CardActionArea>

                    </Card>
                  ))}
                </Box>
              </Grid>

            </Grid>

          </Box>
          <Grow in={checked} {...(checked ? { timeout: 5000 } : {})}>
            <Paper sx={{
              height: '422px',
              position: 'relative',
              maxWidth: '100%',
              marginTop: '6rem',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Añade una sombra al perfil
              '@media screen and (max-width: 599px)': {
                marginTop: '5rem',
                height: '350px',
                '& img': {
                  width: '100%',
                  height: '100px',

                },
              },
            }}>

              <img src={fcespeP2} alt="Espe imagen" width={"100%"} height={430} />
              <div id="horarios"></div>
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  padding: '1rem',
                  margin: '10% 25% 0 45%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  '@media screen and (max-width: 599px)': {
                    margin: '120px 10% 0 10%',
                  },
                }}>
                <Typography variant="body2" sx={home.homeTitleCarruselPrincipal}>Horarios de Atención</Typography>
                <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>Lunes a Viernes 8H00-16H30</Typography>
                <Typography variant="body2" sx={home.homeTextH4}>Porque siempre nos preocupa tu bienestar y velamos por brindarte la atención que te mereces, conoce nuestro horario.</Typography>
              </Box>


            </Paper>
          </Grow>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ margin: '5rem 10%' }}>
            <Typography variant="body2" sx={home.homeTextH1}>Contacta a nuestro personal</Typography>
            <Typography variant="body2" sx={home.homeTextH4}>Para concretar una cita o si requieres más información.</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent={"center"} component={"form"} >
                <Paper elevation={5} sx={{
                  width: '60%', padding: '5%',
                  '@media screen and (max-width: 599px)': {
                    width: '70%',
                  },
                }}>
                  <Typography variant="body2" sx={home.homeTextH3}>Formulario de Sugerencias</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: '1%' }}>
                    <Grid container spacing={2}>
                      <Grid item md={1}>
                        <BadgeIcon sx={{ color: 'action.active', mt: 5 }} />
                      </Grid>
                      <Grid item md={11}>
                        <TextField
                          id="nombre"
                          sx={{ color: 'action.active' }}
                          label={<Typography sx={login.textoInput}>Nombre y Apellido</Typography>}
                          variant="standard"
                          fullWidth
                          margin="normal"
                          onChange={handleInputChange('name')}
                        />
                      </Grid>
                      <Grid item md={1}>
                        <EmailIcon sx={{ color: 'action.active', mt: 5 }} />
                      </Grid>
                      <Grid item md={11}>
                        <TextField
                          id="correo"
                          sx={{ color: 'action.active' }}
                          label={<Typography sx={login.textoInput}>Correo Electrónico</Typography>}
                          variant="standard"
                          fullWidth
                          margin="normal"
                          onChange={handleInputChange('mail')}
                        />
                      </Grid>
                      <Grid item md={1}>
                        <LocalPhoneIcon sx={{ color: 'action.active', mt: 5 }} />
                      </Grid>
                      <Grid item md={11}>
                        <TextField
                          id="telefono"
                          sx={{ color: 'action.active' }}
                          label={<Typography sx={login.textoInput}>Teléfono Celular</Typography>}
                          variant="standard"
                          fullWidth
                          margin="normal"
                          onChange={handleInputChange('cellphone')}
                        />
                      </Grid>
                      <Grid item md={1}>
                        <MessageIcon sx={{ color: 'action.active', mt: 5 }} />
                      </Grid>
                      <Grid item md={11}>
                        <TextField
                          id="mensaje"
                          sx={{ color: 'action.active' }}
                          label={<Typography sx={login.textoInput}>Mensaje/Sugerencia</Typography>}
                          variant="standard"
                          fullWidth
                          margin="normal"
                          onChange={handleInputChange('message')}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Button
                          variant="contained"
                          alignItems="center"
                          color="secondary"
                          component={Link}
                          sx={buttons.appBarButtonLogin}
                          onClick={enviarSugerencia}
                        >
                          Enviar
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  <InputLabel></InputLabel>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent={"center"} component={"form"} marginBottom={'3rem'} sx={{
                '@media screen and (max-width: 599px)': {
                  width: '100%',
                },
              }}>
                <TableContainer sx={{ width: '80%' }} component={Paper}>
                  <Table sx={{ minWidth: ' 40%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={home.homeTextH3}>Personal</TableCell>
                        <TableCell sx={home.homeTextH3} align="right">Teléfono Celular</TableCell>
                        <TableCell sx={home.homeTextH3} align="right">Correo electrónico</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: '#C9EDFF' } // Cambia el color de fondo al pasar el cursor
                          }}
                        >
                          <TableCell component="th" scope="row" sx={home.homeTextH4}>
                            {row.name}
                          </TableCell>
                          <TableCell sx={home.homeTextH4} align="right">{row.phone}</TableCell>
                          <TableCell sx={home.homeTextH4} align="right">{row.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Fade>

      {window.innerWidth > 600 && <div><MyFooter title="Pie de página" /></div>}
      {window.innerWidth <= 600 && <div><MyFooterMobile /></div>}


    </ThemeProvider >
  );
}
export default History;