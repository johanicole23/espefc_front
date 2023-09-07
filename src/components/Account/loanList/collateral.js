import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../../../assets/logoFC.png';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import TextField from '@mui/material/TextField';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyAppBar from '../../MyComponents/myAppBar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Carousel from 'react-material-ui-carousel';
import TtyIcon from '@mui/icons-material/Tty';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicationIcon from '@mui/icons-material/Medication';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';

import home from '../../../styles/pages/home';
import loan from '../../../styles/pages/loan';
import appbar from '../../../styles/components/appbar';


import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { display } from '@mui/system';


const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#b0d626',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#b0d626',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#b0d626',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#b0d626',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

function Chirographic() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF'

      },
      secondary: {
        main: '#005F8F'
      },
      terciary: {
        main: '#005F8F'

      },
    },
  });

  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    exiting: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    exited: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
  };
  const drawerWidth = 300;
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'white', // Agregar esta línea para establecer el fondo blanco
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',

    height: '6rem',
  }));

  const [checked, setChecked] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activePaperIndex, setActivePaperIndex] = React.useState(0);

  const nextForm = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActivePaperIndex(activePaperIndex + 1);
  };

  const backForm = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActivePaperIndex(activePaperIndex - 1);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const steps = ['Datos para el Préstamo', 'Datos Personales', 'Datos del Garante 1', 'Datos del Garante 2', 'Datos del Garante 3'];
  const papers = [
    {
      index: 0, title: 'Datos para el Préstamo', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Nombres y apellidos completos" variant="standard" fullWidth margin="normal" />
          <CalendarMonthIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Fecha" variant="standard" margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Cédula" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Monto" variant="standard" fullWidth margin="normal" />
          <EventIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Plazo (Meses)" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de cuenta para el préstamo:</Typography>
          <Box display={'flex'} >
            <Typography sx={home.homeTextH4Left}>Ahorros:<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>
            <Typography sx={home.homeTextH4Left}>Corriente:<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>

            <TextField id="input-with-sx" label="Número de cuenta" variant="standard" fullWidth margin="normal" />

          </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de amortización del préstamo:</Typography>
          <Box display={'flex'} >
            <Typography sx={home.homeTextH4Left}>Alemán:<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>
            <Typography sx={home.homeTextH4Left}>Francés:<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>
          </Box>
        </Box>
      </div>
    },
    {
      index: 1, title: 'Datos Personales', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Dirección Domicilio" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Teléfono Celular" variant="standard" fullWidth margin="normal" />
          <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Teléfono Convencional" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Categoría:</Typography>
          <Box display={'flex'} >
            <Typography sx={home.homeTextH4Left}>Administrativo<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>
            <Typography sx={home.homeTextH4Left}>Docente<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>

            <TextField id="input-with-sx" label="Sede" variant="standard" fullWidth margin="normal" />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de contrato:</Typography>
          <Box display={'flex'} >
            <Typography sx={home.homeTextH4Left}>Nombramiento<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>
            <Typography sx={home.homeTextH4Left}>Contrato<Checkbox {...label} sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626', }, }} /></Typography>

            <TextField id="input-with-sx" label="Otros" variant="standard" fullWidth margin="normal" />
          </Box>
        </Box>

        <Box sx={{ alignContent: 'center' }} paddingTop={'5%'} paddingLeft={'40%'}>
          <Typography sx={home.homeTextH4Left}>Añadir garante? </Typography>
          <Button sx={{ marginLeft: '5%' }}><AddCircleOutlineIcon sx={home.homeTextH1}></AddCircleOutlineIcon></Button>
        </Box>
      </div>
    },
    {
      index: 2, title: 'Datos del Garante 1', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Nombres y Apellidos completos" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Cédula de ciudadanía o identidad" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Celular" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Convencional" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ alignContent: 'center' }} paddingTop={'5%'} paddingLeft={'35%'}>
          <Typography sx={home.homeTextH4Left}>Añadir otro garante? </Typography>
          <Button sx={{ marginLeft: '10%' }}><AddCircleOutlineIcon sx={home.homeTextH1}></AddCircleOutlineIcon></Button>
        </Box>

      </div>
    },
    {
      index: 3, title: 'Datos del Garante 2', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Nombres y Apellidos completos" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Cédula de ciudadanía o identidad" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Celular" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Convencional" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ alignContent: 'center' }} paddingTop={'5%'} paddingLeft={'35%'}>
          <Typography sx={home.homeTextH4Left}>Añadir otro garante? </Typography>
          <Button sx={{ marginLeft: '10%' }}><AddCircleOutlineIcon sx={home.homeTextH1}></AddCircleOutlineIcon></Button>
        </Box>
      </div>
    },
    {
      index: 4, title: 'Datos del Garante 3', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Nombres y Apellidos completos" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Cédula de ciudadanía o identidad" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Celular" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Convencional" variant="standard" fullWidth margin="normal" />
        </Box>

      </div>
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar disableGutters sx={{ height: '6rem', padding: '1rem' }}>

          <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%', flexGrow: 1 }} noWrap component="div" >
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
      <Box sx={{ flexGrow: 1, padding: '0px' }} open={open}>
        <DrawerHeader />
        <ThemeProvider theme={theme} >

          <div><MyAppBar title="AppBar Component" /></div>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ padding: '0 0', marginTop: 1 }}>
            <Typography variant="body2" sx={home.homeTextH3Light}>PRÉSTAMO QUIROGRAFÁRIO</Typography>
            <Typography variant="body2" sx={home.homeTextH4Left}>Llenar el siguiente formulario:</Typography>
          </Box>

          <Box display="flex" flexDirection={"column"} justifyContent={"center"} sx={{ paddingLeft: '5%', paddingRight: '5%' }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon} ><Typography sx={home.homeTextH4Left}>{label}</Typography></StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{ m: 3 }}>

              <Carousel

                navButtonsAlwaysVisible={true}
                next={nextForm}
                prev={backForm}
                sx={{ width: '60%', alignItems: 'center', alignContent: 'center' }}
                animation="fade" autoPlay={false}>
                {papers.map((item) => (
                  <Box display={'flex'} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                    <Paper elevation={5} sx={{ paddingTop: '1%', paddingBottom: '1%', paddingLeft: '3%', paddingRight: '3%', width: '65%' }}>
                      <Typography variant="body2" sx={home.homeTextH3Light}>{item.title}</Typography>
                      {item.code}
                      <InputLabel></InputLabel>
                    </Paper>
                  </Box>

                ))}
              </Carousel>

            </Box>


          </Box>
        </ThemeProvider>
      </Box>
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
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Quirografarios', icon: <AttachMoneyIcon />, link: '/quirografario' },
            { text: 'Prendarios', icon: <ElectricCarIcon />, link: '/prendario' },
            { text: 'Educativos', icon: <MenuBookIcon />, link: '/prendario' },
            { text: 'Emergencia de Salud', icon: <MedicationIcon />, link: '/prendario' },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => window.location.href = item.link}>
                <ListItemIcon sx={{ color: '#2596be' }}>
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
            { text: 'Historial de Préstamos', icon: <InboxIcon /> },
            { text: 'Simulador de Préstamos', icon: <MailIcon /> },
            { text: 'Configuración Cuenta', icon: <PermDataSettingIcon /> },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#2596be' }}>
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
    </Box >

  );
}




function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default Chirographic;