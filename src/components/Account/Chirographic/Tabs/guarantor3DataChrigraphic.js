import React, { useState } from 'react';
import { useRef } from 'react';
import {
    createTheme,
    Typography,
    Box,
    TextField,
    Button,
    Alert,
    Stack,Paper,
  } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import TtyIcon from '@mui/icons-material/Tty';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { validarCedulaEcuatoriana } from '../../../Register/registerConstants';
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
function Tab5({ data, onDataChange,  onPrevTab, onNextTab}) {

    const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
    const idGuarantor3InputRef = useRef(null);
    const fullNameGuarantor3InputRef = useRef(null);
    const cellphoneGuarantor3InputRef = useRef(null);
    const phoneGuarantor3InputRef = useRef(null);

    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

    const handleChangeId = (event) => {
        const id = idGuarantor3InputRef.current.value.trim().toLowerCase();
        setIsAlertIdOpen(!validarCedulaEcuatoriana(id));
    }

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
    };


    const fieldsFilled = (event) => {
        const idGuarantor3 = idGuarantor3InputRef.current.value.trim();
        const fullNameGuarantor3 = fullNameGuarantor3InputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(idGuarantor3);
        const cellphoneGuarantor3 = cellphoneGuarantor3InputRef.current.value.trim();
        const phoneGuarantor3 = phoneGuarantor3InputRef.current.value.trim();

        //setIsNextButtonDisabled(!(fullNameGuarantor3.trim() !== '' && currentIndex === 0 && idGuarantor3.trim() !== '' && idValid && cellphoneGuarantor3.trim() !== '' && phoneGuarantor3.trim() !== ''));

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

   /* useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada
        const idGuarantor3 = idGuarantor3InputRef.current.value.trim();
        const fullNameGuarantor3 = fullNameGuarantor3InputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(idGuarantor3);
        const cellphoneGuarantor3 = cellphoneGuarantor3InputRef.current.value.trim();
        const phoneGuarantor3 = phoneGuarantor3InputRef.current.value.trim();
        // Verifica todas las condiciones necesarias para habilitar el botón de "Siguiente"
        //setIsNextButtonDisabled(!(idGuarantor3 && idValid && cellphoneGuarantor3 && phoneGuarantor3 && fullNameGuarantor3));
    }, [data, setIsNextButtonDisabled]);*/




    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="fullNameGuarantor3"
                                label={<Typography sx={login.textoInput} >Nombres y apellidos completos </Typography>}
                                defaultValue={data.fullNameGuarantor3}
                                onChange={(event) => {
                                    handleFieldChange('fullNameGuarantor3', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={fullNameGuarantor3InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type="number" id="idGuarantor3" label={<Typography sx={login.textoInput} >Cédula </Typography>}
                                defaultValue={data.idGuarantor3}
                                onChange={(event) => {
                                    handleFieldChange('idGuarantor3', event);
                                    handleChangeId(event); // Llama a la primera función
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                inputRef={idGuarantor3InputRef} variant="standard" fullWidth margin="normal" />
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
                                id="cellphoneGuarantor3"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono celular</Typography>}
                                defaultValue={data.cellphoneGuarantor3}
                                onChange={(event) => {
                                    handleFieldChange('cellphoneGuarantor3', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={cellphoneGuarantor3InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="phoneGuarantor3"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono convencional</Typography>}
                                defaultValue={data.phoneGuarantor3}
                                onChange={(event) => {
                                    handleFieldChange('phoneGuarantor3', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={phoneGuarantor3InputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                      
                        <Box display="flex" justifyContent="space-between">
                            <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} onClick={onPrevTab} >
                                <ArrowCircleLeftTwoToneIcon sx={{ marginRight: '2rem' }} /> Anterior
                            </Button>
                            <Button size="small" variant="contained" color="secondary" sx={login.textoBoton}
                                onClick={onNextTab} >
                                Finalizar con el formulario <ArrowCircleRightTwoToneIcon sx={{ marginLeft: '2rem' }} />
                            </Button>
                        </Box>

                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab5;