import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Grow from '@mui/material/Grow';
import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import home from '../../styles/pages/home';
import loan from '../../styles/pages/loan';
import buttons from '../../styles/buttons';
import MyToolBar from '../MyComponents/myToolBar';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import Modal from '@mui/material/Modal';
import {
    theme,
    cardLoan,
    checked,
} from './loanConstants';

function Loans() {

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);

    const handleOpen = (item, index) => {
        setSelectedCard(index);
        setSelectedForm(index);
        setIsModalSucessOpen(true);
    };

    const handleClose = () => {
        setIsModalSucessOpen(false);
    };
    return (
        <ThemeProvider theme={theme} >

            <div><MyAppBar title="Mi aplicación" /></div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ padding: '1rem 0', marginTop: 12.5 }}>
                <Typography variant="body2" sx={home.homeTextH1}>Servicios Financieros</Typography>
                <Typography variant="body2" sx={home.homeTextH4}>Estos son nuestro préstamos disponibles:</Typography>
            </Box>
            <Grow in={checked} {...(checked ? { timeout: 3000 } : {})}>
                <Grid container spacing={2}>
                    {cardLoan.map((item, index) => (

                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ marginLeft: item.marginLeft, marginRight: item.marginRight }} >

                                <Card key={index} sx={loan.loanFormatCardLoan}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={loan.loanCardLoanLogo} image={item.image} alt="Descripción de la imagen" />
                                        <CardContent >
                                            <Box display="flex" flexDirection={'column'} >
                                                <Typography variant="subtitle1" sx={home.homeTextH3}>{item.title}</Typography>
                                                <Typography variant="body2" sx={home.homeTextH4}>{item.description}</Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions >
                                        <Box marginLeft="30%" >
                                            <Button size="small" variant="outlined" color="secondary" onClick={() => handleOpen(item, index)} sx={buttons.appBarButtonText} >
                                                Quiero saber más
                                            </Button>
                                        </Box>



                                    </CardActions>
                                </Card>


                            </Box>
                        </Grid>

                    ))}
                </Grid>

            </Grow>
            {cardLoan.map((item) => (
                selectedForm === item.index && <div key={item.index}>
                    <Modal
                        open={isModalSucessOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    //sx={{ opacity: '50%' }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '0px solid #000',
                            boxShadow: 20,
                            p: 4,
                        }}>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Box><MyToolBar title="ToolBar Component" /></Box>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Monto :
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.monto}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Plazo:
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.plazo}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Tasa de Financiamiento:
                                </Typography>
                                <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                    {item.tasa}
                                </Typography>
                                <br></br>
                                <Typography id="modal-modal-title" sx={home.homeTextH2Left}>
                                    Requisitos:
                                </Typography>
                                <ul>
                                    {item.requisitos.map((requisito, index) => (
                                        <Typography id="modal-modal-description" sx={home.homeTextH4Left}>
                                            <li key={index} id={`modal-modal-description-${index}`} >

                                                {requisito}

                                            </li>
                                            <br></br>
                                        </Typography>
                                    ))}

                                </ul>
                                <Button size="medium" variant="contained" color="secondary" sx={buttons.registerButton} href="/login">
                                    Llenar documentos online
                                </Button>
                            </div>
                        </Box>
                    </Modal >
                </div>
            ))}



            <div><MyFooter title="Pie de página" /></div>





        </ThemeProvider >
    );
}

export default Loans;