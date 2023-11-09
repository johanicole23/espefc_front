
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
    Chip,  Paper,  Switch,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import {
    style
} from './loanSimulatorConstants';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchIcon from '@mui/icons-material/Search';
import home from '../../../styles/pages/home';
import login from '../../../styles/pages/login';


function LoanHistory() {


    const [open, setOpen] = React.useState(false);

    const [table1, setTable1] = React.useState([]);

    const [selectedForm, setSelectedForm] = useState(null);

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);

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
            loan: 'Quirografario',
            amount: '50 000',
            date: '2011/12/11',
            term: '72',
            name: 'Johanna Molina',
            state: 'Pendiente',
            color: '#005f8f',
            interest: '9',
            amortization: 'Alemán',
        },
        {
            index: 1,
            loan: 'Prendario',
            amount: '20 000',
            date: '2012/12/11',
            term: '12',
            name: 'Johanna Molina',
            state: 'Activo',
            color: '#b0d626',
            interest: '10.5',
            amortization: 'Alemán',
        },
        {
            index: 2,
            loan: 'Quirografario',
            amount: '50 000',
            date: '2011/12/11',
            term: '72',
            name: 'Jhoanna Molina',
            state: 'Pendiente',
            color: '#005f8f',
            interest: '9',
            amortization: 'Alemán',
        },
        {
            index: 3,
            loan: 'Prendario',
            amount: '20 000',
            date: '2012/12/11',
            term: '12',
            name: 'Ezequiel Castillo',
            state: 'Activo',
            color: '#b0d626',
            interest: '10.5',
            amortization: 'Alemán',
        },
        {
            index: 4,
            loan: 'Quirografario',
            amount: '50 000',
            date: '2011/12/11',
            term: '72',
            name: 'Ezequiel Castillo',
            state: 'Pendiente',
            color: '#005f8f',
            interest: '9',
            amortization: 'Alemán',
        },
        {
            index: 5,
            loan: 'Prendario',
            amount: '20 000',
            date: '2012/12/11',
            term: '12',
            name: 'Ezequiel Castillo',
            state: 'Activo',
            color: '#b0d626',
            interest: '10.5',
            amortization: 'Alemán',
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
    const filteredLoans = loanHistory.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
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

                            {filteredLoans.map((item, index) => (
                                <Box marginBottom={'20px'} key={item.index}>

                                    <Paper sx={{ height: '2.2rem' }}>
                                        <Box margin={'0 2rem'} display="flex" alignItems="center" justifyContent="space-between" flexDirection={'row'} >
                                            <Typography marginRight={'5px'} sx={home.homeTextH14Light}>Cliente </Typography> <Chip style={{ borderColor: '#005f8f' }} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '200px' }}>{item.name} </Typography>} />
                                            <Chip marginLeft={'5px'} style={{ background: item.color }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '100px' }}>{item.loan}</Typography>} variant="outlined" />
                                            <Typography marginRight={'5px'} marginLeft={'5px'} sx={home.homeTextH14Light}>emitido</Typography> <Chip style={{ borderColor: '#005f8f' }} icon={<CalendarMonthIcon style={{ color: '#005f8f' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>{item.date}</Typography>} />
                                            <Chip marginLeft={'5px'} style={{ background: '#D6C426', color: 'white' }} icon={<AssessmentIcon style={{ color: 'white' }} />} label={<Typography sx={home.homeTextH14LightWhite}>Tabla de Amortización</Typography>} onClick={() => handleOpenLoanHistory(item.amortization, parseInt(item.amount.replace(/\s/g, ''), 10), parseFloat(item.interest), parseInt(item.term.replace(/\s/g, ''), 10), item, index)} />
                                            <Typography marginLeft={'5px'} sx={home.homeTextH14Light}>Aceptar</Typography><Switch color='terciary'  {...label} defaultChecked />
                                            <Typography sx={home.homeTextH14Light}>Rechazar</Typography><Switch color='secondary'  {...label} defaultChecked />
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
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }}>Capital</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Interés</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '110px' }}>Desgravamen</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }} bgcolor={'#e2f0af'}>Cuota</Typography><hr /></th>
                                                <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Tasa</Typography><hr /></th>



                                                <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3} >
                                                    Total</Typography><hr /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table1.map((fila) => (
                                                <tr >
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.mes}</Typography></td>
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoCapital}</Typography></td>
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoInteres}</Typography></td>
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.desgravamen}</Typography></td>
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4} bgcolor={'#e2f0af'}> ${fila.pagoMensual}</Typography></td>
                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.tasa}%</Typography></td>


                                                    <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.total}</Typography></td>


                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </Box>
                            </div>
                        </Box>
                    </Modal>

                </Box>
            </ThemeProvider>
        </Box>

    );
}
export default LoanHistory;



