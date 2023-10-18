import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Loans from './components/Loan/loan';
import Chirographic from './components/Account/Chirographic/chrigraphic';
import formChirographic from './components/Account/Chirographic/formChirographic';
import filesChirographic from './components/Account/Chirographic/uploadFilesChirographic';
import History from './components/History/history';
import Simulator from './components/LoanSimulator/simulator';
import News from './components/News/news';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Account from './components/Account/accountHome';
import PasswordChange from './components/Account/Configuration/passwordChange';
import HomeChirographic from './components/Account/Chirographic/homeChrigraphic';
import AccountSimulator from './components/Account/AccountSimulator/simulator';
import Liquidations from './components/Account/Liquidation';
import Variation from './components/Account/AportVariation';
import Configuration from './components/Account/Configuration/configuration';
//import Account from './pages/account/accountHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/prestamos" Component={Loans} />
        <Route exact path="/cuenta/proceso-quirografario/formantiguo" Component={Chirographic} />
        <Route exact path="/cuenta/proceso-quirografario/formulario-quirografario" Component={formChirographic} />
        <Route exact path="/cuenta/proceso-quirografario/archivos-quirografario" Component={filesChirographic} />
        <Route exact path="/cuenta/proceso-quirografario" Component={HomeChirographic} />
        <Route exact path="/historia" Component={History} />
        <Route exact path="/simulador" Component={Simulator} />
        <Route exact path="/noticias" Component={News} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/registro" Component={Register} />
        <Route exact path="/cuenta" Component={Account} />
        <Route exact path="/cuenta/configuracion/contrasena" Component={PasswordChange} />
        <Route exact path="/cuenta/configuracion" Component={Configuration} />
        <Route exact path="/cuenta/simulador-personalizado" Component={AccountSimulator} />
        <Route exact path="/cuenta/liquidacion-cesantia" Component={Liquidations} />
        <Route exact path="/cuenta/variacion-aporte" Component={Variation} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
