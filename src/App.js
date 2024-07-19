import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import InscriptionPage from './Pages/InscriptionPage';

function App() {
  return<>
  <BrowserRouter>
  <Routes>
    <Route path='/'/>
    <Route path='/inscription' element={<InscriptionPage/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}

export default App;
