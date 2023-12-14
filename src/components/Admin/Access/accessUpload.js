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


function FileConverter() {
    const [excelFile, setExcelFile] = useState(null);
    const [csvData, setCSVData] = useState(null);
    const [jsonData, setJSONData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleExcelFileChange = (event) => {
        const file = event.target.files[0];
        setExcelFile(file);
    };

    const handleConvertExcelToCSV = () => {
        convertExcelToCSV(excelFile, (csvData) => {
            setCSVData(csvData);
        });
    };

    const handleConvertCSVToJSON = () => {
        convertCSVToJSON(csvData, (jsonData) => {
            setJSONData(jsonData);
        });
    };

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
                    startIcon={<CloudUploadIcon />}>
                    <VisuallyHiddenInput type="file" onChange={handleExcelFileChange} />
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    {excelFile && <div><Typography sx={home.homeTextH3Light}
                    >Archivo seleccionado: </Typography> {excelFile.name}</div>}
                    <br />
                </Box>

            </Paper>
        </ThemeProvider>
    );
};

export default FileConverter;