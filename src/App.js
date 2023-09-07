import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Loans from './components/Loan/loan';
import Chirographic from './components/Account/loanList/chrigraphic';
import Collateral from './components/Account/loanList/collateral';
import History from './components/History/history';
import Simulator from './components/LoanSimulator/simulator';
import News from './components/News/news';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Account from './components/Account/account';
//import Account from './pages/account/accountHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/prestamos" Component={Loans} />
        <Route exact path="/cuenta/formulario-quirografario" Component={Chirographic} />
        <Route exact path="/cuenta/formulario-prendario" Component={Collateral} />
        <Route exact path="/historia" Component={History} />
        <Route exact path="/simulador" Component={Simulator} />
        <Route exact path="/noticias" Component={News} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/registro" Component={Register} />
        <Route exact path="/cuenta" Component={Account} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
