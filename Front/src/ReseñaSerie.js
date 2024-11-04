import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Login.css'; 

const Login = () => {
   
    const [series, setSeries] = useState([]); // Estado para almacenar la lista de series
    const [selectedSerie, setSelectedSerie] = useState(''); // Estado para la serie seleccionada

    useEffect( //se va ejecutar solo una vez
        ()=>{
            localStorage.removeItem('sesion'); // Limpiar el localStorage al cargar la página

            const fetchSeries = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/getSeries');
                    setSeries(response.data); // Guardamos las series en el estado
                } catch (error) {
                    console.error("Error al obtener series:", error);
                }
            };
    
            fetchSeries();
        }, []
    )

        const handleSelect = (event) => {
        console.log(event.target.value);
        setSelectedSerie(event.target.value); // Actualiza la serie seleccionada
        };
    const navigate = useNavigate(); // Crear una instancia de useNavigate

    // Función para manejar el login
   
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
                        <h1 className="font-weight-bold mb-4">Reseña de Serie</h1>
                        <form className="mb-5">
                            <div className="mb-4">
                                <label htmlFor="serieDropdown" className="form-label font-weight-bold">Selecciona una Serie</label>
                                <select
                id="serieDropdown"
                className="form-select"
                value={selectedSerie}
                onChange={handleSelect}
            >
                <option value="">-- Selecciona una Serie --</option>
                {series.map((serie) => (
                    <option key={serie.Id} value={serie.Titulo}>
                        {serie.Titulo}
                    </option>
                ))}
            </select>
                            </div>
                            
                            <button type="button" className="btn btn-light w-100">Iniciar sesión</button>
                        </form>
                        
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

export default Login;
