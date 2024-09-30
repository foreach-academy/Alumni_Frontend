import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import InscriptionPage from './Pages/InscriptionPage';
import InscriptionEntreprise from './Pages/InscriptionEntreprisePage';
import InscriptionApprenant from './Pages/InscriptionApprenant';
import InscriptionFormateur from './Pages/inscriptionFormateur';
import ConnexionPage from './Pages/connexionPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ValidationComptePage from './Pages/ValidationComptePage';
import AnnuairePage from './Pages/annuairePage';
import ProfilPage from './Pages/ProfilPage'
import AuthContext from './Contexts/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
      // Configurer les en-têtes d'axios pour les requêtes futures
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);
  return <>
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InscriptionPage />} />
          <Route path='/inscription_entreprise' element={<InscriptionEntreprise />} />
          <Route path='/inscription_apprenant' element={<InscriptionApprenant />} />
          <Route path='/inscription_formateur' element={<InscriptionFormateur />} />
          <Route path='/connexion' element={<ConnexionPage />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path='/validation_compte' element={<ValidationComptePage />} />
          <Route path='/page_annuaire' element={<AnnuairePage />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  </>
}

export default App;
