import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../items/item';
import '../CSS/PagSeries.css';
import prueba from "../Diseño/series.png";
import { useNavigate } from 'react-router-dom';


const PaguinaSeries = () => {
    const [series, setSeries] = useState([]);
    const navigate = useNavigate(); // Define navigate


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

    const handleItemClick = (serie) => {
        console.log("Serie seleccionada:", serie);
        navigate(`/detalleSerie/${serie.id}`, { state: { serie } });
    };

    return (
        <div className='popular'>
            <br />
            <h1>Series</h1>
            <hr />
            <div className='popular-item'>
                {series.map((serie, index) => (
                     <div key={index} onClick={() => handleItemClick(serie)}>
                    <Item
                        
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
                     </div>
                ))}
            </div>
        </div>
    )

};

export default PaguinaSeries;