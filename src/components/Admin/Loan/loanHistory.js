
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
    Chip, Paper, Switch,
} from '@mui/material';
import { TextField, Button, Checkbox, MenuItem, Stack, Alert, Autocomplete } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import {
    style, loanType, textFieldLoan, amortizationType
} from './loanSimulatorConstants';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from '@mui/icons-material/Paid';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';
import buttons from '../../../styles/buttons';


function LoanHistory() {
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

    const [open, setOpen] = React.useState(false);
    const [table1, setTable1] = React.useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [loans, setLoans] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalAddLoanOpen, setIsModalAddLoanOpen] = useState(false);
    const [selectedIdTypeAddLoan, setSelectedIdTypeAddLoan] = useState('');
    const [isAlertSuccessAddOpen, setIsAlertSuccessAddOpen] = useState(false);
    const [isAlertErrorAddOpen, setIsAlertErrorAddOpen] = useState(false);
    const [deductibles, setDeductibles] = useState([]);

    const dataLoans = useRef();

    const [selectedDataAddLoan, setSelectedDataAddLoan] = useState({

        user_id: '',
        loan_type: '',
        loan_amount: '',
        loan_deadline: '',
        loan_amortization_type: '',
        loan_guarantors: '',
        loan_balance: '',

    });



    useEffect(() => {
        fetchDeductibles();
        const interval = setInterval(() => {

            getLoans();
        }, 1000);


    }, []);

    async function fetchDeductibles() {
        try {
          const response = await axios.get('http://localhost:3000/api/deductibles');
          setDeductibles(response.data.deductible);
         
        } catch (error) {
          console.error('Error al obtener deducibles:', error);
         
        }
      }


    const handleOpenLoanHistory = (balance, date, amortization, amount, type, term, item, index) => {
        let interest = 0;
        var tablaAmortizacion = [];

        if (type === 'Quirografario') {
            interest = 9;
        } else if (type === 'Prendario') {
            interest = 10.5;
        } else if (type === 'Salud') {
            interest = 7;
        }
        else {
            interest = 7;
        }


        if (amortization === 'Aleman') {
            tablaAmortizacion = calcularTablaAmortizacionAleman(date, amount, interest, term, amount, deductibles);
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

    const getLoans = async () => {
        try {
            // Realiza la solicitud HTTP al servidor
            const response = await axios.get('http://localhost:3000/api/getLoans');

            // Extrae los préstamos de la respuesta y actualiza el estado
            setLoans(response.data.loans);
            dataLoans.current = response.data.loans; // Guardar en la ref


        } catch (error) {
            console.error(error);
            // Maneja el error de alguna manera adecuada para tu aplicación
        }
    };


    const filteredLoans = loans.filter(loan =>
        loan.loan_customer_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleChangeState = async (state, id) => {
        try {
            const response = await axios.post('http://localhost:3000/api/changeLoanState', {
                loan_id: id,
                loan_state: state,
            });


        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const handleAccept = (id, state) => {

        if (state != 'Aprobado') {
            handleChangeState("Aprobado", id);

        }

    };
    const handleReject = (id, state) => {
        if (state != 'Rechazado') {
            handleChangeState("Rechazado", id);

        }
    };

    const handleOpenAddLoan = () => {
        setIsModalAddLoanOpen(true);
    };
    const handleCloseAddLoan = () => {
        setIsModalAddLoanOpen(false);
    };

    //Función que actualiza el estado del selectIdBrandAddCar
    const handleTypeAddLoan = (event) => {
        const selectedValue = event.target.value;
        setSelectedIdTypeAddLoan(selectedValue);
        console.log('Tipo de préstamo seleccionado:', selectedIdTypeAddLoan);
        const updatedSelectedDataAddLoan = { ...selectedDataAddLoan };
        updatedSelectedDataAddLoan.loan_type = selectedValue;
        setSelectedDataAddLoan(updatedSelectedDataAddLoan);

    };
    const [selectedAmortization, setSelectedAmortization] = useState('');

    //Función que actualiza el estado del selectIdBrandAddCar
    const handleAmortizationAddLoan = (event) => {
        const selectedValue = event.target.value;
        setSelectedAmortization(event.target.value);
        const updatedSelectedDataAddLoan = { ...selectedDataAddLoan };
        if (selectedValue === 'Alemán') {
            updatedSelectedDataAddLoan.loan_amortization_type = 'Aleman';
        }
        else {
            updatedSelectedDataAddLoan.loan_amortization_type = 'Frances';
        }
        setSelectedDataAddLoan(updatedSelectedDataAddLoan);

    };

    //Función que actualiza el estado de los campos de texto en AddCar
    function handleTextFieldChange(event, key) {

        const newValue = event.target.value;
        const updatedSelectedDataAddLoan = { ...selectedDataAddLoan };
        updatedSelectedDataAddLoan[key] = newValue;
        setSelectedDataAddLoan(updatedSelectedDataAddLoan);
        setIsAlertErrorAddOpen(false);
        setIsAlertSuccessAddOpen(false);

    }


    async function handleButtonAddLoan() {
        console.log('Datos del préstamo a agregar:', selectedOption.user_id);
        try {
            const response = await axios.post('http://localhost:3000/api/createLoan',
                {
                    user_id: selectedOption.customer_id,
                    loan_type: selectedDataAddLoan.loan_type,
                    loan_amount: selectedDataAddLoan.loan_amount,
                    loan_deadline: selectedDataAddLoan.loan_deadline, // Ajusta la fecha según tus necesidades
                    loan_amortization_type: selectedDataAddLoan.loan_amortization_type,
                    loan_guarantors: selectedDataAddLoan.loan_guarantors,
                    loan_inicial_amount: selectedDataAddLoan.loan_balance,
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


    ////Búsqueda de clientes en agregar préstamo

    const [searchValueClient, setSearchValueClient] = useState('');
    const [pendingUsers, setPendingUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getApprovedUsers');
                setPendingUsers(response.data);
                console.log('Usuarios pendientes:', response.data);
            } catch (error) {
                console.error('Error al obtener usuarios pendientes:', error);
            }
        };

        fetchPendingUsers();
    }, []);

    const filteredClients = pendingUsers.filter(item =>
        item.customer_name.toLowerCase().includes(searchValueClient.toLowerCase())
    );

    const handleSearchChangeClient = (event) => {
        const newValue = (event && event.target && event.target.value) || ''; // Maneja el caso de event o event.target siendo null o undefined
        setSearchValueClient(newValue.toLowerCase());
    };

    const handleOptionSelect = (event, newValue) => {
        setSelectedOption(newValue);
        setSearchValueClient(newValue ? newValue.customer_name : '');
        // const updatedSelectedDataAddLoan = { ...selectedDataAddLoan };
        //updatedSelectedDataAddLoan.loan_id = newValue ? newValue.customer_id : '';
        //setSelectedDataAddLoan(updatedSelectedDataAddLoan);
        //console.log(selectedOption.customer_name); // Establece el valor del texto cuando se selecciona una opción
    };



    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} marginTop={'2rem'} >
                    <TextField
                        sx={{ ...login.textoContrasena, width: '500px', marginBottom: '1rem' }}
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
                    <Button size="medium" variant="outlined" color="primary"
                        sx={buttons.appBarButtonText}
                        marginTop={'1rem'}
                        endIcon={<AddIcon />}
                        onClick={handleOpenAddLoan}
                    >
                        Agregar Préstamo
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 2 }}>

                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} marginTop={'2rem'} >

                            {filteredLoans.map((item, index) => (
                                <Box marginBottom={'20px'} key={item.index}>

                                    <Paper sx={{ height: '2.2rem' }}>
                                        <Box margin={'0 2rem'} display="flex" alignItems="center" justifyContent="space-between" flexDirection={'row'} >
                                            <Typography marginRight={'5px'} sx={home.homeTextH14Light}>Cliente </Typography> <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '200px' }}>{item.loan_customer_name} </Typography>} />
                                            <Chip marginLeft={'5px'} style={{ background: '#005f8f' }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '100px' }}>{item.loan_type}</Typography>} variant="outlined" />
                                            <Typography marginRight={'5px'} marginLeft={'5px'} sx={home.homeTextH14Light}>emitido</Typography> <Chip style={{ borderColor: '#005f8f' }} icon={<CalendarMonthIcon style={{ color: '#005f8f' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}> {item.createdAt && item.createdAt.substring(0, 10)}</Typography>} />
                                            <Typography marginRight={'5px'} marginLeft={'5px'} sx={home.homeTextH14Light}>de</Typography> <Chip style={{ borderColor: '#b0d626' }} icon={<PaidIcon style={{ color: '#b0d626' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}> {item.loan_amount}</Typography>} />
                                            <Chip marginLeft={'5px'} style={{ background: '#D6C426', color: 'white' }} icon={<AssessmentIcon style={{ color: 'white' }} />} label={<Typography sx={home.homeTextH14LightWhite}>Tabla de Amortización</Typography>} onClick={() => handleOpenLoanHistory(item.loan_initial_amount, item.createdAt, item.loan_amortization_type, parseInt(item.loan_amount), item.loan_type, parseInt(item.loan_deadline), item, index)} />
                                            <Chip marginRight={'5px'} marginLeft={'5px'} style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}> Préstamo {item.loan_state}</Typography>} />
                                            <Typography marginLeft={'15px'} marginRight={'10px'} sx={home.homeTextH14Light}>Aceptar</Typography>
                                            <Chip style={{ background: '#b0d626', color: 'white' }} icon={<CheckIcon style={{ color: 'white' }} />} onClick={() => handleAccept(item.loan_id, item.loan_state)} />
                                            <Typography marginLeft={'15px'} marginRight={'10px'} sx={home.homeTextH14Light}>Rechazar</Typography>
                                            <Chip style={{ background: '#FE5B78', color: 'white' }} icon={<ClearIcon style={{ color: 'white' }} />} onClick={() => handleReject(item.loan_id, item.loan_state)} />

                                        </Box>
                                    </Paper>
                                </Box>

                            ))}
                        </Box>
                    </Box>

                </Box>


                <Box display="flex" justifyContent={"center"} width="30%" marginLeft={'38%'} mt="3rem">


                    <Modal
                        open={isModalSucessOpen}
                        onClose={handleCloseLoanHistory}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" sx={home.homeTextH3}>
                                Detalle de la Simulación de tu crédito
                            </Typography>
                            <Typography id="modal-modal-description" sx={home.homeTextH4}>
                                Lo que calculaste.
                            </Typography>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>

                                <Box paddingRight="2%" paddingLeft='2%' display="flex" justifyContent="center" alignItems="center">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Dividendo</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Fecha</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }}>Saldo</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }} bgcolor={'#e2f0af'}>Cuota</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Interés</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '110px' }}>Amortización</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '110px' }}>Desgravamen</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3} >
                                                    Total</Typography><hr /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table1.map((fila) => (
                                                <tr >
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.mes}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.fecha}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.saldoCuenta}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4} bgcolor={'#e2f0af'}> ${fila.pagoMensual}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoInteres}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.amortizacion}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.desgravamen}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.total}</Typography></td>


                                            </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </Box>
                            </div>
                        </Box>
                    </Modal>

                    <Modal
                        open={isModalAddLoanOpen}
                        onClose={handleCloseAddLoan}
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
                                    Agregar un nuevo préstamo
                                </Typography>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label={<Typography sx={login.textoInput} >Elige una marca  </Typography>}
                                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                                    variant="standard"

                                    fullWidth
                                    onChange={handleTypeAddLoan}
                                >

                                    {loanType.map((loan, index) => (
                                        <MenuItem key={index} value={loan}>
                                            <Typography marginLeft={'20px'} sx={login.textoInput} >{loan}  </Typography>
                                        </MenuItem>

                                    ))}

                                </TextField>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                                    <Autocomplete
                                        options={filteredClients}
                                        getOptionLabel={(option) => option.customer_name}
                                        value={selectedOption}
                                        onChange={(event, newValue) => handleOptionSelect(event, newValue)}
                                        inputValue={searchValueClient}
                                        onInputChange={(event, newInputValue) => handleSearchChangeClient(event, newInputValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{ width: '400px', marginBottom: '16px' }}
                                                label={<Typography sx={login.textoInput}>Ingrese el nombre del cliente</Typography>}
                                                variant="outlined"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: <SearchIcon style={{ color: '#005f8f' }} />,
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <MenuItem {...props}>
                                                <Typography sx={login.textoInput} marginLeft={'20px'}>{option.customer_name}</Typography>
                                            </MenuItem>
                                        )}
                                    />

                                </Box>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label={<Typography sx={login.textoInput} >Elige un tipo de amortización  </Typography>}
                                    // helperText={<Typography sx={login.textoMensajeAbajoInput} >Seleccione una opción</Typography>}
                                    variant="standard"

                                    fullWidth
                                    onChange={handleAmortizationAddLoan}
                                >

                                    {amortizationType.map((loan, index) => (
                                        <MenuItem key={index} value={loan}>
                                            <Typography marginLeft={'20px'} sx={login.textoInput} >{loan}  </Typography>
                                        </MenuItem>

                                    ))}

                                </TextField>
                                {textFieldLoan.map((item, index) => (
                                    (
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} key={index}>
                                            <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                            <TextField
                                                id={`input-${item.key}-with-sx`}
                                                label={
                                                    <Typography
                                                        sx={{
                                                            fontFamily: 'Cairo',
                                                            textTransform: 'none',
                                                            fontSize: '16px',
                                                            width: '100%',

                                                        }}
                                                    >
                                                        {item.textLabel}
                                                    </Typography>
                                                }
                                                variant="standard"
                                                fullWidth

                                                margin="normal"
                                                // Usar los datos de selectedData
                                                onChange={(event) => handleTextFieldChange(event, item.key)}
                                            />

                                        </Box>
                                    )
                                ))}


                                <Box marginTop={'2rem'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                    <Button size="medium" variant="contained" color="terciary"
                                        onClick={handleButtonAddLoan}
                                        sx={buttons.appBarButtonRegister}
                                        endIcon={<AddIcon />} >
                                        Agregar préstamo
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
                                            Préstamo agregado con éxito
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
                                            No se pudo agregar el préstamo.
                                        </Alert>
                                    )}
                                </Stack>




                            </div>
                        </Box>
                    </Modal >

                </Box>
            </ThemeProvider>
        </Box>

    );
}
export default LoanHistory;



