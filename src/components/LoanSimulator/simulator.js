import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import MyFooter from '../MyComponents/myFooter';
import MyAppBar from '../MyComponents/myAppBar';
import { Fade } from '@mui/material';
import LoanSimulator from './loanSimulator';
import home from '../../styles/pages/home';

import {
    theme,
    checked,    
} from './loanSimulatorConstants';


function SimulatorLoan() {
 


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme} >
      <Box><MyAppBar title="AppBar Component" /></Box>
      <Fade in={checked} {...(checked ? { timeout: 2000 } : {})}>
        <Box>
          <Box display="flex" flexDirection="column"
            sx={{
              position: 'relative',
              maxWidth: '100%',
              marginTop: '8rem'
            }} >
            <Typography variant="body2" sx={home.homeTextH4}>Prueba diferentes escenarios para familiarizarte con el sistema </Typography>
            <Typography variant="body2" sx={home.homeTextH1}>Simulemos el cálculo de tu préstamo</Typography>
            <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>¿En qué utilizarás tu préstamo? </Typography>
          </Box>
          
          <LoanSimulator></LoanSimulator>
        </Box>
      </Fade>
      <Box><MyFooter title="Pie de página" /></Box>
    </ThemeProvider>
  );
}
export default SimulatorLoan;