
import myTheme from '../../components/MyComponents/myTheme';
const account = {
    accountFormatCardNumberAccount: {
        maxWidth: 224,
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',       

    },
    accountFormatCardPasswordAccount: {
        maxWidth: 400,
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',       

    },
    formularyFormatCardLoan: {
        maxWidth: 350,
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .1s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.05)',
        },

    },
    uploadFormatCardLoan: {
        maxWidth: '1050px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .1s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',       

    },
    
    
    formularyCardLoanLogo: {
        display: 'flex',
        height: '150px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: "150px",
        paddingTop: 0

    },
    accountEditModalMessage:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 150,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 20,
        p: 4,
    },

}
export default account;