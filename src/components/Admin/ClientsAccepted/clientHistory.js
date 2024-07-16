
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
  Chip, Paper, Switch, Modal, Button, Stack, Alert
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';
import buttons from '../../../styles/buttons';
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from '@mui/icons-material/Paid';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useEffect } from 'react';
import axios from 'axios';
function LoanHistory() {



  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isAlertSuccessAddOpen, setIsAlertSuccessAddOpen] = useState(false);
  const [isAlertErrorAddOpen, setIsAlertErrorAddOpen] = useState(false);
  const [isAlertBalanceOpen, setIsAlertBalanceOpen] = useState(false);
  const [userBalance, setUserBalance] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(null);

  const handleOpenBalance = (idClient) => {
    setIsModalSucessOpen(true);
    setUserId(idClient);
    console.log("seteando id:", idClient);
  };


  const handleCloseBalance = () => {
    setIsModalSucessOpen(false);

  }




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

    const token = window.localStorage.getItem('authUser');
    if (token) {
      setToken(token);
    }
  }, []);


  useEffect(() => {
    // Función para obtener usuarios pendientes desde el servidor
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/getApprovedUsers',
          { authorization: token });
        setPendingUsers(response.data.customers);
        setUsersList(response.data.users);
      } catch (error) {
        console.error('Error al obtener usuarios pendientes:', error);
      }
    };

    // Llamada a la función al montar el componente (puedes ajustar según tus necesidades)
    fetchPendingUsers();
  }, [token]);

  const handleSwitchChange = async (event, index) => {
    try {

      // Realiza la solicitud al servidor
      console.log('El id del usuario es:', index);

      if (event.target.checked) {
        console.log('El interruptor está activado');
        const response = await axios.post('http://localhost:3000/api/disableUser', {
          user_id: index,
          authorization: token
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
  //Función que actualiza el estado de los campos de texto en AddCar
  function handleTextFieldChange(event) {

    const newValue = event.target.value;
    if (newValue < 25) {
      setIsAlertBalanceOpen(true);
    }
    else {
      setIsAlertBalanceOpen(false);
    }
    setUserBalance(newValue);
    setIsAlertErrorAddOpen(false);
    setIsAlertSuccessAddOpen(false);

  }

  async function handleButtonAddBalance() {

    try {
      const response = await axios.post('http://localhost:3000/api/editBalanceManual',
        {
          user_id: userId,
          user_balance: userBalance,
          authorization: token

        });

      // Manejar la respuesta del servidor
      console.log(response.data);
      setIsAlertErrorAddOpen(false);
      setIsAlertSuccessAddOpen(true);

    } catch (error) {
      console.error(error);
      setIsAlertErrorAddOpen(true);
      setIsAlertSuccessAddOpen(false);
      // Manejar el error de alguna manera adecuada para tu aplicación
    }
    setTimeout(() => {
      // Realizar acciones después de esperar 5 segundos
      setIsAlertErrorAddOpen(false);
      setIsAlertSuccessAddOpen(false);

    }, 5000);
  }



  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} marginTop={'2rem'} >
          <TextField
            sx={{ ...login.textoContrasena, width: '500px' }}
            id="searchClient"
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
                      <Typography marginLeft={'15px'} marginRight={'15px'} sx={home.homeTextH14Light}>CI:  </Typography>
                      <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>{usersList[index].user_ci} </Typography>} />
                      <Typography marginLeft={'15px'} marginRight={'15px'} sx={home.homeTextH14Light}>Fecha de creación </Typography>
                      <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>{item.createdAt.slice(0, 10)} </Typography>} />
                      <Typography marginLeft={'15px'} sx={home.homeTextH14Light}>Desactivar</Typography><Switch color='secondary' onClick={(event) => handleSwitchChange(event, item.customer_id)}  {...label} />
                      <Chip style={{ background: '#D6C426', color: 'white' }} icon={<AssessmentIcon style={{ color: 'white' }} />} label={<Typography sx={home.homeTextH14LightWhite}>Asignar saldo </Typography>} onClick={() => handleOpenBalance(item.customer_id)} />
                    </Box>
                  </Paper>
                </Box>

              ))}
            </Box>


          </Box>

        </Box>




        <Modal
          open={isModalSucessOpen}
          onClose={handleCloseBalance}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            bgcolor: 'background.paper',
            border: '0px solid #000',
            boxShadow: 20,
            p: 4,
          }}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>

              <Typography margin={'1rem 0'} id="modal-modal-title" sx={home.homeTextH3}>
                Asignar un monto a la cuenta de este cliente
              </Typography>



              <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                <PaidIcon sx={{ color: "#005f8f", mr: 1, my: 1 }} />
                <TextField
                  id="balance"
                  type="number"
                  label={
                    <Typography
                      sx={{
                        fontFamily: 'Cairo',
                        textTransform: 'none',
                        fontSize: '16px',
                        width: '100%',

                      }}
                    >
                      Saldo de la cuenta
                    </Typography>
                  }
                  variant="standard"
                  fullWidth
                  margin="normal"
                  onChange={(event) => handleTextFieldChange(event)}
                  helperText={<Typography sx={login.textoMensajeAbajoInput} >Solo números</Typography>}

                />

              </Box>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {isAlertBalanceOpen && (
                  <Alert
                    open={isAlertBalanceOpen}
                    severity="error"
                    sx={{
                      fontFamily: 'Cairo',
                      textAlign: 'Right',
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    El valor debe ser igual o mayor a $25
                  </Alert>
                )}
              </Stack>



              <Box marginTop={'2rem'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                <Button size="medium" variant="contained" color="terciary"
                  onClick={() => handleButtonAddBalance()}
                  sx={buttons.appBarButtonRegister}
                  endIcon={<AddIcon />} >
                  Asignar monto
                </Button>
              </Box>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {isAlertSuccessAddOpen && (
                  <Alert
                    open={isAlertSuccessAddOpen}
                    severity="success"
                    sx={{
                      fontFamily: 'Cairo',
                      textAlign: 'Right',
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Valor agregado con éxito
                  </Alert>
                )}
              </Stack>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {isAlertErrorAddOpen && (
                  <Alert
                    open={isAlertErrorAddOpen}
                    severity="error"
                    sx={{
                      fontFamily: 'Cairo',
                      textAlign: 'Right',
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    No se pudo agregar el valor.
                  </Alert>
                )}
              </Stack>




            </div>
          </Box>
        </Modal >




      </ThemeProvider>
    </Box>

  );
}
export default LoanHistory;



