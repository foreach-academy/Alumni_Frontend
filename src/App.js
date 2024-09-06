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
import NavBar from './Components/NavBar';




function App() {
  return <>
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
  </>
}

export default App;
