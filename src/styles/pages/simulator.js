
const simulator ={

    //Format
    simulatorFormatCardHouse: {
        maxWidth: '350px',
        width: 300,
        height: 320,
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
   
    //Logo
     
    
    simulatorCardLogo: {
        display: 'flex',
        height: '200px',
        width: '200px',        
        alignItems: 'center',
        justifyContent: 'center',       
        paddingTop: 0,
        marginLeft:'10%'

    },
}
export default simulator;
