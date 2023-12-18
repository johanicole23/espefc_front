import React, { useState } from 'react';
import { convertExcelToCSV, convertCSVToJSON } from '../../../utils/convert';
import {
    ThemeProvider, TextField, Alert, Grid,
    Stack, Typography, Box, Button, Paper, Popover, Modal
} from '@mui/material';
import home from '../../../styles/pages/home';
import buttons from '../../../styles/buttons';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {
    theme,
    textFieldNews,
} from './accessConstants';
import axios from 'axios';


function FileConverter() {
    const [excelFile, setExcelFile] = useState(null);
    const [jsonData, setJSONData] = useState(null);

    const handleExcelFileChange = (event) => {
        const file = event.target.files[0];
        var nuevoJSON = [];
        setExcelFile(file);

        if (file) {
            convertExcelToCSV(file, (csvData) => {
                convertCSVToJSON(csvData, (jsonData) => {
                    setJSONData(jsonData);
                    if (jsonData.length > 0) {
                        nuevoJSON = {
                            balance_json: jsonData.map((registro) => ({
                                user_ci: String(registro.cedula), // Asegurarse de que sea una cadena
                                user_balance: registro["CTA. INV"] || 0, // Usar 0 si "CTA. INV" es null
                            })),
                        }
                        actualizarSaldos(nuevoJSON);
                    }
                });
            });
        }
    };

    async function actualizarSaldos(jsonUpdate) {
        const res = await axios.post('http://localhost:3000/api/updateBalance', jsonUpdate);
        console.log(res);
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
                <Typography marginBottom={'1rem'} variant="subtitle1" sx={home.homeTextH3Light}>Actualización de Saldos</Typography>
                <Typography sx={home.homeTextH5Light} >Sube el archivo excel:  </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component="label"
                    startIcon={<CloudUploadIcon />}> <Typography sx={home.homeTextH14LightWhite}> {excelFile ? 'Cambiar archivo' : 'Subir archivo'} </Typography>
                    <VisuallyHiddenInput type="file" onChange={handleExcelFileChange} />
                </Button>
                {excelFile && <div><Typography sx={home.homeTextH3Light}
                >Archivo seleccionado: </Typography><Typography sx={home.homeTextH4}>{excelFile.name}</Typography></div>}
            </Paper>
        </ThemeProvider>
    );
};

export default FileConverter;