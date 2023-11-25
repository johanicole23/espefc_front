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
import Carousel from 'react-material-ui-carousel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import MyToolBar from '../MyComponents/myToolBar';
import { theme, newImages, style } from './carsConstants';
import CarsBrands from './carsBrands';

function Home() {

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


  const handleButtonClick = (href) => {
    // Redirigir a la página deseada con el fragmento de URL
    window.location.href = href;
  };

  return (
    <ThemeProvider theme={theme}>
      <div><MyAppBar title="AppBar Component" /></div>
      <Carousel
        next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        sx={home.carsCarruselPrincipal}
        animation="fade"
        timeout={5000} // Ajusta el valor del timeout a tu preferencia (en milisegundos)
        transitionDuration={50000} // Ajusta el valor del transitionDuration a tu preferencia (en milisegundos)
      >

        {newImages.map((item, index) => {
          const newDataItem = newData.find(data => data.new_id === item.key);
          return (
            <Box
              key={index}
              sx={{
                position: 'relative',
                textAlign: 'center', // Para centrar el contenido dentro de Box
              }}
            >
              <img src={item.src} alt={item.alt} />

              <Box
                margin='0 8% 0 60%' // Margen igual a ambos lados
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
                sx={{
                  position: 'absolute',
                  top: '150px',
                  '@media screen and (max-width: 600px)': {
                    position: 'absolute',
                    top: '100px',
                    marginLeft: '1%',
                  },
                }}
              >
                <Typography variant="body2" sx={home.homeTitleCarruselPrincipal}>
                  {newDataItem ? newDataItem.new_title : ''}
                </Typography>
                <Box alignItems='center' justifyContent={'center'} sx={{ mt: '5%' }}>
                  <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>
                    {newDataItem ? newDataItem.new_content : ''}
                  </Typography>
                </Box>
                <Box sx={{ mt: '5%' }}>
                  <Button
                    href={item.href}
                    onClick={() => handleButtonClick(item.href)}
                    variant="contained"
                    color="secondary"
                    sx={buttons.appBarButtonText}
                  >
                    {newDataItem ? newDataItem.new_phrase : ''}
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Carousel>

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ padding: '1rem 0' }}>
        <Typography variant="body2" sx={home.homeTextH4}>Explora nuestros convenios con diferentes marcas</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Toda la información que estabas buscando, aquí. </Typography>
      </Box>

      <CarsBrands />

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ margin: '5rem 0 2rem 0' }}>
        <Typography variant="body2" sx={home.homeTextH4}>Funcionalidades disponibles</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Prueba las funcionalidades a las que tienes acceso para informarte más sobre nosotros</Typography>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20%' }}>

        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem button >
            <Link to="/simulador" style={{ textDecoration: 'none' }}>
              <ListItemText
                primary="Simulador de Préstamos"
                secondary="Prueba nuestro simulador de préstamos prendarios para conocer el valor de tus cuotas."
                primaryTypographyProps={home.homeTextH2Left}
                secondaryTypographyProps={home.homeTextH4Left} />
            </Link>
          </ListItem>

          <Divider />
          <ListItem button divider>
            <Link to="/prestamos" style={{ textDecoration: 'none' }}>
              <ListItemText
                primary="Sección de Educación Financiera"
                secondary="¿Tienes dudas? Nos preocupamos por tu aprendizaje financiero, por eso te ofrecemos nuestros conocimientos."
                primaryTypographyProps={home.homeTextH2Left}
                secondaryTypographyProps={home.homeTextH4Left} />
            </Link>
          </ListItem>
        </List>

      </Box>

      <div><MyFooter title="Pie de página" /></div>

    </ThemeProvider >
  );
}

export default Home;