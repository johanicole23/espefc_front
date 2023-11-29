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
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import { images, imagesCel, cardLoan, cards, imagesNews, newImages, carImages, loanCards, style } from './homeConstants';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF'

      },
      secondary: {
        main: '#005F8F'
      },
      terciary: {
        main: '#005F8F'

      },
    },
  });

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
      const response = await axios.get('http://localhost:3000/api/getNews');
      setNewData(response.data.news);
      newDataRef.current = response.data.news; // Guardar en la ref

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
      <div><MyAppBar title="AppBar Component" /></div>
      <Carousel
        next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        sx={home.homeCarruselPrincipal}

        animation="fade"
        timeout={5000} // Ajusta el valor del timeout a tu preferencia (en milisegundos)
        transitionDuration={50000} // Ajusta el valor del transitionDuration a tu preferencia (en milisegundos)
      >
        {images.map((item) => (
          < Box sx={{ position: 'relative' }}>
            <img src={item.src} alt={item.alt} />

            <Box sx={{
              position: 'absolute', top: '100px', left: '20%', '@media screen and (max-width: 600px)': {
                position: 'absolute', top: '100px', marginLeft: '1%',
              },
            }}>
              <Typography variant="body2" sx={home.homeTitleCarruselPrincipal}>{item.titulo}</Typography>
              <Box sx={{ mt: '2%' }}>
                <Typography variant="body2" sx={home.homeSubtitleCarruselPrincipal}>{item.subtitulo}</Typography>
              </Box>
              <Box sx={{ mt: '5%' }}>
                <Button href={item.href} onClick={() => handleButtonClick(item.href)} variant="contained" color="secondary" sx={buttons.appBarButtonText}>{item.boton} </Button>
              </Box>

            </Box>
          </Box>
        ))}
      </Carousel>
      <Carousel
        next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        sx={home.homeCarruselPrincipalPetit}
        animation="slide">
        {imagesCel.map((item) => (
          <div style={{ position: 'relative' }}>
            <img src={item.src} alt={item.alt} />

          </div>
        ))}
      </Carousel>


      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ padding: '1rem 0' }}>
        <Typography variant="body2" sx={home.homeTextH4}>Soluciones desde donde tú quieras</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Todo lo que necesitas sin salir de casa.</Typography>
      </Box>


      <Box display="flex" justifyContent="space-evenly" alignItems="center" sx={{ margin: '0 15%' }} >
        {cardLoan.map((item) => (
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
            <CardActions >
              <Box marginLeft="90px" >
                <Button size="small" variant="outlined" color="secondary" sx={buttons.appBarButtonText} href="/prestamos">
                  Más Información
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>


      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginTop: '5rem ' }}>
        <Typography variant="body2" sx={home.homeTextH4}>Noticias</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Revisa las novedades y descuentos disponibles.</Typography>
      </Box>


      <Carousel
        next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
        sx={home.homeCarruselNews}
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
              <img src={item.src} alt={item.alt} />

              <Box
                margin='0 20%' // Margen igual a ambos lados
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


      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginTop: '5rem ' }}>
        <Typography variant="body2" sx={home.homeTextH1}>Conoce los convenios disponibles con diferentes marcas las novedades y descuentos disponibles.</Typography>
      </Box>

      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>

        <Carousel
          next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
          prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)} slidesToShow={2} slidesToScroll={1}
          sx={{ ...home.homeCarruselNews, margin: '0 25%' }}>

          {
            cards.map((item) =>
              <Box display="flex" alignItems="center" >
                <Card sx={home.homeFormatCardCars}>
                  <CardMedia
                    sx={home.homeLogoTrademark} image={item.image} alt="Descripción de la imagen" />
                  <CardContent >
                    <Box display="flex" >
                      <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>)
          }
        </Carousel>

      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ margin: '1rem 0 2rem 0' }}>
        <Typography variant="body2" sx={home.homeTextH4}>Funcionalidades disponibles</Typography>
        <Typography variant="body2" sx={home.homeTextH1}>Prueba las funcionalidades a las que tienes acceso</Typography>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20%' }}>

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

      <div><MyFooter title="Pie de página" /></div>

    </ThemeProvider >
  );
}

export default Home;