
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Chip, Paper,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import {

    style
} from './loanSimulatorConstants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';

import home from '../../../styles/pages/home';



function LoanHistory() {


    const [open, setOpen] = React.useState(false);

    const [table1, setTable1] = React.useState([]);

    const [selectedForm, setSelectedForm] = useState(null);

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);

    const handleOpenLoanHistory = (amortization, amount, type, term, item, index) => {
        var tablaAmortizacion = [];
        let interest = 0;

        if (type === 'Quirografario') {
            interest = 9;
        } else {
            interest = 10.5;
        }


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

    
    const [loans, setLoans] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const newUserData = window.localStorage.getItem('user');
        if (newUserData) {
            setUserData(JSON.parse(newUserData));
        }


    }, []);
    const getLoans = async () => {

        try {
            console.log(userData.user_id);
            const response = await axios.post('http://localhost:3000/api/getLoansByUser',
                {
                    user_id: parseInt(userData.user_id),
                });
            setLoans(response.data.loans);

        } catch (error) {
            console.error(error);

        }
    };
    return (
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center"  >
                <Accordion sx={{ width: '85%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={getLoans}
                    >
                        <Typography variant="body2" sx={home.homeTextH3Light}>Historial de Préstamos</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {loans.map((item, index) => (
                            <Box marginBottom={'10px'} >
                                <Paper width='80%' sx={{ height: '2.2rem' }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-around" flexDirection={'row'} >
                                        <Chip label={<Typography sx={{ ...home.homeTextH14LightGray, width: '200px' }}>Préstamo {item.loan_type}</Typography>} variant="outlined" />
                                        <Typography sx={home.homeTextH14Light}>de</Typography> <Chip style={{ borderColor: '#b0d626' }} icon={<PaidIcon style={{ color: '#b0d626' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>Monto {item.loan_amount}</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>emitido</Typography> <Chip style={{ borderColor: '#005f8f' }} icon={<CalendarMonthIcon style={{ color: '#005f8f' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>{item.createdAt && item.createdAt.substring(0, 10)}</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>a</Typography> <Chip style={{ borderColor: '#2596be' }} icon={<AccessTimeIcon style={{ color: '#2596be' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>{item.loan_deadline} meses</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>con</Typography> <Chip icon={<PeopleIcon style={{ color: '#FFB0B1' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}> {item.loan_guarantors.split(' ').length - 1} garante/s</Typography>} />
                                        <Chip style={{
                                            background: item.loan_state === 'Pendiente' ? '#005f8f' : item.loan_state === 'Rechazado' ? '#FE5B78' : item.loan_state === 'Aceptado' ? '#FE5B78': '#b0d626',
                                            color: 'white'
                                        }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '80px' }}>{item.loan_state}</Typography>} />
                                        <Chip style={{ background: '#D6C426', color: 'white' }} icon={<AssessmentIcon style={{ color: 'white' }} />} label={<Typography sx={home.homeTextH14LightWhite}>Estadísticas</Typography>} onClick={() => handleOpenLoanHistory(item.loan_amortization_type, parseInt(item.loan_amount), item.loan_type, parseInt(item.loan_deadline), item, index)} />

                                    </Box>
                                </Paper>
                            </Box>
                        ))}

                    </AccordionDetails>
                </Accordion>


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
        </Box>
    );
}
export default LoanHistory;



