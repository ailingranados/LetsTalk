import './CSS/PeliculasReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrarPelicula() {
    const [titulo, setTitulo] = useState('');
    const [director, setDirector] = useState('');
    const [actor1, setActor1] = useState('');
    const [actor2, setActor2] = useState('');
    const [duracion, setDuracion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [plataformas, setPlataformas] = useState([]);

    // Función para obtener categorías
    const fetchCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getCategorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    // Función para obtener plataformas
    const fetchPlataformas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getPlataformas");
            setPlataformas(response.data);
        } catch (error) {
            console.error("Error al obtener plataformas:", error);
        }
    };

    // Cargar categorías y plataformas al montar el componente
    useEffect(() => {
        fetchCategorias();
        fetchPlataformas();
    }, []);

    const sendDatos = async (e) => {
        e.preventDefault();

        // Verifica si todos los campos están llenos
        if (!titulo || !director || !actor1 || !actor2 || !duracion || !categoria || !plataforma) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/postPelicula", {
                titulo,
                director,
                actor_1: actor1,
                actor_2: actor2,
                duracion, // Aquí ya se está enviando duracion en lugar de anio
                categoria,
                plataforma
            });
            alert("Película registrada correctamente");
        } catch (error) {
            console.error("Error enviando datos:", error);
            alert("Error al registrar la película");
        }
    };

    return (
        <form onSubmit={sendDatos}>
            <div className="bg-dark-x p-4 rounded shadow">
                <h2 className="text-light text-center mb-4">Registrar Película</h2>

                <div className="mb-3">
                    <label className="form-label text-light">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título de la película"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Director</label>
                    <input
                        type="text"
                        className="form-control"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        placeholder="Director de la película"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Actor 1</label>
                    <input
                        type="text"
                        className="form-control"
                        value={actor1}
                        onChange={(e) => setActor1(e.target.value)}
                        placeholder="Primer actor"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Actor 2</label>
                    <input
                        type="text"
                        className="form-control"
                        value={actor2}
                        onChange={(e) => setActor2(e.target.value)}
                        placeholder="Segundo actor"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Duración (min)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                        placeholder="Duración en minutos"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Categoría</label>
                    <select
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.Id} value={cat.Nombre}>{cat.Nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Plataforma</label>
                    <select
                        className="form-control"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                    >
                        <option value="">Seleccione una plataforma</option>
                        {plataformas.map((plat) => (
                            <option key={plat.Id} value={plat.Nombre}>{plat.Nombre}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-light w-100" type="submit">
                    Registrar
                </button>
            </div>
        </form>
    );
}

export default RegistrarPelicula;
