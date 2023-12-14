import React, { useState, useEffect } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme, Tabs, Tab, Typography, Box, Button } from '@mui/material';
import home from '../../../styles/pages/home';
import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';
import Tab1 from './Tabs/loanDataCollateral';
import Tab2 from './Tabs/personalDataCollateral';
import Tab3 from './Tabs/spouseDataCollateral';
import Tab4 from './Tabs/referencesDataCollateral';
import Tab6 from './messageCollateral';
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
  
  useEffect(() => {
    const newCustomerData = window.localStorage.getItem('customer');
    const newUserData = window.localStorage.getItem('user');
  
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
        loan_type: 'Prendario',
        loan_amount: formData.amount,
        loan_deadline: formData.isTerm, // Ajusta la fecha según tus necesidades
        loan_amortization_type: amortization,
        loan_guarantors: formData.fullNameGuarantor1  
      });
  
  
  
  
      // Manejar la respuesta del servidor
      console.log(response.data);
  
    } catch (error) {
      console.error(error);
      // Manejar el error de alguna manera adecuada para tu aplicación
    }
  }

  const [formData, setFormData] = useState({

    modelCar: '',
    mark: '',
    yearCar: '',
    amount: '',
    isTerm: '',
    isCheckedFrances: false,
    isCheckedAleman: true,

    id: '',
    name: '',
    civilState: '',
    age: '',
    bornDate: '',
    direction: '',
    cellphone: '',
    email: '',
    sede: '',
    isCheckedAdmin: true,
    isCheckedTeacher: false,
    isCheckedYes: true,
    isCheckedNo: false,

    idGuarantor1: '',
    fullNameGuarantor1: '',
    cellphoneGuarantor1: '',
    emailSpouse: '',

    fullNameGuarantor2: '',
    emailReference: '',
    cellphoneGuarantor2: '',
    directionSpouse: '',
    directionWork: '',


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
            <Tab label={<Typography sx={home.homeTextH4} >Datos del Vehículo</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Datos personales</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Datos del Cónyuge</Typography>} />
            <Tab label={<Typography sx={home.homeTextH4} >Referencias Personales</Typography>} />

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
              <Tab6 />
            )}

          </Box>

        </Box>
        <Box display={'flex'} justifyContent={'center'}  >
          <Button 
          onClick={() => {
            generatePDF(formData);
            createLoan(formData);
          }} >
            <DownloadForOfflineIcon sx={{ fontSize: '60px' }}></DownloadForOfflineIcon></Button>
        </Box>

      </ThemeProvider>
    </div >
  );
}

export default App;

async function generatePDF(formData) {
  try {
    // Ruta al PDF existente
    const rutaPDFExistente = '/files/solicitud_prestamo_prendario.pdf';
    const existingPdfBytes = await fetch(rutaPDFExistente).then((res) => res.arrayBuffer());

    // Cargar el PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const [page] = pdfDoc.getPages();

    // Obtener el contenido de los campos de entrada
    const { modelCar, mark, yearCar, amount, isTerm, isCheckedFrances, isCheckedAleman,
      id, name, civilState, age, bornDate, direction, cellphone, email, sede, isCheckedAdmin, isCheckedTeacher, isCheckedYes, isCheckedNo,
      idGuarantor1, fullNameGuarantor1, cellphoneGuarantor1, emailSpouse,
      fullNameGuarantor2, emailReference, cellphoneGuarantor2, directionSpouse, directionWork,
    } = formData;

    console.log(name);
    const date = new Date().toISOString().slice(0, 10);
  
    const contentToInsert = [     
      { text: date, x: 80, y: 723, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: modelCar, x: 90, y: 678, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: mark, x: 75, y: 698, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: amount, x: 340, y: 658, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: String(isTerm), x: 100, y: 658, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: yearCar, x: 335, y: 697, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },

      
      { text: id, x: 190, y: 590, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: name, x: 200, y: 610, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: civilState, x: 100, y: 570, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: age, x: 335, y: 590, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: bornDate, x: 400, y: 531, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: direction, x: 180, y: 550, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: cellphone, x: 130, y: 531, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: email, x: 135, y: 511, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: sede, x: 75, y: 491, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },

      { text: idGuarantor1, x: 200, y: 443, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: fullNameGuarantor1, x: 200, y: 463, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: cellphoneGuarantor1, x: 100, y: 423, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: emailSpouse, x: 400, y: 423, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },

     
      { text: fullNameGuarantor2, x: 270, y: 395, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: cellphoneGuarantor2, x: 100, y: 356, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: emailReference, x: 135, y: 376, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: directionSpouse, x: 180, y: 335, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },
      { text: directionWork, x: 400, y: 355, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) },


    ];
    

    if (isCheckedFrances) {
      contentToInsert.push(
        { text: 'X', x: 230, y: 638, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!isCheckedFrances) {
      contentToInsert.push(
        { text: 'X', x: 290, y: 638, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }

    if (isCheckedAdmin) {
      contentToInsert.push(
        { text: 'X', x: 423, y: 491, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else if (!isCheckedAdmin) {
      contentToInsert.push(
        { text: 'X', x: 485, y: 491, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    if (isCheckedYes) {
      contentToInsert.push(
        { text: 'X', x: 413, y: 570, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
      );
    }
    else {
      contentToInsert.push(
        { text: 'X', x: 453, y: 570, size: 10, color: rgb(3 / 255, 75 / 255, 110 / 255) }
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
    link.download = 'formulario_prestamo_prendario.pdf';
    link.click();
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
}
