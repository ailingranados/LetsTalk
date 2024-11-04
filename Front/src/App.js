import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Agregar Outlet aquí
import Login from './Login';
import Register from './Registro';
import Home from './Home';
import NavBar from './NavBar';
import ListaUsaurios from './ListaUsuarios';
import PerfilUsuario from './PerfilUsuario';
import RegistrarLibro from './RegistrarLibro';
import EditarPerfil from './EditarPerfil';
import Admin from './Admin';
import Navbar from './NavBar';
import ReseñaSerie from './ReseñaSerie';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta "/" a la página de login */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/lista" element={<ListaUsaurios />} />
        <Route path="/Admin" element={<Admin />} />
       

        <Route path="/CrearLibro" element={<RegistrarLibro />} />
        <Route path="/" element={<Navigate to="/login" />} />


        {/* Rutas con Navbar */}
        <Route element={<Layout />}>
        <Route path="/perfilUsuario" element={<PerfilUsuario />} />
        <Route path="/editarUsuario" element={<EditarPerfil />} />
        <Route path="/reseñaSerie" element={<ReseñaSerie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


