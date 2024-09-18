import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const navigate = useNavigate();

    const sendDatos = async (e) => {
        e.preventDefault();
    
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }
    
        const formData = new FormData();
        formData.append('usuario', usuario);
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('correo', correo);
        formData.append('contrasena', contrasena);
        formData.append('fotoPerfil', fotoPerfil);
        formData.append('fechaNacimiento', fechaNacimiento);
    
        try {
            const response = await axios.post("http://localhost:3001/create", formData);
            console.log("Response data:", response.data); // Verifica la estructura de la respuesta
    
            const { mensaje } = response.data;
    
            if (mensaje === 'El correo electrónico ya está registrado.') {
                alert(mensaje); // Mostrar alerta si el correo ya está registrado
            } else {
                alert(mensaje); // Mostrar mensaje de éxito
                navigate('/login'); // Redirigir al login si el registro fue exitoso
            }
        } catch (error) {
            console.error("Error enviando datos:", error);
            if (error.response) {
                console.log("Error response data:", error.response.data); // Verifica la respuesta de error
                alert(error.response.data.mensaje); // Mostrar mensaje de error del servidor
            } else {
                alert("Error en el servidor");
            }
        }
    };
    

    const handleTermsNavigation = () => {
        window.location.href = '/terms';
    };

    const handleLoginNavigation = () => {
        window.location.href = '/Login';
    };

    return (
        <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="col-lg-8 bg-dark d-flex flex-column align-items-center p-4 rounded">
                <h1 className="font-weight-bold mb-4">Registro de Usuario</h1>
                <form onSubmit={sendDatos} className="w-100">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="usuario" className="form-label font-weight-bold text-light">Nombre de Usuario</label>
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="usuario" 
                                placeholder="Usuario" 
                                value={usuario} 
                                onChange={(e) => setUsuario(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label font-weight-bold text-light">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="nombre" 
                                placeholder="Nombre" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label font-weight-bold text-light">Apellido</label>
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="apellido" 
                                placeholder="Apellido" 
                                value={apellido} 
                                onChange={(e) => setApellido(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="correo" className="form-label font-weight-bold text-light">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className="form-control form-control-custom" 
                                id="correo" 
                                placeholder="Correo Electrónico" 
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="contrasena" className="form-label font-weight-bold text-light">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control form-control-custom" 
                                id="contrasena" 
                                placeholder="Contraseña" 
                                value={contrasena} 
                                onChange={(e) => setContrasena(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmarContrasena" className="form-label font-weight-bold text-light">Verificar Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control form-control-custom" 
                                id="confirmarContrasena" 
                                placeholder="Verificar Contraseña" 
                                value={confirmarContrasena} 
                                onChange={(e) => setConfirmarContrasena(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fotoPerfil" className="form-label font-weight-bold text-light">Foto de Perfil</label>
                            <input 
                                type="file" 
                                className="form-control form-control-custom" 
                                id="fotoPerfil" 
                                onChange={(e) => setFotoPerfil(e.target.files[0])} 
                                accept="image/*" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
    <label htmlFor="fechaNacimiento" className="form-label font-weight-bold text-light">Fecha de Nacimiento</label>
    <input 
        type="date" 
        className="form-control form-control-custom" 
        id="fechaNacimiento" 
        value={fechaNacimiento} 
        onChange={(e) => setFechaNacimiento(e.target.value)} 
        required 
    />
</div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="terminosYCondiciones" 
                                required 
                            />
                            <label className="form-check-label font-weight-bold text-light" htmlFor="terminosYCondiciones">
                                Acepto los <button type="button" onClick={handleTermsNavigation} className="btn btn-link text-light">términos y condiciones</button>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-light w-100">Registrarse</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0 text-light">¿Ya tienes una cuenta? <button type="button" onClick={handleLoginNavigation} className="btn btn-link text-light font-weight-bold text-decoration-none">Inicia sesión</button></p>
                </div>
            </div>
        </div>
    );
}

