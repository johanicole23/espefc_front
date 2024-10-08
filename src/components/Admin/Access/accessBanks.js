
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
    const [isAlertSuccessUpdatedOpen, setIsAlertSuccessUpdatedOpen] = useState(false);
    const [isAlertErrorUpdatedOpen, setIsAlertErrorUpdatedOpen] = useState(false);

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [editInstitution, setEditInstitution] = useState('Ninguna');
    const [institution, setInstitution] = useState('');

    const [selectedItem, setSelectedItem] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [newData, setNewData] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [token, setToken] = useState(null);


    const handleCloseEdit = () => {
        setIsModalEditOpen(false);
    };
    useEffect(() => {
        
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        obtenerInstituciones();
    }, [token]);

    async function obtenerInstituciones() {
        try {
            const response = await axios.post('http://localhost:3000/api/institutions', { authorization: token });
            console.log("instituciones", response.data.institutions);
            setNewData(response.data.institutions);

        } catch (error) {
            console.error('Error al obtener las instituciones', error);
        }
    };

    async function updateOnServer() {
        try {
            const response = await axios.post('http://localhost:3000/api/updateInstitution', {
                institution_id: selectedItem,
                institution_name: editInstitution,
                authorization: token
            });

            if (response.data.success) {
                setIsAlertSuccessEditOpen(true);
                setIsAlertErrorEditOpen(false);
                obtenerInstituciones();
            } else {
                setIsAlertSuccessEditOpen(false);
                setIsAlertErrorEditOpen(true);
            }
        } catch (error) {
            console.error('Error al actualizar la noticia', error);
            console.error('Error en la noticia:', error);
            setIsAlertErrorOpen(true);
            setIsAlertSuccessOpen(false);
        }

        setTimeout(() => {
            setIsModalEditOpen(false);
            setIsAlertSuccessEditOpen(false);
            setIsAlertErrorEditOpen(false);
            setSelectedItem(null);
            setEditInstitution('');

        }, 2000);
    }


    async function addOnServer() {

        try {
            const response = await axios.post('http://localhost:3000/api/createInstitution', {
                institution_name: institution,
                authorization: token
            });

            if (response.data.success) {
                setIsAlertSuccessOpen(true);
                setIsAlertErrorOpen(false);
                obtenerInstituciones();

            } else {
                console.error('Error al actualizar noticia:', response.data.message);
                setIsAlertErrorOpen(true);
                setIsAlertSuccessOpen(false);
            }

        } catch (error) {
            console.error('Error al actualizar la noticia', error);
            console.error('Error en la noticia:', error);
            setIsAlertErrorOpen(true);
            setIsAlertSuccessOpen(false);
        }
        setTimeout(() => {
            setIsAlertErrorOpen(false);
            setIsAlertSuccessOpen(false);
            setInstitution('');
        }, 5000);
    }

    //Función que actualiza el estado de los campos de texto en AddCar
    function handleTextFieldChange(event, key) {

        const newValue = event.target.value;
        setInstitution(newValue);
        setIsAlertErrorOpen(false);
        setIsAlertSuccessOpen(false);

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
        setEditInstitution(newData[id - 1].institution_name);
    };

    useEffect(() => {

        const filteredItems = newData.filter(
            (item) => item.institution_name.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredItems(filteredItems);
    }, [newData, filterText]);


    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 15% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Instituciones Bancarias </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
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
                            onChange={(event) => handleTextFieldChange(event, "institution_name")}


                        />
                        <Box sx={{ margin: '1rem 0 ', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
                            <Button size="medium" variant="contained" color="secondary"
                                sx={buttons.registerButton}
                                endIcon={<AddIcon />}
                                fullWidth
                                onClick={addOnServer}
                            >
                                Agregar Institución
                            </Button>

                        </Box>
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

                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                        <TextField
                            label={<Typography sx={login.textoInput} >Buscar institución</Typography>}
                            variant="outlined"
                            fullWidth
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            sx={login.textoContrasena}
                        />
                        <br />
                        <br />
                        <Box sx={{ width: '100%', height: '200px', overflow: 'auto' }}>
                            <List>
                                {filteredItems.map((item) => (
                                    <ListItem key={item.institution_id}>
                                        <ListItemButton onClick={() => handleItemClick(item.institution_id)}>
                                            <Typography sx={home.homeTextH4} >{item.institution_name}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                    </Box>
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