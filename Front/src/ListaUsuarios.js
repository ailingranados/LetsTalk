import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';


function ListaUsaurios() {

    const [ListU, setListU] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getUsuarios")
            .then((resp) => {
                setListU(resp.data);
                console.log(resp.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los usuarios: ", error);
            });
    }, []);

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
                                            <button type="button" className="btn btn-warning">Modificar</button>
                                            <button type="button" className="btn btn-danger">Eliminar</button>
                                        </div>
                                    </span>
                                </li>

                            )
                        }
                    )
                }
            </ol>
        </>
    )
}

export default ListaUsaurios;