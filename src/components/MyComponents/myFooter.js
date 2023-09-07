import React from 'react';
import {
  Box,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  BottomNavigation,
} from '@mui/material';
import logo from '../../assets/logoFC.png';
import mapa from '../../assets/mapaFC.png';
import footer from '../../styles/components/footer';
import home from '../../styles/pages/home';
import { Grid } from '@mui/material';

function Principal() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#005F8F',
      },
      terciary: {
        main: '#005F8F',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ zIndex: 2, position: 'absolute', width: '100%' }}>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: 'rgba(3, 75, 110, 0.07)',
            height: '400px',
            marginTop: '4rem',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            <Box display="flex" flexDirection={'column'}>
              <Typography variant="subtitle1" sx={home.homeTextH4Left}>
                Contáctanos
              </Typography>
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                marginTop="1rem"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={home.homeTextH4Left}
                >
                  3989400- ext (3260)
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={home.homeTextH4Left}
                >
                  (593)- 0998213636
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={home.homeTextH4Left}
                >
                  fondoespe@espe.edu.ec
                </Button>
              </Box>
              <Typography
                variant="subtitle1"
                marginTop="2rem"
                sx={home.homeTextH4Left}
              >
                Encuentra nuestra ubicación
              </Typography>
              <Box
                display="flex"
                sx={{
                  position: 'relative',
                  alignItems: 'center',
                  width: '100px',
                  height: '200px',
                  margin: '1rem 25%',
                }}
              >
                <img src={mapa} alt="FCESPE mapa" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <BottomNavigation sx={{ backgroundColor: '#00334d', height: '100px' }}>
          <Box
            display="flex"
            alignItems="center"
            style={{ width: '30%', flex: '0 0 30%' }}
          >
            <Box marginLeft={'10%'} display="flex" alignItems="center">
              <img src={logo} className="App-logo2" alt="logo" />
              <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={footer.footerTitleFc}
                >
                  FONDO DE CESANTÍA
                </Typography>
                <Typography
                  variant="h8"
                  noWrap
                  component="a"
                  href="/"
                  sx={footer.footerTitleEspe}
                >
                  UNIVERSIDAD DE LAS FUERZAS ARMADAS
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box style={{ width: '40%', flex: '0 0 40%' }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              textAlign="center"
              marginLeft={'10%'}
              marginRight={'10%'}
            >
              <Typography
                variant="subtitle1"
                sx={footer.footerTextH4}
              >
                Av. General Rumiñahui, Universidad de las Fuerzas Armadas
              </Typography>
            </Box>
          </Box>
          <Box style={{ width: '30%', flex: '0 0 30%' }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              textAlign="center"
              marginLeft={'10%'}
              marginRight={'10%'}
            >
              <Typography
                variant="h6"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                Empresa
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                |
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                Personas
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                |
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                Marcas
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                |
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                Señales
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                |
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="p"
                href="/"
                sx={footer.footerTextH4}
              >
                Cursos
              </Typography>
            </Box>
          </Box>
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

export default Principal;
