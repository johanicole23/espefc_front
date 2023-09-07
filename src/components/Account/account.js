import bienvenida from '../../assets/account/welcome.png';
import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logoFC.png';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicationIcon from '@mui/icons-material/Medication';
import MailIcon from '@mui/icons-material/Mail';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import home from '../../styles/pages/home';
import buttons from '../../styles/buttons';
import account from '../../styles/pages/account';
import appbar from '../../styles/components/appbar';
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
  background: 'white',
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
const theme = createTheme({
  palette: {
    primary: {
      main: '#005f8f'

    },
    secondary: {
      main: '#005F8F'
    },
    terciary: {
      main: '#005F8F'

    },
  },
});
// Componente del contenido principal
function MainContent() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={2}></Grid>
        <Grid item xs={12} sm={5} md={10}>
          <Typography id="modal-modal-title" sx={home.homeTextH2LeftLight}>
            Bienvenida, Johanna Molina
          </Typography>
          <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
            Descubre todas las facilidades a las que ahora eres capaz de acceder.
          </Typography>          
        </Grid>
        <Grid item xs={12} sm={5} md={2}></Grid>
        <Grid item xs={12} sm={5} md={3}>          
          <Card sx={account.accountFormatCardNumberAccount}>
            <CardActionArea>
              <CardContent >
                <Box display="flex" flexDirection={'column'} >
                  <Typography variant="subtitle1" sx={home.homeTextH3}>Cuenta Nro.</Typography>
                  <Typography variant="body2" sx={home.homeTextH4}>FCP-2345341197</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions >
              <Box marginLeft="12px" >

                <Button size="medium" variant="contained" color="secondary" sx={buttons.accountButtonTextSecondary} >
                  ¿Para que me sirve?
                </Button>
              </Box>
            </CardActions>
          </Card>
          <Card sx={account.accountFormatCardPasswordAccount}>
            <CardActionArea>
              <CardContent >
                <Box display="flex" flexDirection={'column'} >                  
                  <Typography variant="body2" sx={home.homeTextH2LeftLight}>¿Necesitas cambiar la contraseña?</Typography>
                  <Typography variant="subtitle1" sx={home.homeTextH4Left}>Configurala aquí en un paso</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions >
              <Box marginLeft="12px" >
                <Button size="medium" variant="contained" fullWidth color="secondary" sx={buttons.accountButtonTextPrimary} >
                  Cambiar contraseña
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} md={7}>
          <img src={bienvenida} alt="Descripción de la imagen" width="100%" height="100%" marginLeft='10%' />
        </Grid>
        
        <Grid item xs={12} sm={5} md={2}></Grid>
        <Grid item xs={12} sm={5} md={8}>
         
        </Grid>
        <Grid item xs={12} sm={5} md={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar disableGutters sx={{ height: '6rem', padding: '1rem' }}>
          <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%', flexGrow: 1 }} noWrap component="div">
            <Box sx={appbar.appBarTitleFormat}>
              <img src={logo} className="App-logo" alt="logo" />
              <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                <Typography variant="h6" noWrap component="a" href="/" sx={appbar.appBarTitleFc}>FONDO DE CESANTÍA</Typography>
                <Typography variant="h8" noWrap component="a" href="/" sx={appbar.appBarTitleEspe}>UNIVERSIDAD DE LAS FUERZAS ARMADAS</Typography>
              </Box>
            </Box>
          </Box>
          <IconButton
            color="#005f8f"
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
        <DrawerHeader>

        </DrawerHeader>
        <MainContent />
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
            Johanna Molina
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Quirografarios', icon: <AttachMoneyIcon />, link: '/cuenta/formulario-quirografario' },
            { text: 'Prendarios', icon: <ElectricCarIcon />, link: '/cuenta/formulario-prendario' },
            { text: 'Educativos', icon: <MenuBookIcon />, link: '/prendario' },
            { text: 'Emergencia de Salud', icon: <MedicationIcon />, link: '/prendario' },
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
            { text: 'Historial de Préstamos', icon: <InboxIcon />, link: '/historial' },
            { text: 'Simulador de Préstamos', icon: <MailIcon />, link: '/simulador' },
            { text: 'Configuración Cuenta', icon: <PermDataSettingIcon />, link: '/configuracion' },
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
      </Drawer>
    </Box>
  );
}
