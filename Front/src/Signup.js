import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import axios from 'axios'

export default function Signup(){
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');

    function alertDatos(){
        alert(user);
    }

    const sendDatos = () =>{
        axios.post("http://localhost:3001/create",
            {   usuario: user,
                correo: email,
                contra: passw
            }).then(
            ()=>{
                alert("Información enviada");
            }
        )
    }


    return(
        <div>
            <label className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" placeholder="Usuario"
            onChange={(e)=>{setUser(e.target.value)}}/>

            <label className="form-label">Correo electronico</label>
            <input type="email" className="form-control" placeholder="Correo"
            onChange={(e)=>{setEmail(e.target.value)}}/>

            <label>Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña"
            onChange={(e)=>{setPassw(e.target.value)}}/>
            <button className="btn btn-primary" onClick={sendDatos}>Registrarse</button>
        </div>
    )
}
