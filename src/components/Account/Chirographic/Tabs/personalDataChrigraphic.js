import React, { useState, useRef, useEffect } from 'react';
import {
    createTheme,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Checkbox,
    Stack,
    Alert,
} from '@mui/material';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import TtyIcon from '@mui/icons-material/Tty';
import home from '../../../../styles/pages/home';
import loan from '../../../../styles/pages/loan';
import login from '../../../../styles/pages/login';
import { useRouteLoaderData } from 'react-router-dom';


function Tab2({ data, onDataChange, onPrevTab, onNextTab }) {

    const directionInputRef = useRef(null);
    const cellphoneInputRef = useRef(null);
    const phoneConventionInputRef = useRef(null);
    const sedeInputRef = useRef(null);
    const othersInputRef = useRef(null);

    const [isAlertDirectionOpen, setIsAlertDirectionOpen] = useState(false);
    const [isAlertCellphoneOpen, setIsAlertCellphoneOpen] = useState(false);
    const [isAlertPhoneConventionOpen, setIsAlertPhoneConventionOpen] = useState(false);
    const [isAlertSedeOpen, setIsAlertSedeOpen] = useState(false);
    const [isAlertOthersOpen, setIsAlertOthersOpen] = useState(false);


    const [isCheckedAdmin, setIsCheckedAdmin] = useState(true);
    const [isCheckedTeacher, setIsCheckedTeacher] = useState(false);
    const [isCheckedNombrament, setIsCheckedNombrament] = useState(true);
    const [isCheckedContract, setIsCheckedContract] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

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

    const handleCheckboxNombramentChange = (event) => {
        setIsCheckedNombrament(!isCheckedNombrament);
        if (isCheckedContract) {
            setIsCheckedContract(false);
        }
        fieldsFilled();
    };


    const handleCheckboxContractChange = (event) => {
        setIsCheckedContract(!isCheckedContract);
        if (isCheckedNombrament) {
            setIsCheckedNombrament(false);
        }
        fieldsFilled();
    };

    const handleFieldChange = (fieldName, event) => {
        const newData = { ...data, [fieldName]: event.target.value };
        onDataChange(newData);
        if (fieldName === 'direction') {
            if (!(/^[a-zA-Z0-9\s-]*$/.test(event.target.value))) {
                setIsAlertDirectionOpen(true);
            }
            else {
                setIsAlertDirectionOpen(false);
            }
        }
        if (fieldName === 'cellphone') {
            if (!/^\d{10}$/.test(event.target.value)) {
                setIsAlertCellphoneOpen(true);
            }
            else {
                setIsAlertCellphoneOpen(false);
            }
        }

        if (fieldName === 'phoneConvention') {
            if (!/^\d{0,7}$/.test(event.target.value)) {
                setIsAlertPhoneConventionOpen(true);
            }
            else {
                setIsAlertPhoneConventionOpen(false);
            }
        }

        if (fieldName === 'sede') {
            if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(event.target.value))) {
                setIsAlertSedeOpen(true);
            }
            else {
                setIsAlertSedeOpen(false);
            }
        }

       

    };

    const handleCheckboxChange = (checkedName, event) => {
        const newData = { ...data, [checkedName]: event.target.checked };
        onDataChange(newData);
    };
    const fieldsFilled = (event) => {

        const direction = directionInputRef.current.value.trim();
        const cellphone = cellphoneInputRef.current.value.trim();
        const phoneConvention = phoneConventionInputRef.current.value.trim();
        const sede = sedeInputRef.current.value.trim();
        setIsNextButtonDisabled(!(direction.trim() !== '' && cellphone === 0  && sede.trim() !== ''));

    }

    useEffect(() => {
        // Esta función se ejecutará cada vez que cambie el contenido de los campos de entrada
        const direction = directionInputRef.current.value.trim();
        const cellphone = cellphoneInputRef.current.value.trim();
        const phoneConvention = phoneConventionInputRef.current.value.trim();
        const sede = sedeInputRef.current.value.trim();
        setIsNextButtonDisabled(!(direction && cellphone  && sede));
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
                            <TtyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                            <TextField
                                id="phoneConvention"
                                type="number"
                                label={<Typography sx={login.textoInput} >Teléfono Convencional</Typography>}
                                defaultValue={data.phoneConvention}
                                onChange={(event) => {
                                    handleFieldChange('phoneConvention', event);
                                    fieldsFilled(event);   // Llama a la segunda función
                                }}
                                variant="standard" inputRef={phoneConventionInputRef} fullWidth margin="normal"
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
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertSedeOpen && (
                                <Alert
                                    open={isAlertSedeOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Sede inválida
                                </Alert>
                            )}
                        </Stack>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '2%', flexDirection: 'column' }}>
                            <Typography sx={loan.marcaRellenoAux}>Tipo de contrato</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Nombramiento:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedNombrament}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedNombrament", event);
                                            handleCheckboxNombramentChange(event);
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={home.homeTextH4Left}
                                    >Contrato:</Typography>
                                    <Checkbox
                                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                                        checked={data.isCheckedContract}
                                        onChange={(event) => {
                                            handleCheckboxChange("isCheckedContract", event);
                                            handleCheckboxContractChange(event);
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '2rem' }}>
                                    <TextField
                                        id="others"
                                        label={<Typography sx={login.textoInput} >Otros</Typography>}
                                        defaultValue={data.others}
                                        onChange={(event) => {
                                            handleFieldChange('others', event);
                                            fieldsFilled(event);   // Llama a la segunda función
                                        }}
                                        variant="standard" inputRef={othersInputRef} fullWidth margin="normal"
                                        sx={{ color: 'action.active' }} />
                                </Box>
                            </Box>
                        </Box>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertOthersOpen && (
                                <Alert
                                    open={isAlertOthersOpen}
                                    severity="error"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Tipo de contrato inválido
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
export default Tab2;