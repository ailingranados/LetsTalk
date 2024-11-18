import 'bootstrap/dist/css/bootstrap.min.css';
// import '../CSS/PeliculaDetalles.css';
import Item from '../items/item';
import prueba from "../Diseño/Arcane.jpg";
import React, { useEffect, useState } from 'react';
import Estrellas from '../Diseño/Estrellas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PeliculaDetalles = () => {
    const location = useLocation();
    const { pelicula } = location.state;
    const [reseñas, setReseña] = useState([]);

    useEffect(() => {
        const fetchReseña = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getResenaPelicula');
                setReseña(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchReseña();
    }, []);

    return (
        <>
            <div className='panel'>
                <h1>{pelicula.Titulo}</h1>
                <hr />
            </div>
            <div className='contenedor-row'>
                <div className='panel-item'>
                    <div className='item'>
                        <h1>{pelicula.Titulo}</h1>
                        <img className='item-image' src={prueba} alt={pelicula.Titulo} />
                        <p>Director: {pelicula.Director}</p>
                        <p>Actor 1: {pelicula.Actor_1}</p>
                        <p>Actor 2: {pelicula.Actor_2}</p>
                        <p>Duración: {pelicula.Duracion} minutos</p>
                        <p>Plataforma: {pelicula.Plataforma}</p>
                        <p>Categoría: {pelicula.Categoria}</p>
                    </div>
                </div>

                <div className='contenedor-reseña'>
                    {reseñas.map((reseña, index) => (
                        <div key={index}>
                            <div className='reseña'>
                                <div className='item'>
                                    <div className="item-prices">
                                        Usuario:
                                        <div>{reseña.Usuario}</div>
                                    </div>
                                    <div className="item-prices">
                                        Calificación:
                                        <Estrellas score={reseña.Calificacion} />
                                    </div>
                                    <div className="item-prices">
                                        Fecha:
                                        <div>{reseña.Fecha}</div>
                                    </div>
                                    <div className="item-prices">
                                        Reseña:
                                        <div>{reseña.Reseña}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PeliculaDetalles;
