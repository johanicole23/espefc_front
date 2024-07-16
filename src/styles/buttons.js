import myTheme from '../components/MyComponents/myTheme';

const buttons = {
    appBarButtonText: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
    },

    appBarMobileText: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        color:  myTheme.palette.common.customPrimary,
    },

    carsFileTechButton: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '100%'
    },
    appBarButtonLogin: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '45%',
        '@media screen and (max-width: 599px)': {
            width: '250px',
        },
    },
    appBarButtonRegister: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        color: 'white',
        width: '45%'
    },

    loanButtonFinance: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        color: 'white',
        width: '60%',
        '@media screen and (max-width: 600px)': {
            width:'80%',
           
         },
    },


    
    accountLiquidationButton: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        color: 'white',
        
    },
    accountVariationButton: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",    
    },
    registerButton: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width: '100%',
        color: 'white'
    },
    accountButtonTextSecondary: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        backgroundColor: myTheme.palette.common.customSecondary,
        fontWeight: 400,

    },
    accountButtonTextPrimary: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        
        fontWeight: 400,

    },
    accountLoanChirographic: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width:'35%'
        
    },
    passwordChange: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
       
        
    },

    accountLoanChirographicImage: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        color: 'white',
    },

    adminUploadPdf: {
        fontFamily: "Cairo",
        textTransform: 'none',
        fontSize: "16px",
        width:'55%'
        
    },
}

export default buttons;