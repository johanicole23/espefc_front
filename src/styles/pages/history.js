
import myTheme from '../../components/MyComponents/myTheme';
const history={

    //Format

    historyFormatCardFinality: {
        maxWidth: '550px',
        marginTop: 5,
        zIndex: 1,
        transition: 'transform .2s',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.1)',
        },

    },
    
    //Carrusel

  
    historyCarruselPrincipal: {
        height: '460px',
        flex: '0 0 100%',
        maxWidth: '100%',
        marginTop: 12.5,
        zIndex: 0,
        '@media screen and (max-width: 600px)': {
            height: '300px',
            display: 'none',
        },
    },

    //Logo

    historyCardLogo: {
        display: 'flex',
        height: '270px',
        width: '550px',        
        alignItems: 'center',
        justifyContent: 'center',       
        paddingTop: 0,
        '@media screen and (max-width: 600px)': {
            height: '270px',
            width: '300px', 
        },
    },
}
export default history;