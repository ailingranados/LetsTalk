import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Perfil.css";
import perfilImg from "./Diseño/perfil.jpeg"; 
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PerfilUsuario () {

    const [Id, setId] = useState('');
    //variables de salida
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState('');


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
                setUsuario(resp.data.O_usuario || 'Usuario no encontrado');
                setNombre(usuarioData.O_nombre || 'Nombre no encontrado');
                setApellido(usuarioData.O_apellido || 'Apellido no encontrado');
                setCorreo(usuarioData.O_correo || 'Correo no encontrado');
                setContrasena(usuarioData.O_contrasena || 'Contraseña no encontrada');
                setFechaNacimiento(usuarioData.O_fecha_nacimiento || 'Fecha no encontrada');
                setFotoPerfil(usuarioData.O_img_perfil || '');
    
                console.log(usuarioData);
                })
                .catch((error) => {
                    console.error("Hubo un error al obtener usuario por id: ", error);
                });
        }
    }, []);
    
    

    


  return (
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
                Correo: <span id="correo">{correo}</span>
              </h4>
              <h4>
                Nombre: <span id="nombre">{nombre}</span>
              </h4>
              <h4>
                Apellido Paterno: <span id="apellidoP">{apellido}</span>
              </h4>
              <h4>
                Apellido Materno: <span id="apellidoM">Dominguez</span>
              </h4>
              <div className="btn-group mt-3" role="group" aria-label="Basic example">
                <div className="buttons">
                <Link to="/editarperfil">Editar Perfil</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;
