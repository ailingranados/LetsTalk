import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Perfil.css";
import perfilImg from "./Diseño/perfil.jpeg";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditarPerfil from "./EditarPerfil";


function PerfilUsuario() {

  const [Id, setId] = useState('');
  //variables de salida
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [estado, setEstado] = useState('');


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


  useEffect(() => {
    console.log("Datos actualizados del usuario:", usuario);
  }, [usuario]);




  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card p-4">
              <div className="card-body text-center">
                <img
                  src={perfilImg}
                  alt="Imagen del usuario"
                  className="avatar"
                />
                <h4>
                  Usuario: <span id="usuario">{usuario}</span>
                </h4>
                <h4>
                  Nombre: <span id="nombre">{nombre}</span>
                </h4>
                <h4>
                  apellido: <span id="apellido">{apellido}</span>
                </h4>
                <h4>
                  Correo: <span id="correo">{correo}</span>
                </h4>
                <h4>
                  Fecha Nacimiento: <span id="fechaN">{fechaNacimiento}</span>
                </h4>
                <h4>
                  Fecha Registro: <span id="fechaR">{fechaRegistro}</span>
                </h4>
                <h4>
                  Estado: <span id="estado">{estado}</span>
                </h4>

                <div className="btn-group mt-3" role="group" aria-label="Basic example">
                  <div className="buttons">

                    <Link
                      to={{
                        pathname: "/editarUsuario",
                        state: {
                          usuario,
                          nombre,
                          apellido,
                          correo,
                          contrasena,
                          fechaNacimiento,
                          fotoPerfil,
                          estado,
                          fechaRegistro
                        }
                      }}
                    >
                      Editar Perfil
                    </Link>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default PerfilUsuario;
