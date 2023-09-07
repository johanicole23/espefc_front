import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import logo from '../../assets/logoFC.png';
import  appbar from '../../styles/components/appbar';
import buttons from '../../styles/buttons';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#005F8F',
    },
    tertiary: {
      main: '#b0d626',
    },
  },
});

function Principal() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" sx={{ zIndex: 2 }}>
        <Toolbar disableGutters sx={{ height: '4rem', padding: '1rem' }}>
          <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%' }}>
            <Box sx={appbar.appBarTitleFormat}>
              <img src={logo} className="App-logo" alt="logo" />
              <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                <Typography variant="h6" noWrap component={Link} to="/" sx={appbar.appBarTitleFc}>
                  FONDO DE CESANTÍA
                </Typography>
                <Typography variant="h8" noWrap component={Link} to="/" sx={appbar.appBarTitleEspe}>
                  UNIVERSIDAD DE LAS FUERZAS ARMADAS
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '30%', flex: '0 0 30%' }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              textAlign="center"
              marginRight={'2rem'}
              marginLeft={'5%'}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Typography
                variant="caption"
                component={Link}
                to="/historia"
                sx={appbar.appBarSubtitle}
              >
                Historia
              </Typography>
              <Typography
                variant="caption"
                component={Link}
                to="/prestamos"
                sx={appbar.appBarSubtitle}
              >
                Préstamos
              </Typography>
              <Typography
                variant="caption"
                component={Link}
                to="/simulador"
                sx={appbar.appBarSubtitle}
              >
                Simulador
              </Typography>
              <Typography
                variant="caption"
                component={Link}
                to="/noticias"
                sx={appbar.appBarSubtitle}
              >
                Noticias
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '40%', flex: '0 0 40%' }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              textAlign="center"
              marginLeft={'10%'}
              marginRight={'10%'}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                variant="contained"
                color="tertiary"
                component={Link}
                to="/registro"
                sx={buttons.appBarButtonRegister}
              >
                Afíliate ahora
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
                sx={buttons.appBarButtonLogin}
              >
                Acceso clientes
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Principal;
