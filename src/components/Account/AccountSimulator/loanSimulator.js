
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions,  Alert } from '@mui/material';
import myTheme from '../../../components/MyComponents/myTheme';
import axios from 'axios';
import {
    Chip, Stack, Grid, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../../utils/simulatorFunctions';
import {

    cardFinality,
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
import account from '../../../styles/pages/account';
import loan from '../../../styles/pages/loan';
import buttons from '../../../styles/buttons';
import login from '../../../styles/pages/login';
import simulator from '../../../styles/pages/simulator';


function LoanSimulator() {

    const [userData, setUserData] = useState([]);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const newUserData = window.localStorage.getItem('user');
        const token = window.localStorage.getItem('authUser');
        if (token) {
            setToken(token);
        }
        if (newUserData) {
            setUserData(JSON.parse(newUserData));
        }



    }, []);

    function calcularTabla() {
        const hoy = new Date();
        let desgravamenValor = 0;
        var tablaAmortizacion = [];
        if (selectedForm == 0) {
            desgravamenValor = desgravamen[0].deductible_number;
        }
        else if (selectedForm == 1) {
            desgravamenValor = desgravamen[1].deductible_number;
        }
        else if (selectedForm == 2) {
            desgravamenValor = desgravamen[3].deductible_number;
        }
        else if (selectedForm == 3) {
            desgravamenValor = desgravamen[4].deductible_number;
        }

        if (seleccionAleman) {
            tablaAmortizacion = calcularTablaAmortizacionAleman(hoy, valorInteres, tiempoPago, valorPrestamo, desgravamenValor);
        }
        if (seleccionFrances) {
            tablaAmortizacion = calcularTablaAmortizacionFrances(hoy, valorInteres, tiempoPago, valorPrestamo, desgravamenValor);
        }

        return tablaAmortizacion;
    }

    const [valorPrestamo, setValorPrestamo] = useState('');
    const [tiempoPago, setTiempoPago] = useState('');
    const [valorInteres, setValorInteres] = useState(null);
    const [valorCuenta, setValorCuenta] = useState(null);
    const [desgravamen, setDesgravamen] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [isAlertValueLoanOpen, setIsAlertValueLoanOpen] = useState(true);
    const [isAlertValueTimeOpen, setIsAlertValueTimeOpen] = useState(true);

    useEffect(() => {
        fetchDesgravamen();

    }, []);

    async function fetchDesgravamen() {
        try {
            const response = await axios.post('http://localhost:3000/api/deductibles', { authorization: token });
            setDesgravamen(response.data.deductible);

        } catch (error) {
            console.error('Error al obtener deducibles:', error);

        }
    }

    useEffect(() => {
        if ((tiempoPago <= 84 && tiempoPago !== null && tiempoPago !== '') && (valorPrestamo !== '' && valorPrestamo !== null && userData.user_balance >= valorPrestamo) && (!isChecked)) {
            setIsDisabled(false);
        } else if ((tiempoPago <= 84 && tiempoPago !== null && tiempoPago !== '') && (valorPrestamo !== '' && valorPrestamo !== null && userData.user_balance < valorPrestamo) && (isChecked)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

        if (tiempoPago <= 84 && tiempoPago !== null && tiempoPago !== '') {
            setIsAlertValueTimeOpen(false);
        } else {
            setIsAlertValueTimeOpen(true);
        }
        if ((valorPrestamo !== '' && valorPrestamo !== null && userData.user_balance > valorPrestamo) && (isChecked)) {
            setIsAlertValueLoanOpen(false);
        } else {
            setIsAlertValueLoanOpen(true);
        }
    }, [tiempoPago, valorPrestamo, isChecked]);

    const handleValorPrestamoChange = (event) => {
        setValorPrestamo(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(!isChecked);
    };

    const handleTiempoPagoChange = (event) => {
        setTiempoPago(event.target.value);
    };


    const [seleccionFrances, setSeleccionFrances] = useState(false);
    const [seleccionAleman, setSeleccionAleman] = useState(false);

    const handleSeleccionFrances = () => {
        console.log("frances");
        setSeleccionFrances(!seleccionFrances);
        if (seleccionAleman) {
            setSeleccionAleman(false);
        }
    };

    const handleSeleccionAleman = () => {
        console.log("aleman");
        setSeleccionAleman(!seleccionAleman);
        if (seleccionFrances) {
            setSeleccionFrances(false);
        }
    };




    const forms = [
        {
            index: 0, code: <div>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', ml: '15%', mt: '3rem' }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿Cuánto dinero necesitas que te prestemos? </Typography> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿En cuánto tiempo deseas pagar el préstamo? </Typography> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', margin: '0 18%' }} >
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo"
                            label={
                                <Typography sx={login.textoInput} >Ej.:${userData.user_balance} máx.</Typography>
                            }
                            variant="standard" fullWidth margin="normal"
                            value={valorPrestamo}
                            onChange={handleValorPrestamoChange} /> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="tiempoPago" label={
                            <Typography sx={login.textoInput} >Ej.:84 Meses máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={tiempoPago}
                            onChange={handleTiempoPagoChange} /> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" margin={"0 20%"} >
                    {parseFloat(valorPrestamo) > parseFloat(userData.user_balance) && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertValueLoanOpen && (
                                <Alert
                                    open={isAlertValueLoanOpen}
                                    severity="warning"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    El valor del préstamo sobrepasa el valor de la cuenta. Necesita garantes.
                                </Alert>
                            )}

                        </Stack>
                    )}

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {isAlertValueTimeOpen && (
                            <Alert
                                open={isAlertValueTimeOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                El valor en meses es incorrecto.
                            </Alert>
                        )}

                    </Stack>

                </Box>

            </div>
        },
        {
            index: 1, code: <div>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', ml: '15%', mt: '3rem' }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿Cuánto dinero necesitas que te prestemos? </Typography> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿En cuánto tiempo deseas pagar el préstamo? </Typography> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', margin: '0 18%' }} >
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo" label={
                            <Typography sx={login.textoInput} >Ej.:${userData.user_balance} máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={valorPrestamo}
                            onChange={handleValorPrestamoChange} /> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="tiempoPago" label={
                            <Typography sx={login.textoInput} >Ej.:48 Meses máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={tiempoPago}
                            onChange={handleTiempoPagoChange} /> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" margin={"0 20%"} >
                    {parseFloat(valorPrestamo) > parseFloat(userData.user_balance) && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertValueLoanOpen && (
                                <Alert
                                    open={isAlertValueLoanOpen}
                                    severity="warning"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    El valor del préstamo sobrepasa el valor de la cuenta. Necesita garantes.
                                </Alert>
                            )}

                        </Stack>
                    )}

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {isAlertValueTimeOpen && (
                            <Alert
                                open={isAlertValueTimeOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                El valor en meses es incorrecto.
                            </Alert>
                        )}

                    </Stack>

                </Box>
            </div>
        },
        {
            index: 2, code: <div>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', ml: '15%', mt: '3rem' }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿Cuánto dinero necesitas que te prestemos? </Typography> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿En cuánto tiempo deseas pagar el préstamo? </Typography> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', margin: '0 18%' }} >
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo" label={
                            <Typography sx={login.textoInput} >Ej.:${userData.user_balance} máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={valorPrestamo}
                            onChange={handleValorPrestamoChange} /> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="tiempoPago" label={
                            <Typography sx={login.textoInput} >Ej.:48 Meses máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={tiempoPago}
                            onChange={handleTiempoPagoChange} /> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" margin={"0 20%"} >
                    {parseFloat(valorPrestamo) > parseFloat(userData.user_balance) && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertValueLoanOpen && (
                                <Alert
                                    open={isAlertValueLoanOpen}
                                    severity="warning"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    El valor del préstamo sobrepasa el valor de la cuenta. Necesita garantes.
                                </Alert>
                            )}

                        </Stack>
                    )}

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {isAlertValueTimeOpen && (
                            <Alert
                                open={isAlertValueTimeOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                El valor en meses es incorrecto.
                            </Alert>
                        )}

                    </Stack>

                </Box>
            </div>
        },
        {
            index: 3, code: <div>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', ml: '15%', mt: '3rem' }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿Cuánto dinero necesitas que te prestemos?</Typography> </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                            ¿En cuánto tiempo deseas pagar el préstamo? </Typography> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', margin: '0 18%' }} >
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                id="prestamo"
                                name="valorPrestamo"
                                label={
                                    <Typography sx={login.textoInput} >Ej.:${userData.user_balance} máx.</Typography>
                                } variant="standard" fullWidth margin="normal"
                                value={valorPrestamo}
                                onChange={handleValorPrestamoChange} />
                        </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="tiempoPago" label={
                            <Typography sx={login.textoInput} >Ej.:48 Meses máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
                            value={tiempoPago}
                            onChange={handleTiempoPagoChange} /> </Grid>
                    </Grid>
                </Box>
                <Box display="flex" margin={"0 20%"} >
                    {parseFloat(valorPrestamo) > parseFloat(userData.user_balance) && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {isAlertValueLoanOpen && (
                                <Alert
                                    open={isAlertValueLoanOpen}
                                    severity="warning"
                                    sx={{
                                        fontFamily: 'Cairo',
                                        textAlign: 'Right',
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    El valor del préstamo sobrepasa el valor de la cuenta. Necesita garantes.
                                </Alert>
                            )}

                        </Stack>
                    )}

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {isAlertValueTimeOpen && (
                            <Alert
                                open={isAlertValueTimeOpen}
                                severity="error"
                                sx={{
                                    fontFamily: 'Cairo',
                                    textAlign: 'Right',
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                El valor en meses es incorrecto.
                            </Alert>
                        )}

                    </Stack>

                </Box>
            </div>
        },
    ];



    const [open, setOpen] = React.useState(false);

    const [amortizationTable, setAmortizationTable] = React.useState([]);
    const [totalTable, setTotalTable] = React.useState([]);

    const handleOpen = () => {
        const tablas = calcularTabla();
        setAmortizationTable(tablas.tablaAmortizacion);
        setTotalTable(tablas.totalTable);
        setOpen(true);
    };


    const handleClose = () => setOpen(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const handleCardClick = (index, item) => {
        setSelectedCard(index);
        setSelectedTitle(item.title);
        setSelectedForm(index);
        setValorInteres(item.interes);
    };

    return (
        <Box>
            <Box display="flex" justifyContent={"space-around"}  >

                <Card sx={account.formularyFormatCardLoan}>
                    <CardActionArea>
                        <CardContent >
                            <Box display="flex" flexDirection={'column'} >
                                <Typography variant="subtitle1" sx={home.homeTextH3}>Saldo disponible en tu cuenta individual</Typography>
                                <Chip style={{ borderColor: '#b0d626' }} icon={<PaidIcon style={{ color: '#b0d626' }} />} variant="outlined" label={<Typography sx={home.homeTextH14LightGray}>{userData.user_balance}</Typography>} />

                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <Box display="flex" justifyContent={"space-around"} margin={"2rem"} >
                <Typography variant="body2" sx={home.homeTextH4Left}>¿En qué utilizarás tu préstamo? </Typography>
            </Box>



            <Box display="flex" justifyContent="space-evenly" alignItems="center" sx={{ margin: '0 10%' }} >

                {cardFinality.map((item, index) => (
                    <Card key={index}
                        onClick={() => handleCardClick(index, item)}
                        elevation={selectedCard === index ? 4 : 1}
                        sx={simulator.simulatorFormatCardHouse} >
                        <CardActionArea>
                            <CardMedia
                                sx={simulator.simulatorCardLogo} image={item.image} alt="Descripción de la imagen" />
                            <CardContent >
                                <Box display="flex" flexDirection={'column'} >
                                    <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                    <Typography variant="body2" sx={home.homeTextH4}>{item.descriptionP1}</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', ml: '15%', mt: '3rem' }} >
                <Typography variant='body2' sx={home.homeTextH1}>Usted ha escogido: {selectedTitle}</Typography>
            </Box>

            <Box>

                <Box display="flex" justifyContent={"space-around"} margin={"1rem"} >

                    <Typography variant="body2" sx={home.homeTextH3}>
                        Recuerda que si deseas un préstamo con valor mayor al de tu cuenta, necesitas garantes </Typography>


                </Box>
                {forms.map((item) => (
                    selectedForm === item.index && <div key={item.index}>{item.code}</div>
                ))}
            </Box>



            <Box display="flex" flexDirection="column"
                sx={{
                    position: 'relative',
                    maxWidth: '100%',
                    marginTop: '3rem',
                    marginLeft: "18%"
                }} >

                <Typography variant="body2" sx={home.homeTextH4Left}>¿Qué sistema de amortización deseas aplicar a tu préstamo? </Typography>

            </Box>
            <Box display="flex" justifyContent={"space-evenly"} component={"form"} sx={{ width: '70%', margin: '0 18%' }} >
                <Card sx={loan.loanCardAmortization} onClick={handleSeleccionFrances}>
                    <CardActionArea>
                        <CardContent >
                            <Box display="flex" flexDirection={'column'} >
                                <Box display="flex" justifyContent={"space-between"} >
                                    <Typography variant="subtitle1" sx={home.homeTextH3}>Francés</Typography>
                                    <FormControlLabel
                                        control={<Checkbox name='frances'
                                            checked={seleccionFrances}
                                            onChange={handleSeleccionFrances}
                                            sx={{
                                                color: myTheme.palette.common.customSecondary,
                                                '&.Mui-checked': {
                                                    color: myTheme.palette.common.customSecondary,
                                                },
                                            }} />} />
                                </Box>
                                <Typography variant="body2" sx={home.homeTextH4}>El valor de las cuotas que se pagarán se mantendrá fijo en el tiempo
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={loan.loanCardAmortization} onClick={handleSeleccionAleman}>
                    <CardActionArea>
                        <CardContent >
                            <Box display="flex" flexDirection={'column'} >
                                <Box display="flex" justifyContent={"space-between"} >
                                    <Typography variant="subtitle1" sx={home.homeTextH3}>Alemán </Typography>
                                    <FormControlLabel
                                        control={<Checkbox name='aleman'
                                            checked={seleccionAleman}
                                            onChange={handleSeleccionAleman}
                                            sx={{
                                                color: myTheme.palette.common.customSecondary,
                                                '&.Mui-checked': {
                                                    color: myTheme.palette.common.customSecondary,
                                                },
                                            }} />} />
                                </Box>
                                <Typography variant="body2" sx={home.homeTextH4}>
                                    El valor de las cuotas que se pagarán será variable e ira decreciendo en el tiempo.</Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            {valorPrestamo > userData.user_balance && (
                <Box sx={{ display: 'flex', alignItems: 'center', margin: '1rem', justifyContent: "center" }}>
                    <Typography sx={home.homeTextH4Left}>Acepto que para este préstamo necesito tener garantes</Typography>
                    <Checkbox
                        sx={{ color: '#b0d626', '&.Mui-checked': { color: '#b0d626' } }}
                        checked={isChecked}
                        onChange={(event) => {
                            handleCheckboxChange(event);
                        }} />
                </Box>
            )}
            <Box display="flex" justifyContent={"center"} width="30%" marginLeft={'38%'} mt="3rem">

                <Button
                    variant="contained" alignItems='center' color="secondary"
                    onClick={handleOpen} sx={buttons.appBarButtonLogin}
                    disabled={isDisabled}
                >

                    Calcular préstamo</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" sx={home.homeTextH3}>
                            Detalle de la Simulación de tu préstamo
                        </Typography>
                        <Typography id="modal-modal-description" sx={home.homeTextH4}>
                            Tabla de amortización
                        </Typography>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>

                            <Box paddingRight="2%" paddingLeft='2%' display="flex" justifyContent="center" alignItems="center">
                                <table>
                                    <thead>
                                        <tr>

                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Cuota</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Fecha</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }}>Saldo</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }} bgcolor={'#e2f0af'}>Capital</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Interés</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '110px' }}>Desgravamen</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3} >Cuota</Typography><hr /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {amortizationTable.map((fila, index) => (
                                            <tr >

                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.mes}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.fecha}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.saldoCuenta}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4} bgcolor={'#e2f0af'}> ${fila.amortizacion}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoInteres}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.desgravamen}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.cuota}</Typography></td>


                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </Box>
                            <br />
                            <br />
                            <Box paddingRight="2%" paddingLeft='2%' display="flex" justifyContent="center" alignItems="center">
                                <table>
                                    <thead>
                                        <tr>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '110px' }}>Total Desgravamen</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '100px' }}> Total de Capital</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Total Cuota</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={{ ...home.homeTextH3, width: '80px' }}>Total Interés</Typography><hr /></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >

                                            <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${totalTable.totalDesgravamen}</Typography></td>
                                            <td><Typography id="modal-modal-description" sx={home.homeTextH4}> ${totalTable.totalCapital}</Typography></td>
                                            <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${totalTable.totalCuota}</Typography></td>
                                            <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${totalTable.totalInteres}</Typography></td>

                                        </tr>
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
export default LoanSimulator;



