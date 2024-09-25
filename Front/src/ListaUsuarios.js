import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';


function ListaUsaurios() {

    const [ListU, setListU] = useState([]);

    useEffect(
        () => {
            axios.get("http://localhost:3001/getUsuarios", {}).then(
                (resp) => {
                    setListU(resp.data);
                    console.log(resp.data);
                }

            )

        }, []
    )

    return (
        <>
            <NavBar />
            <ol className="list-group list-group-numbered">
                {
                    ListU.map(
                        (value, key) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{value.nombre}</div>
                                        {value.correo}
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