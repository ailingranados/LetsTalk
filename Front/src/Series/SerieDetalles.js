import 'bootstrap/dist/css/bootstrap.min.css';

import '../CSS/SerieDetalles.css';

import prueba from "../Diseño/series.png";
import React, { useEffect, useState } from 'react';
import Estrellas from '../Diseño/Estrellas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SerieDetalles = () => {
    const location = useLocation();
    const { serie } = location.state;
    const [reseñas, setReseña] = useState([]);



    useEffect(() => {

        const fetchReseña = async () => {

            try {
                console.log("Serie en try:", serie.Id);
                const response = await axios.get(`http://localhost:3001/getResenaSerie/${serie.Id}`);

                console.log("respuesta", response.data);
                setReseña(response.data);
                {console.log("reseñas", reseñas)}
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchReseña();
    }, []
    )

    return (
        <>

            <div className='panel'>

                <br />
                <h1>{serie.Titulo}</h1>
                <hr />
            </div>
            <div className='contenedor-row'>
                <div className='panel-item'>
                    <div className='item'>
                        <h1>{serie.titulo}</h1>
                        <img className='item-image' src={prueba} alt={serie.Titulo} />
                        <p>Actor 1: {serie.Actor_1}</p>
                        <p>Actor 2: {serie.Actor_2}</p>
                        <p>Finalizado: {serie.Finalizado ? 'Sí' : 'No'}</p>
                        <p>Temporadas: {serie.Temporadas}</p>
                        <p>Capítulos: {serie.Capitulos}</p>
                        <p>Plataforma: {serie.Plataforma}</p>
                        <p>Categoría: {serie.Categoria}</p>
                    </div>
                </div>


                <div className='contenedor-reseña'>

                    {reseñas.map((reseña, index) => (
                        <div key={index} >
                            <div className='reseña'>
                                <div className='item'>


                                    <div className="item-prices">
                                        Usuario:
                                        <div className="">
                                            
                                            {reseña.Usuario}
                                            

                                        </div>
                                        
                                    </div>

                                    {/* <div className="item-prices">
                                        :
                                        <div className="">
                                            {reseña.Titulo}

                                        </div>


                                    </div> */}

                                    <div className="item-prices">

                                        Calificacion:

                                        {/* {reseña.Calificacion} */}
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




    )
};


export default SerieDetalles; 