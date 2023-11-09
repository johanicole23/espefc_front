import React, { useState, useRef, useEffect } from 'react';
import {
    createTheme,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Checkbox, Stack, Alert,
} from '@mui/material';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TtyIcon from '@mui/icons-material/Tty';
import home from '../../../../styles/pages/home';
import loan from '../../../../styles/pages/loan';
import login from '../../../../styles/pages/login';
import { validarCedulaEcuatoriana } from '../../../Register/registerConstants';

function Tab2({ data, onDataChange, onPrevTab, onNextTab }) {

    const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
    const idInputRef = useRef(null);
    const fullNameInputRef = useRef(null);
    const civilStateInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const bornDateInputRef = useRef(null);
    const directionInputRef = useRef(null);
    const cellphoneInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const sedeInputRef = useRef(null);


    const [isCheckedAdmin, setIsCheckedAdmin] = useState(true);
    const [isCheckedTeacher, setIsCheckedTeacher] = useState(false);
    const [isCheckedYes, setIsCheckedYes] = useState(true);
    const [isCheckedNo, setIsCheckedNo] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

    const handleChangeId = (event) => {
        const id = idInputRef.current.value.trim().toLowerCase();
        setIsAlertIdOpen(!validarCedulaEcuatoriana(id));
    }
    const handleCheckboxAdminChange = (event) => {
        setIsCheckedAdmin(!isCheckedAdmin);
        if (isCheckedTeacher) {
            setIsCheckedTeacher(false);
        }
        fieldsFilled();
    };


    const handleCheckboxTeacherChange = (event) => {
        setIsCheckedTeacher(!isCheckedTeacher);
        if (isCheckedAdmin) {
            setIsCheckedAdmin(false);
        }
        fieldsFilled();
    };

    const handleCheckboxYesChange = (event) => {
        setIsCheckedYes(!isCheckedYes);
        if (isCheckedNo) {
            setIsCheckedNo(false);
        }
        fieldsFilled();
    };


    const handleCheckboxNoChange = (event) => {
        setIsCheckedNo(!isCheckedNo);
        if (isCheckedYes) {
            setIsCheckedYes(false);
        }
        fieldsFilled();
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
        const direction = directionInputRef.current.value.trim();
        const cellphone = cellphoneInputRef.current.value.trim();
        const civilState = civilStateInputRef.current.value.trim();
        const age = ageInputRef.current.value.trim();
        const bornDate = bornDateInputRef.current.value.trim();
        const email = emailInputRef.current.value.trim();
        const sede = sedeInputRef.current.value.trim();
        setIsNextButtonDisabled(!(civilState.trim() !== '' && age.trim() !== '' && bornDate.trim() !== '' && email.trim() !== '' && fullName.trim() !== '' && currentIndex === 0 && id.trim() !== '' && idValid && direction.trim() !== '' && cellphone === 0  && sede.trim() !== ''));

    }

    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada
        const id = idInputRef.current.value.trim();
        const idValid = validarCedulaEcuatoriana(id);
        const fullName = fullNameInputRef.current.value.trim();
        const civilState = civilStateInputRef.current.value.trim();
        const age = ageInputRef.current.value.trim();
        const bornDate = bornDateInputRef.current.value.trim();
        const email = emailInputRef.current.value.trim();
        const direction = directionInputRef.current.value.trim();
        const cellphone = cellphoneInputRef.current.value.trim();
        const sede = sedeInputRef.current.value.trim();
        setIsNextButtonDisabled(!(civilState && age && bornDate && email && id && idValid && fullName && direction && cellphone  && sede));
    }, [data, setIsNextButtonDisabled]);

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
                            <TextField
                                id="fullName"
                                label={<Typography sx={login.textoInput} >Nombres y apellidos completos </Typography>}
                                defaultValue={data.name}
                                onChange={(event) => {
                                    handleFieldChange('name', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={fullNameInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type="number" id="numberId" label={<Typography sx={login.textoInput} >Cédula </Typography>}
                                defaultValue={data.id}
                                onChange={(event) => {
                                    handleFieldChange('id', event);
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
                            <FamilyRestroomIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="civilState"
                                label={<Typography sx={login.textoInput} >Estado Civil </Typography>}
                                defaultValue={data.civilState}
                                onChange={(event) => {
                                    handleFieldChange('civilState', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={civilStateInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <CakeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="age"
                                label={<Typography sx={login.textoInput} >Edad </Typography>}
                                defaultValue={data.age}
                                onChange={(event) => {
                                    handleFieldChange('age', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={ageInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <DateRangeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="bornDate"
                                label={<Typography sx={login.textoInput} >Fecha de Nacimiento DD/MM/AAAA</Typography>}
                                defaultValue={data.bornDate}
                                onChange={(event) => {
                                    handleFieldChange('bornDate', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={bornDateInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <HomeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="direction"
                                label={<Typography sx={login.textoInput} >Dirección Domicilio</Typography>}
                                defaultValue={data.direction}
                                onChange={(event) => {
                                    handleFieldChange('direction', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={directionInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="cellphone"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono celular</Typography>}
                                defaultValue={data.cellphone}
                                onChange={(event) => {
                                    handleFieldChange('cellphone', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={cellphoneInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="email"
                                type="email"
                                label={<Typography sx={login.textoInput} >Correo electrónico</Typography>}
                                defaultValue={data.email}
                                onChange={(event) => {
                                    handleFieldChange('email', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={emailInputRef} fullWidth margin="normal"
                                sx={{ color: 'action.active' }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
                            <Typography sx={loan.marcaRellenoAux}>Separación de Bienes</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Si</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedYes}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedYes", event);
                                            handleCheckboxYesChange(event);
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >No</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedNo}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedNo", event);
                                            handleCheckboxNoChange(event);
                                        }}
                                    />
                                </Box>
                               
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
                            <Typography sx={loan.marcaRellenoAux}>Categoría:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Administrativo:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedAdmin}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedAdmin", event);
                                            handleCheckboxAdminChange(event);
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Docente:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedTeacher}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedTeacher", event);
                                            handleCheckboxTeacherChange(event);
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem' }}>
                                    <TextField
                                        id="sede"
                                        label={<Typography sx={login.textoInput} >Sede</Typography>}
                                        defaultValue={data.sede}
                                        onChange={(event) => {
                                            handleFieldChange('sede', event);
                                            fieldsFilled(event);   // Llama a la segunda función
                                        }}
                                        variant="standard" inputRef={sedeInputRef} fullWidth margin="normal"
                                        sx={{ color: 'action.active' }} />
                                </Box>

                            </Box>
                        </Box>


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
export default Tab2;