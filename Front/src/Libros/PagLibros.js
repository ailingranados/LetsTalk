import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../items/item_libros';
import prueba from "../Diseño/Principito.jpg";
import { useNavigate } from 'react-router-dom';
const PaginaLibros = () => {
    const [libros, setLibros] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getDatosLibros');
                console.log(response.data);
                setLibros(response.data);
            } catch (error) {
                console.error("Error al obtener datos de libros:", error);
            }
        };
        fetchLibros();
    }, []);
    const handleItemClick = (libro) => {
        navigate(`/detalleLibros/${libro.id}`, { state: { libro } });
    };

    return (
        <div className='popular'>
            <br />
            <h1>Libros</h1>
            <hr />
            <div className='popular-item'>
                
                {libros.map((libro, index) => (
                       <div key={index} onClick={() => handleItemClick(libro)}>
                    <Item
                        key={index}
                        image={prueba}
                        name={libro.Titulo}
                        author={libro.Author}
                        editorial={libro.Editorial}
                        isbn={libro.ISBN}
                        categoria={libro.Categoria}
                    />
                     </div>
                ))}
            </div>
        </div>
    );
};

export default PaginaLibros;