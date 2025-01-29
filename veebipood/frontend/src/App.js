import './App.css';
import { Route, Routes } from 'react-router-dom';
import LisaToode from './pages/admin/LisaToode';
import HaldaTooteid from './pages/admin/HaldaTooteid';
import HaldaKategooriaid from './pages/admin/HaldaKategooriaid';
import MuudaToode from './pages/admin/MuudaToode';
import Avaleht from './pages/Avaleht';
import NavigationBar from './components/NavigationBar';
import Ostukorv from './pages/Ostukorv';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/auth/Profile';
import { useContext } from 'react';
import { AuthContext } from './store/AuthContext';
import NotFound from './pages/NotFound';
import { Spinner } from 'react-bootstrap';

// ERR_CONNECTION_REFUSED --> back-end ei käi
// has been blocked by CORS policy --> back-end ei lase ligi

function App() {
  const {loggedIn, admin} = useContext(AuthContext);

  logoutCheck(); // <-- tuleb muuta

  // KODUS ---> function käima lükkama iga 1 minuti tagant 
  function logoutCheck() {
    const storageDate = sessionStorage.getItem("expiration");
    if (storageDate === null) {
      return;
    }
    const expirationDate = new Date(storageDate);
    console.log(expirationDate.getTime());
    console.log((new Date()).getTime());
    if (expirationDate.getTime() - 60*1000 < (new Date()).getTime()) {
      console.log("SÕNUM");
      // alert("Sind logitakse 1 minuti pärast välja!");
      if (expirationDate.getTime() < (new Date()).getTime()) {
        console.log("LOGOUT")
        // logout();
      }
    }
  }

  if (loggedIn === undefined) {
    return <Spinner />
  }

  return (
    <div className="App">
      <NavigationBar />

{/* siin loetlen kõik URL-d mis mul rakenduses leiduvad */}
      <Routes>
        <Route path="" element={<Avaleht />} />
        {
        loggedIn === true && admin === true &&
        <>
          <Route path="lisa-toode" element={<LisaToode />} />
          <Route path="halda-tooteid" element={<HaldaTooteid />} />
          <Route path="halda-kategooriaid" element={<HaldaKategooriaid />} />
          <Route path="muuda-toode/:name" element={<MuudaToode />} />
        </>}
        <Route path="ostukorv" element={<Ostukorv />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {loggedIn === true && <Route path="profile" element={<Profile />} />}
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
