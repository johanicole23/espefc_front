
import myTheme from '../../components/MyComponents/myTheme';
const loan ={
    //Card
    loanCardAmortization:{
        maxWidth: '350px',
        width: 300,
        height: 140,
        marginTop: 5,
        marginRight: '2.5%',
        marginLeft: '2.5%',
        zIndex: 1,
        transition: 'transform .08s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    loanFormatCardLoan: {
        maxWidth: '400px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },

    },
    cardLoan: {
        maxWidth: '1000px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        m: "0.5%",

    },
    //Logo
    

    loanCardLoanLogo: {
        display: 'flex',
        height: '250px',
        width: '400px',
        alignItems: 'center',
        justifyContent: 'center',        
       // padding:'5%'

    },

    //Format
    loanImageFormat: {
        display: 'flex',
        height: '100%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "100px",
        paddingTop: 0

    },

    

    loanFormat: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        textAlign: 'left',
        fontSize: "16px",
    },
    //Text
    marcaRellenoAux: {
        fontFamily: 'Cairo',
        color: myTheme.palette.common.customDark,
        textAlign: 'left',
        fontSize: "16px",
    },
}
export default loan;