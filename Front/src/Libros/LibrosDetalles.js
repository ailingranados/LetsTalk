import 'bootstrap/dist/css/bootstrap.min.css';

import '../CSS/SerieDetalles.css';
import prueba from "../Diseño/libros.png";
import React, { useEffect, useState } from 'react';
import Estrellas from '../Diseño/Estrellas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const LibroDetalles = () => {
    const location = useLocation();
    const { libro } = location.state;
    const [reseñas, setReseña] = useState([]);

    useEffect(() => {
        console.log("Libro en try:", libro.Id);
        const fetchReseña = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3001/getResenaLibros/${libro.Id}`);
                console.log(response.data);
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
                <br />
                <h1>{libro.Titulo}</h1>
                <hr />
            </div>
            <div className='contenedor-row'>
                <div className='panel-item'>
                    <div className='item'>
                        <h1>{libro.titulo}</h1>
                        <img className='item-image' src={prueba} alt={libro.Titulo} />
                        <p>Autor: {libro.Author}</p>
                        <p>Editorial: {libro.Editorial}</p>
                        <p>ISBN: {libro.ISBN }</p>
                        <p>Categoria: {libro.Categoria}</p>
                    </div>
                </div>

                <div className='contenedor-reseña'>
                    {reseñas.map((reseña, index) => (
                        <div key={index}>
                            <div className='reseña'>
                                <div className='item'>
                                    <div className="item-prices">
                                        Usuario:
                                        <div className="">
                                            {reseña.Usuario}  {/* Si quieres el nombre del usuario, es posible que necesites hacer un join adicional en el backend */}
                                        </div>
                                    </div>

                                    <div className="item-prices">
                                        Calificación:
                                        <Estrellas score={reseña.Calificacion} />
                                    </div>

                                    <div className="item-prices">
                                        Fecha:
                                        <div className="">
                                            {reseña.Fecha}
                                        </div>
                                    </div>

                                    <div className="item-prices">
                                        Reseña:
                                        <div className="">
                                            {reseña.Reseña}
                                        </div>
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

export default LibroDetalles;