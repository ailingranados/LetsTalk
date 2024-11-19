import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './Navbar.css'; 
import logo from './Logo.png'; 


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo a la izquierda */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* Sección de categorías */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorías
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/paginaPelicula">Películas</Link></li>
                                <li><Link className="dropdown-item" to="/PaginaLibros">Libros</Link></li>
                                <li><Link className="dropdown-item" to="/paginaSeries">Series</Link></li>
                            </ul>
                           
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Reseñas
                            </Link>
                           
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/resenaPelicula">Crear reseña Películas</Link></li>
                                <li><Link className="dropdown-item" to="/ReseñaLibros">Crear reseña Libros</Link></li>
                                <li><Link className="dropdown-item" to="/reseñaSerie">Crear reseña Series</Link></li>
                            </ul>
                        </li>
                        {/* Mis Reseñas */}
                        <li className="nav-item">
                            {/* <Link className="nav-link text-dark" to="/mis-resenas">Mis Reseñas</Link> */}
                        </li>
                    </ul>
                    {/* Enlace para "Mi perfil" en la esquina derecha */}
                    <Link className="nav-link text-dark" to="/perfilUsuario">Mi Perfil</Link>
                </div>
            </div>
        </nav>
    );
}