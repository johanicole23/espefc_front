import React from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    ThemeProvider,
    createTheme,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logoFC.png';
import appbar from '../../styles/components/appbar';




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
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                                                >
                            <IconButton   onClick={handleOpenNavMenu}   color="secondary" aria-label="menu">
                                <MenuIcon marginLeft="95%" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {menu.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Typography
                                            component={Link}
                                            to={page.href}
                                            sx={appbar.appBarSubtitle}
                                            textAlign="center"
                                        >
                                            {page.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        
                    </Box>



                </Toolbar>
            </AppBar>
            
        </ThemeProvider >
    );
};

export default MobileAppBar;
