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

        <Box display="flex" flexDirection={'column'} margin={'0 10%  '}>
          <Typography variant="subtitle1" sx={home.homeTextH4Left}>
            Contáctanos
          </Typography>

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
            
            }}
          >
            <img src={mapa} alt="FCESPE mapa" />
          </Box>
        </Box>


        <BottomNavigation sx={{ backgroundColor: '#00334d', height: '100px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={'flex-start'}
            marginRight={'30%'}
          >
            <Box  display="flex" alignItems="center">
              <img src={logo} className="App-logo2" alt="logo" />
              <Box display="flex" flexDirection="column" marginLeft={'3%'}>
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
          
          
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

export default Principal;
