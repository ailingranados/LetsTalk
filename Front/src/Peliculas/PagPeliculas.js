import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../items/item_peliculas.js';
import '../CSS/PagSeries.css';
import prueba from "../Diseño/Arcane.jpg"; // Cambia la imagen si es necesario
import { useNavigate } from 'react-router-dom';

const PaginaPeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getDatosPeliculas');
                console.log(response.data);
                setPeliculas(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchPeliculas();
    }, []);

    const handleItemClick = (pelicula) => {
        navigate(`/detallePelicula/${pelicula.Id}`, { state: { pelicula } });
    };

    return (
        <div className='popular'>
            <br />
            <h1>Películas</h1>
            <hr />
            <div className='popular-item'>
                {peliculas.map((pelicula, index) => (
                    <div key={index} onClick={() => handleItemClick(pelicula)}>
                          <Item
                 
                         image={prueba}
                            name={pelicula.Titulo}
                            actor_1={pelicula.Actor_1}
                            actor_2={pelicula.Actor_2}
                            duracion={pelicula.Duracion}
                            plataforma={pelicula.Plataforma}
                            categoria={pelicula.Categoria}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaginaPeliculas;
