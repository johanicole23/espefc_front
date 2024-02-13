
import React, { useState, useRef, useEffect } from 'react';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import {
    theme,
    textFieldNews,
} from './accessConstants';


function AccessDesgravamen() {


    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
    const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(undefined);
    const [selectedData, setSelectedData] = useState({}); // Nuevo estado para almacenar los datos seleccionados


    const [newData, setNewData] = useState([]);
    const newDataRef = useRef([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedIdTypeAddDeductible, setSelectedIdTypeAddDeductible] = useState('');
    const [numDeductible, setNumDeductible] = useState('');
    const [token, setToken] = useState(null);

    const [updatedData, setUpdatedData] = useState({
        deductible_number: '0',
        deductible_type: '',
    });

    useEffect(() => {
        
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        const obtenerDesgravamen = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/deductibles');
                setNewData(response.data.deductible);


            } catch (error) {
                console.error('Error al obtener los desgravamenes', error);
            }
        };

        obtenerDesgravamen();
    }, [token]);






    async function updateOnServer() {
        console.log(updatedData);
        try {
            const response = await axios.post('http://localhost:3000/api/editDeductible', {
                deductible_number: updatedData.deductible_number,
                deductible_type: selectedIdTypeAddDeductible,
                authorization:token,
            });

            if (response.data.success) {
                setIsAlertSuccessOpen(true);
                setIsAlertErrorOpen(false);

            } else {
                console.error('Error al actualizar noticia:', response.data.message);
                setIsAlertErrorOpen(true);
                setIsAlertSuccessOpen(false);
            }// Puedes manejar la respuesta según tus necesidades
        } catch (error) {
            console.error('Error al actualizar la noticia', error);
            console.error('Error en la noticia:', error);
            setIsAlertErrorOpen(true);
            setIsAlertSuccessOpen(false);
        }

        //Esperar 5 segundos
        setTimeout(() => {
            // Realizar acciones después de esperar 5 segundos
            setIsAlertErrorOpen(false);
            setIsAlertSuccessOpen(false);
            setSelectedId(undefined);
        }, 5000);
    }



    //Función que actualiza el estado del selectIdBrandAddCar
    const handleTypeAddDeductible = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdTypeAddDeductible(selectedValue);
        const updatedSelectedDataAddDeductible = { ...updatedData };
        updatedSelectedDataAddDeductible.deductible_type = selectedValue;
        setUpdatedData(updatedSelectedDataAddDeductible);
        console.log(event.target.value);

        if (selectedValue === "Quirografario") {

            setNumDeductible(newData[0].deductible_number);
        }
        else if (selectedValue === "Prendario") {

            setNumDeductible(newData[1].deductible_number);
        }
        else if (selectedValue === "Educativo") {

            setNumDeductible(newData[3].deductible_number);
        }
        else if (selectedValue === "Salud") {

            setNumDeductible(newData[4].deductible_number);
        }
        console.log(newData[0].deductible_number);

    };

    //Función que actualiza el estado de los campos de texto en AddCar
    function handleTextFieldChange(event, key) {

        const newValue = event.target.value;
        const updatedSelectedDataAddDeductible = { ...updatedData };
        updatedSelectedDataAddDeductible[key] = newValue;
        setUpdatedData(updatedSelectedDataAddDeductible);
        setNumDeductible(newValue);
        setIsAlertErrorOpen(false);
        setIsAlertSuccessOpen(false);
        console.log(event.target.value)

    }

    const loanType = [
        'Quirografario',
        'Prendario',
        'Educativo',
        'Salud'
    ];

    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Tabla de amortización: simulador </Typography>
                <TextField
                    id="standard-select-currency"
                    select
                    label={<Typography sx={login.textoInput} >Elige un tipo </Typography>}
                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                    variant="standard"

                    fullWidth
                    onChange={handleTypeAddDeductible}
                >

                    {loanType.map((loan, index) => (
                        <MenuItem key={index} value={loan}>
                            <Typography marginLeft={'20px'} sx={login.textoInput} >{loan}  </Typography>
                        </MenuItem>

                    ))}

                </TextField>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                    <TextField
                        id={"desgravamen"}
                        value={numDeductible}
                        type="text"
                        label={
                            <Typography
                                sx={{
                                    fontFamily: 'Cairo',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    width: '100%',

                                }}
                            >
                                Tasa de Desgravamen
                            </Typography>
                        }
                        variant="standard"
                        fullWidth
                        margin="normal"
                        // Usar los datos de selectedData
                        onChange={(event) => handleTextFieldChange(event, "deductible_number")}
                        helperText={<Typography sx={login.textoMensajeAbajoInput} >Solo números</Typography>}

                    />

                </Box>


                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                    <Button size="medium" variant="contained" color="secondary"
                        onClick={() => updateOnServer()}
                        sx={buttons.registerButton}
                        endIcon={<EditIcon />}  >
                        Editar Desgravamen
                    </Button>

                </Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertSuccessOpen && (
                        <Alert
                            open={isAlertSuccessOpen}
                            severity="success"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            Tasa actualizada con éxito
                        </Alert>
                    )}
                </Stack>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {isAlertErrorOpen && (
                        <Alert
                            open={isAlertErrorOpen}
                            severity="error"
                            sx={{
                                fontFamily: 'Cairo',
                                textAlign: 'Right',
                                fontSize: "14px",
                                fontWeight: 600,
                            }}
                        >
                            La tasa no se pudo actualizar.
                        </Alert>
                    )}
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}
export default AccessDesgravamen;