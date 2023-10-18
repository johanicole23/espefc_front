function calcularTablaAmortizacionAleman(montoPrestamo, tasaInteres, duracionMeses, saldoCuenta) {
  const tasaInteresMensual = tasaInteres / 100 / 12;
  const porcentajeDesgravamen = 0.00046;
  const pagoMensual = montoPrestamo * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -duracionMeses)));

  let saldoPendiente = montoPrestamo;
  const tablaAmortizacion = [];
  let total = 0;

  for (let mes = 1; mes <= duracionMeses; mes++) {
    const interes = saldoPendiente * tasaInteresMensual;
    const pagoCapital = pagoMensual - interes;
    saldoPendiente -= pagoCapital;
    saldoCuenta -= pagoMensual;
    const desgravamen = saldoPendiente * porcentajeDesgravamen;
    const pMensual = desgravamen + pagoCapital + interes;
    total += pMensual;
    const filaTabla = {
      mes,
      saldoCuenta: saldoCuenta.toFixed(2),
      pagoMensual: pMensual.toFixed(2),
      total: total.toFixed(2),
      pagoInteres: interes.toFixed(2),
      pagoCapital: pagoCapital.toFixed(2),
      desgravamen: desgravamen.toFixed(2),
      tasa: tasaInteres.toFixed(2),
    };

    tablaAmortizacion.push(filaTabla);
  }

  return tablaAmortizacion;
}

function calcularTablaAmortizacionFrances(montoPrestamo, tasaInteres, duracionMeses, saldoCuenta) {
  const tasaInteresMensual = tasaInteres / 100 / 12;
  const pagoMensual = montoPrestamo / duracionMeses;

  let saldoPendiente = montoPrestamo;
  const tablaAmortizacion = [];
  let total = 0;

  for (let mes = 1; mes <= duracionMeses; mes++) {
    const interes = saldoPendiente * tasaInteresMensual;
    const pagoCapital = pagoMensual - interes;
    const desgravamen = pagoCapital * 0.0043;
    const pMensual = desgravamen + pagoCapital + interes;
    saldoPendiente -= pagoCapital;
    saldoCuenta -= pagoMensual;
    total += pMensual;
    const filaTabla = {
      mes,
      saldoCuenta: saldoCuenta.toFixed(2),
      pagoMensual: pMensual.toFixed(2),
      pagoInteres: interes.toFixed(2),
      pagoCapital: pagoCapital.toFixed(2),
      desgravamen: desgravamen.toFixed(2),
      total: total.toFixed(2),
      tasa: tasaInteres.toFixed(2),

    };

    tablaAmortizacion.push(filaTabla);
  }

  return tablaAmortizacion;



}

export { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances };