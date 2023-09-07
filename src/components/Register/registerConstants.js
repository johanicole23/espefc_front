
import {createTheme} from '@mui/material/styles';
export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#005F8F'

        },
    },
});

export const validarCedulaEcuatoriana = (cedula) => {
    // Remover guiones y espacios en blanco de la cédula
    const cedulaSinFormato = cedula.replace(/[-\s]/g, '');

    // Verificar que la cédula tenga 10 dígitos
    if (cedulaSinFormato.length !== 10) {
        return false;
    }

    // Verificar que los primeros dos dígitos correspondan a un código de provincia válido
    const codigoProvincia = parseInt(cedulaSinFormato.substring(0, 2), 10);
    if (codigoProvincia < 1 || codigoProvincia > 24) {
        return false;
    }

    // Verificar el último dígito de la cédula (dígito verificador)
    const verificador = parseInt(cedulaSinFormato.charAt(9), 10);
    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedulaSinFormato.charAt(i), 10);
        if (i % 2 === 0) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        suma += digito;
    }
    const residuo = suma % 10;
    const digitoVerificadorEsperado = residuo === 0 ? 0 : 10 - residuo;

    return verificador === digitoVerificadorEsperado;
};


