import { width } from '@mui/system';
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
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 599px)': {
            marginTop: '5rem',
            height: '370px', //450px para que se incluyan los textos despues de las diapositivas en mobile
            '& img': {
                width: '100%',
                height: '100px',
                marginTop: '1rem'

            },
        },

    },

    homeCarruselNews: {
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 599px)': {
            marginTop: 5,
            height: '450px', //450px para que se incluyan los textos despues de las diapositivas en mobile
            '& img': {
                width: '100%',
                height: '100px',
                marginTop: '1rem'

            },
        },
    },
    homeCarruselNewsMobile: {
        '@media screen and (max-width: 599px)': {
            marginTop: '5',
            height: '400px', //450px para que se incluyan los textos despues de las diapositivas en mobile
            '& img': {
                width: '100%',
                height: '350px',
                marginTop: '1rem'

            },
        },
    },

    homeCarruselCarsDiaps: {
        height: '430px',
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 600px)': {
            height: '400px',
            maxWidth: '100%',
            width: '70%',
        },
    },


    carsCarruselPrincipal: {
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 599px)': {
            marginTop: '5rem',
            height: '450px', //450px para que se incluyan los textos despues de las diapositivas en mobile
            '& img': {
                width: '100%',
                height: '100px',
                marginTop: '1rem'

            },
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

    homeTextH1Secondary: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customSecondary,
        textAlign: 'center',
        fontSize: "24px",

    },
    homeTextH1SecondaryRed: {
        fontFamily: 'Cairo',
        color: '#FE5B78',
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

    homeTextH4W700: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        textAlign: 'left',
        fontWeight: 700,
        fontSize: "18px",
    },
    homeTextH4W600: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        textAlign: 'left',
        fontWeight: 600,
        fontSize: "16px",
    },


    homeTextH5Light: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        textAlign: 'center',
        fontSize: "12px",
    },
    homeTextH14Light: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        textAlign: 'center',
        fontSize: "14px",
    },
    homeTextH14LightGray: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customGrayDarker,
        textAlign: 'center',
        fontSize: "14px",
    },
    homeTextH14LightWhite: {
        fontFamily: 'Cairo',
        color: 'white',
        textAlign: 'center',
        fontSize: "14px",
    },

    homeTextH4White: {
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

    homeTextH2LeftLightBigger: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customPrimary,
        fontSize: "20px",
        fontWeight: 600,
        textAlign: 'center',

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
        height: '200px',
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
        paddingTop: 0,
        '@media screen and (max-width: 600px)': {
            marginLeft: "42%"
        },

    },

    carsCardLogo: {
        display: 'flex',
        height: '200px',
        width: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "10px",
        paddingTop: 0,


    },
    carsCardLogoOthers: {
        display: 'flex',
        height: '200px',
        width: '1000px',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (max-width: 600px)': {
            height: '70px',
            width: '300px',           
        },

    },


    //Card

    homeFormatCardLoan: {
        maxWidth: '100%',
        width: '350px',
        height: '250px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '@media screen and (max-width: 600px)': {
            height: '250px',
            
        },

    },

    carsFormatCardLoan: {
        maxWidth: '100%',
        width: '220px',
        height: '220px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },

    },
    carsFormatCardLoanOthers: {
        maxWidth: '100%',
        width: '1000px',
        height: '220px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '@media (max-width: 600px)': {
            height: '70px',
            width: '300px',           
        },

    },

    homeFormatCardCars: {
        maxWidth: '100%',
        width: '700px',
        height: '250px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },

        '@media screen and (max-width: 600px)': {
            height: '300px',
            width: '350px',
            marginLeft: '7%',
        },

    },



}

export default home;