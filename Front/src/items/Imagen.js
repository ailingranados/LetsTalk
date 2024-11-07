import { useEffect, useState } from "react";
import axios from 'axios';

function Imagen(){
    const[ImagSelec, setImagSelec] = useState(null);
    const[allImag, setAllImag] = useState([]);

    const changeImag = (event)=>{
        setImagSelec(event.target.files[0]);
    }

    const sendImage = () =>{
        const sesion = localStorage.getItem('sesion');
        
        const form = new FormData();
        form.append('imagenForm', ImagSelec);
        form.append('usuario', sesion);

        axios.post("http://localhost:3001/imagen",form,{
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(
            (response)=>{
                if(response.data.status === "OK"){
                    alert("Imagen enviada");
                    console.log(response.data);
                }else{
                    alert("Error al enviar la imagen");
                }
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    useEffect(
        ()=>{
            axios.get("http://localhost:3001/getAllImag",{
            }).then(
                (response)=>{
                    if(response.data.status === "Error"){
                        alert("Error al guardar imagen");
                        console.log(response.data);
                    }else{
                        setAllImag(response.data);
                        console.log(response.data);
                    }
                }
            )
        }
    ,[])

    return(
        <>
        <div>
            <input type="file" onChange={changeImag}/>
            <button onClick={sendImage}>Enviar imagen</button>
        </div>

        {
            allImag.map(
                (imagen, key)=>{
                    return(
                    <img style={{height:'500px'}} src={'data:image/png;base64,'+imagen.imag64}/>
                    )
                }
            )
        }
        </>
    )
}

export default Imagen;