import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const VERusu = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [administradores, setAdministradores] = useState([]);
    const [colaboradores, setcolaboradores] = useState([]);
    useEffect(() => {
        const fetchUsuarios = async () => {
            const id_usuario = localStorage.getItem('sesion'); // Obtiene el ID del usuario de localStorage

            if (id_usuario) { // Verifica si hay un ID de usuario
                try {
                    const response = await axios.get(`http://localhost:3001/Administrador/${id_usuario}`);
                    console.log(response.data); // Revisa los datos aquí
                    setUsuarios(response.data);
               
                const responseAdministradores = await axios.get('http://localhost:3001/getAdministradores');
                console.log("Lista de administradores aprobados:", responseAdministradores.data);
                setAdministradores(responseAdministradores.data); 

                const responseColaboradores = await axios.get('http://localhost:3001/getColaboradores');
                console.log("Lista de colaboradores aprobados:", responseColaboradores.data);
                setcolaboradores(responseColaboradores.data); // Guarda la lista de administradores en el estado

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }

            }
        };

        fetchUsuarios();
    }, []);

    const aprobarUsuario = async (id) => {
        console.log(id);
        try {
            await axios.put(`http://localhost:3001/aprobarUsuario/${id}`);
            // Actualiza la lista de administradores en el frontend
            setAdministradores(prevAdmins =>
                prevAdmins.map(admin =>
                    admin.Id === id ? { ...admin, Aprobado: 0 } : admin
                )
            );
            // Recarga la página después de aprobar al usuario
            alert("Usuario aprobado");
            window.location.reload(); 
        } catch (error) {
            console.error("Error al aprobar usuario:", error);
        }
    };

    return (
        <>
        {/* Navbar Section */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/admin">Inicio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/registrarPeliculas">Agregar Película</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/registrarLibro">Agregar Libro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/registrarSeries">Agregar Serie</Link>
                        </li>
                       
                    </ul>
                  
                        <div  className="ms-auto" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
                            <Link className="nav-link" to="/">Salir</Link>
                        </div>
                      
                </div>
                
            </div>
        </nav>

        {/* Body Section */}
        <div className="container mt-4">
    <h1 className="text-center">Administrador</h1>
    <div className="row">
    {usuarios.map((usuario, index) => (
                        <div key={usuario.Id ? usuario.Id : index} className="d-flex justify-content-center">
                            <div className="card" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Usuario: {usuario.Usuario}</h5>
                                    <p className="card-text"><strong>Nombre:</strong> {usuario.Nombre}</p>
                                    <p className="card-text"><strong>Apellido:</strong> {usuario.Apellido}</p>
                                    <p className="card-text"><strong>Correo:</strong> {usuario.Correo}</p>
                                    <p className="card-text"><strong>Fecha de Nacimiento:</strong> {usuario.Fecha_nacimiento}</p>
                                  
                                </div>
                            </div>
                        </div>
                    ))}
    </div>
    <h1>Administradores a aprobar</h1>
    <table className="table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Aprobar</th>
                    </tr>
                </thead>
               
                <tbody>
                {administradores.map((administrador, index) => (
    <tr key={administrador.Id ? administrador.Id : index}>
        <td>{administrador.Usuario}</td>
        <td>{administrador.Nombre}</td>
        <td>{administrador.Apellido}</td>
        <td>{administrador.Correo}</td>
        <td>{administrador.Fecha_nacimiento}</td>
        <td>
            {console.log(administrador)}
            {administrador.Aprobado === "1" ? (
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => aprobarUsuario(administrador.Id)}  // Usar "Id" aquí
                >
                    Aprobar
                </button>
            ) : (
                <span>Aprobado</span>
            )}
        </td>
    </tr>
))}

</tbody>

            </table>

            <h1>Usuarios a aprobar</h1>
    <table className="table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Aprobar</th>
                    </tr>
                </thead>
               
                <tbody>
                {colaboradores.map((colaborador, index) => (
    <tr key={colaborador.Id ? colaborador.Id : index}>
        <td>{colaborador.Usuario}</td>
        <td>{colaborador.Nombre}</td>
        <td>{colaborador.Apellido}</td>
        <td>{colaborador.Correo}</td>
        <td>{colaborador.Fecha_nacimiento}</td>
        <td>
            {colaborador.Aprobado === "1" ? (
                <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={() => aprobarUsuario(colaborador.Id)}  // Usar "Id" aquí
                >
                    Aprobar
                </button>
            ) : (
                <span>Aprobado</span>
            )}
        </td>
    </tr>
))}

</tbody>

            </table>
</div>

    </>
    );
}

export default VERusu;
