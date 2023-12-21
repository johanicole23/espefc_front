import React from 'react';
import AppBarDrawer from '../AppBarDrawer';
import Password from './passwordFunctions'
import {
    ThemeProvider, createTheme,
} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#005f8f'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#005F8F'

        },
    },
});

function App() {

    return (
        <div>
            <AppBarDrawer />
            <ThemeProvider theme={theme}>
                <Password/>              

            </ThemeProvider>
        </div >
    );
}

export default App;


