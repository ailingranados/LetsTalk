import { useEffect, useState } from 'react';
import '../CSS/RegisPelis.css';
import axios from 'axios';

function RegiPelicula(){


const [Titulo, setTitulo] = useState('');
  const [Director, setDirector] = useState('');
  const [Actor1, setActor1] = useState('');
  const [Actor2, setActor2] = useState('');
  const [Duracion, setDuracion] = useState('');
  const [Foto, setFoto] = useState(null);
  const [Categ, setCateg] = useState('');
  const [categorias, setCategorias] = useState([]);

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
    }, []
)
const handleSelect = (event) => {
  console.log(event.target.value);
  setCateg(event.target.value); // Actualiza la serie seleccionada
};

  const changeImg = (event) => {
    setFoto(event.target.files[0]);
  };

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




    const formData = new FormData();
    formData.append('Titulo', Titulo);
    formData.append('Director', Director);
    formData.append('Actor1', Actor1);
    formData.append('Actor2', Actor2);
    if (Foto) { // Solo agregar la imagen si se ha seleccionado
      formData.append('Foto', Foto);
    }
    formData.append('Categ', Categ);
    formData.append('Duracion', Duracion);

    try {
      const response = await axios.post("http://localhost:3007/postpelicula", formData);
      console.log("Response data:", response.data);
      alert("Película creada exitosamente");
    } catch (error) {
      console.error("Error enviando datos:", error);
      alert("Error al crear la película. Por favor, verifica los datos ingresados.");
    }
  };


    return(

    
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
                        <div className="col-md-6">
                            <label htmlFor="fotoPerfil" className="form-label font-weight-bold text-light">Foto</label>
                            <input
                                type="file"
                                className="form-control bg-dark-x border-0 mb-2 text-cont"
                                id="fotoPerfil"
                                onChange={changeImg}
                                
                                required
                            />
                        </div>
                    </div>
                   
                    
                   
                    <button type="submit" className="btn btn-light w-100">Registrarse</button>
                </form>
               
            </div>
        </div>
    

     
    );
}

export default RegiPelicula;