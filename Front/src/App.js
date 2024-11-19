import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Agregar Outlet aquí
import Login from './Login';
import Register from './Registro';
import Home from './Home';
import NavBar from './Navegacion/NavBar'; // Corrige la ruta aquí
import ListaUsaurios from './ListaUsuarios';
import PerfilUsuario from './PerfilUsuario';

import EditarPerfil from './EditarPerfil';
import Admin from './Admin';

import ReseñaSerie from './Series/ReseñaSerie';
import Navbar from './Navegacion/NavBar';
import PaguinaSeries from './Series/PagSeries';
import ReseñaLibros from './Libros/ReseñaLibros';
import PaginaLibros from './Libros/PagLibros';
import Imagen from './items/Imagen';
import SerieDetalles from './Series/SerieDetalles';
import LibrosDetalles from './Libros/LibrosDetalles';

import PeliculaDetalles from './Peliculas/PeliculaDetalles';
import PaginaPeliculas from './Peliculas/PagPeliculas';
import ReseñaPelicula from './Peliculas/ReseñaPeliculas';

import RegistarPelis from './Registros/RegisPelis';
import RegistarSeries from './Registros/RegistarSerie';
import RegistrarLibro from './Registros/RegistarLibro';

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
        {/* <Route path="/perfil" element={<PerfilUsuario />} /> */}
        <Route path="/lista" element={<ListaUsaurios />} />
        <Route path="/Admin" element={<Admin />} />
       

        <Route path="/CrearLibro" element={<RegistrarLibro />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path='/registrarPeliculas' element={<RegistarPelis/>}></Route>
        <Route path='/registrarSeries' element={<RegistarSeries/>}></Route>
        <Route path='/registrarLibro' element={<RegistrarLibro/>}></Route>


        {/* Rutas con Navbar */}
        <Route element={<Layout />}>
        <Route path="/perfilUsuario" element={<PerfilUsuario />} />
        <Route path="/editarUsuario" element={<EditarPerfil />} />
        <Route path="/reseñaSerie" element={<ReseñaSerie />} />
        <Route path="/paginaSeries" element={<PaguinaSeries />} />

        <Route path="/detalleSerie/:id" element={<SerieDetalles />} />

        <Route path="/ReseñaLibros" element={<ReseñaLibros />} />
        <Route path="/PaginaLibros" element={<PaginaLibros />} />
        <Route path="/detalleLibros/:id" element={<LibrosDetalles />} />

        <Route path="/paginaPelicula" element={<PaginaPeliculas />} />
        <Route path="/resenaPelicula" element={<ReseñaPelicula />} />
        <Route path="/detallePelicula/:id" element={<PeliculaDetalles />} />
        
      
        <Route path="/imagen" element={< Imagen/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


