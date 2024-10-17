import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Perfil.css";
import perfilImg from "./Diseño/perfil.jpeg"; 
import { Link } from 'react-router-dom';


const PerfilUsuario = () => {
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
                Usuario: <span id="usuario">Daniela</span>
              </h4>
              <h4>
                Correo: <span id="correo">dany23@gmail.com</span>
              </h4>
              <h4>
                Nombre: <span id="nombre">Daniela</span>
              </h4>
              <h4>
                Apellido Paterno: <span id="apellidoP">Puentes</span>
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
};

export default PerfilUsuario;
