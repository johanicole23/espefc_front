import React, { useState } from 'react';
import { convertExcelToCSV, convertCSVToJSON } from '../../../utils/convert';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal, createTheme
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {textFieldNews,
} from './accessConstants';
import axios from 'axios';

const theme = createTheme({
    palette: {
      primary: {
        main: '#005f8f'
  
      },
      secondary: {
        main: '#005F8F'
      },
      terciary: {
        main: '#b0d626'
  
      },
    },
  });

function LoanFileConverter() {
    const [excelFile, setExcelFile] = useState(null);
    const [jsonUpdate, setJsonUpdate] = useState(null);
    const [notification, setNotification] = useState('Actualizar');

    const handleExcelFileChange = (event) => {
        const file = event.target.files[0];
        var nuevoJSON = [];
        setExcelFile(file);

        if (file) {
            convertExcelToCSV(file, (csvData) => {
                convertCSVToJSON(csvData, (jsonData) => {
                    if (jsonData.length > 0) {
                        nuevoJSON = {
                            loan_json: jsonData.map((registro) => ({
                                user_ci: String(registro.cedula),
                                loan_num: String(registro.numcredito),
                                loan_type: String(registro.tipocredito),
                                loan_amount: registro.capital,
                                loan_deadline: registro.plazo,
                                loan_pending_amount: registro.salcapital,
                                createdAt: Date.parse(registro.fecha),
                            })),
                        }
                        setJsonUpdate(nuevoJSON);
                        console.log(nuevoJSON);
                    }
                });
            });
        }
    };

    const handleUpdate = () => {
        actualizarSaldos(jsonUpdate);
    }

    async function actualizarSaldos(jsonUpdate) {
        const res = await axios.post('http://localhost:3000/api/updateLoansAuto', jsonUpdate);
        setNotification(res.data.message);
        setTimeout(() => {
            setExcelFile(null);
            setNotification('Actualizar');
        }, 3000);
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <ThemeProvider theme={theme} >


            <Paper elevation={5} sx={{ padding: '2% 20% ', width: '80%', marginBottom: '2rem' }}>
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Actualización de Préstamos</Typography>
                <Typography sx={home.homeTextH5Light} >Sube el archivo excel:  </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component="label"
                > <Typography sx={home.homeTextH14LightWhite}> {excelFile ? 'Cambiar archivo' : 'Subir archivo'} </Typography>
                    <VisuallyHiddenInput type="file" onChange={handleExcelFileChange} />
                </Button>
                <br />
                <br />
                {excelFile && <div><Typography sx={home.homeTextH3Light}
                >Archivo seleccionado: </Typography><Typography sx={home.homeTextH4}>{excelFile.name}</Typography></div>}
                {excelFile && (
                    <Button
                        sx={{ marginTop: '1rem', width: '80%', marginLeft: '10%', marginRight: '10%' }}
                        variant="contained"
                        color="terciary"
                        component="label"
                        onClick={handleUpdate}
                        startIcon={<CloudUploadIcon style={{ color: '#ffffff' }}/>}> <Typography sx={home.homeTextH4W600}>{notification}</Typography>
                    </Button>
                )}
            </Paper>
        </ThemeProvider>
    );
};

export default LoanFileConverter;