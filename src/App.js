import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  return<>
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path='/'/>
    <Route path='/inscription'/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}

export default App;
