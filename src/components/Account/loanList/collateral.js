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
import { validarCedulaEcuatoriana } from '../../Register/registerConstants';
import Tab1 from './loanDataChrigraphic';
import Tab2 from './personalDataChrigraphic';

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







function Tab3() {
  return (
    <div>
      <Typography variant="h6">Contenido de la Pestaña 3</Typography>
      {/* Agrega contenido específico para la Pestaña 3 */}
    </div>
  );
}
function App() {

  const [activeTab, setActiveTab] = useState(0);

  const [isTerm, setTerm] = useState('');

  const handleNextTab = () => {
    setActiveTab(activeTab + 1);
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
  };

  const [formData, setFormData] = useState({

    institution: '',
    id: '',
    name: '',
    amount: '',
    isTerm:'',
    accountNumber: '',
    isCheckedAhorro: true,
    isCheckedCorriente: false,
    isCheckedFrances: false,
    isCheckedAleman: true,


    field2: '', field3: ''
  });
  const handleTabChange = (event, newIndex) => {
    setActiveTab(newIndex);
  };
  const handleDataChange = (newData) => {
    setFormData(newData);
  };



  return (
    <div>
      <AppBarDrawer />
      <ThemeProvider theme={theme}>
        <Box display={'flex'} sx={{ marginLeft: "10%" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Pestaña 1" />
            <Tab label="Pestaña 2" />
            <Tab label="Pestaña 3" />
          </Tabs>
        </Box>
        <Box display={'flex'} justifyContent={'center'} >
          <Box >
            {activeTab === 0 && (
              <Tab1 data={formData} onDataChange={handleDataChange} onNextTab={handleNextTab} />
            )}
            {activeTab === 1 && (
              <Tab2 data={formData} onDataChange={handleDataChange} onPrevTab={handlePrevTab} />
            )}

            {activeTab === 2 && <Tab3 />}
          </Box>
        </Box>
        <div>
          <h1>Generar PDF</h1>
          <button onClick={() => generatePDF(formData)}>Generar PDF a partir de los campos</button>
        </div>
      </ThemeProvider>
    </div >
  );
}

export default App;

async function generatePDF(formData) {
  try {
    // Ruta al PDF existente
    const rutaPDFExistente = '/files/solicitud_credito_quirografario.pdf';
    const existingPdfBytes = await fetch(rutaPDFExistente).then((res) => res.arrayBuffer());

    // Cargar el PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const [page] = pdfDoc.getPages();

    // Obtener el contenido de los campos de entrada
    const { institution, id, name, amount,isTerm, accountNumber,isCheckedAhorro, isCheckedCorriente,isCheckedFrances, isCheckedAleman } = formData;
    console.log(name);
    const date = new Date().toISOString().slice(0, 10); 

    const contentToInsert = [
      { text: 'X', x: 382, y: 748, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: date, x: 80, y: 743, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: name, x: 75, y: 713, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: id, x: 110, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: amount, x: 378, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: String(isTerm), x: 495, y: 691, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: accountNumber, x: 200, y: 649, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: institution, x: 70, y: 630, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
    ];
   if (isCheckedAhorro) {
      contentToInsert.push(
        { text: 'X', x: 87, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!isCheckedAhorro){
      contentToInsert.push(
        { text: 'X', x: 160, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }

    if (isCheckedFrances) {
      contentToInsert.push(
        { text: 'X', x: 205, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!isCheckedFrances){
      contentToInsert.push(
        { text: 'X', x: 275, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }

    // Agregar el contenido al PDF existente
    contentToInsert.forEach(({ text, x, y, size, color }) => {
      page.drawText(text, { x, y, size, color });
    });

    // Serializar el PDF modificado
    const modifiedPdfBytes = await pdfDoc.save();

    // Guardar el PDF modificado en una nueva ruta
    const nuevaRutaPDF = 'pdf_modificado.pdf';
    const nuevoPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const nuevoPdfUrl = URL.createObjectURL(nuevoPdfBlob);

    // Descargar el PDF modificado o realizar otras acciones necesarias
    const link = document.createElement('a');
    link.href = nuevoPdfUrl;
    link.download = 'formulario_modificado.pdf';
    link.click();
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
}
