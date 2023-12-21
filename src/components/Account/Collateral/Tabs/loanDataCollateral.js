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

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
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
        { value: 12, label: '12 Meses' },
        { value: 24, label: '24 Meses' },
        { value: 36, label: '36 Meses' },
        { value: 48, label: '48 Meses' },
        // Agrega más opciones según sea necesario
    ];


    const markInputRef = useRef(null);
    const amountInputRef = useRef(null);
    const yearCarInputRef = useRef(null);
    const modelCarInputRef = useRef(null);

    const [isTerm, setTerm] = useState('');
    const [isCheckedAhorro, setIsCheckedAhorro] = useState(true);
    const [isCheckedCorriente, setIsCheckedCorriente] = useState(false);
    const [isCheckedAleman, setIsCheckedAleman] = useState(true);
    const [isCheckedFrances, setIsCheckedFrances] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isAlertMarkOpen, setIsAlertMarkOpen] = useState(false);
    const [isAlertYearOpen, setIsAlertYearOpen] = useState(false);
    const [isAlertModelOpen, setIsAlertModelOpen] = useState(false);
    const [isAlertAmountOpen, setIsAlertAmountOpen] = useState(false);


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

    const handleCheckboxChange = (checkedName, event) => {
        const newData = { ...data, [checkedName]: event.target.checked };
        onDataChange(newData);
    };
    const fieldsFilled = (event) => {

        const mark = markInputRef.current.value.trim();
        const amount = amountInputRef.current.value.trim();
        const yearCar = yearCarInputRef.current.value.trim();
        const modelCar = modelCarInputRef.current.value.trim();
        //const noneChecked = isCheckedCorriente==true && isCheckedAhorro==true;
        //const atLeastOneChecked = (isCheckedCorriente===true && isCheckedAhorro===false)||(isCheckedCorriente===false && isCheckedAhorro===true);

        // Verifica si los campos requeridos están llenos y válidos y al menos un Checkbox está marcado
        setIsNextButtonDisabled(!(mark.trim() !== '' && currentIndex === 0 && isTerm !== -1 && amount.trim() !== '' && yearCar.trim() !== '' && modelCar.trim() !== ''));

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada

        const amount = amountInputRef.current.value.trim();
        const yearCar = yearCarInputRef.current.value.trim();
        const modelCar = modelCarInputRef.current.value.trim();
        const mark = markInputRef.current.value.trim();
        // Verifica todas las condiciones necesarias para habilitar el botón de "Siguiente"
        setIsNextButtonDisabled(!(amount && yearCar && modelCar && mark));
    }, [data, setIsNextButtonDisabled]);

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
        if (fieldName === 'mark') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertMarkOpen(true);
            }
            else {
                setIsAlertMarkOpen(false);
            }
        }
        if (fieldName === 'yearCar') {
            if (!/^\d{4}$/.test(event.target.value)) {
                setIsAlertYearOpen(true);
            }
            else {
                setIsAlertYearOpen(false);
            }
        }

        if (fieldName === 'modelCar') {
            if (!(/^[a-zA-Z0-9\s]*$/.test(event.target.value))) {
                setIsAlertModelOpen(true);
            }
            else {
                setIsAlertModelOpen(false);
            }
        }

        if (fieldName === 'amount') {
            if (!/^\d*$/.test(event.target.value)) {
                setIsAlertAmountOpen(true);
            }
            else {
                setIsAlertAmountOpen(false);
            }
        }

    };


    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>


                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <TimeToLeaveIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="mark"
                                label={<Typography sx={login.textoInput} >Marca del vehículo </Typography>}
                                defaultValue={data.mark}
                                onChange={(event) => {
                                    handleFieldChange('mark', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={markInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertMarkOpen && (
                                <Alert
                                    open={isAlertMarkOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Marca inválida
                                </Alert>
                            )}
                        </Stack>

                        <Box display={'flex'} >
                            <NumbersOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
                            <TextField
                                inputRef={yearCarInputRef}
                                type="number"
                                id="yearCar"
                                defaultValue={data.yearCar}
                                onChange={(event) => {
                                    handleFieldChange('yearCar', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}

                                label={<Typography sx={login.textoInput}  >Año del vehículo</Typography>}
                                helperText={<Typography sx={login.textoMensajeAbajoInput} >Cuenta a transferir el valor del préstamo</Typography>} variant="standard" fullWidth margin="normal" />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertYearOpen && (
                                <Alert
                                    open={isAlertYearOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Año inválido
                                </Alert>
                            )}
                        </Stack>

                        <Box display={'flex'} >
                            <CarCrashIcon sx={{ color: 'action.active', mr: 1, my: 5 }} />
                            <TextField
                                inputRef={modelCarInputRef}
                                id="modelCar"
                                defaultValue={data.modelCar}
                                onChange={(event) => {
                                    handleFieldChange('modelCar', event);
                                    fieldsFilled(event);
                                }}
                                helperText={<Typography sx={login.textoMensajeAbajoInput} ></Typography>} label={<Typography sx={login.textoInput} >Modelo del vehículo</Typography>} variant="standard" fullWidth margin="normal" />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertModelOpen && (
                                <Alert
                                    open={isAlertModelOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Modelo inválido
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
                                helperText={<Typography sx={login.textoMensajeAbajoInput} >Cantidad en números. No debe superar el monoto total de su cuenta individual.</Typography>} />
                        </Box>

                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertAmountOpen && (
                                <Alert
                                    open={isAlertAmountOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Modelo inválido
                                </Alert>
                            )}
                        </Stack>

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