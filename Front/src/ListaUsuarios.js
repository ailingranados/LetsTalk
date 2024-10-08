import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import ModificarUsuario from './ModificarUsuario';


function ListaUsaurios() {

    const [ListU, setListU] = useState([]);
    const [verFormMod, setVerFormMod] = useState(false);
    const [usuMod, SetUsuMod] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getUsuarios")
            .then((resp) => {
                setListU(resp.data);
                console.log(resp.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los usuarios: ", error);
            });
    }, [,verFormMod] //cada que se cambie esta variable se ejecuta, la coma es para que lo haga un vez por default
    )


    const modDatos = (nomUsu, corrUsu, usMod) => {
        axios.put(`http://localhost:3001/modificarUsuario/${usMod}`, {
            nuevoNombre: nomUsu,
            nuevoCorreo: corrUsu
        }).then(
            (resp) => {
                if (resp.data.status == 'Ok') {
                    alert("Usuario Modificado");
                    setVerFormMod(false);
                } else {
                    alert("Error al modificar usuario");
                }
            }
        )
    }

    return (
        <>
            <NavBar />
            <ol className="list-group list-group-numbered">
                {
                    ListU.map(
                        (value, index) => {
                            return (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{value.Nombre}</div>
                                        {value.Correo}
                                    </div>
                                    <span className="badge rounded-pill">
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-warning"
                                                /**al presionar el boton pasa datos */
                                                onClick=
                                                {
                                                    () => {
                                                        setVerFormMod(true);
                                                        SetUsuMod(value)

                                                    }
                                                }

                                            >Modificar</button>


                                            <button type="button" className="btn btn-danger">Eliminar</button>
                                        </div>
                                    </span>
                                </li>

                            )
                        }
                    )
                }
            </ol>
            <ModificarUsuario verMod={verFormMod} ChangeMod={setVerFormMod} UsuMod={usuMod} sendDatos={modDatos}/>
        </>
    )
}

export default ListaUsaurios;