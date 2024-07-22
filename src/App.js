import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import InscriptionPage from './Pages/InscriptionPage';
import InscriptionEntreprise from './Pages/InscriptionEntreprisePage';

function App() {
  return<>
  <BrowserRouter>
  <Routes>
    <Route path='/'/>
    <Route path='/inscription' element={<InscriptionPage/>}/>
    <Route path='/inscription_entreprise' element={<InscriptionEntreprise/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}

export default App;
