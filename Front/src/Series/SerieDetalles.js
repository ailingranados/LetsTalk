import 'bootstrap/dist/css/bootstrap.min.css';

import '../CSS/SerieDetalles.css';

import prueba from "../Diseño/Arcane.jpg";
import React from 'react';
import { useLocation } from 'react-router-dom';


const SerieDetalles = () => {
    const location = useLocation();
    const { serie } = location.state;

    console.log(serie);
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


                    <div className='contenedor-reseña'>
                        <div className='reseña'>
                            <h1>{serie.titulo}</h1>
                            {/* <img className='item-image' src={prueba} alt={serie.Titulo} /> */}
                            <p>Actor 1: {serie.Actor_1}</p>
                            <p>Actor 2: {serie.Actor_2}</p>
                            <p>Finalizado: {serie.Finalizado ? 'Sí' : 'No'}</p>
                            <p>Temporadas: {serie.Temporadas}</p>
                            <p>Capítulos: {serie.Capitulos}</p>
                            <p>Plataforma: {serie.Plataforma}</p>
                            <p>Categoría: {serie.Categoria}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>




    )
};


export default SerieDetalles; 