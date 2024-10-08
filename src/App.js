import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Loans from './components/Loan/loan';
import formChirographic from './components/Account/Chirographic/formChirographic';
import filesChirographic from './components/Account/Chirographic/uploadFilesChirographic';
import HomeChirographic from './components/Account/Chirographic/homeChrigraphic';
import formCollateral from './components/Account/Collateral/formCollateral';
import filesCollateral from './components/Account/Collateral/uploadFilesCollateral';
import HomeCollateral from './components/Account/Collateral/homeCollateral';
import History from './components/History/history';
import Simulator from './components/LoanSimulator/simulator';
import Cars from './components/Cars/cars';
import Login from './components/Login/login';
import Register from './components/Register/register';

import AccountConstruction from './components/AccountConstruction/constructionHome';
import Forbidden from './components/Forbidden/accountHome';

import Account from './components/Account/accountHome';
import PasswordChange from './components/Account/Configuration/passwordChange';
import AccountSimulator from './components/Account/AccountSimulator/simulator';
import Liquidations from './components/Account/Liquidation';
import Variation from './components/Account/AportVariation';
import Configuration from './components/Account/Configuration/configuration';
import Documents from './components/Account/Documents';

import Admin from './components/Admin/accountHome';
import PasswordChangeAdmin from './components/Admin/Configuration/passwordChange';
import ConfigurationAdmin from './components/Admin/Configuration/configuration';
import LoanAdmin from './components/Admin/Loan/loanManagment';
import ClientAdmin from './components/Admin/ClientsAccepted/clientManagment';
import ClientPendingAdmin from './components/Admin/ClientsPending/clientManagment';
import AccessAdmin from './components/Admin/Access/accessManagment';
//import Account from './pages/account/accountHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/prestamos" Component={Loans} />
        <Route exact path="/historia" Component={History} />
        <Route exact path="/simulador" Component={Simulator} />
        <Route exact path="/vehiculos" Component={Cars} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/registro" Component={Register} />

        <Route exact path="/cuenta" Component={Account} />
        <Route exact path="/cuenta/proceso-quirografario" Component={HomeChirographic} />
        <Route exact path="/cuenta/proceso-quirografario/formulario-quirografario" Component={formChirographic} />
        <Route exact path="/cuenta/proceso-quirografario/archivos-quirografario" Component={filesChirographic} />
        
        <Route exact path="/cuenta/proceso-prendario/formulario-prendario" Component={formCollateral} />
        <Route exact path="/cuenta/proceso-prendario/archivos-prendario" Component={filesCollateral} />
        <Route exact path="/cuenta/proceso-prendario" Component={HomeCollateral} />

        <Route exact path="/cuenta/configuracion/contrasena" Component={PasswordChange} />
        <Route exact path="/cuenta/configuracion" Component={Configuration} />
        <Route exact path="/cuenta/simulador-personalizado" Component={AccountSimulator} />
        <Route exact path="/cuenta/liquidacion-cesantia" Component={Liquidations} />
        <Route exact path="/cuenta/variacion-aporte" Component={Variation} />       
        <Route exact path="/cuenta/documentos" Component={Documents} />  
       
        
        
        <Route exact path="/cuenta-en-construccion" Component={AccountConstruction} />
        <Route exact path="/prohibido" Component={Forbidden} />
       
        <Route exact path="/admin-cuenta" Component={Admin} />
        <Route exact path="/admin-cuenta/configuracion/contrasena" Component={PasswordChangeAdmin} />
        <Route exact path="/admin-cuenta/configuracion" Component={ConfigurationAdmin} />
        <Route exact path="/admin-cuenta/prestamos" Component={LoanAdmin} />
        <Route exact path="/admin-cuenta/clientes" Component={ClientAdmin} />
        <Route exact path="/admin-cuenta/clientes-pendientes" Component={ClientPendingAdmin} />
        <Route exact path="/admin-cuenta/accesos" Component={AccessAdmin} />        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
