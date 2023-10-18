import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import logo from '../../../assets/logoFC.png';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import TextField from '@mui/material/TextField';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyAppBar from '../../MyComponents/myAppBar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Carousel from 'react-material-ui-carousel';
import TtyIcon from '@mui/icons-material/Tty';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicationIcon from '@mui/icons-material/Medication';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import home from '../../../styles/pages/home';
import loan from '../../../styles/pages/loan';
import login from '../../../styles/pages/login';
import appbar from '../../../styles/components/appbar';
import { useRef } from 'react';
import { Document, Page } from 'react-pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocument, rgb } from 'pdf-lib';
import Select from 'react-select';
import MenuItem from '@mui/material/MenuItem';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { validarCedulaEcuatoriana } from '../../Register/registerConstants';
import { useEffect } from 'react';
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
function Tab6({ data, onDataChange, onPrevTab, onNextTab }) {




    return (
        <Box marginTop="2rem">
            <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                <Box display={'flex'} justifyContent={'center'} >
                    <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                            <Typography sx={home.homeTextH3Light}
                            >
                                <br />Si ya terminaste de completar los campos necesarios para el formulario puedes descargar tu formulario convertido en PDF aquí abajo. Toma en cuenta que para enviarlo debe contar con las firmas electrónicas de los garantes y la tuya.<br /><br />
                            </Typography>
                        </Box>
                    </Paper>
                </Box>

            </Box>
        </Box>

    );
}
export default Tab6;