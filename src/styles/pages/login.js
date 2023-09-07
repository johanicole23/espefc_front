import myTheme from '../../components/MyComponents/myTheme';
const login = {
    formatoLogin: {
        height: '300px',
        flex: '0 0 30%',
        maxWidth: '25%',
        marginTop: 40,
        zIndex: 0,

    },

    cardLogin: {
        maxWidth: 350,
        zIndex: 1,
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.2)',
        padding: "4% 7%",

    },

    textoPregunta: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customAuxiliary,
        textAlign: 'Right',
        fontSize: "14px",
        fontWeight: 600,
        display: "inline-block",
        position: "relative",
        textDecoration: "none",
        cursor: 'pointer',
        "&:after": {
            content: "''",
            display: "block",
            position: "absolute",
            left: 0,
            bottom: "-0.09em",
            width: "100%",
            height: "0.05em",
            backgroundColor: "transparent",
            transition: "backgroundColor 0.2s ease-in-out",
        },
        "&:hover:after": {
            backgroundColor: myTheme.palette.common.customAuxiliary,
        },
        "&:hover": {
            fontWeight: 600,

        },
    },
    textoBoton: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '40%'
    },
    textoBotonCedula: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '40%',
        color: 'white'
    },

    textoInput: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '100%',
    },
    textoInputCedula: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '50%',
    },


    textoContrasena: {
        width: '100%',
        autocomplete: "off",
    },
    loginModalSuccess: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 20,
        p: 4,
    },

}
export default login;