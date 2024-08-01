import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import InscriptionPage from './Pages/InscriptionPage';
import InscriptionEntreprise from './Pages/InscriptionEntreprisePage';
import InscriptionApprenant from './Pages/InscriptionApprenant';
import InscriptionFormateur from './Pages/inscriptionFormateur';

function App() {
  return<>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<InscriptionPage/>}/>
    <Route path='/inscription_entreprise' element={<InscriptionEntreprise/>}/>
    <Route path='/inscription_apprenant' element={<InscriptionApprenant/>}/>
    <Route path= '/inscription_formateur' element={<InscriptionFormateur/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}

export default App;
