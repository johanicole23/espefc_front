import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import MyFooter from '../../MyComponents/myFooter';
import MyAppBar from '../../MyComponents/myAppBar';
import { Fade } from '@mui/material';

import LoanHistory from './clientHistory';
import AppBarDrawer from '../AppBarDrawer';
import home from '../../../styles/pages/home';

import {
  theme,
  checked,
} from './clientConstants';


function SimulatorLoan() {



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <Typography variant="body2" sx={home.homeTextH4}>Todos las cuentas de usuario aprobadas se encuentran aquí </Typography>

            <LoanHistory></LoanHistory>
            
          </Box>

         



        </Box>
      </Fade>
      <Box><MyFooter title="Pie de página" /></Box>
    </ThemeProvider>
  );
}
export default SimulatorLoan;