import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Perfil.css";
import perfilImg from "./Diseño/perfil.jpeg";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import CambioContrasena from "./CambioContrasena";
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
  // Desestructurar los valores desde el state


  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [estado, setEstado] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [verContrasena, setVerContrasena] = useState(false);


  const navigate = useNavigate();



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
          setFechaRegistro(usuarioData.O_fecha_registro);
          setEstado(usuarioData.O_estado);

          console.log(usuarioData);
          console.log("usuario", usuario);
        })
        .catch((error) => {
          console.error("Hubo un error al obtener usuario por id: ", error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    const sesionId = localStorage.getItem('sesion'); // Obtener el ID de la sesión del localStorage
    if (sesionId) {
      //setId(sesionId); // Asignar el valor a la variable id
      console.log("Id de la sesion: ", sesionId);

      axios.post(`http://localhost:3001/ModUsuarioPorId/${sesionId}`, {
        nuevoNombre: nombre,
        nuevoUsu: usuario,
        nuevoCorr: correo,
        nuevoApe: apellido,
        nuevoFoto: fotoPerfil
      })
        .then((resp) => {


          console.log("modificacion exitosa");
          alert("Usuario Modificado");
          navigate('/perfil');
        })
        .catch((error) => {
          console.error("Hubo un error al modificar usuario", error);
        });
    }
    console.log("Datos enviados:", { usuario, nombre, apellido, correo, contrasena, fechaNacimiento, fotoPerfil, estado, fechaRegistro });
  };

 
  const InactivarUsu  = () => {
    const sesionId = localStorage.getItem('sesion');
   
    axios.put(`http://localhost:3001/InactivarPerfil/${sesionId}`, {
        
    }).then(
        (resp) => {
            if (resp.data.status === 'Ok') {
                alert("Usuario inactivado");
                navigate('/login');
               
            } else {
                alert("Error al inactivar usuario");
            }
        }
    )

};

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
                Usuario: <span id="usuario">{usuario}</span>
              </h4>
              <h4>
                Correo: <span id="correo">{correo}</span>
              </h4>
              <h4>
                Nombre: <span id="nombre">{nombre}</span>
              </h4>
              <h4>
                Apellido Paterno: <span id="apellidoP">{apellido}</span>
              </h4>
              <h4>
                Contraseña: <span id="contrasena">{contrasena}</span>
              </h4>
              <h4>
                Fecha Registro: <span id="FechaR">{fechaRegistro}</span>
              </h4>
              <h4>
                Fecha Nacimiento: <span id="FechaN">{fechaNacimiento}</span>
              </h4>
              <h4>
                Estado: <span id="estado">{estado}</span>
              </h4>
              <div className="btn-group mt-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-danger" id="inactivar" onClick={(InactivarUsu)}>
                  
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
                  <label htmlFor="correo">Usuario</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                </div>
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
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
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
                <div className=" mt-3" role="group" aria-label="Basic example">
                  <button type="button" onClick={handleSubmit}>
                    Guardar Cambios
                  </button>

                </div>
                <div className=" mt-2 " role="group" aria-label="Basic example">
                  <div className="buttons">

                    <button
                      /**al presionar el boton pasa datos */
                      onClick=
                      {
                        () => {
                          setVerContrasena(true);

                        }
                      }

                    >Cambiar Contraseña</button>

                  </div>
                </div>
                <CambioContrasena verMod={verContrasena} ChangeMod={setVerContrasena} />
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EditarPerfil;
