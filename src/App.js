import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import InscriptionPage from './Pages/InscriptionPage';
import InscriptionApprenant from './Pages/InscriptionApprenant';

function App() {
  return<>
  <BrowserRouter>
  <Routes>
    <Route path='/'/>
    <Route path='/inscription' element={<InscriptionPage/>}/>
    <Route path='/inscription_apprenant' element={<InscriptionApprenant/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}

export default App;
