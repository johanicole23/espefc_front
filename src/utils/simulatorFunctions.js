


function calcularTablaAmortizacionFrances(fechaPrestamo,  tasaInteres, duracionMeses, saldoCuenta, deductibles) {

  const tablaAmortizacion = [];

  const tasaInteresMensual = (tasaInteres / 100) / 12;
  var saldoTemporal = saldoCuenta;
  const cuotaFija = (((saldoCuenta) * (tasaInteresMensual) * Math.pow((1 + tasaInteresMensual), duracionMeses)) / (Math.pow((1 + tasaInteresMensual), duracionMeses) - 1));


  let fecha = new Date(fechaPrestamo);
  fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

 
  const porcentajeDesgravamen = (deductibles) / 100;


  for (let mes = 1; mes <= duracionMeses ; mes++) {
    console.log("DURACION",duracionMeses);
    const interesTemporal = saldoTemporal * tasaInteresMensual;
    const capital = cuotaFija - interesTemporal;
    const desgravamenTemporal = saldoTemporal * (porcentajeDesgravamen);
    const cuota = interesTemporal + capital + desgravamenTemporal;

    if (mes !== 1) {
      fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);
      saldoTemporal = saldoTemporal.toFixed(2);
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

    const filaTabla = {
      mes,
      fecha: fechaFormateada,
      saldoCuenta: saldoTemporal,
      pagoInteres: interesTemporal.toFixed(2),
      amortizacion: capital.toFixed(2),
      desgravamen: desgravamenTemporal.toFixed(2),
      cuota: cuota.toFixed(2),

    };

    saldoTemporal = saldoTemporal - capital;
    tablaAmortizacion.push(filaTabla);
  }

  return tablaAmortizacion;
}

function calcularTablaAmortizacionAleman(fechaPrestamo, tasaInteres, duracionMeses, saldoCuenta, deductibles) {

  const tablaAmortizacion = [];

  const tasaInteresMensual = (tasaInteres / 100) / 12;
  var saldoTemporal = saldoCuenta;

  let fecha = new Date(fechaPrestamo);
  fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

  const porcentajeDesgravamen = (deductibles) / 100;


  for (let mes = 1; mes <= duracionMeses ; mes++) {
    console.log("DURACION",duracionMeses);
    const interesTemporal = saldoTemporal * tasaInteresMensual;
    const capital = saldoCuenta / duracionMeses;
    const desgravamenTemporal = saldoTemporal * (porcentajeDesgravamen);
    const cuota = interesTemporal + capital + desgravamenTemporal;

    if (mes !== 1) {
      fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);
      saldoTemporal = saldoTemporal.toFixed(2);
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

    const filaTabla = {
      mes,
      fecha: fechaFormateada,
      saldoCuenta: saldoTemporal,
      pagoInteres: interesTemporal.toFixed(2),
      amortizacion: capital.toFixed(2),
      desgravamen: desgravamenTemporal.toFixed(2),
      cuota: cuota.toFixed(2),

    };

    saldoTemporal = saldoTemporal - capital;
    tablaAmortizacion.push(filaTabla);
  }

  return tablaAmortizacion;

}

function calcularExtra(fechaPrestamo, montoPrestamo, tasaInteres, duracionMeses, saldoCuenta, deductibles) {
  const tasaInteresMensual = (11.610) / 100 / 12;
  const porcentajeDesgravamen = 0.00046;


  var saldoTemporal = saldoCuenta;
  let saldoPendiente = montoPrestamo;
  const tablaAmortizacion = [];
  let total = 0;
  let desgravamenObjIndex = 0;

  let fecha = new Date(fechaPrestamo);
  fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);


  let past = { deductible_number: 0 };
  let currentDeductibleObj = {};
  let nextDeductibleObj = {};
  let deductible = {};

  for (let mes = 1; mes <= duracionMeses; mes++) {

    currentDeductibleObj = deductibles[desgravamenObjIndex];//id 1    
    if (mes !== 1) {
      fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0)

    }

    if (mes === 1) {
      while (fecha.getTime() > new Date(currentDeductibleObj.createdAt).getTime()) {
        desgravamenObjIndex++;
        currentDeductibleObj = deductibles[desgravamenObjIndex];//id 1  
        past = deductibles[desgravamenObjIndex - 1];//id 1  
      }
    }



    const interesTemporal = ((saldoTemporal * (tasaInteres / 100) * 30) / 360);


   
    currentDeductibleObj = deductibles[desgravamenObjIndex];


    if (deductibles[desgravamenObjIndex + 1]) {//si
      nextDeductibleObj = deductibles[desgravamenObjIndex + 1];// id 2
     
    }
    else {
      nextDeductibleObj = currentDeductibleObj;
    }


    if (fecha.getTime() < new Date(currentDeductibleObj.createdAt).getTime()) {

      deductible = past;
      
    }
    else {//no
      
      deductible = currentDeductibleObj;//id 1



      if (deductibles[desgravamenObjIndex + 1]) {
        desgravamenObjIndex++;//1
        past = currentDeductibleObj;//past es id0
        currentDeductibleObj = nextDeductibleObj;// current id1
      }


    }
    const desgravamen = deductible.deductible_number;



    //const desgravamen = saldoPendiente * porcentajeDesgravamen;
    const pMensual = (((saldoCuenta) * (tasaInteresMensual) * Math.pow((1 + tasaInteresMensual), duracionMeses)) / (Math.pow((1 + tasaInteresMensual), duracionMeses) - 1));
    const amortizacion = pMensual - interesTemporal;

    if (mes !== 1) {
      saldoTemporal = saldoTemporal.toFixed(2);

    }
    total += pMensual;


    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

    const filaTabla = {
      mes,
      fecha: fechaFormateada,
      saldoCuenta: saldoTemporal,
      pagoMensual: pMensual.toFixed(2),
      pagoInteres: interesTemporal.toFixed(2),
      amortizacion: amortizacion.toFixed(2),
      desgravamen: desgravamen.toFixed(2),
      total: total.toFixed(2),
    };

    saldoTemporal = saldoTemporal - amortizacion;
    tablaAmortizacion.push(filaTabla);
  }

  return tablaAmortizacion;
}

export { calcularTablaAmortizacionAleman, calcularTablaAmortizacionFrances };