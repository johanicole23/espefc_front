import myTheme from '../../components/MyComponents/myTheme';
const register = {
    registerModalSuccess:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 20,
        p: 4,
    },
    questionText: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '100%',
        color: myTheme.palette.common.customGray,
    },

    messageText: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "14px",
        width: '100%',
        textAlign : 'left',
        color: myTheme.palette.common.customDark,
    },

    registerModalMessage:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 350,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 20,
        p: 4,
    },
   
}


export default register;