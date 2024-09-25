import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Registro';
import Home from './Home';
import NavBar from './NavBar';
import ListaUsaurios from './ListaUsuarios';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta "/" a la página de login */}
    
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Navbar" element={<NavBar />} />

        <Route path="/lista" element={<ListaUsaurios/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


