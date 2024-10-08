import React, { useState, useEffect } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme, Tabs, Tab, Typography, Box, Button } from '@mui/material';
import home from '../../../styles/pages/home';
import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';
import Tab1 from './Tabs/loanDataChrigraphic';
import Tab2 from './Tabs/personalDataChrigraphic';
import Tab3 from './Tabs/guarantor1DataChrigraphic';
import Tab4 from './Tabs/guarantor2DataChrigraphic';
import Tab5 from './Tabs/guarantor3DataChrigraphic';
import Tab6 from './messageChrigraphic';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
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


  const [activeTab, setActiveTab] = useState(0);

  const [isTerm, setTerm] = useState('');

  useEffect(() => {
    const userAuth = JSON.parse(window.localStorage.getItem('user'));
    if(!userAuth || userAuth.user_role !== 'usuario'){
        window.location.href = '/prohibido';
    }
},[]); 

  const handleNextTab = () => {
    setActiveTab(activeTab + 1);
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
  };
  const [customerData, setCustomerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const newCustomerData = window.localStorage.getItem('customer');
    const newUserData = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('authUser');
    if(token){
        setToken(token);
    }
    if (newCustomerData && newUserData) {
      setCustomerData(JSON.parse(newCustomerData));
      setUserData(JSON.parse(newUserData));
    }
  
  }, []);


  async function createLoan(formData) {
    console.log(formData);
    let amortization = '';
    if (formData.isCheckedFrances) {
      amortization = 'Frances';
    }
    else if (!formData.isCheckedFrances) {
      amortization = 'Aleman';
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/createLoan', {
        user_id: userData.user_id,
        loan_type: 'Quirografarios',
        loan_amount: formData.amount,
        loan_deadline: formData.isTerm, // Ajusta la fecha según tus necesidades
        loan_amortization_type: amortization,
        loan_guarantors: formData.fullNameGuarantor1 + formData.fullNameGuarantor2 + formData.fullNameGuarantor3,
        authorization: token,
      });
  
  
  
  
      // Manejar la respuesta del servidor
      console.log(response.data);
  
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera adecuada para tu aplicación
    }
  }

  const [formData, setFormData] = useState({

    institution: '',
    id: '',
    name: '',
    amount: '',
    isTerm: '',
    accountNumber: '',
    isCheckedAhorro: true,
    isCheckedCorriente: false,
    isCheckedFrances: false,
    isCheckedAleman: true,

    direction: '',
    cellphone: '',
    phoneConvention: '',
    sede: '',
    others: '',
    isCheckedAdmin: true,
    isCheckedTeacher: false,
    isCheckedYes: true,
    isCheckedNo: false,

    idGuarantor1: '',
    fullNameGuarantor1: '',
    cellphoneGuarantor1: '',
    phoneGuarantor1: '',

    idGuarantor2: '',
    fullNameGuarantor2: '',
    cellphoneGuarantor2: '',
    phoneGuarantor2: '',

    idGuarantor3: '',
    fullNameGuarantor3: '',
    cellphoneGuarantor3: '',
    phoneGuarantor3: '',


  });
  const handleTabChange = (event, newIndex) => {
    setActiveTab(newIndex);
  };
  const handleDataChange = (newData) => {
    setFormData(newData);
  };

  async function generatePDF(formData) {
    try {
      
      formData.id = userData.user_ci;
      formData.name = customerData.customer_name;
  
      const rutaPDFExistente = '/files/solicitud_credito_quirografario.pdf';
      const existingPdfBytes = await fetch(rutaPDFExistente).then((res) => res.arrayBuffer());
  
      // Cargar el PDF existente
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
      // Obtener la primera página del PDF
      const [page] = pdfDoc.getPages();
  
      // Obtener el contenido de los campos de entrada
      const { institution, id, name, amount, isTerm, accountNumber, isCheckedAhorro, isCheckedCorriente, isCheckedFrances, isCheckedAleman,
        direction, cellphone, phoneConvention, isCheckedAdmin, sede, isCheckedNombrament, isCheckedContract, others,
        idGuarantor1, fullNameGuarantor1, cellphoneGuarantor1, phoneGuarantor1,
        idGuarantor2, fullNameGuarantor2, cellphoneGuarantor2, phoneGuarantor2,
        idGuarantor3, fullNameGuarantor3, cellphoneGuarantor3, phoneGuarantor3, } = formData;
  
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
  
        { text: direction, x: 130, y: 572, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: cellphone, x: 130, y: 556, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: phoneConvention, x: 320, y: 556, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: sede, x: 285, y: 536, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
  
        { text: idGuarantor1, x: 375, y: 480, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: fullNameGuarantor1, x: 75, y: 480, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: cellphoneGuarantor1, x: 184, y: 447, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: phoneGuarantor1, x: 365, y: 447, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
  
        { text: idGuarantor2, x: 375, y: 418, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: fullNameGuarantor2, x: 75, y: 418, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: cellphoneGuarantor2, x: 184, y: 386, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: phoneGuarantor2, x: 365, y: 386, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
  
  
        { text: idGuarantor3, x: 375, y: 3558, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: fullNameGuarantor3, x: 75, y: 355, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: cellphoneGuarantor3, x: 184, y: 325, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        { text: phoneGuarantor3, x: 365, y: 325, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
  
      ];
      if (isCheckedAhorro) {
        contentToInsert.push(
          { text: 'X', x: 87, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      else if (!isCheckedAhorro) {
        contentToInsert.push(
          { text: 'X', x: 160, y: 650, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
  
      if (isCheckedFrances) {
        contentToInsert.push(
          { text: 'X', x: 205, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      else if (!isCheckedFrances) {
        contentToInsert.push(
          { text: 'X', x: 275, y: 608, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
  
      if (isCheckedAdmin) {
        contentToInsert.push(
          { text: 'X', x: 158, y: 536, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      else if (!isCheckedAdmin) {
        contentToInsert.push(
          { text: 'X', x: 230, y: 536, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      if (isCheckedNombrament) {
        contentToInsert.push(
          { text: 'X', x: 184, y: 516, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      else if (isCheckedContract) {
        contentToInsert.push(
          { text: 'X', x: 265, y: 516, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      else if (!isCheckedContract && !isCheckedNombrament) {
        contentToInsert.push(
          { text: others, x: 320, y: 516, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
        );
      }
      if (fullNameGuarantor1 != '') {
        contentToInsert.push(
          { text: name, x: 230, y: 463, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
       
        );
      }
      if (fullNameGuarantor2 != '') {
        contentToInsert.push(
          { text: name, x: 230, y: 401, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
        );
      }
      if (fullNameGuarantor3 != '') {
        contentToInsert.push(
          { text: name, x: 230, y: 339, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
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
  

  return (
    <div>
      <AppBarDrawer />
      <ThemeProvider theme={theme}>
        <Box display={'flex'} sx={{ marginLeft: "10%" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={<Typography sx={home.homeTextH4} >Datos del préstamo</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Datos personales</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Garante 1</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Garante 2</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Garante 3</Typography>} />
            <Tab />
          </Tabs>
        </Box>
        <Box display={'flex'} justifyContent={'center'} >
          <Box >
            {activeTab === 0 && (
              <Tab1 data={formData} onDataChange={handleDataChange} onNextTab={handleNextTab} />
            )}
            {activeTab === 1 && (
              <Tab2 data={formData} onDataChange={handleDataChange} onPrevTab={handlePrevTab} onNextTab={handleNextTab} />
            )}
            {activeTab === 2 && (
              <Tab3 data={formData} onDataChange={handleDataChange} onPrevTab={handlePrevTab} onNextTab={handleNextTab} />
            )}
            {activeTab === 3 && (
              <Tab4 data={formData} onDataChange={handleDataChange} onPrevTab={handlePrevTab} onNextTab={handleNextTab} />
            )}
            {activeTab === 4 && (
              <Tab5 data={formData} onDataChange={handleDataChange} onPrevTab={handlePrevTab} onNextTab={handleNextTab} />
            )}
            {activeTab === 5 && (
              <Tab6 />
            )}

          </Box>

        </Box>
        <Box display={'flex'} justifyContent={'center'}  >
          <Button onClick={() => {
            generatePDF(formData);
            createLoan(formData);
          }}><DownloadForOfflineIcon sx={{ fontSize: '60px' }}></DownloadForOfflineIcon></Button>
        </Box>

      </ThemeProvider>
    </div >
  );
}

export default App;



