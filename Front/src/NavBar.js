import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate

function NavBar (){

    const usuario = localStorage.getItem('sesion'); // Obtener el ID del usuario de localStorage
    return(
        
<nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
{
                    usuario?
                    <>
                    <span className="navbar-brand mb-0 h1">{usuario}</span> //Cambiar el texto por el valor de la variable sesion
                    <Link to="/Login" className='btn btn-outline-info'>Cerrar sesión</Link> // Agregar un botón para cerrar sesión
                    </>
                    :
                    <Link to="/Login" className='btn btn-outline-info'>Iniciar sesión</Link>
               
}
                </div>
            </nav>

    )
}

export default NavBar;