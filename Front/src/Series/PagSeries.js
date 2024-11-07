import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../items/item';
import '../CSS/PagSeries.css';
import prueba from "../Diseño/perfil.jpeg";

const PaguinaSeries = () => {
    const [series, setSeries] = useState([]);


    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getDatosSeries');
                console.log(response.data);
                setSeries(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchSeries();
    }, []);

    return (
        <div className='popular'>
            <br />
            <h1>Series</h1>
            <hr />
            <div className='popular-item'>
                {series.map((serie, index) => (
                    <Item
                        key={index}
                        image={prueba}
                        name={serie.Titulo}
                        actor_1={serie.Actor_1}
                        actor_2={serie.Actor_2}
                        finalizado={serie.Finalizada}
                        temporadas={serie.Temporadas}
                        capitulos={serie.Capitulos}
                        plataforma={serie.Plataforma}
                        categoria={serie.Categoria}

                    />
                ))}
            </div>
        </div>
    )

};

export default PaguinaSeries;