import React, { useState } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import logo from '../../../assets/logoFC.png';
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
import { useRef } from 'react';
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
function Tab2({ data, onDataChange, onPrevTab, onNextTab }) {
    const options = [
        { value: 36, label: '36 Meses' },
        { value: 48, label: '48 Meses' },
        { value: 60, label: '60 Meses' },
        { value: 72, label: '72 Meses' },
        { value: 84, label: '84 Meses' },
        // Agrega más opciones según sea necesario
    ];

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

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
    };

    const fieldsFilled = (event) => {
        const id = idInputRef.current.value.trim();
        const fullName = fullNameInputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(id);
        const amount = amountInputRef.current.value.trim();

        const numberAccount = accountNumberInputRef.current.value.trim();
        const institution = institutionInputRef.current.value.trim();
        //const noneChecked = isCheckedCorriente==true && isCheckedAhorro==true;
        //const atLeastOneChecked = (isCheckedCorriente===true && isCheckedAhorro===false)||(isCheckedCorriente===false && isCheckedAhorro===true);

        // Verifica si los campos requeridos están llenos y válidos y al menos un Checkbox está marcado
        setIsNextButtonDisabled(!(fullName.trim() !== '' && id.trim() !== '' && idValid && amount.trim() !== '' && numberAccount.trim() !== '' && institution.trim() !== ''));

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };




    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>


                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
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
                        <Button variant="contained" color="secondary" onClick={onPrevTab}>
                            Anterior
                        </Button>
                        <Button variant="contained" color="primary" onClick={onNextTab}>
                            Siguiente
                        </Button>
                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab2;