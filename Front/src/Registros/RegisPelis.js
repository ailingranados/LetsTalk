import { useEffect, useState } from 'react';
import '../CSS/RegisPelis.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegiPelicula(){


const [Titulo, setTitulo] = useState('');
  const [Director, setDirector] = useState('');
  const [Actor1, setActor1] = useState('');
  const [Actor2, setActor2] = useState('');
  const [Duracion, setDuracion] = useState('');
  const [Foto, setFoto] = useState(null);
  const [Categ, setCateg] = useState('');
  const [Plataforma, setPlataforma] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);

  useEffect( //se va ejecutar solo una vez
    () => {

        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getCategorias');
                setCategorias(response.data); // Guardamos las series en el estado
            } catch (error) {
                console.error("Error al obtener series:", error);
            }
        };

        fetchCategorias();

        const fetchPlatafromas = async () => {
            try {
              const response = await axios.get('http://localhost:3001/getPlataformas');
              setPlataformas(response.data); // Guardamos las series en el estado
            } catch (error) {
              console.error("Error al obtener series:", error);
            }
          };
          fetchPlatafromas();
    }, []
)
const handleSelect = (event) => {
  console.log(event.target.value);
  setCateg(event.target.value); // Actualiza la serie seleccionada
};
const handleSelectPlataforma = (event) => {
    console.log(event.target.value);
    setPlataforma(event.target.value); // Actualiza la serie seleccionada
  };

//   const changeImg = (event) => {
//     setFoto(event.target.files[0]);
//   };
const navigate = useNavigate(); // Crear una instancia de useNavigate

  const sendDatos = async (e) => {
    

    // Validación básica: Asegurarse de que el título no esté vacío
    if (!Titulo) {
      alert("Por favor, ingresa un título para la película.");
      return;
    }

    if (!Director) {
      alert("Por favor, ingresa un director");
      return;
    }



    try {
      const response = await axios.post('http://localhost:3001/postpelicula', {
        Titulo : Titulo,
        Director : Director,
        Actor1 : Actor1,
        Actor2 : Actor2,
        Duracion : Duracion,
        Categoria : Categ,
        Plataforma : Plataforma,
    
      });
      const { mensaje } = response.data;
      console.log(mensaje);
      alert(mensaje);
      navigate('/Admin');
    } catch (error) {
      console.error("Error enviando datos:", error);
      alert("Error al crear la película. Por favor, verifica los datos ingresados.");
    }
  };


    return(
<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">Inicio</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/registrarPeliculas">Agregar Película</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/registrarLibro">Agregar Libro</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/registrarSeries">Agregar Serie</Link>
                    </li>
                   
                </ul>
              
                    <div  className="ms-auto" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
                        <Link className="nav-link" to="/">Salir</Link>
                    </div>
                  
            </div>
            
        </div>
    </nav>

    <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="col-lg-8 bg-dark d-flex flex-column align-items-center p-4 rounded">
                <h1 className="font-weight-bold mb-4">Registro de Pelicula</h1>
                <form onSubmit={ (e) => {e.preventDefault(); sendDatos();}} className="w-100">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="usuario" className="form-label font-weight-bold text-light">Titulo</label>
                            <input
                                type="text"
                                className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="usuario"
                                placeholder="Titulo"
                                value={Titulo} onChange={(e)=>setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label font-weight-bold text-light">Director</label>
                            <input
                                type="text"
                                className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="nombre"
                                placeholder="Director"
                                value={Director}
                                onChange={(e)=>setDirector(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label font-weight-bold text-light">Actor 1</label>
                            <input
                                type="text"
                               className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="apellido"
                                placeholder="Actor 1"
                                value={Actor1} 
                                onChange={(e)=>setActor1(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="correo" className="form-label font-weight-bold text-light">Actor 2</label>
                            <input
                                type="text"
                                className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="correo"
                                placeholder="Actor 2"
                                value={Actor2} 
                                onChange={(e)=>setActor2(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                       
                        <div className="mb-6">
                                <label htmlFor="serieDropdown" className="form-label font-weight-bold text-light">Selecciona una Categoria</label>
                                <select
                                    id="serieDropdown"
                                    className="form-control bg-dark-x border-0 mb-2 text-cont"
                                    value={Categ}
                                    onChange={handleSelect}
                                >
                                    <option value="">★★ Selecciona una categoria ★★</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.Id} value={categoria.Nombre}>
                                            {categoria.Nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-6">
                <label htmlFor="serieDropdown" className="form-label font-weight-bold text-light">Selecciona una Plataforma</label>
                <select
                  id="serieDropdown"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  value={Plataforma}
                  onChange={handleSelectPlataforma}
                >
                  <option value="">★★ Selecciona una Plataforma ★★</option>
                  {plataformas.map((platafroma) => (
                    <option key={platafroma.Id} value={platafroma.Nombre}>
                      {platafroma.Nombre}
                    </option>
                  ))}
                </select>
              </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmarContrasena" className="form-label font-weight-bold text-light">Duracion</label>
                            <input
                                type="int"
                               className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="confirmarContrasena"
                                placeholder="Duracion"
                                value={Duracion} 
                                onChange={(e)=>setDuracion(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* <div className="col-md-6">
                            <label htmlFor="fotoPerfil" className="form-label font-weight-bold text-light">Foto</label>
                            <input
                                type="file"
                                className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="fotoPerfil"
                                onChange={changeImg}
                                
                                required
                            />
                        </div> */}
                    </div>
                   
                    
                   
                    <button type="submit" className="btn btn-light w-100">Registrarse</button>
                </form>
               
            </div>
        </div>
    

        </>
    );
}

export default RegiPelicula;