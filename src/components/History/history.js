// Importaciones de bibliotecas y componentes
import React from 'react';
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

// Importaciones de recursos
import home from '../../styles/pages/home';
import history from '../../styles/pages/history';
import login from '../../styles/pages/login';
import buttons from '../../styles/buttons';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
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

  return (
    <ThemeProvider theme={theme} >

      <Box><MyAppBar title="AppBar Component" /></Box>
      <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
        <Box>
          <Paper sx={{
            height: '454px',
            position: 'relative',
            maxWidth: '100%',
            marginTop: '6rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Añade una sombra al perfil

          }}>
            <img src={fcespeP1} alt="Espe imagen" />
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              padding: '1rem',
              marginLeft: '50%',
              marginTop: '18%',
              marginRight: '10%',
            }}>
              <Typography variant="body2" sx={home.homeTextH4}>El Fondo de Cesantía ESPE es una empresa que nace para mejorar la protección social de sus partícipes, mediante el otorgamiento de las prestaciones previstas en el Estatuto y reglamentos vigentes. Su registro se realizó en la Superintendencia de Bancos, de acuerdo con la resolución SBS-2011-914 del 09 noviembre del 2011. </Typography>

            </Box>
          </Paper>

          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ margin: '5rem 0 2rem 0 ' }}>
            <Typography variant="body2" sx={home.homeTextH4}>Como empresa brindamos toda la atención y dirección a nuestros clientes.</Typography>
            <Typography variant="body2" sx={home.homeTextH1}>¿Qué es lo que buscamos?</Typography>
          </Box>

          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Box display="flex" flexDirection={'column'} alignItems="left" sx={{ margin: '0 5%' }} >
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
            <Box display="flex" flexDirection={'column'} alignItems="left" sx={{ margin: '0 5%' }} >
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
          </Box>
          <Grow in={checked} {...(checked ? { timeout: 5000 } : {})}>
            <Paper sx={{
              height: '422px',
              position: 'relative',
              maxWidth: '100%',
              marginTop: '6rem',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Añade una sombra al perfil

            }}>

              <img src={fcespeP2} alt="Espe imagen" />
              <div id="horarios"></div>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  padding: '1rem',
                  marginLeft: '50%',
                  marginTop: '8%',
                  marginRight: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Typography variant="body2" sx={home.homeTitleCarruselPrincipal}>Horarios de Atención</Typography>
                <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>Lunes a Viernes 8:00AM-6:00PM</Typography>
                <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>Feriados 24H correo electrónico</Typography>
              </Box>
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                marginLeft: '50%',
                marginTop: '18%',
                marginRight: '30%',
              }}>
                <Typography variant="body2" sx={home.homeTextH4}>Porque siempre nos preocupa tu bienestar y velamos por brindarte la atención que te mereces, conoce nuestro horario.</Typography>
              </Box>

            </Paper>
          </Grow>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginTop: '5rem ' }}>
            <Typography variant="body2" sx={home.homeTextH1}>Contacta a nuestro personal</Typography>
            <Typography variant="body2" sx={home.homeTextH4}>Para concretar una cita o si requieres más información.</Typography>
          </Box>

          <div id="horarios">
            <Box display="flex" justifyContent="space-evenly" alignItems="center" sx={{ margin: '3rem 0' }}>

              <Box display="flex" justifyContent={"center"} component={"form"} sx={{ width: '50%', flex: '0 0 50%' }}>
                <Paper elevation={5} sx={{ width: '60%', padding: '5%' }}>
                  <Typography variant="body2" sx={home.homeTextH3}>Formulario de Contacto</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: '1%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={1}><BadgeIcon sx={{ color: 'action.active', mt: 5 }} /> </Grid>
                      <Grid item xs={12} md={11}><TextField id="input-with-sx" sx={{ color: 'action.active' }} label={<Typography sx={login.textoInput} >Nombre y Apellido</Typography>} variant="standard" fullWidth margin="normal" /> </Grid>
                      <Grid item xs={12} md={1}><EmailIcon sx={{ color: 'action.active', mt: 5 }} /> </Grid>
                      <Grid item xs={12} md={11}><TextField id="input-with-sx" sx={{ color: 'action.active' }} label={<Typography sx={login.textoInput} >Correo Electrónico</Typography>} variant="standard" fullWidth margin="normal" /> </Grid>
                      <Grid item xs={12} md={1}><LocalPhoneIcon sx={{ color: 'action.active', mt: 5 }} /> </Grid>
                      <Grid item xs={12} md={11}><TextField id="input-with-sx" sx={{ color: 'action.active' }} label={<Typography sx={login.textoInput} >Teléfono Celular</Typography>} variant="standard" fullWidth margin="normal" /> </Grid>
                      <Grid item xs={12} md={1}><MessageIcon sx={{ color: 'action.active', mt: 5 }} /> </Grid>
                      <Grid item xs={12} md={11}><TextField id="input-with-sx" sx={{ color: 'action.active' }} label={<Typography sx={login.textoInput} >Mensaje/Sugerencia</Typography>} variant="standard" fullWidth margin="normal" /> </Grid>

                      <Grid item xs={12} md={12}> <Button variant="contained" alignItems='center' color="secondary" component={Link} to="/login" sx={buttons.appBarButtonLogin}>Enviar</Button> </Grid>
                    </Grid>
                  </Box>

                  <InputLabel></InputLabel>
                </Paper>
              </Box>

              <Box display="flex" justifyContent={"center"} component={"form"} sx={{ width: '50%', flex: '0 0 50%' }}>
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

            </Box>
          </div>
        </Box>
      </Fade>


      <Box><MyFooter title="Pie de página" /></Box>



    </ThemeProvider >
  );
}
export default History;