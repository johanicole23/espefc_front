import logo from '../../assets/logoFC.png';
import appbar from '../../styles/components/appbar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


function Principal() {
    return (

        <Toolbar disableGutters sx={{ height: '4rem', padding: '1rem' }}>
            <Box display="flex" alignItems="center" sx={{ width: '30%', flex: '0 0 30%' }}>
                <Box sx={appbar.appBarTitleFormat}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <Box display="flex" flexDirection="column" marginLeft={'1%'}>
                        <Typography variant="h6" noWrap component={Link} to="/" sx={appbar.appBarTitleFc}>
                            FONDO DE CESANTÍA
                        </Typography>
                        <Typography variant="h8" noWrap component={Link} to="/" sx={appbar.appBarTitleEspe}>
                            UNIVERSIDAD DE LAS FUERZAS ARMADAS
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </Toolbar>
    );
}

export default Principal;