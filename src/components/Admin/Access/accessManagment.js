import MyFooter from '../../MyComponents/myFooter';
import { Fade } from '@mui/material';
import AppBarDrawer from '../AppBarDrawer';
import React, { useState, useRef, useEffect } from 'react';
import {
  ThemeProvider, TextField, Alert, Grid,
  Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import AccessNews from './accessNews';
import AccessEducation from './accessEducation';
import AccessCars from './accessCars';
import AccessCarsDiaps from './accessCarsDiaps';
import AccesUpload from './accessUpload';
import {
  theme,
  checked,
} from './accessConstants';


function SimulatorLoan() {

  useEffect(() => {
    const userAuth = JSON.parse(window.localStorage.getItem('user'));
    if(!userAuth || userAuth.user_role !== 'admin'){
        window.location.href = '/prohibido';
    }
},[]);
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

              <AccessNews />
              <AccessEducation />
              <AccessCars />
              <AccessCarsDiaps />
              <AccesUpload/>


            </Box>
          </Box>
        </Box>
      </Fade>
      <Box><MyFooter title="Pie de página" /></Box>
    </ThemeProvider>
  );
}
export default SimulatorLoan;