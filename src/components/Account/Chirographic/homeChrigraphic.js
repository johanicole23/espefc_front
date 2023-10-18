import React, { useState } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';
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
import { cardLoanChirographic } from '../accountConstants';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import account from '../../../styles/pages/account';
import buttons from '../../../styles/buttons';

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

function App() {
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box marginTop="2rem">
                    <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                        <Box display={'flex'} justifyContent={'center'} >
                            <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                    <Typography sx={home.homeTextH3Light}
                                    >
                                        <br /> Para iniciar con el proceso de solictud de crédito quirografario, debe llenar el formulario de solictud y luego subirlo junto con los demás archivos requeridos para el proceso.
                                        Los archivos se entregaran al oficial de crédito, el cual revisará su cuenta individual y si tiene garantías comprometidas.<br />
                                        <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} >  IMPORTANTE: </span> el monto al cual podrá acceder es el total de su cuenta individual, si desea un monto superior al de su cuenta individual, podrá presentar
                                        hasta 3 garantes que respalden el monto solicitado con sus cuentas individuales.<br /><br />
                                    </Typography>
                                  
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ margin: '0 15% 5% 15%' }} >
                    {cardLoanChirographic.map((item) => (
                        <Card sx={account.formularyFormatCardLoan}>
                            <CardActionArea href={item.link}>
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                            <item.icon sx={{ fontSize: '65px', color: item.color }} />
                                        </Box>

                                        <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>

            </ThemeProvider>
        </div >
    );
}

export default App;
