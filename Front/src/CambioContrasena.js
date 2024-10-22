import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function CambioContrasena({verMod, ChangeMod, UsuMod}) {
    
    const [Id, setId] = useState('');
    const[newCon, setNewCon] = useState('');
    const[newCon2, setNewCon2] = useState('');

    
    const sendDatos = (newCon) => {
        const sesionId = localStorage.getItem('sesion');
        if(validarContrasena()){
        axios.put(`http://localhost:3001/modificarContrasena/${sesionId}`, {
            nuevoPass: newCon
        }).then(
            (resp) => {
                if (resp.data.status == 'Ok') {
                    alert("Usuario Modificado");
                    ChangeMod(false);
                } else {
                    alert("Error al modificar usuario");
                }
            }
        )
    }
}

    function validarContrasena(){
        if(newCon === newCon2){
            return true;
        }else{
            return false;
        }
    }

    if(verMod){
        return (

            <div>
                <label className="form-label">Contraseña</label>
                <input type="text" className="form-control"  onChange={(e)=>setNewCon(e.target.value)}/>
    
                <label className="form-label">Confirmar Contraseña</label>
                <input type="text" className="form-control"  onChange={(e)=>setNewCon2(e.target.value)}/>
                
 
                <button className="btn btn-light w-100" onClick={()=>(sendDatos(newCon))}>Modificar</button>
    
                <button className="btn btn-light w-100" onClick={()=>ChangeMod(false)}>Cancelar</button>
            </div>
        )
    }
  
}

export default CambioContrasena;