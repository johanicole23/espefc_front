import quirografary from '../../assets/loans/Quirografario.png';
import prendary from '../../assets/loans/Prendario.png';
import education from '../../assets/loans/Education.png';
import health from '../../assets/loans/Health.png'
import { createTheme, } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'

        },
        secondary: {
            main: '#005F8F'
        },
        terciary: {
            main: '#b0d626'

        },
    },
});
export const cardLoan = [

    {
        index: 0,
        image: quirografary,
        title: "Préstamos Quirografarios",
        description: "¿Buscas un préstamo basado en tus aportaciones y con pagos respaldados por tu ingreso mensual? ¡Con seguro de desgravamen incluido! ",
        marginLeft: "30%",
        marginRight: 0,
        monto: 'El monto de todos los créditos quirografarios otorgados a un partícipe no podrá ser mayor al saldo de la cuenta individual. En el caso que el crédito solicitado supere el valor de la cuenta individual, éste deberá contar con un máximo de tres garantes que también deberán ser partícipes. El monto de la garantía otorgada será imputable a la capacidad de endeudamiento del partícipe garante y se deducirá proporcionalmente de acuerdo con el pago del crédito.',
        plazo: 'El plazo máximo para la cancelación del préstamo quirografario será de siete (7) años o a su vez (84) meses, siempre que la sumatoria de la edad del partícipe y el número de años del crédito quirografario no supere los setenta y cinco (75) años de edad del partícipe, de acuerdo con la Resolución 280-2016F, capítulo V de los préstamos quirografarios artículo 82.',
        tasa: '9%',
        requisitos: [
            "Solicitud de crédito con datos personales, firma del deudor y garantes (s)",
            "Copia a color de cédula de ciudadanía o identidad actual del deudor y garante (s)",
            "Último confidencial del deudor y garante (s)",
            "Tabla de amortización firmada.",
            "Copia de certificado, copia de libreta o documento electrónico de la cuenta bancaria (cuando sea diferente a la cuenta detallada en el confidencial del deudor)",
            "Pagaré con firma del deudor y garante (s)",
            "Contrato de adhesión",
        ],
    },
    {
        index: 1,
        image: prendary,
        title: "Préstamos Prendarios",
        description: "¿Necesitas adquirir un vehículo de forma rápida? Descubre cómo obtener el financiamiento que necesitas. ",
        marginLeft: 0,
        marginRight: "30%",
        monto: 'El monto máximo se determinará por la capacidad de endeudamiento del partícipe de acuerdo con el último rol de pago, máximo USD 50.000,00. El monto del crédito y los gastos no podrán superar el 80% del valor del vehículo nuevo que conste en el valor de la factura comercial de compra del vehículo y la factura de los gastos (seguro vehicular, seguro de desgravamen, rastreo vehicular, Registro Mercantil, Notaría y matrícula); o a su vez se tomará el 80% únicamente de la factura comercial de compra del vehículo.',
        plazo: '- El tiempo máximo para la cancelación del préstamo prendario es de 48 meses.',
        tasa: '10.5%',
        requisitos: [
            "Copia a color de la cédula de ciudadanía o identidad del deudor y cónyuge.",
            "Original de la solicitud de crédito firmada por el deudor y cónyuge.",
            "Último confidencial del deudor.",
            "Original de planilla de servicios básicos actualizada.",
            "Copia de la factura del vehículo financiado.",
            "Proforma de vehículo financiado.",
            "Pagaré original a la orden del Fondo de Cesantía ESPE.",
            "Tabla de amortización firmada.",
            "Declaración de Licitud de fondos (cuando aplique).",
            "Factura de seguro vehicular contratado por el tiempo de financiamiento.",
            "Factura de servicio de rastreo satelital contratado por el tiempo de financiamiento (cuando aplique).",
            "Contrato de compra-venta con reserva de dominio a favor del Fondo o el contrato de prenda industrial, debidamente notariado e inscrito en el Registro Mercantil.",
        ],
    },
    {
        index: 2,
        image: education,
        title: "Préstamos Educativos",
        description: "¿Necesitas financiamiento para cubrir los gastos de educación o adquirir equipos tecnológicos relacionados con tu formación? Descúbrelos ahora.",
        marginLeft: "30%",
        marginRight: 0,
        monto: 'El monto de todos los créditos educativos otorgados a un partícipe no podrá ser mayor a USD 15.000,00 por operación.',
        plazo: 'El plazo máximo para la cancelación del préstamo educativo será de cuatro (4) años o cuarenta y ocho (48) meses, siempre que la sumatoria de la edad del partícipe y el número de años del préstamo educativo no supere los setenta y cinco (75) años de edad del partícipe.',
        tasa: '7%, según lo aprobado en Asamblea de Representantes.',
        requisitos: [
            "Solicitud de crédito con datos personales, firma del deudor y garante (s).",
            "Copia a color de cédula de ciudadanía o identidad actual del deudor y garante (s).",
            "Último confidencial del deudor y garante (s).",
            "Certificado bancario de la Institución Educativa o proveedor.",
            "Certificado original otorgado por la Institución Educativa, que valide la información para acceder al préstamo, los cuales aplican para títulos de todo nivel de educación formal, en el cual consten los valores a cancelar por los servicios educativos con la siguiente información: Nombres completos del estudiante; Período escolar; Semestre o créditos a cursar; Carrera profesional; Elaboración de tesis, proyectos y derechos de grado; Pasantías; Convenio de intercambio (detalle de gastos de viaje como pasajes, traslados, estadía y alimentación, fuera de la ciudad de residencia).",

            "Proforma certificada para la adquisición de equipos tecnológicos, informáticos u otros a ser utilizados en el período de estudio.",
            "Documentos justificativos o habilitantes de los viáticos o subsistencia, fuera de la ciudad de residencia.",
            "Pagaré con firma del deudor y garante (s).",
            "Contrato de adhesión.",
        ],
    },
    {
        index: 3,
        image: health,
        title: "Préstamos de Emergencias de Salud",
        description: "¿Te enfrentas a gastos imprevistos por emergencias médicas? Descubre cómo podemos brindarte el respaldo necesario para afrontar esas situaciones.",
        marginLeft: 0,
        marginRight: "30%",
        monto: 'El monto de todos los créditos de emergencia de salud otorgados a un partícipe no podrá ser mayor a USD 10.000,00 por operación. En caso que el préstamo solicitado supere el valor de la cuenta individual, éste deberá contar con un máximo de tres garantes que también deberán ser partícipes.',
        plazo: 'El plazo máximo para la cancelación del préstamo de emergencia de salud será de cuatro (4) años o cuarenta y ocho (48) meses, siempre que la sumatoria de la edad del partícipe y el número de años del préstamo de emergencia de salud no supere los setenta y cinco (75) años de edad del partícipe.',
        tasa: '7%, según lo aprobado en Asamblea de Representantes.',
        novacion: 'Se analizará si cubre por lo menos con el 50% de la deuda vigente, sea por la fecha o por el depósito como adelanto para cubrir este porcentaje.',
        requisitos: [
            "Solicitud de crédito con datos personales, firma del deudor y garantes (s)",
            "Copia a color de cédula de ciudadanía o identidad actual del deudor y garante (s)",
            "Último confidencial del deudor y garante (s)",
            "Documento que certifique la relación con el paciente.",
            "Proforma o factura del proveedor de Salud.",
            "Certificado bancario proveedor de Salud a la que se transferirá el valor concedido o a su vez el cheque.",
            "Contrato de adhesión.",
        ],
    },
];

export const checked = true;


