import iconoFondo from '../../assets/register/icono_register.png';
import fondo from '../../assets/login/fondoLogin.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MyToolBar from '../../components/MyComponents/myToolBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import myTheme from '../../components/MyComponents/myTheme';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { theme, validarCedulaEcuatoriana } from './registerConstants';
import home from '../../styles/pages/home';
import buttons from '../../styles/buttons';
import login from '../../styles/pages/login';
import registerStyle from '../../styles/pages/register';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { fabClasses } from '@mui/material';


function Register() {

    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [isModalUserConfirmOpen, setIsModalUserConfirmOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlertUserOpen, setIsAlertUserOpen] = useState(false);
    const [isAlertIdOpen, setIsAlertIdOpen] = useState(false);
    const [isAlertNameOpen, setIsAlertNameOpen] = useState(false);
    const [isAlertEduEmailOpen, setIsAlertEduEmailOpen] = useState(false);
    const [isAlertEmailOpen, setIsAlertEmailOpen] = useState(false);
    const [isAlertPhoneOpen, setIsAlertPhoneOpen] = useState(false);
    const [questions, setQuestions] = useState([]);

    const [iconNameColor, setIconNameColor] = useState('action.active');
    const [iconIdColor, setIconIdColor] = useState('action.active');
    const [iconNumberColor, setIconNumberColor] = useState('action.active');
    const [iconEmailColor, setIconEmailColor] = useState('action.active');
    const [iconEmailPersonalColor, setIconEmailPersonalColor] = useState('action.active');
    const [iconDirColor, setIconDirColor] = useState('action.active');

    const nameInputRef = useRef(null);
    const idInputRef = useRef(null);
    const numberInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const emailPersonalInputRef = useRef(null);
    const dirInputRef = useRef(null);
    const question1InputRef = useRef(null);
    const question2InputRef = useRef(null);
    const [answers, setAnswers] = useState(['', '', '']);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_ci: "",
        customer_name: "",
        customer_personal_email: "",
        customer_espe_email: "",
        customer_phone: "",
        customer_direction: "",
        security_questions: [
            {
                question_id: 0,
                user_answer: ""
            },
            {
                question_id: 1,
                user_answer: ""
            }
        ]
    });

    const textFieldRegister = [

       
        {
            icon: HomeIcon,
            iconColor: iconDirColor,
            textLabel: "Dirección de domicilio",
            textError: "",
            inputRef: dirInputRef,
            name: 'customer_direction',
            value: formData.customer_direction,

        },

    ];


    useEffect(() => {
        // Realiza una solicitud GET al servidor para obtener las preguntas
        axios.get('http://localhost:3000/api/questions')
            .then((response) => {
                setQuestions(response.data.questions);
            })
            .catch((error) => {
                console.error('Error al obtener las preguntas', error);
            });
    }, []); // El array vacío como segundo argumento asegura que se ejecute solo una vez

    const handleOpenQuestion = (event) => {
        const nameValue = nameInputRef.current.value.trim().toLowerCase();
        const idValue = idInputRef.current.value.trim().toLowerCase();
        const numberValue = numberInputRef.current.value.trim().toLowerCase();
        const emailValue = emailInputRef.current.value.trim().toLowerCase();
        const emailPersonalValue = emailPersonalInputRef.current.value.trim().toLowerCase();
        const dirValue = dirInputRef.current.value.trim().toLowerCase();
        let flag1 = false;
        let flag2 = false;
        let flag3 = false;
        let flag4 = false;
        let flag5 = false;

        if (nameValue.length === 0 || idValue.length === 0 || numberValue.length === 0 || dirValue.length === 0 || emailValue.length === 0 || emailPersonalValue.length === 0) {
            // setIsModalEmptyOpen(true);
            //flagEmpty = true;
            setIsAlertOpen(true);
            setTimeout(() => {
                // Realizar acciones después de esperar 5 segundos
                setIsAlertOpen(false);
            }, 5000);
        }

        if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(nameValue)) {
           
            flag1 = false;
        }

        else {
           
            flag1 = true;
        }

        if (isAlertIdOpen) {
            flag2 = false;
        } else {
            flag2 = true;
        }
        if (!/^\d+$/.test(numberValue)) {
           
            flag3 = false;
        }
        else {
            
            flag3 = true;
        }

        if (!emailValue.endsWith('@espe.edu.ec')) {
            // El correo electrónico no es válido, abre el modal Email
         
            flag4 = false;
        }
        else {
           
            flag4 = true
        }

        if (!emailPersonalValue.endsWith('.com')) {
            // El correo electrónico no es válido, abre el modal Email
           
            flag5 = false;
        }
        else {
           
            flag5 = true
        }

        if (flag1 === true && flag2 === true && flag3 === true && flag4 === true && flag5 === true) {
            setIsModalSucessOpen(true);
            setIsAlertOpen(false);

        }
    }

    const handleCloseQuestion = () => {
        setIsAlertOpen(false);
        setIsAlertUserOpen(false);
        setIsModalSucessOpen(false);
    };
    const [security_questions, setSecurityQuestions] = useState([
        { question_id: 1, user_answer: '' },
        { question_id: 2, user_answer: '' },
    ]);

    const handleAnswerChange = (index, value) => {
        setSecurityQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].user_answer = value;
            return newQuestions;
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/createUser', formData);
            console.log(formData);
            if (response.status === 201) {
                const data = response.data;
                console.log('Usuario creado con éxito');
                setIsModalUserConfirmOpen(true);
            } else {
                console.error('Error usuario ya existe');
                setIsAlertUserOpen(true);
                setIsAlertOpen(false);
            }
        } catch (error) {
            // Handle network or other errors
            console.error(error);
            console.error('Error en el servidor');
            setIsAlertUserOpen(true);
            setIsAlertOpen(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUserAnswerChange = (e, index) => {
        const { value } = e.target;
        const updatedSecurityQuestions = [...formData.security_questions];
        updatedSecurityQuestions[index].user_answer = value;
        setFormData({ ...formData, security_questions: updatedSecurityQuestions });
    };


    const handleCloseUserConfirm = () => {
        setIsModalUserConfirmOpen(false);
    };

    function handleClickDownloadDocuments() {
        const url = '/files/contrato_adhesion.pdf'; // Reemplaza con la ruta correcta de tu documento

        const link = document.createElement('a');
        link.href = url;
        link.download = 'ContratoAdhesion.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleChangeId = (event) => {
        const id = idInputRef.current.value.trim().toLowerCase();
        setIsAlertIdOpen(!validarCedulaEcuatoriana(id));
    }

    const handleChangeName = (event) => {
        const name = event.target.value;
        if (!(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(name))) {
            setIsAlertNameOpen(true);
        }
        else {
            setIsAlertNameOpen(false);
        }
    }

    const handleChangeEduEmail = (event) => {
        const email = event.target.value;
        if (!email.endsWith('@espe.edu.ec')) {
            setIsAlertEduEmailOpen(true);
        }
        else {
            setIsAlertEduEmailOpen(false);
        }
    }

    const handleChangeEmail = (event) => {
        const email = event.target.value;
        if (!email.endsWith('.com')) {
            setIsAlertEmailOpen(true);
        }
        else {
            setIsAlertEmailOpen(false);
        }
    }

    const handleChangePhone = (event) => {
        const phone = event.target.value;
        if (!/^\d{10}$/.test(phone)) {
            setIsAlertPhoneOpen(true);
        }
        else {
            setIsAlertPhoneOpen(false);
        }
    }



    return (
        <ThemeProvider theme={theme} >
            <AppBar color="primary" sx={{ zIndex: 2 }}>
                <Box><MyToolBar title="ToolBar Component" /></Box>
            </AppBar>
            <Box sx={{
                backgroundImage: `url(${fondo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '120vh',
                position: 'absolute'
            }}>
                <Box sx={{ mt: 15, position: 'relative' }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ mt: 10 }} item xs={12} sm={5} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5} md={2}></Grid>
                                <Grid item xs={12} sm={5} md={10}>
                                    <Typography variant="subtitle1" sx={home.homeTextH4Left}>Para poder afiliarte al Fondo de Cesantía de la Universidad de las Fuerzas Armadas debes tener: </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                        <CheckIcon sx={{ color: myTheme.palette.common.customSecondary, mr: 1, my: 0.5 }} />
                                        <Typography variant="subtitle1" sx={home.homeTextH4Left}>El correo oficial como miembro de la ESPE (@espe.edu.ec) </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                                        <CheckIcon sx={{ color: myTheme.palette.common.customSecondary, mr: 1, my: 0.5 }} />
                                        <Typography variant="subtitle1" sx={home.homeTextH4Left}>Cédula Ecuatoriana </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5} md={2}></Grid>
                                <Grid item xs={12} sm={5} md={7.6}>
                                    <img src={iconoFondo} alt="Descripción de la imagen" width="65%" height="90%" marginLeft='10%' />
                                </Grid>
                                <Grid item xs={12} sm={5} md={2.4}></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={7} md={6}>
                            <Paper sx={login.cardLogin}>

                                <Typography variant="subtitle1" sx={home.homeTextH3Light}>Registro de cuenta</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <BadgeIcon sx={{ color: iconIdColor, mr: 1, my: 0.5 }} />
                                    <TextField id="ci" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconIdColor
                                        }} >Cédula</Typography>}
                                        type="number"
                                        inputRef={idInputRef}
                                        name={'user_ci'}
                                        value={formData.user_ci}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangeId(event); // Llama a la primera función

                                        }}
                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertIdOpen && (
                                        <Alert
                                            open={isAlertIdOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Cédula inválida
                                        </Alert>
                                    )}
                                </Stack>



                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AssignmentIndIcon sx={{ color: iconNameColor, mr: 1, my: 0.5 }} />
                                    <TextField id="name" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconNameColor
                                        }} >Nombres y Apellidos </Typography>}
                                        inputRef={nameInputRef}
                                        name={'customer_name'}
                                        value={formData.customer_name}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangeName(event); // Llama a la primera función

                                        }}

                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertNameOpen && (
                                        <Alert
                                            open={isAlertNameOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Nombre incorrecto, solo letras.
                                        </Alert>
                                    )}
                                </Stack>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <EmailIcon sx={{ color: iconEmailColor, mr: 1, my: 0.5 }} />
                                    <TextField id="edu_email" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconEmailColor
                                        }} >Correo Electrónico de la ESPE </Typography>}
                                        inputRef={emailInputRef}
                                        name={'customer_espe_email'}
                                        value={formData.customer_espe_email}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangeEduEmail(event); 

                                        }}
                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertEduEmailOpen && (
                                        <Alert
                                            open={isAlertEduEmailOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Email educativo incorrecto.
                                        </Alert>
                                    )}
                                </Stack>                                

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <ContactMailIcon sx={{ color:iconEmailPersonalColor, mr: 1, my: 0.5 }} />
                                    <TextField id="email" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconEmailPersonalColor
                                        }} >Correo Electrónico Personal </Typography>}
                                        inputRef={ emailPersonalInputRef}
                                        name={'customer_personal_email'}
                                        value={formData.customer_personal_email}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangeEmail(event); 

                                        }}
                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertEmailOpen && (
                                        <Alert
                                            open={isAlertEmailOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Email personal incorrecto.
                                        </Alert>
                                    )}
                                </Stack>
       
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <ContactPhoneIcon sx={{ color: iconNumberColor, mr: 1, my: 0.5 }} />
                                    <TextField id="phone" label={<Typography
                                        sx={{
                                            fontFamily: "Cairo",
                                            textTransform: 'none',
                                            fontSize: "16px",
                                            width: '100%',
                                            color: iconNumberColor
                                        }} >Teléfono Celular</Typography>}
                                        inputRef={numberInputRef}
                                        name={'customer_phone'}
                                        value={formData.customer_phone}
                                        onChange={(event) => {
                                            handleInputChange(event);
                                            handleChangePhone(event); 

                                        }}
                                        variant="standard" fullWidth margin="normal" />

                                </Box>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertPhoneOpen && (
                                        <Alert
                                            open={isAlertPhoneOpen}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Celular inválido.
                                        </Alert>
                                    )}
                                </Stack>
                                {textFieldRegister.map((item) => (
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <item.icon sx={{ color: item.iconColor, mr: 1, my: 0.5 }} />
                                        <TextField id="input-with-sx" label={<Typography
                                            sx={{
                                                fontFamily: "Cairo",
                                                textTransform: 'none',
                                                fontSize: "16px",
                                                width: '100%',
                                                color: item.iconColor
                                            }} >{item.textLabel}{item.iconColor === 'error.main' ? item.textError : ''} </Typography>}
                                            inputRef={item.inputRef}
                                            name={item.name}
                                            value={item.value}
                                            onChange={handleInputChange}
                                            variant="standard" fullWidth margin="normal" />

                                    </Box>
                                ))}

                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {isAlertOpen && (
                                        <Alert
                                            open={isAlertOpen}
                                            onClose={handleCloseQuestion}
                                            severity="error"
                                            sx={{
                                                fontFamily: 'Cairo',
                                                textAlign: 'Right',
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ningún campo debe estar vacío.
                                        </Alert>
                                    )}

                                </Stack>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly' }}>

                                    <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQuestion} sx={buttons.registerButton} >
                                        Continuar con el registro
                                    </Button>
                                    <Modal
                                        open={isModalSucessOpen}
                                        onClose={handleCloseQuestion}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={registerStyle.registerModalSuccess}>

                                            <Typography id="modal-modal-title" sx={home.homeTextH4Left}>
                                                A continuación, debe responder las siguientes preguntas de seguridad.
                                            </Typography>

                                            <Box sx={{ display: 'flex', flexDirection: "column", }}>

                                                {questions.map((question, index) => (
                                                    <div key={question.question_id}>
                                                        <Typography variant="body1" sx={home.homeTextH4Left}>
                                                            {question.question_description}
                                                        </Typography>
                                                        <TextField id="input-with-sx" label={<Typography
                                                            sx={{
                                                                fontFamily: "Cairo",
                                                                textTransform: 'none',
                                                                fontSize: "16px",
                                                                width: '100%',
                                                                color: iconNumberColor
                                                            }} > {`Respuesta ${index + 1}`}</Typography>}
                                                            value={formData.security_questions[index].user_answer || ''}
                                                            onChange={(e) => handleUserAnswerChange(e, index)}
                                                            variant="standard" fullWidth margin="normal" />

                                                    </div>
                                                ))}


                                            </Box>
                                            {isAlertUserOpen && (
                                                <Alert
                                                    open={isAlertUserOpen}
                                                    onClose={handleCloseQuestion}
                                                    severity="error"
                                                    sx={{
                                                        fontFamily: 'Cairo',
                                                        textAlign: 'Right',
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Este usuario ya está registrado.
                                                </Alert>
                                            )}

                                            <Button size="medium" variant="contained" color="secondary"
                                                onClick={handleSubmit}
                                                sx={buttons.registerButton} >
                                                Confirmar registro
                                            </Button>
                                            <Modal
                                                open={isModalUserConfirmOpen}
                                                onClose={handleCloseUserConfirm}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={registerStyle.registerModalMessage}>
                                                    <Box><MyToolBar title="ToolBar Component" /></Box>
                                                    <Typography id="modal-modal-title" sx={home.homeTextH1}>
                                                        ¡Bienvenido, ahora eres miembro de la página web del Fondo de Cesantía!
                                                    </Typography>

                                                    <Typography id="modal-modal-description" sx={registerStyle.messageText}
                                                    >
                                                        <br />No olvides que para acceder a los beneficios de esta plataforma debes estar afiliado al Fondo de Cesantía de la ESPE. <br />Si <span style={{ fontWeight: 'bold' }}>no te has afiliado aún</span>,
                                                        completa los siguientes documentos, dando <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleClickDownloadDocuments} >  CLICK AQUÍ </span>
                                                        y acércate a nuestra oficina en la Universidad.<br /><br />
                                                    </Typography>

                                                    <Button size="medium" variant="contained" color="secondary"
                                                        onClick={() => {
                                                            handleCloseQuestion();
                                                            handleCloseUserConfirm();
                                                        }}
                                                        href='/login'
                                                        sx={buttons.registerButton} >
                                                        Continuar
                                                    </Button>
                                                </Box>


                                            </Modal>

                                        </Box>

                                    </Modal>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Register;