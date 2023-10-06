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
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import home from '../../../styles/pages/home';
import loan from '../../../styles/pages/loan';
import login from '../../../styles/pages/login';
import appbar from '../../../styles/components/appbar';
import AppBarDrawer from '../AppBarDrawer';
import { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocument, rgb } from 'pdf-lib';
import Select from 'react-select';
import MenuItem from '@mui/material/MenuItem';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { validarCedulaEcuatoriana } from '../../Register/registerConstants';
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Accede al archivo seleccionado por el usuario
    const file = event.target.files[0];

    // Realiza alguna acción con el archivo, como guardar o procesarlo
    // En este ejemplo, simplemente lo almacenamos en el estado
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Realiza alguna acción con el archivo, como enviarlo al servidor
      // En este ejemplo, simplemente mostramos el nombre del archivo
      alert(`Archivo seleccionado: ${selectedFile.name}`);
    } else {
      alert('Por favor, selecciona un archivo antes de subirlo.');
    }
  };
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



  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


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
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const options = [
    { value: 36, label: '36 Meses' },
    { value: 48, label: '48 Meses' },
    { value: 60, label: '60 Meses' },
    { value: 72, label: '72 Meses' },
    { value: 84, label: '84 Meses' },
    // Agrega más opciones según sea necesario
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      const documentID = selectedOption.value;
      // Usa documentID como lo necesites en tu aplicación
      console.log('Document ID seleccionado:', documentID);
    } else {
      // El usuario no ha seleccionado ninguna opción
      console.log('Ninguna opción seleccionada');
    }
  };
  const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
  const idInputRef = useRef(null);
  const fullNameInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const accountNumberInputRef = useRef(null);
  const institutionInputRef = useRef(null);
  
  const [isTerm, setTerm] = useState('');
  const [isCheckedAhorro, setIsCheckedAhorro] = useState(true);
  const [isCheckedCorriente, setIsCheckedCorriente] = useState(false);
  const [isCheckedAleman, setIsCheckedAleman] = useState(true);
  const [isCheckedFrances, setIsCheckedFrances] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);



  /* const handleAmountTextFieldFocus = () => {
     setIsAlertIdOpen(true);
     const id = idInputRef.current.value.trim().toLowerCase();
     let flag=true;
     if(validarCedulaEcuatoriana(id)){
      
         flag = false;        
     }
     
   }*/

  const handleChangeId = (event) => {
    const id = idInputRef.current.value.trim().toLowerCase();
    setIsAlertIdOpen(!validarCedulaEcuatoriana(id));
  }

  const handleCheckboxCorrienteChange = (event) => {
    setIsCheckedCorriente(!isCheckedCorriente);
    if (isCheckedAhorro) {
        setIsCheckedAhorro(false);
    }
    fieldsFilled();
  };


  const handleCheckboxAhorroChange = (event) => {
    setIsCheckedAhorro(!isCheckedAhorro);
    if (isCheckedCorriente) {
        setIsCheckedCorriente(false);
    }
    fieldsFilled();
  };

  const handleCheckboxFrancesChange = (event) => {
    setIsCheckedFrances(!isCheckedFrances);
    if (isCheckedAleman) {
        setIsCheckedAleman(false);
    }
    fieldsFilled();
  };


  const handleCheckboxAlemanChange = (event) => {
    setIsCheckedAleman(!isCheckedAleman);
    if (isCheckedFrances) {
        setIsCheckedFrances(false);
    }
    fieldsFilled();
  };

  const handleChangeTerm = (event) => {
    const selectedValue = event.target.value;
    const selectedValueString = String(selectedValue); // Convierte el valor en una cadena
    setTerm(selectedValueString); // Almacena la cadena en el estado 'isTerm'
  };

  const fieldsFilled = (event) => {
    const id = idInputRef.current.value.trim().toLowerCase();
    const fullName = fullNameInputRef.current.value.trim().toLowerCase();
    const idValid = validarCedulaEcuatoriana(id);
    const amount = amountInputRef.current.value.trim().toLowerCase();
    
    const numberAccount =accountNumberInputRef.current.value.trim().toLowerCase();
    const institution =institutionInputRef.current.value.trim().toLowerCase();
    //const noneChecked = isCheckedCorriente==true && isCheckedAhorro==true;
    //const atLeastOneChecked = (isCheckedCorriente===true && isCheckedAhorro===false)||(isCheckedCorriente===false && isCheckedAhorro===true);

    // Verifica si los campos requeridos están llenos y válidos y al menos un Checkbox está marcado
    setIsNextButtonDisabled(!(fullName.trim() !== '' && id.trim() !== '' && idValid && amount.trim() !== ''&&   numberAccount.trim() !== ''&& institution.trim() !== '' ));
    

  }
  const papers = [
    {
      index: 0, title: 'Datos para el Préstamo', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="fullName" label={<Typography sx={login.textoInput} >Nombres y apellidos completos </Typography>} onChange={fieldsFilled} variant="standard" inputRef={fullNameInputRef} fullWidth margin="normal"
            sx={{ color: 'action.active' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField type="number" id="numberId" label={<Typography sx={login.textoInput} >Cédula </Typography>} 
          onChange={(event) => {
            handleChangeId(event); // Llama a la primera función
            fieldsFilled(event);   // Llama a la segunda función
          }}
            inputRef={idInputRef} variant="standard" fullWidth margin="normal" />
        </Box>

        <Stack sx={{ width: '100%' }} spacing={2}>
          {isAlertIdOpen && (
            <Alert
              open={isAlertIdOpen}
              severity="error"
              sx={{
                fontFamily: 'Cairo',
                textAlign: 'Right',
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Cédula inválida
            </Alert>
          )}
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 4 }} />
          <TextField 
          inputRef={amountInputRef} 
          id="amount" 
          type="number" 
          label={<Typography sx={login.textoInput} >Monto </Typography>} 
          variant="standard" 
          margin="normal" 
          fullWidth
          onChange={fieldsFilled}  
          helperText={<Typography sx={login.textoMensajeAbajoInput} >Cantidad en números. No debe superar el monoto total de su cuenta individual.</Typography>} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <CalendarMonthIcon sx={{ color: 'action.active', mr: 1, my: 4 }} />
          <TextField
            id="standard-select-currency"
            select
            label={<Typography sx={login.textoInput} >Plazo(Meses) </Typography>}
            defaultValue="0"
            helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
            variant="standard"
            fullWidth
            
            onChange={(event) => {
              handleChangeTerm(event); // Llama a la primera función
              fieldsFilled(event);   // Llama a la segunda función
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Box>

        <Box sx={{ justifyContent: 'space-around', padding: '2%' }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de cuenta para el préstamo:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={home.homeTextH4Left}
              >Ahorros:</Typography>
              <Checkbox
                sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                checked={isCheckedAhorro}
                onChange={handleCheckboxAhorroChange} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={home.homeTextH4Left}               
              >Corriente:</Typography>
              <Checkbox 
              sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }} 
              checked={isCheckedCorriente}
              onChange={handleCheckboxCorrienteChange}/>
            </Box>
          </Box>

          <Box display={'flex'} >
            <NumbersOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
            <TextField 
            inputRef={accountNumberInputRef} 
            type="number" 
            id="accountNumber"
            onChange={fieldsFilled}  
            label={<Typography sx={login.textoInput}  >Número de cuenta</Typography>} 
            helperText={<Typography sx={login.textoMensajeAbajoInput} >Cuenta a transferir el valor del préstamo</Typography>} variant="standard" fullWidth margin="normal" />
          </Box>

          <Box display={'flex'} >
            <AccountBalanceOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
            <TextField 
            inputRef={institutionInputRef} 
            id="institution"
            onChange={fieldsFilled}  
            helperText={<Typography sx={login.textoMensajeAbajoInput} >Institución correspondiente a la cuenta</Typography>} label={<Typography sx={login.textoInput} >Institución financiera</Typography>} variant="standard" fullWidth margin="normal" />
          </Box>

        </Box>

        <Box sx={{ justifyContent: 'space-around', padding: '2%', marginBottom: "2rem" }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de amortización del préstamo:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={home.homeTextH4Left}>Alemán:</Typography>
              <Checkbox 
              sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }} 
              checked={isCheckedAleman}
              onChange={handleCheckboxAlemanChange}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={home.homeTextH4Left}>Frances:</Typography>
              <Checkbox 
              sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }} 
              checked={isCheckedFrances}
              onChange={handleCheckboxFrancesChange}/>
              
            </Box>
          </Box>



        </Box>
      </div>
    },
    {
      index: 1, title: 'Datos Personales', code: <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="direction" label="Dirección Domicilio" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
          <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="phone" label="Teléfono Celular" variant="standard" fullWidth margin="normal" />
          <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Teléfono Convencional" variant="standard" fullWidth margin="normal" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Categoría:</Typography>
          <Box display={'flex'} >


            <TextField id="input-with-sx" label="Sede" variant="standard" fullWidth margin="normal" />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
          <Typography sx={loan.marcaRellenoAux}>Tipo de contrato:</Typography>
          <Box display={'flex'} >


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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < papers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <AppBarDrawer />
      <Box sx={{ flexGrow: 1, padding: '0px' }} open={open}>
        <ThemeProvider theme={theme} >
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


              <Box display={'flex'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} sx={{ width: '70%', alignItems: 'center', alignContent: 'center' }}>
                <Paper elevation={5} sx={{ paddingTop: '1%', paddingBottom: '1%', paddingLeft: '3%', paddingRight: '3%', width: '65%' }}>
                  <Typography sx={home.homeTextH3Light} variant="body2">{papers[currentIndex].title}</Typography>
                  {papers[currentIndex].code}
                  <InputLabel></InputLabel>
                  <Box display="flex" justifyContent="space-between">
                    <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} onClick={handlePrev} disabled={currentIndex === 0}>
                      <ArrowCircleLeftTwoToneIcon sx={{ marginRight: '2rem' }} /> Anterior
                    </Button>
                    <Button size="small" variant="contained" color="secondary" sx={login.textoBoton}
                      onClick={handleNext} disabled={currentIndex === papers.length - 1 || isNextButtonDisabled}>
                      Siguiente <ArrowCircleRightTwoToneIcon sx={{ marginLeft: '2rem' }} />
                    </Button>
                  </Box>
                </Paper>
              </Box>

            </Box>


          </Box>
          <div>
            <h1>Subir un PDF</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Subir PDF</button>
          </div>
          <div>
            <h1>Generar PDF</h1>
            <button onClick={() => generatePDF(isTerm, isCheckedAhorro, isCheckedFrances)}>Generar PDF a partir de los campos</button>
          </div>

        </ThemeProvider>
      </Box>

    </div>

  );
}



async function generatePDF(termValue, ahorroValue, francesValue) {
  try {
    // Ruta al PDF existente
    const rutaPDFExistente = '/files/solicitud_credito_quirografario.pdf';
    const existingPdfBytes = await fetch(rutaPDFExistente).then((res) => res.arrayBuffer());

    // Cargar el PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const [page] = pdfDoc.getPages();

    // Obtener el contenido de los campos de entrada
    const fullName = document.getElementById('fullName').value;
    const date = new Date().toISOString().slice(0, 10);
    const numberId = document.getElementById('numberId').value;
    const amount = document.getElementById('amount').value;    
    const accountNumber = document.getElementById('accountNumber').value;
    const institution = document.getElementById('institution').value;

    // Definir el contenido que deseas agregar
    const contentToInsert = [
      { text: 'X', x: 382, y: 748, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: date, x: 80, y: 743, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: fullName, x: 75, y: 713, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: numberId, x: 110, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: amount, x: 378, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: termValue, x: 495, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: accountNumber, x: 200, y: 649, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: institution, x: 70, y: 630, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
    ];
    if (ahorroValue) {
      contentToInsert.push(
        { text: 'X', x: 87, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!ahorroValue){
      contentToInsert.push(
        { text: 'X', x: 160, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }

    if (francesValue) {
      contentToInsert.push(
        { text: 'X', x: 205, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!francesValue){
      contentToInsert.push(
        { text: 'X', x: 275, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }

    // Agregar el contenido al PDF existente
    contentToInsert.forEach(({ text, x, y, size, color }) => {
      page.drawText(text, { x, y, size, color });
    });

    // Serializar el PDF modificado
    const modifiedPdfBytes = await pdfDoc.save();

    // Guardar el PDF modificado en una nueva ruta
    const nuevaRutaPDF = 'pdf_modificado.pdf';
    const nuevoPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const nuevoPdfUrl = URL.createObjectURL(nuevoPdfBlob);

    // Descargar el PDF modificado o realizar otras acciones necesarias
    const link = document.createElement('a');
    link.href = nuevoPdfUrl;
    link.download = 'formulario_modificado.pdf';
    link.click();
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
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