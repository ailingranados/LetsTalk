import { useState, useEffect } from 'react';
import '../CSS/RegisSerie.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
function RegistrarSerie() {

  const [TituloSE, setTituloSE] = useState('');
  // const [FotoSe, setFotoSE] = useState(null);
  const [Actor1S, setActor1S] = useState('');
  const [Actor2S, setActor2S] = useState('');
  const [Finalizacion, setFinalizacion] = useState('');
  const [Temporada, setTemporada] = useState('');
  const [Capitulos, setCapitulos] = useState('');
  const [Plataforma, setPlataforma] = useState('');
  const [CategoSe, setCategoSe] = useState('');
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
    setCategoSe(event.target.value); // Actualiza la serie seleccionada
  };

  const handleSelectPlataforma = (event) => {
    console.log(event.target.value);
    setPlataforma(event.target.value); // Actualiza la serie seleccionada
  };

  const navigate = useNavigate(); // Crear una instancia de useNavigate

  // const changeImg = (event) => {
  //   setFotoSE(event.target.files[0]);
  // };

  const sendDatos = async (e) => {


    try {
      const response = await axios.post('http://localhost:3001/postserie', {
        Titulo: TituloSE,
        Actor1S: Actor1S,
        Actor2S: Actor2S,
        Finalizacion: Finalizacion,
        Temporada: Temporada,
        Capitulos: Capitulos,
        Plataforma: Plataforma,
        Categoria: CategoSe
      });

      const { mensaje } = response.data;
      console.log(mensaje);
      alert(mensaje);
      navigate('/Admin');
    } catch (error) {
      console.error("Error enviando datos:", error);
      alert("Error al crear la Serie. Por favor, verifica los datos ingresados.");
    }

  };
  return (
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
    <div className=".bg-dark">


      <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-8 bg-dark d-flex flex-column align-items-center p-4 rounded">
          <h1 className="font-weight-bold mb-4">Registro de Serie</h1>
          <form className="w-100">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="usuario" className="form-label font-weight-bold text-light">Titulo</label>
                <input
                  type="text"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  id="titulo"
                  placeholder="Titulo"
                  value={TituloSE} onChange={(e) => setTituloSE(e.target.value)}
                  required
                />
              </div>

            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="actor1" className="form-label font-weight-bold text-light">Actor 1</label>
                <input
                  type="text"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  id="actor1"
                  placeholder="Actor 1"
                  value={Actor1S} onChange={(e) => setActor1S(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="actor" className="form-label font-weight-bold text-light">Actor 2</label>
                <input
                  type="text"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  id="actor2"
                  placeholder="Actor 2"
                  value={Actor2S} onChange={(e) => setActor2S(e.target.value)}
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
                  value={CategoSe}
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
              <div className="mb-3">
                <label className="form-label">Finalizacion</label>
                <select
                  className="form-control bg-dark text-cont border-0 mb-2"
                  value={Finalizacion}
                  onChange={(e) => setFinalizacion(e.target.value)}
                  required
                >
                  <option value="">★★ ¿Finalizado? ★★</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="actor" className="form-label font-weight-bold text-light">Temporada</label>
                <input
                  type="int"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  id="temp"
                  placeholder="temporada"
                  value={Temporada} onChange={(e) => setTemporada(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="actor" className="form-label font-weight-bold text-light">Capitulos</label>
                <input
                  type="int"
                  className="form-control bg-dark-x border-0 mb-2 text-cont"
                  id="cap"
                  placeholder="capitulos"
                  value={Capitulos} onChange={(e) => setCapitulos(e.target.value)}
                  required
                />
              </div>

            </div>



            <button type="button" className="btn btn-light w-100" onClick={sendDatos}>Crear serie</button>
          </form>

        </div>
      </div>


    </div>
    </>
  );



}


export default RegistrarSerie;