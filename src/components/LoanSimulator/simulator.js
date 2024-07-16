import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import MyFooter from '../MyComponents/myFooter';
import MyAppBar from '../MyComponents/myAppBar';
import MyMobileAppBar from '../MyComponents/myMobileAppBar';
import MyFooterMobile from '../MyComponents/myFooterMobile';
import { Fade } from '@mui/material';
import LoanSimulator from './loanSimulator';
import home from '../../styles/pages/home';

import {
  theme,
  checked,
} from './loanSimulatorConstants';


function SimulatorLoan() {

  return (
    <ThemeProvider theme={theme} >
      {window.innerWidth > 600 && <div><MyAppBar title="AppBar Component" /></div>}
      {window.innerWidth <= 600 && <div><MyMobileAppBar /></div>}
      <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
        <Box>
          <Box display="flex" flexDirection="column"
            sx={{
              position: 'relative',
              maxWidth: '100%',
              marginTop: '8rem',
              '@media screen and (max-width: 600px)': {
                margin: '8rem 10% 2rem 10%',
              },
            }} >
            <Typography variant="body2" sx={home.homeTextH4}>Prueba diferentes escenarios para familiarizarte con el sistema </Typography>
            <Typography variant="body2" sx={home.homeTextH1}>Simulemos el cálculo de tu préstamo</Typography>
            <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>¿En qué utilizarás tu préstamo? </Typography>
          </Box>

          <LoanSimulator></LoanSimulator>
        </Box>
      </Fade>
      {window.innerWidth > 600 && <div><MyFooter title="Pie de página" /></div>}
      {window.innerWidth <= 600 && <div><MyFooterMobile /></div>}
    </ThemeProvider>
  );
}
export default SimulatorLoan;