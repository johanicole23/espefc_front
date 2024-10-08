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
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
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
function Tab4({ data, onDataChange,  onPrevTab, onNextTab}) {

    const fullNameGuarantor2InputRef = useRef(null);
    const emailReferenceInputRef = useRef(null);
    const cellphoneGuarantor2InputRef = useRef(null);
    const directionSpouseInputRef = useRef(null);
    const directionWorkInputRef = useRef(null);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isAlertNameOpen, setIsAlertNameOpen] = useState(false);
    const [isAlertCellphoneOpen, setIsAlertCellphoneOpen] = useState(false);
    const [isAlertEmailOpen, setIsAlertEmailOpen] = useState(false);
    const [isAlertDirectionOpen, setIsAlertDirectionOpen] = useState(false);
    const [isAlertDirectionWorkOpen, setIsAlertDirectionWorkOpen] = useState(false);



    const fieldsFilled = (event) => {     

    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
        if (fieldName === 'fullNameGuarantor2') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertNameOpen(true);
            }
            else {
                setIsAlertNameOpen(false);
            }
        }

        if (fieldName === 'cellphoneGuarantor2') {
            if (!/^\d{10}$/.test(event.target.value)) {
                setIsAlertCellphoneOpen(true);
            }
            else {
                setIsAlertCellphoneOpen(false);
            }
        }

        if (fieldName === 'emailReference') {
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value))) {
                setIsAlertEmailOpen(true);
            }
            else {
                setIsAlertEmailOpen(false);
            }
        }

        if (fieldName === 'directionSpouse') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertDirectionOpen(true);
            }
            else {
                setIsAlertDirectionOpen(false);
            }
        }

        if (fieldName === 'directionWork') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertDirectionWorkOpen(true);
            }
            else {
                setIsAlertDirectionWorkOpen(false);
            }
        }

    };


    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="fullNameGuarantor2"
                                label={<Typography sx={login.textoInput} >Nombres y apellidos de familiar que no viva con usted </Typography>}
                                defaultValue={data.fullNameGuarantor2}
                                onChange={(event) => {
                                    handleFieldChange('fullNameGuarantor2', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={fullNameGuarantor2InputRef} fullWidth margin="normal"
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
                                    Nombre o apellido inválido
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="emailReference"
                                type="email"
                                label={<Typography sx={login.textoInput} >Correo Electrónico</Typography>}
                                defaultValue={data.emailReference}
                                onChange={(event) => {
                                    handleFieldChange('emailReference', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={emailReferenceInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.sactive' }} />
                        </Box>

                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertEmailOpen && (
                                <Alert
                                    open={isAlertEmailOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Email inválido
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="cellphoneGuarantor2"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono celular</Typography>}
                                defaultValue={data.cellphoneGuarantor2}
                                onChange={(event) => {
                                    handleFieldChange('cellphoneGuarantor2', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={cellphoneGuarantor2InputRef} fullWidth margin="normal"
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
                                    Celular inválido
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <HomeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="directionSpouse"
                                label={<Typography sx={login.textoInput} >Dirección Domicilio</Typography>}
                                defaultValue={data.directionSpouse}
                                onChange={(event) => {
                                    handleFieldChange('directionSpouse', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={directionSpouseInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertDirectionOpen && (
                                <Alert
                                    open={isAlertDirectionOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Dirección inválida
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="directionWork"
                                label={<Typography sx={login.textoInput} >Lugar de trabajo</Typography>}
                                defaultValue={data.directionWork}
                                onChange={(event) => {
                                    handleFieldChange('directionWork', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={directionWorkInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertDirectionWorkOpen && (
                                <Alert
                                    open={isAlertDirectionWorkOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Dirección inválida
                                </Alert>
                            )}
                        </Stack>

                        <Box display="flex" justifyContent="space-between">
                            <Button size="small" variant="outlined" color="secondary" width="30%" sx={login.textoBoton} onClick={onPrevTab} >
                                <ArrowCircleLeftTwoToneIcon sx={{ marginRight: '2rem' }} /> Anterior
                            </Button>
                            <Button size="small" variant="contained" color="secondary" sx={login.textoBoton}
                                onClick={onNextTab} >
                                Siguiente <ArrowCircleRightTwoToneIcon sx={{ marginLeft: '2rem' }} />
                            </Button>
                        </Box>

                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab4;