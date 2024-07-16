import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider} from '@mui/material/styles';
import buttons from '../../styles/buttons';
import home from '../../styles/pages/home'
import Carousel from 'react-material-ui-carousel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import MyMobileAppBar from '../MyComponents/myMobileAppBar';
import MyFooterMobile from '../MyComponents/myFooterMobile';
import { theme, newImages, style } from './carsConstants';
import CarsBrands from './carsBrands';
import axios from 'axios';

function Home() {

  const [newData, setNewData] = useState([]);
  const newDataRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      obtenerNoticias();
      setNewData(newDataRef.current);
    }, 1000);
  }, []);

  const obtenerNoticias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getCars');

      newDataRef.current = response.data.cars;
      //console.log(newDataRef.current[0]);

    } catch (error) {
      console.error('Error al obtener las noticias', error);
    }
  };

  const handleButtonClick = (href) => {
    // Redirigir a la página deseada con el fragmento de URL
    window.location.href = href;
  };

  return (
    <ThemeProvider theme={theme}>
      {window.innerWidth >= 600 && <div><MyAppBar title="AppBar Component" /></div>}
      {window.innerWidth <= 600 && <div><MyMobileAppBar /></div>}
      <Carousel
        // next={(next, active) => /*console.log(`we left ${active}, and are now at ${next}`)*/}
        // prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        sx={home.carsCarruselPrincipal}
        animation="fade"
        timeout={5000} // Ajusta el valor del timeout a tu preferencia (en milisegundos)
        transitionDuration={50000} // Ajusta el valor del transitionDuration a tu preferencia (en milisegundos)
      >

        {newImages.map((item, index) => {
          const newDataItem = newDataRef.current && newDataRef.current[index];

          return (
            <Box
              key={index}
              sx={{
                position: 'relative',
                textAlign: 'center', // Para centrar el contenido dentro de Box
              }}
            >
              <img src={item.src} alt={item.alt} width={"100%"} height={450} />

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
                    top: '150px',
                    margin: '0',
                  },
                }}
              >
                <Typography variant="body2" sx={home.homeTitleCarruselPrincipal}>
                  {newDataItem ? newDataItem.car_title : ''}
                </Typography>
                <Box alignItems='center' justifyContent={'center'} sx={{ mt: '5%' }}>
                  <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>
                    {newDataItem ? newDataItem.car_content : ''}
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
                    {newDataItem ? newDataItem.car_phrase : ''}
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

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
        sx={{
          margin: '4rem 0 2rem 0',
          '@media screen and (max-width: 600px)': {
            padding: '0 10%',
          },
        }}>
        <Typography variant="body2" sx={home.homeTextH4}>Funcionalidades disponibles</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Prueba las funcionalidades a las que tienes acceso</Typography>
      </Box>


      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20%',
        '@media screen and (max-width: 600px)': {
          margin: '0 8% 3rem 8%',

        },
      }}>

        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem button >
            <Link to="/simulador" style={{ textDecoration: 'none' }}>
              <ListItemText
                primary="Simulador de Préstamos"
                secondary="Prueba nuestro simulador de préstamos para conocer el valor de tus cuotas."
                primaryTypographyProps={home.homeTextH2Left}
                secondaryTypographyProps={home.homeTextH4Left} />
            </Link>
          </ListItem>

          <Divider />
          <ListItem button divider>
            <Link to="/prestamos" style={{ textDecoration: 'none' }}>
              <ListItemText
                primary="Sección de Educación Financiera"
                secondary="Nos preocupamos por tu aprendizaje financiero, por eso te ofrecemos nuestros conocimientos."
                primaryTypographyProps={home.homeTextH2Left}
                secondaryTypographyProps={home.homeTextH4Left} />
            </Link>
          </ListItem>
        </List>

      </Box>

      {window.innerWidth > 600 && <div><MyFooter title="Pie de página" /></div>}
      {window.innerWidth <= 600 && <div><MyFooterMobile /></div>}

    </ThemeProvider >
  );
}

export default Home;