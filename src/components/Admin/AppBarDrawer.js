import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import AddchartIcon from '@mui/icons-material/Addchart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MailIcon from '@mui/icons-material/Mail';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, useTheme } from '@mui/material/styles';
import logo from '../../assets/logoFC.png';
import home from '../../styles/pages/home';
import appbar from '../../styles/components/appbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary'; // Agrega esta línea
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Agrega esta línea



const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#005f8f',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    height: '6rem',
   
}));


function AppBarDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const accordionStyles = {
        background: 'none',
        boxShadow: 'none',
    };

    const handleItemClick = (link, index) => {
        if (index === 1) {
          window.localStorage.clear();
          // O utiliza window.location.replace(link) si quieres reemplazar la entrada del historial
          // window.location.replace(link);
        } window.location.href = link;
      };
      const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        const newCustomerData = window.localStorage.getItem('customer');
        if (newCustomerData) {
            setCustomerData(JSON.parse(newCustomerData));
        }

    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar disableGutters sx={{ height: '6rem', padding: '1rem' }}>
                    <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%', flexGrow: 1 }} noWrap component="div">
                        <Box sx={appbar.appBarTitleFormat}>
                            <img src={logo} className="App-logo" alt="logo" />
                            <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                                <Typography variant="h6" noWrap component="a" href="/admin-cuenta" sx={{...appbar.appBarTitleFc,color:'white' }}>FONDO DE CESANTÍA</Typography>
                                <Typography variant="h8" noWrap component="a" href="/admin-cuenta" sx={appbar.appBarTitleEspe}>UNIVERSIDAD DE LAS FUERZAS ARMADAS</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton
                         style={{ color: 'white' }}
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }), marginRight: '200px' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Main open={open}>
                <DrawerHeader></DrawerHeader>

            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <AccountCircleIcon
                        sx={{
                            width: '45px',
                            height: '45px',
                            color: '#005f8f',
                        }}></AccountCircleIcon>
                    <Box sx={{ marginX: 1 }}></Box>
                    <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
                        {customerData.customer_name}
                    </Typography>
                </DrawerHeader>
                <Divider />
                <List>

                    {[                        
                        { text: 'Préstamos ', icon: <CurrencyBitcoinIcon/>, link: '/admin-cuenta/prestamos' },
                        { text: 'Clientes Aprobados ', icon: <GroupIcon />, link: '/admin-cuenta/clientes' },
                        { text: 'Clientes Pendientes', icon: <PeopleOutlineIcon />, link: '/admin-cuenta/clientes-pendientes' },
                        { text: 'Edición de Accesos', icon: <EditNoteIcon/>, link: '/admin-cuenta/accesos' },                      
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => window.location.href = item.link}>
                                <ListItemIcon sx={{ color: '#005f8f' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
                                        {item.text}
                                    </Typography>
                                } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider /> 
                <List>
                    {[
                        { text: 'Configuración Cuenta', icon: <PermDataSettingIcon />, link: '/admin-cuenta/configuracion' },
                        { text: 'Cerrar sesión', icon: <LogoutIcon />, link: '/login' },
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => handleItemClick(item.link, index)}>
                                <ListItemIcon sx={{ color: '#005f8f' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body1" sx={home.homeTextH4Left} color="textPrimary">
                                        {item.text}
                                    </Typography>
                                } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default AppBarDrawer;
