
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import myTheme from '../../components/MyComponents/myTheme';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances } from '../../utils/simulatorFunctions';
import {

    cardFinality,
    style
} from './loanSimulatorConstants';

import home from '../../styles/pages/home';
import loan from '../../styles/pages/loan';
import buttons from '../../styles/buttons';
import login from '../../styles/pages/login';
import simulator from '../../styles/pages/simulator';


function LoanSimulator() {
    function calcularTabla() {

        var tablaAmortizacion = [];
        if (seleccionAleman) {
            tablaAmortizacion = calcularTablaAmortizacionAleman(valorPrestamo, valorInteres, tiempoPago, valorCuenta);
        }
        if (seleccionFrances) {
            tablaAmortizacion = calcularTablaAmortizacionFrances(valorPrestamo, valorInteres, tiempoPago, valorCuenta);
        }

        return tablaAmortizacion;
    }

    const [valorPrestamo, setValorPrestamo] = useState('');
    const [tiempoPago, setTiempoPago] = useState('');
    const [valorInteres, setValorInteres] = useState(null);
    const [valorCuenta, setValorCuenta] = useState(null);
    const handleValorPrestamoChange = (event) => {
        setValorPrestamo(event.target.value);
    };

    const handleTiempoPagoChange = (event) => {
        setTiempoPago(event.target.value);
    };

    const handleValorCuentaChange = (event) => {
        setValorCuenta(event.target.value);
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
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo" label={
                            <Typography sx={login.textoInput} >Ej.:${valorCuenta} máx.</Typography>
                        } variant="standard" fullWidth margin="normal"
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
                            <Typography sx={login.textoInput} >Ej.:$60.000 máx.</Typography>
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
                            <Typography sx={login.textoInput} >Ej.:$15.000 máx.</Typography>
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
                        <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo" label={
                            <Typography sx={login.textoInput} >Ej.:$10.000 máx.</Typography>
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
            </div>
        },
    ];



    const [open, setOpen] = React.useState(false);

    const [table, setTable] = React.useState([]);

    const handleOpen = () => {
        const tablaAmortizacion = calcularTabla();
        tablaAmortizacion.forEach(fila => {
        });
        setTable(tablaAmortizacion);
        setOpen(true)
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
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '63%', ml: '15%', mt: '3rem' }} >

                    <Grid item xs={12} md={6}> <Typography variant="body2" marginLeft="15%" sx={home.homeTextH4Left}>
                        Simula cuánto dinero tendrías en tu cuenta </Typography> </Grid>

                </Box>
                <Box display="flex" justifyContent={"space-around"} component={"form"} sx={{ width: '70%', margin: '0 14%' }} >

                    <Grid item xs={12} md={4}><TextField id="input-with-sx" name="valorPrestamo" label={
                        <Typography sx={login.textoInput} >Ej.:$70.000</Typography>
                    } variant="standard"
                        sx={{ width: '300px' }}
                        value={valorCuenta}
                        onChange={handleValorCuentaChange} /> </Grid>

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

                <Typography variant="body2" sx={home.homeTextH4Left}>¿Qué sistema de amortización deseas aplicar a tu crédito? </Typography>

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
            <Box display="flex" justifyContent={"center"} width="30%" marginLeft={'38%'} mt="3rem">
                <Button variant="contained" alignItems='center' color="secondary" onClick={handleOpen} sx={buttons.appBarButtonLogin}>
                    Calcular crédito</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3}>Numero de Mes</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3}>Saldo de Cuenta</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3}>Saldo Pendiente</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3}>Pago Interés</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3}>Pago Capital</Typography><hr /></th>
                                            <th><hr /><Typography id="modal-modal-title" sx={home.homeTextH3} bgcolor={'#e2f0af'}>
                                                Pago Mensual</Typography><hr /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.map((fila, index) => (
                                            <tr key={index}>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>{fila.mes}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.saldoCuenta}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.saldoPendiente}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoInteres}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4}>${fila.pagoCapital}</Typography></td>
                                                <td><Typography id="modal-modal-description" sx={home.homeTextH4} bgcolor={'#e2f0af'}>
                                                    ${fila.pagoMensual}</Typography></td>
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
export default LoanSimulator;