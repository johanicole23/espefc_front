import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MyAppBar from '../MyComponents/myAppBar';
import MyFooter from '../MyComponents/myFooter';
import{theme} from './newsConstants';

function News() { 

  return (
    <ThemeProvider theme={theme}>
      <div><MyAppBar title="AppBar Component" /></div>
      

      <div><MyFooter title="Pie de página" /></div>

    </ThemeProvider >
  );
}

export default News;