import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Perfil.css"; 
import perfilImg from "./Diseño/perfil.jpeg"; 
import { Link } from 'react-router-dom';

const EditarPerfil = () => {
  // Estado para los campos del formulario
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos al servidor
    console.log("Datos enviados:", { correo, nombre, apellidoP, apellidoM, fechaNacimiento, fotoPerfil });
  };

  useEffect(() => {

    const sesionId = localStorage.getItem('sesion'); // Obtener el ID de la sesión del localStorage
    if (sesionId) {
        //setId(sesionId); // Asignar el valor a la variable id
        console.log("Id de la sesion: ", sesionId);

        axios.get(`http://localhost:3001/getUsuarioPorId/${sesionId}`)
            .then((resp) => {
                console.log("Datos de la respuesta:", resp.data);
    
            const usuarioData = resp.data;
                // Asigna los valores recibidos a los estados
            setUsuario(usuarioData.O_usuario);
            setNombre(usuarioData.O_nombre);
            setApellido(usuarioData.O_apellido);
            setCorreo(usuarioData.O_correo);
            setContrasena(usuarioData.O_contrasena);
            setFechaNacimiento(usuarioData.O_fecha_nacimiento);
            setFotoPerfil(usuarioData.O_img_perfil);

            console.log(usuarioData);
            console.log("usuario", usuario);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener usuario por id: ", error);
            });
    }
}, []);
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card text-center">
            <div className="card-body">
              <br />
              <img
                id="imagenPerfil"
                src={perfilImg}
                alt="Imagen del usuario"
                className="avatar mx-auto"
              />
              <br />
              <h4>
                Usuario: <span id="usuario">Daniela</span>
              </h4>
              <h4>
                Correo: <span id="correo">{correo}</span>
              </h4>
              <h4>
                Nombre: <span id="nombre">{nombre}</span>
              </h4>
              <h4>
                Apellido Paterno: <span id="apellidoP">{apellidoP}</span>
              </h4>
              <h4>
                Apellido Materno: <span id="apellidoM">{apellidoM}</span>
              </h4>
              <div className="btn-group mt-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-danger" id="inactivar">
                  Inactivar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <br />
            <div className="card-header text-center">
              <h4>Editar Perfil</h4>
            </div>
            <div className="card-body">
              <form id="formulario" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="correo">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidoP">Apellido Paterno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoP"
                    value={apellidoP}
                    onChange={(e) => setApellidoP(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidoM">Apellido Materno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoM"
                    value={apellidoM}
                    onChange={(e) => setApellidoM(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="f_nacimiento">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="f_nacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="imagen"
                    onChange={(e) => setFotoPerfil(e.target.files[0])}
                  />
                </div>
                <div className="btn-group mt-3" role="group" aria-label="Basic example">
                    <div className="buttons">
                        <Link to="#">Guardar Cambios</Link> {/* Asegúrate de tener la función guardarCambios definida */}
                    </div>
</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;
