import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ModificarUsuario({verMod, ChangeMod, UsuMod, sendDatos}) {
    const[newNom, setNewNom] = useState('');
    const[newCorr, setNewCorr] = useState('');
    const[nomOrig, setNomOrig] = useState('');
    
    useEffect(
        ()=>{
            setNewNom(UsuMod.Nombre);
            setNewCorr(UsuMod.Correo);
            setNomOrig(UsuMod.Nombre)
        },[UsuMod]
    )



    if(verMod){
        return (

            <div>
                <label className="form-label">Nombre de Usuario</label>
                <input type="text" className="form-control" value={newNom} onChange={(e)=>setNewNom(e.target.value)}/>
    
                <label className="form-label">Correo</label>
                <input type="text" className="form-control" value={newCorr} onChange={(e)=>setNewCorr(e.target.value)}/>
    
                <button className="btn btn-light w-100" onClick={()=>(sendDatos(newNom, newCorr, nomOrig))}>Modificar</button>
    
                <button className="btn btn-light w-100" onClick={()=>ChangeMod(false)}>Cancelar</button>
            </div>
        )
    }
  
}

export default ModificarUsuario;