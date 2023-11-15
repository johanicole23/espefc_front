
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
      id: '1851040716',
      name: 'Johanna Nicole Molina Pinto',
      color: '#b0d626',
    },
    {
      index: 4,
      id: '1751040717',
      name: 'Johanna Nicole Rivera Pinto',
      color: '#005f8f',
    },
    {
      index: 5,
      id: '1851040716',
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
  const filteredClients = pendingUsers.filter(item =>
    item.customer_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    // Función para obtener usuarios pendientes desde el servidor
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getApprovedUsers');
        setPendingUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios pendientes:', error);
      }
    };

    // Llamada a la función al montar el componente (puedes ajustar según tus necesidades)
    fetchPendingUsers();
  }, []);

  const handleSwitchChange = async (event, index) => {
    try {
      
      // Realiza la solicitud al servidor
      console.log('El id del usuario es:', index);

      if (event.target.checked) {
        console.log('El interruptor está activado');
        const response = await axios.post('http://localhost:3000/api/disableUser', {
          user_id: index,
        });
        if (response.data.success) {
          console.log('Usuario habilitado con éxito');
          // Puedes realizar otras acciones después de habilitar al usuario
        } else {
          console.error('Error al habilitar el usuario:', response.data.message);
        }

      } else {
        console.log('El interruptor está desactivado');

      }    

      
    } catch (error) {
      console.error('Error al realizar la solicitud al servidor:', error);
    }

    // Acciones que deseas realizar cuando se activa o desactiva el interruptor

  };

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
                      <Chip marginLeft={'5px'} style={{ background: '#b0d626' }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '210px' }}>{item.customer_name}</Typography>} variant="outlined" />
                      <Typography marginLeft={'15px'} marginRight={'15px'} sx={home.homeTextH14Light}>Fecha de creación </Typography>
                      <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>{item.createdAt.slice(0, 10)} </Typography>} />
                      <Typography marginLeft={'15px'}  sx={home.homeTextH14Light}>Desactivar</Typography><Switch color='secondary' onClick={(event) => handleSwitchChange(event, item.customer_id)}  {...label}/>
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



