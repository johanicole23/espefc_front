import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    ThemeProvider,
    createTheme,
    Paper,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '../../assets/logoFC.png';
import appbar from '../../styles/components/appbar';
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

const menu = [
    {
        title: 'Historia',
        href: '/historia',
    },
    {
        title: 'Préstamos',
        href: '/prestamos',
    },
    {
        title: 'Simulador',
        href: '/simulador',
    },
    {
        title: 'Vehículos',
        href: '/vehiculos',
    }
];


const MobileAppBar = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionToggle = () => {
        setExpanded(!expanded);
    };

    const handleMenuIconClick = (event) => {
        // Detén la propagación del evento para evitar que se propague al AccordionSummary
        event.stopPropagation();

        // Abre o cierra el Accordion
        handleAccordionToggle();
    };

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
                    <Box sx={{ width: '60%' }}>
                        <Box
                            display="flex"
                            marginLeft={'75%'}
                            onClick={handleMenuIconClick}                       >
                            <IconButton color="secondary" aria-label="menu">
                                <MenuIcon marginLeft="95%" />
                            </IconButton>
                        </Box>
                        
                    </Box>



                </Toolbar>
            </AppBar>
            <Box display="flex" alignItems="center" width="100%">
                <Accordion sx={{
                    flex: '0 0 100%',
                    maxWidth: '100%',
                    marginTop: 12.5,

                }} expanded={expanded}>

                    <AccordionDetails onClick={handleAccordionToggle}>
                        {menu.map((item) => (
                            <Box key={item.title} sx={{ mt: '2%' }}>
                                <Button fullWidth href={item.href} variant="contained" color="primary" sx={buttons.appBarMobileText}>{item.title}</Button>
                            </Box>
                        ))}
                        <Box  display="flex" sx={{ mt: '2%' }}>
                            <Button fullWidth  href={'/login'}  variant="contained" color="secondary" sx={buttons.appBarButtonText}>Acceder </Button>
                        </Box>


                    </AccordionDetails>
                </Accordion>
            </Box>
        </ThemeProvider >
    );
};

export default MobileAppBar;
