import React, { useState, useEffect } from 'react';
import AppBarDrawer from '../AppBarDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import home from '../../../styles/pages/home';
import { cardLoanCollateral } from '../accountConstants';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import account from '../../../styles/pages/account';


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

    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('user'));
        if(!userAuth || userAuth.user_role !== 'usuario'){
            window.location.href = '/prohibido';
        }
    },[]); 
    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Box marginTop="2rem">
                    <Box display="flex" flexDirection={"row"} justifyContent={"center"} component={"form"} sx={{}}>
                        <Box display={'flex'} justifyContent={'center'} >
                            <Paper elevation={5} sx={{ padding: '2% 4% ', width: '800px', marginBottom: '2rem' }}>
                                <Typography sx={home.homeTextH1}>Préstamos Prendarios</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>

                                    <Typography sx={home.homeTextH3Light}
                                    >
                                        <br /> Para iniciar con el proceso de solictud de crédito prendario, debe llenar el formulario de solictud y luego subirlo junto con los demás archivos requeridos para el proceso.
                                        <br /><br />Los archivos se entregaran al oficial de crédito, el cual revisará su capacidad de pago, para lo cual, se considerará el
                                        valor neto del último confidencial, el cual expresa un valor referencial de sus ingresos y si este es el
                                        <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} >  mínimo del 40% del valor neto de sus ingresos, </span> podrá cubrir la cuota con la cual se ejecutará el préstamo prendario.<br />
                                        <br />
                                    </Typography>

                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ margin: '0 15% 5% 15%' }} >
                    {cardLoanCollateral.map((item) => (
                        <Card sx={account.formularyFormatCardLoan}>
                            <CardActionArea href={item.link}>
                                <CardContent >
                                    <Box display="flex" flexDirection={'column'} >
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                            <item.icon sx={{ fontSize: '65px', color: item.color }} />
                                        </Box>

                                        <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                        <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>

            </ThemeProvider>
        </div >
    );
}

export default App;
