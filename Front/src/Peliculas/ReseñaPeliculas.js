import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/Login.css';
import Estrellas from '../Diseño/Estrellas';

const ReseñaPelicula = () => {

    const [peliculas, setPeliculas] = useState([]); 
    const [selectedPeliculas, setSelectedPeliculas] = useState(''); 
    const [calificacion, setCalificacion] = useState('0'); 
    const [reseña, setReseña] = useState('');

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getPeliculas');
                setPeliculas(response.data); 
            } catch (error) {
                console.error("Error al obtener peliculas:", error);
            }
        };

        fetchPeliculas();
    }, []);

    const handleSelect = (event) => {
        console.log(event.target.value);
        setSelectedPeliculas(event.target.value); 
    };

    const navigate = useNavigate(); 

    const postReseña = async () => {
        try {
            const sesionId = localStorage.getItem('sesion');
            if (sesionId) {
                console.log("Id de la sesion: ", sesionId);

                const response = await axios.post('http://localhost:3001/resenaPelicula', {
                    id_sesion : sesionId,
                    titulo: selectedPeliculas,
                    calificacion: parseInt(calificacion),
                    reseña
                });

                const { mensaje } = response.data;
                console.log(mensaje);
                alert(mensaje);
                navigate('/perfilUsuario');
            }
            else {
                alert("No se encontró el ID de sesión en localStorage.");
            }
        } catch (error) {
            console.error("Error al crear reseña:", error);
            alert("Hubo un error al crear la reseña.");
        };
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
                        <h1 className="font-weight-bold mb-4">Reseña de Pelicula</h1>
                        <form className="mb-5">
                            <div className="mb-4">
                                <label htmlFor="peliculaDropdown" className="form-label font-weight-bold">Selecciona una pelicula</label>
                                <select
                                    id="peliculaDropdown"
                                    className="form-control bg-dark-x border-0 mb-2 text-cont"
                                    value={selectedPeliculas}
                                    onChange={handleSelect}
                                >
                                    <option value="">★★ Selecciona una película ★★</option>
                                    {peliculas.length > 0 ? (
                                        peliculas.map((pelicula) => (
                                            <option key={pelicula.Id} value={pelicula.Titulo}>
                                                {pelicula.Titulo}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No hay películas disponibles</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-4">

                                <label htmlFor="text" className="form-label font-weight-bold">Calificacion</label>
                                <Estrellas score={calificacion} />

                                <input
                                    type="number"
                                    name="calificacion"
                                    className="form-control bg-dark-x border-0 mb-2 text-light text-cont"
                                    placeholder="Ingresa tu calificacion"
                                    value={calificacion}
                                    onChange={(e) => setCalificacion(Math.min(Math.max(e.target.value, 0), 5))} // Restringe entre 0 y 5
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="text" className="form-label font-weight-bold">Reseña</label>
                                <textarea
                                    type="text"
                                    name="reseña"
                                    className="form-control bg-dark-x border-0 mb-2 text-light text-cont"
                                    placeholder="Ingresa tu reseña"
                                    value={reseña}
                                    onChange={(e) => setReseña(e.target.value)}
                                    rows={7}
                                />
                            </div>
                            <button type="button" className="btn btn-light w-100" onClick={postReseña}>Crear Reseña</button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReseñaPelicula;
