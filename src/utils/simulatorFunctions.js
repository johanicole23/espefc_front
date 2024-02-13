


function calcularTablaAmortizacionFrances(fechaPrestamo, tasaInteres, duracionMeses, saldoCuenta, deductibles) {

  const tablaAmortizacion = [];

  const tasaInteresMensual = tasaInteres /(12*100);

  let fecha = new Date(fechaPrestamo);
  fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);


  const ultimoDiaDelMes = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + 1, 0);
  const diasEnMesPrestamo = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + 2, 0).getDate();
  let mesesRestantes =  (Math.ceil((ultimoDiaDelMes - fechaPrestamo) / (1000 * 60 * 60 * 24)));
  mesesRestantes =  (mesesRestantes+ diasEnMesPrestamo);
  let duracionMesesExtra = parseFloat(mesesRestantes/30) + parseFloat(duracionMeses);
  console.log("mesesRestantes: " + (mesesRestantes/30));
  console.log("duraciontotal " + duracionMesesExtra);
  console.log("duracionmeses " + duracionMeses);


  var saldoTemporal = saldoCuenta;
  const cuotaFija = ((saldoCuenta * tasaInteresMensual * Math.pow(1 + tasaInteresMensual, duracionMeses)) /
  (Math.pow(1 + tasaInteresMensual, duracionMeses) - 1)).toFixed(2);

  console.log("cuotafijaaa:"+cuotaFija);

 

  const diferenciaEnMillis = ultimoDiaDelMes - fechaPrestamo;

  // Convierte la diferencia en días, teniendo en cuenta las horas
  const diasRestantes = (diferenciaEnMillis / (1000 * 60 * 60 * 24));

 



  const porcentajeDesgravamen = (deductibles) / 100;

  var totalDesgravamen = 0;
  var totalCapital = 0;
  var totalCuota = 0;
  var totalInteres = 0;
  var mesAux = 2;
  var dias ;
  console.log("HOLAAA: "+mesesRestantes);

  for (let mes = 1; mes <= duracionMeses; mes++) {

    let interesTemporal ;
    let capital ;
    const desgravamenTemporal = saldoTemporal * porcentajeDesgravamen;
    let cuota;
    
    if (mes === 1) {

      console.log("meses restantes:", mesesRestantes);
      
      var tasaInteresAux = tasaInteresMensual * mesesRestantes;
      interesTemporal = saldoTemporal * (tasaInteresMensual*(mesesRestantes/30));
      capital = cuotaFija - interesTemporal;
      cuota = interesTemporal + capital + desgravamenTemporal;      

    }
    else{
      dias = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + mesAux+1, 0).getDate();
      let tasaInteres2 = tasaInteresMensual * (dias/30);
      mesAux++;      
      fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);
      interesTemporal = (saldoTemporal) * (tasaInteres2);     
      capital = (cuotaFija - interesTemporal);
      if(mes==duracionMeses)
      {
        capital= saldoTemporal;
      }
      saldoTemporal = saldoTemporal.toFixed(2);
      cuota = interesTemporal + capital + desgravamenTemporal;

      
    }



    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

    totalDesgravamen += desgravamenTemporal;
    totalCapital += capital;
    totalCuota += cuota;
    totalInteres += interesTemporal;

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

  const totalTable = {
    totalDesgravamen: totalDesgravamen.toFixed(2),
    totalCapital: totalCapital.toFixed(2),
    totalCuota: totalCuota.toFixed(2),
    totalInteres: totalInteres.toFixed(2),
  };

  return { tablaAmortizacion, totalTable };
}

function calcularTablaAmortizacionAleman(fechaPrestamo, tasaInteres, duracionMeses, saldoCuenta, deductibles) {

  const tablaAmortizacion = [];


  const tasaInteresMensual = tasaInteres /(360*100);
  var saldoTemporal = saldoCuenta;

  let fecha = new Date(fechaPrestamo);
  fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);

  const porcentajeDesgravamen = (deductibles) / 100;

  var totalDesgravamen = 0;
  var totalCapital = 0;
  var totalCuota = 0;
  var totalInteres = 0;

  const ultimoDiaDelMes = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + 1, 0);
  const diasEnMesPrestamo = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + 2, 0).getDate();
  let mesesRestantes = (Math.ceil((ultimoDiaDelMes - fechaPrestamo) / (1000 * 60 * 60 * 24)));
  console.log( "mesesRestantes: ", mesesRestantes+ diasEnMesPrestamo);
  mesesRestantes =  (mesesRestantes+ diasEnMesPrestamo);
  console.log( "mesesRestantesLuego: ", mesesRestantes+ diasEnMesPrestamo);
  console.log("diasenMesPrestamo: ", diasEnMesPrestamo);
  let mesAux = 2;
  var dias ;

  for (let mes = 1; mes <= duracionMeses; mes++) {

    let interesTemporal;
    const capital = saldoCuenta / (duracionMeses);
    const desgravamenTemporal = saldoTemporal * (porcentajeDesgravamen);
    let cuota = interesTemporal + capital + desgravamenTemporal;

    console.log("cuota "+mes+":"+cuota);

    if (mes !== 1) {
      dias = new Date(fechaPrestamo.getFullYear(), fechaPrestamo.getMonth() + mesAux+1, 0).getDate();
      console.log(dias);
      let tasaInteres2 = tasaInteresMensual * dias;
      mesAux++;
      console.log("mes",mes);
      fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 0);
      interesTemporal = (saldoTemporal) * (tasaInteres2);
      saldoTemporal = saldoTemporal.toFixed(2);
      cuota = interesTemporal + capital + desgravamenTemporal;
    }
  

    if (mes === 1) {

      let tasaInteresAux = tasaInteresMensual * mesesRestantes;
      interesTemporal = saldoTemporal * tasaInteresAux;
      cuota = interesTemporal + capital + desgravamenTemporal;


    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
    totalDesgravamen += desgravamenTemporal;
    totalCapital += capital;
    totalCuota += cuota;
    totalInteres += interesTemporal;

    const filaTabla = {
      mes,
      fecha: fechaFormateada,
      saldoCuenta: saldoTemporal,
      pagoInteres: interesTemporal.toFixed(2),
      amortizacion: capital.toFixed(2),
      desgravamen: desgravamenTemporal.toFixed(2),
      cuota: cuota.toFixed(2)
    };

    saldoTemporal = saldoTemporal - capital;
    tablaAmortizacion.push(filaTabla);
  }

  const totalTable = {
    totalDesgravamen: totalDesgravamen.toFixed(2),
    totalCapital: totalCapital.toFixed(2),
    totalCuota: totalCuota.toFixed(2),
    totalInteres: totalInteres.toFixed(2),
  };

  return { tablaAmortizacion, totalTable };
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