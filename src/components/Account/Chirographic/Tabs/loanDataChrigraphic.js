import React, { useState, useRef, useEffect } from 'react';
import {
    createTheme,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Checkbox,
    Alert,
    Stack,
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import { validarCedulaEcuatoriana } from '../../../Register/registerConstants';
import home from '../../../../styles/pages/home';
import loan from '../../../../styles/pages/loan';
import login from '../../../../styles/pages/login';

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
function Tab1({ data, onDataChange, onNextTab }) {
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


    const [customerData, setCustomerData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const newCustomerData = window.localStorage.getItem('customer');
        const newUserData = window.localStorage.getItem('user');
        if (newCustomerData) {
            setCustomerData(JSON.parse(newCustomerData));
        }
        if (newUserData) {
            setUserData(JSON.parse(newUserData));
        }     

    }, []);


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
        const newData = { ...data, isTerm: event.target.value };
        onDataChange(newData);

    };

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
    };

    const handleCheckboxChange = (checkedName, event) => {
        const newData = { ...data, [checkedName]: event.target.checked };
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
        setIsNextButtonDisabled(!(fullName.trim() !== '' && currentIndex === 0 && id.trim() !== '' && idValid && isTerm !== -1 && amount.trim() !== '' && numberAccount.trim() !== '' && institution.trim() !== ''));

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada
        const id = idInputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(id);
        const amount = amountInputRef.current.value.trim();
        const numberAccount = accountNumberInputRef.current.value.trim();
        const institution = institutionInputRef.current.value.trim();
        const fullName = fullNameInputRef.current.value.trim();
        // Verifica todas las condiciones necesarias para habilitar el botón de "Siguiente"
        setIsNextButtonDisabled(!(id && idValid && amount && numberAccount && institution && fullName));
    }, [data, setIsNextButtonDisabled]);




    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>


                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                        <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="fullName"
                                label={<Typography sx={login.textoInput} >Nombres y apellidos completos </Typography>}
                                value={customerData.customer_name}
                                disabled={"true"}
                                onChange={(event) => {
                                  
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                InputLabelProps={{ shrink: true }}
                                variant="standard" inputRef={fullNameInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type="number" id="numberId" label={<Typography sx={login.textoInput} >Cédula </Typography>}
                                value={userData.user_ci}
                                disabled={"true"}
                                onChange={(event) => {
                                   
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                InputLabelProps={{ shrink: true }}
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
                                defaultValue={data.amount}
                                onChange={(event) => {
                                    handleFieldChange('amount', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                
                                helperText={<Typography sx={login.textoMensajeAbajoInput} >Valor máximo ${userData.user_balance}. Si es mayor al saldo se necesitan garantes</Typography>} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <CalendarMonthIcon sx={{ color: 'action.active', mr: 1, my: 4 }} />
                            <TextField
                                id="standard-select-currency"
                                select
                                label={<Typography sx={login.textoInput} >Plazo(Meses) </Typography>}

                                helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                                variant="standard"
                                fullWidth
                                value={data.isTerm}
                                onChange={(event) => {
                                    handleFieldChange('isTerm', event);
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
                                        checked={data.isCheckedAhorro}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedAhorro", event);
                                            handleCheckboxAhorroChange(event);
                                        }} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Corriente:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedCorriente}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedCorriente", event);
                                            handleCheckboxCorrienteChange(event);
                                        }} />
                                </Box>
                            </Box>

                            <Box display={'flex'} >
                                <NumbersOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
                                <TextField
                                    inputRef={accountNumberInputRef}
                                    type="number"
                                    id="accountNumber"
                                    defaultValue={data.accountNumber}
                                    onChange={(event) => {
                                        handleFieldChange('accountNumber', event);
                                        fieldsFilled(event);   // Llama a la segunda función
                                    }}

                                    label={<Typography sx={login.textoInput}  >Número de cuenta</Typography>}
                                    helperText={<Typography sx={login.textoMensajeAbajoInput} >Cuenta a transferir el valor del préstamo</Typography>} variant="standard" fullWidth margin="normal" />
                            </Box>

                            <Box display={'flex'} >
                                <AccountBalanceOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
                                <TextField
                                    inputRef={institutionInputRef}
                                    id="institution"
                                    defaultValue={data.institution}
                                    onChange={(event) => {
                                        handleFieldChange('institution', event);
                                        fieldsFilled(event);
                                    }}
                                    helperText={<Typography sx={login.textoMensajeAbajoInput} >Institución correspondiente a la cuenta</Typography>} label={<Typography sx={login.textoInput} >Institución financiera</Typography>} variant="standard" fullWidth margin="normal" />
                            </Box>

                        </Box>

                        <Box sx={{ justifyContent: 'space-around', padding: '2%', marginBottom: "2rem" }}>
                            <Typography sx={loan.marcaRellenoAux}>Tipo de amortización del préstamo:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "2rem" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={home.homeTextH4Left}>Alemán:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedAleman}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedAleman", event);
                                            handleCheckboxAlemanChange(event);
                                        }} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={home.homeTextH4Left}>Frances:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedFrances}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedFrances", event);
                                            handleCheckboxFrancesChange(event);
                                        }} />

                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} onClick={handlePrev} disabled={currentIndex === 0}>
                                    <ArrowCircleLeftTwoToneIcon sx={{ marginRight: '2rem' }} /> Anterior
                                </Button>
                                <Button size="small" variant="contained" color="secondary" sx={login.textoBoton}
                                    onClick={onNextTab} disabled={isNextButtonDisabled}>
                                    Siguiente <ArrowCircleRightTwoToneIcon sx={{ marginLeft: '2rem' }} />
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab1;