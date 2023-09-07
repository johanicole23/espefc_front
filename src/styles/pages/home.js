import myTheme from '../../components/MyComponents/myTheme';

const home = {

    //Carrusel
    homeTitleCarruselPrincipal: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDarker,
        fontSize: "24px",
        fontWeight: 600,
        marginBottom: '2%'
    },
    homeSubtitleCarruselPrincipal: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        fontSize: "18px",
        marginBottom: '2%'
    },


    homeCarruselPrincipal: {
        height: '300px',
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 600px)': {
            height: '300px',
            display: 'none',
        },
    },
    homeCarruselPrincipalPetit: {
        height: '300px',
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        display: 'none',
        '@media screen and (max-width: 600px)': {
            height: '300px',
            display: 'flex',
        },
    },
    //Texts

    homeTextH1: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        textAlign: 'center',
        fontSize: "24px",

    },

    homeTextH3: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDarker,
        textAlign: 'center',
        fontSize: "18px",
        fontWeight: 600,
    },
    homeTextH3Light: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        textAlign: 'center',
        fontSize: "18px",
        fontWeight: 600,
    },
    homeTextH2LeftLight: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        textAlign: 'left',
        fontSize: "18px",
        fontWeight: 600,
    },


    homeTextH4: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        textAlign: 'center',
        fontSize: "16px",
    },

    homeTextH2Left: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDarker,
        fontSize: "20px",
        fontWeight: 600,

    },

    homeTextH4Left: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        fontSize: "16px",
        textTransform: 'none',

    },
    homeTextH4LeftLight: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        fontSize: "16px",
        textTransform: 'none',

    },

    //Logo
    homeLogoTrademark: {
        display: 'flex',
        height: '105px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',


    },
    homeCardLoanLogo: {
        display: 'flex',
        height: '50px',
        width: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "150px",
        paddingTop: 0

    },

    //Card

    homeFormatCardLoan: {
        maxWidth: 350,
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },

    },



}

export default home;