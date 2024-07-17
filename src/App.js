import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';

function App() {
  return<>
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path='/'/>
  </Routes>
  </BrowserRouter>
  </>
}

export default App;
