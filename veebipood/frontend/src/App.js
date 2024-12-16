import './App.css';
import { Route, Routes } from 'react-router-dom';
import LisaToode from './pages/LisaToode';
import HaldaTooteid from './pages/HaldaTooteid';
import HaldaKategooriaid from './pages/HaldaKategooriaid';
import MuudaToode from './pages/MuudaToode';
import Avaleht from './pages/Avaleht';
import NavigationBar from './components/NavigationBar';

// ERR_CONNECTION_REFUSED --> back-end ei käi
// has been blocked by CORS policy --> back-end ei lase ligi

function App() {
  

  return (
    <div className="App">
      <NavigationBar />

{/* siin loetlen kõik URL-d mis mul rakenduses leiduvad */}
      <Routes>
        <Route path="" element={<Avaleht />} />
        <Route path="lisa-toode" element={<LisaToode />} />
        <Route path="halda-tooteid" element={<HaldaTooteid />} />
        <Route path="halda-kategooriaid" element={<HaldaKategooriaid />} />
        <Route path="muuda-toode/:name" element={<MuudaToode />} />
        <Route path="*" element={<div>404 - sellist URLi pole</div>} />
      </Routes>
    </div>
  );
}

export default App;
