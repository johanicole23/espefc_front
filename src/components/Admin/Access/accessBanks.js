
import React, { useState, useRef, useEffect } from 'react';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal,
    List, ListItem, ListSubheader, ListItemButton
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


import axios from 'axios';
import {
    theme,
    textFieldNews,
} from './accessConstants';

const itemsArray = [
    { id: 1, value: 'Banco Pichincha' },
    { id: 2, value: 'Produbanco' },
    { id: 3, value: 'Elemento 3' },
    { id: 4, value: 'Elemento 1' },
    { id: 5, value: 'Elemento 2' },
    { id: 6, value: 'Elemento 3' },
    { id: 7, value: 'Elemento 1' },
    { id: 8, value: 'Elemento 2' },
    { id: 9, value: 'Elemento 3' },
    // Agrega más elementos según sea necesario
];
function AccessBanks() {


    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
    const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);
    const [isAlertSuccessEditOpen, setIsAlertSuccessEditOpen] = useState(false);
    const [isAlertErrorEditOpen, setIsAlertErrorEditOpen] = useState(false);

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [editInstitution, setEditInstitution] = useState('Ninguna');
    const [institution, setInstitution] = useState('');
   
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterText, setFilterText] = useState('');



    const handleCloseEdit = () => {
        setIsModalEditOpen(false);
    };
    useEffect(() => {
       /* const obtenerDesgravamen = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/deductibles');
                setNewData(response.data.deductible);


            } catch (error) {
                console.error('Error al obtener los desgravamenes', error);
            }
        };

        obtenerDesgravamen();*/
    }, []);






    async function updateOnServer() {
       /* console.log(updatedData);
        try {
            const response = await axios.post('http://localhost:3000/api/editDeductible', {
                deductible_number: updatedData.deductible_number,
                deductible_type: selectedIdTypeAddDeductible,

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
        }, 5000);*/
    }





    //Función que actualiza el estado de los campos de texto en AddCar
    function handleTextFieldChange(event, key) {

        const newValue = event.target.value;
        setInstitution(newValue);
        setIsAlertErrorOpen(false);
        setIsAlertSuccessOpen(false);
        console.log("agregar", event.target.value)

    }

    function handleTextFieldEditChange(event) {

        const newValue = event.target.value;     
        setEditInstitution(newValue);
        setIsAlertErrorEditOpen(false);
        setIsAlertSuccessEditOpen(false);
        console.log("edit ", event.target.value);

    }



    const handleItemClick = (id) => {
        setSelectedItem(id);
        setIsModalEditOpen(true);
        setEditInstitution(itemsArray[id-1].value);
        // Puedes hacer más acciones aquí con el id del elemento seleccionado si es necesario.
    };
    const filteredItems = itemsArray.filter(
        (item) => item.value.toLowerCase().includes(filterText.toLowerCase())
    );


    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Instituciones Bancarias </Typography>


                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                    <TextField
                        id={"institution"}
                        value={institution}
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
                                Institución Bancaria
                            </Typography>
                        }
                        variant="standard"
                        fullWidth
                        margin="normal"
                        // Usar los datos de selectedData
                        onChange={(event) => handleTextFieldChange(event, "deductible_number")}


                    />

                </Box>
                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
                    <Button size="medium" variant="contained" color="secondary"
                        sx={buttons.registerButton}
                        endIcon={<AddIcon />}
                        fullWidth
                    // onClick={handleOpenAddCar}
                    >
                        Agregar Institución
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
                            Institución creada con éxito
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
                            La institución no se pudo crear
                        </Alert>
                    )}
                </Stack>
                <TextField
                    label={<Typography sx={login.textoInput} >Buscar institución</Typography>}
                    variant="outlined"
                    fullWidth
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    sx={login.textoContrasena}
                />
                <Box sx={{ width: '100%', height: '200px', overflow: 'auto' }}>
                    <List>
                        {filteredItems.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemButton onClick={() => handleItemClick(item.id)}>
                                    <Typography sx={home.homeTextH4} >{item.value}</Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
             

                <Modal
                    open={isModalEditOpen}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        bgcolor: 'background.paper',
                        border: '0px solid #000',
                        boxShadow: 20,
                        p: 4,
                    }}>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>

                            <Typography margin={'1rem 0'} id="modal-modal-title" sx={home.homeTextH3}>
                                Editar Institución
                            </Typography>
                          


                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                                <TextField
                                    id={"institution"}
                                    value={editInstitution}
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
                                            Institución Bancaria
                                        </Typography>
                                    }
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    // Usar los datos de selectedData
                                    onChange={(event) => handleTextFieldEditChange(event)}


                                />

                            </Box>

                            <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                                    <Button size="medium" variant="contained" color="secondary"
                                        onClick={() => updateOnServer()}
                                        sx={buttons.registerButton}
                                        endIcon={<EditIcon />}  >
                                        Editar Institución
                                    </Button>

                                </Box>
                            </Box>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {isAlertSuccessEditOpen && (
                                    <Alert
                                        open={isAlertSuccessEditOpen}
                                        severity="success"
                                        sx={{
                                            fontFamily: 'Cairo',
                                            textAlign: 'Right',
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Institución editada
                                    </Alert>
                                )}
                            </Stack>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {isAlertErrorEditOpen && (
                                    <Alert
                                        open={isAlertErrorEditOpen}
                                        severity="error"
                                        sx={{
                                            fontFamily: 'Cairo',
                                            textAlign: 'Right',
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        No se pudo editar la institución
                                    </Alert>
                                )}
                            </Stack>




                        </div>
                    </Box>
                </Modal >
            </Paper>
        </ThemeProvider>
    );
}
export default AccessBanks;