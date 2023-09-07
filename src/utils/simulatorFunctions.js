function calcularTablaAmortizacionAleman(montoPrestamo, tasaInteres, duracionMeses, saldoCuenta) {
    const tasaInteresMensual = tasaInteres / 100 / 12;
    const pagoMensual = montoPrestamo / duracionMeses;
    
    let saldoPendiente = montoPrestamo;
    const tablaAmortizacion = [];
  
    for (let mes = 1; mes <= duracionMeses; mes++) {
      const interes = saldoPendiente * tasaInteresMensual;
      const pagoCapital = pagoMensual - interes;
      saldoPendiente -= pagoCapital;
      saldoCuenta -= pagoMensual;
      const filaTabla = {
        mes,
        saldoCuenta: saldoCuenta.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
        pagoMensual: pagoMensual.toFixed(2),
        pagoInteres: interes.toFixed(2),
        pagoCapital: pagoCapital.toFixed(2)
      };
  
      tablaAmortizacion.push(filaTabla);
    }
  
    return tablaAmortizacion;
}

function calcularTablaAmortizacionFrances(montoPrestamo, tasaInteres, duracionMeses, saldoCuenta) {
    const tasaInteresMensual = tasaInteres / 100 / 12;
    const pagoMensual = montoPrestamo * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -duracionMeses)));
    
    let saldoPendiente = montoPrestamo;
    const tablaAmortizacion = [];

    for (let mes = 1; mes <= duracionMeses; mes++) {
      const interes = saldoPendiente * tasaInteresMensual;
      const pagoCapital = pagoMensual - interes;
      saldoPendiente -= pagoCapital;
      saldoCuenta -= pagoMensual;
      const filaTabla = {
        mes,
        saldoCuenta: saldoCuenta.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
        pagoMensual: pagoMensual.toFixed(2),
        pagoInteres: interes.toFixed(2),
        pagoCapital: pagoCapital.toFixed(2)
      };

      tablaAmortizacion.push(filaTabla);
    }

    return tablaAmortizacion;
}
  
export { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances };