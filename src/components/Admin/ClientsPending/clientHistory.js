
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
  Chip, Paper, Switch,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import axios from 'axios';
function LoanHistory() {


  const [open, setOpen] = React.useState(false);
  const [table1, setTable1] = React.useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);

  const handleOpenLoanHistory = (amortization, amount, interest, term, item, index) => {
    var tablaAmortizacion = [];
    if (amortization === 'Alemán') {
      tablaAmortizacion = calcularTablaAmortizacionAleman(amount, interest, term, amount);
    }
    else {
      tablaAmortizacion = calcularTablaAmortizacionFrances(amount, interest, term, amount);
    }
    tablaAmortizacion.forEach(fila => {
    });
    setTable1(tablaAmortizacion);
    setSelectedForm(index);
    setIsModalSucessOpen(true);

  };


  const handleCloseLoanHistory = () => {
    setIsModalSucessOpen(false);

  }

  const loanHistory = [
    {
      index: 0,
      id: '1751040716',
      name: 'Johanna Nicole Molina Pinto',
      color: '#005f8f',
    },
    {
      index: 1,
      id: '1751040716',
      name: 'Johanna Nicole Molina Pinto',
      color: '#b0d626',
    },
    {
      index: 2,
      id: '1751040716',
      name: 'Johanna Nicole Molina Pinto',
      color: '#005f8f',
    },
    {
      index: 3,
      id: '1751040716',
      name: 'Johanna Nicole Molina Pinto',
      color: '#b0d626',
    },
    {
      index: 4,
      id: '1751040716',
      name: 'Johanna Nicole Rivera Pinto',
      color: '#005f8f',
    },
    {
      index: 5,
      id: '1751040716',
      name: 'Ezequiel Mateo Castillo Hidalgo',
      color: '#b0d626',
    },

  ]
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#005f8f'

      },
      secondary: {
        main: '#FE5B78'
      },
      terciary: {
        main: '#b0d626'

      },
    },
  });
  const [searchValue, setSearchValue] = useState('');
  const filteredClients = loanHistory.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pendingUsers');

        // Verificar si la solicitud fue exitosa antes de actualizar el estado
        if (response.data.success) {
          setPendingUsers(response.data);
        } else {
          console.error('Error al cargar los usuarios pendientes:', response.data.message);
        }
      } catch (error) {
        console.error('Error de red:', error.message);
      }
    };

    // Llamar a la función para obtener los usuarios pendientes al montar el componente
    fetchPendingUsers();
  }, []); // El array vacío indica que este efecto se ejecutará solo una vez al montar el componente

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} marginTop={'2rem'} >
          <TextField
            sx={{ ...login.textoContrasena, width: '500px' }}
            id="search"
            label={<Typography sx={login.textoInput} >Ingrese el nombre del cliente</Typography>}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ color: '#005f8f' }} />
              ),
            }}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2 }}>

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} marginTop={'2rem'} >

              {filteredClients.map((item, index) => (
                <Box marginBottom={'20px'} key={item.index}>

                  <Paper sx={{ height: '2.2rem' }}>
                    <Box margin={'0 2rem'} display="flex" alignItems="center" justifyContent="space-between" flexDirection={'row'} >
                      <Typography marginRight={'5px'} sx={home.homeTextH14Light}>Nombre del Usuario </Typography>
                      <Chip marginLeft={'5px'} style={{ background: item.color }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '210px' }}>{item.name}</Typography>} variant="outlined" />
                      <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>{item.id} </Typography>} />
                      <Typography marginLeft={'5px'} sx={home.homeTextH14Light}>Aceptar</Typography><Switch color='terciary'  {...label} defaultChecked />
                      <Typography sx={home.homeTextH14Light}>Eliminar</Typography><Switch color='secondary'  {...label} defaultChecked />
                    </Box>
                  </Paper>
                </Box>

              ))}
            </Box>
          </Box>

        </Box>



      </ThemeProvider>
    </Box>

  );
}
export default LoanHistory;



