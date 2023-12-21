import React, { useState } from 'react';
import login from '../../../../styles/pages/login';
import { useRef } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import TtyIcon from '@mui/icons-material/Tty';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import {
    createTheme,
    Typography,
    Box,
    TextField,
    Button,
    Alert,
    Stack, Paper,
} from '@mui/material';
import { validarCedulaEcuatoriana } from '../../../Register/registerConstants';

import { useEffect } from 'react';
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
function Tab3({ data, onDataChange, onPrevTab, onNextTab }) {

    const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
    const [isAlertNameOpen, setIsAlertNameOpen] = useState(false);
    const [isAlertCellphoneOpen, setIsAlertCellphoneOpen] = useState(false);
    const [isAlertPhoneConventionOpen, setIsAlertPhoneConventionOpen] = useState(false);

    const idGuarantor1InputRef = useRef(null);
    const fullNameGuarantor1InputRef = useRef(null);
    const cellphoneGuarantor1InputRef = useRef(null);
    const phoneGuarantor1InputRef = useRef(null);

    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    const handleChangeId = (event) => {
        const id = idGuarantor1InputRef.current.value.trim().toLowerCase();
        setIsAlertIdOpen(!validarCedulaEcuatoriana(id));
    }

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
        if (fieldName === 'fullNameGuarantor1') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertNameOpen(true);
            }
            else {
                setIsAlertNameOpen(false);
            }
        }
        if (fieldName === 'cellphoneGuarantor1') {
            if (!/^\d{10}$/.test(event.target.value)) {
                setIsAlertCellphoneOpen(true);
            }
            else {
                setIsAlertCellphoneOpen(false);
            }
        }

        if (fieldName === 'phoneGuarantor1') {
            if (!/^\d{7}$/.test(event.target.value)) {
                setIsAlertPhoneConventionOpen(true);
            }
            else {
                setIsAlertPhoneConventionOpen(false);
            }
        }
    };


    const fieldsFilled = (event) => {
        const idGuarantor1 = idGuarantor1InputRef.current.value.trim();
        const fullNameGuarantor1 = fullNameGuarantor1InputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(idGuarantor1);
        const cellphoneGuarantor1 = cellphoneGuarantor1InputRef.current.value.trim();
        const phoneGuarantor1 = phoneGuarantor1InputRef.current.value.trim();

        setIsNextButtonDisabled(!(fullNameGuarantor1.trim() !== '' && currentIndex === 0 && idGuarantor1.trim() !== '' && idValid && cellphoneGuarantor1.trim() !== '' && phoneGuarantor1.trim() !== ''));

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada
        const idGuarantor1 = idGuarantor1InputRef.current.value.trim();
        const fullNameGuarantor1 = fullNameGuarantor1InputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(idGuarantor1);
        const cellphoneGuarantor1 = cellphoneGuarantor1InputRef.current.value.trim();
        const phoneGuarantor1 = phoneGuarantor1InputRef.current.value.trim();
        // Verifica todas las condiciones necesarias para habilitar el botón de "Siguiente"
        setIsNextButtonDisabled(!(idGuarantor1 && idValid && cellphoneGuarantor1 && phoneGuarantor1 && fullNameGuarantor1));
    }, [data, setIsNextButtonDisabled]);

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




    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="fullNameGuarantor1"
                                label={<Typography sx={login.textoInput} >Nombres y apellidos completos </Typography>}
                                defaultValue={data.fullNameGuarantor1}
                                onChange={(event) => {
                                    handleFieldChange('fullNameGuarantor1', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={fullNameGuarantor1InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertNameOpen && (
                                <Alert
                                    open={isAlertNameOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Nombre inválido. Solo letras
                                </Alert>
                            )}
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type="number" id="idGuarantor1" label={<Typography sx={login.textoInput} >Cédula </Typography>}
                                defaultValue={data.idGuarantor1}
                                onChange={(event) => {
                                    handleFieldChange('idGuarantor1', event);
                                    handleChangeId(event); // Llama a la primera función
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                inputRef={idGuarantor1InputRef} variant="standard" fullWidth margin="normal" />
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
                            <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="cellphoneGuarantor1"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono celular</Typography>}
                                defaultValue={data.cellphoneGuarantor1}
                                onChange={(event) => {
                                    handleFieldChange('cellphoneGuarantor1', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={cellphoneGuarantor1InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertCellphoneOpen && (
                                <Alert
                                    open={isAlertCellphoneOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Teléfono celular inválido
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="phoneGuarantor1"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono convencional</Typography>}
                                defaultValue={data.phoneGuarantor1}
                                onChange={(event) => {
                                    handleFieldChange('phoneGuarantor1', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={phoneGuarantor1InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.sactive' }} />
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertPhoneConventionOpen && (
                                <Alert
                                    open={isAlertPhoneConventionOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Teléfono convencional inválido
                                </Alert>
                            )}
                        </Stack>

                        <Box display="flex" justifyContent="space-between">
                            <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} onClick={onPrevTab} >
                                <ArrowCircleLeftTwoToneIcon sx={{ marginRight: '2rem' }} /> Anterior
                            </Button>
                            <Button size="small" variant="contained" color="secondary" sx={login.textoBoton}
                                onClick={onNextTab} disabled={isNextButtonDisabled}>
                                Siguiente <ArrowCircleRightTwoToneIcon sx={{ marginLeft: '2rem' }} />
                            </Button>
                        </Box>

                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab3;