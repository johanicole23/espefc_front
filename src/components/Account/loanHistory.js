
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Chip, Paper, Tooltip
} from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../utils/simulatorFunctions';
import {

    style
} from '../Account/AccountSimulator/loanSimulatorConstants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';

import home from '../../styles/pages/home';



function LoanHistory() {
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
                <Accordion sx={{ width: '95%' }}>
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
                                        <Chip label={<Typography sx={{ ...home.homeTextH14LightGray, width: '200px', textTransform: 'uppercase' }}> {item.loan_type}</Typography>} variant="outlined" />
                                        <Typography sx={home.homeTextH14Light}>de</Typography> <Chip style={{ borderColor: '#b0d626' }} icon={<PaidIcon style={{ color: '#b0d626' }} />} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>Monto {item.loan_amount}</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>por pagar</Typography> <Chip style={{ borderColor: '#FE5B78' }} icon={<PaidIcon style={{ color: '#FE5B78' }} />} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '100px' }}>Valor -{item.loan_pending_amount}</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>emitido</Typography> <Chip style={{ borderColor: '#005f8f' }} icon={<CalendarMonthIcon style={{ color: '#005f8f' }} />} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '80px' }}>{item.createdAt && item.createdAt.substring(0, 10)}</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>a</Typography> <Chip style={{ borderColor: '#2596be' }} icon={<AccessTimeIcon style={{ color: '#2596be' }} />} variant="outlined" label={<Typography sx={{ ...home.homeTextH14LightGray, width: '80px' }}>{item.loan_deadline} meses</Typography>} />
                                        <Typography sx={home.homeTextH14Light}>con</Typography>
                                        <Tooltip title={item.loan_guarantors}>
                                            <Chip icon={<PeopleIcon style={{ color: '#FFB0B1' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}> Garante/s</Typography>} />
                                        </Tooltip>

                                        <Chip style={{
                                            background: item.loan_state === 'Pendiente' ? '#005f8f' : item.loan_state === 'Rechazado' ? '#FE5B78' : item.loan_state === 'Aceptado' ? '#FE5B78' : '#b0d626',
                                            color: 'white'
                                        }} label={<Typography sx={{ ...home.homeTextH14LightWhite, width: '80px' }}>{item.loan_state}</Typography>} />


                                    </Box>
                                </Paper>
                            </Box>
                        ))}

                    </AccordionDetails>
                </Accordion>


            </Box>



        </Box>
    );
}
export default LoanHistory;



