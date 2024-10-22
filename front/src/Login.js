import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Login.css'; 

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [mensajeTipo, setMensajeTipo] = useState('');

    useEffect( //se va ejecutar solo una vez
        ()=>{
            localStorage.removeItem('sesion'); // Limpiar el localStorage al cargar la página
        }, []
    )

    const navigate = useNavigate(); // Crear una instancia de useNavigate

    // Función para manejar el login
    const handleLogin = async () => { 
        try {
            const response = await axios.post('http://localhost:3001/login', {
                correo,
                contrasena
            });
    
            const { mensaje, id_usuario, rol } = response.data;
            setMensaje(mensaje);
            setMensajeTipo(id_usuario > 0 ? 'success' : 'error');
    
            if (id_usuario > 0) {
                localStorage.setItem('sesion', id_usuario);
                // Redirigir según el rol
                if (rol === 2) {
                    navigate('/Admin');
                } else if (rol === 1) {
                    navigate('/home');
                }
            }
        } catch (error) {
          
            if (error.response && error.response.status === 403) {
                // El usuario no está aprobado
                setMensaje("El usuario no está aprobado para iniciar sesión");
                setMensajeTipo('error');
            } else {
                setMensaje("Error en el servidor");
                setMensajeTipo('error');
            }
        }
    };

    return (
        <div className="bg-dark min-vh-100">
            <div className="row g-0">
                <div className="col-lg-7 d-none d-lg-block">
                    <Carousel>
                        <Carousel.Item className="img-1 min-vh-100">
                            <div className="carousel-caption d-none d-md-block"></div>
                        </Carousel.Item>
                        <Carousel.Item className="img-2 min-vh-100">
                            <div className="carousel-caption d-none d-md-block"></div>
                        </Carousel.Item>
                        <Carousel.Item className="img-3 min-vh-100">
                            <div className="carousel-caption d-none d-md-block"></div>
                        </Carousel.Item>
                        <Carousel.Item className="img-4 min-vh-100">
                            <div className="carousel-caption d-none d-md-block"></div>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="col-lg-5 bg-dark d-flex flex-column align-items-end min-vh-100">
                    <div className="align-self-center w-100 px-lg-5 py-lg-4 p-4"><br></br><br></br>
                        <h1 className="font-weight-bold mb-4">Bienvenid@</h1>
                        <form className="mb-5">
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label font-weight-bold">Email</label>
                                <input 
                                    type="email" 
                                    name="correo" 
                                    className="form-control bg-dark-x border-0" 
                                    placeholder="Ingresa tu email" 
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)} 
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label font-weight-bold">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="contrasena" 
                                    className="form-control bg-dark-x border-0 mb-2" 
                                    placeholder="Ingresa tu contraseña" 
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)} 
                                />
                            </div>
                            <button type="button" onClick={handleLogin} className="btn btn-light w-100">Iniciar sesión</button>
                        </form>
                        {mensaje && 
                            <div className={`message ${mensajeTipo}`}>
                                {mensaje}
                            </div>
                        }
                    </div>
                    <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 mt-auto w-100">
                        <p className="d-inline-block mb-0">¿Todavía no tienes una cuenta? </p>
                        <Link to="/register" className="text-light fw-bold text-decoration-none"> Crea una ahora</Link>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
