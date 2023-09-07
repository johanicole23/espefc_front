import myTheme from '../../components/MyComponents/myTheme';
const appbar ={

    //Format 
    appBarTitleFormat: {
        marginLeft: '10%',
        display: 'flex',
        alignItems: 'center',
        '@media screen and (max-width: 600px)': {
            marginLeft: '0%',
        },
    },

    //Title

    appBarTitleFc: {
        fontFamily: 'Cairo',
        fontWeight: 900,
        letterSpacing: '.2rem',
        textDecoration: 'none',
        color: myTheme.palette.common.customPrimary,
        '@media screen and (max-width: 600px)': {
            fontSize: '20px',
            letterSpacing: '0.05rem',
        },
    },

    appBarTitleEspe: {
        fontFamily: 'Oswald',
        textDecoration: 'none',
        color: myTheme.palette.common.customSecondary,
        '@media screen and (max-width: 600px)': {
            fontSize: '10px',
            letterSpacing: '0.1rem',
        },
    },




    //Hover Link Title
    
    appBarSubtitle: {
        fontFamily: "Cairo",
        fontWeight: 500,
        color: myTheme.palette.common.customDark,
        fontSize: "16px",
        display: "inline-block",
        position: "relative",
        textDecoration: "none",
        "&:after": {
            content: "''",
            display: "block",
            position: "absolute",
            left: 0,
            bottom: "-0.5em",
            width: "100%",
            height: "0.2em",
            backgroundColor: "transparent",
            transition: "backgroundColor 0.2s ease-in-out",
        },
        "&:hover:after": {
            backgroundColor: myTheme.palette.common.customDark,
        },
        "&:hover": {
            fontWeight: 600,

        },
    },
}
export default appbar;