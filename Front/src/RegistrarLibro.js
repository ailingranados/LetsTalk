import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';


function RegistrarLibro() {
    const [titulo, setTitulo] = useState('');
    const [author, setAuthor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [isbn, setIsbn] = useState('');
    const [categoria, setCategoria] = useState('');
  

    const sendDatos = async (e) => {
       
            // Proceder con el envío de datos
            console.log("Formulario válido, enviando datos...");
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('author', author);
            formData.append('editorial', editorial);
            formData.append('isbn', isbn);
            formData.append('categoria', categoria);
          

            try {
                const response = await axios.post("http://localhost:3001/postlibro", {"titulo":formData.get(titulo)})
                console.log("Response data:", response.data); // Verifica la estructura de la respuesta
                console.log({ titulo, author, editorial, isbn, categoria });
           
                alert("Libro creado")
                

            } catch (error) {
                console.error("Error enviando datos:", error);
                if (error.response) {
                    console.log("Error response data:", error.response.data); // Verifica la respuesta de error
                    alert(error.response.data.mensaje); // Mostrar mensaje de error del servidor
                } else {
                    alert("Error en el servidor");
                }
            }
        
    }


    return (
        
        <form onSubmit={(e) => {e.preventDefault(); sendDatos();}}>
        <div>
        <label className="form-label">Titulo</label>
        <input type="text" className="form-control" value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>

        <label className="form-label">author</label>
        <input type="text" className="form-control" value={author} onChange={(e)=>setAuthor(e.target.value)}/>

        <label className="form-label">editorial</label>
        <input type="text" className="form-control" value={editorial} onChange={(e)=>setEditorial(e.target.value)}/>

        <label className="form-label">ISBN</label>
        <input type="text" className="form-control" value={isbn} onChange={(e)=>setIsbn(e.target.value)}/>

        <label className="form-label">categoria</label>
        <input type="text" className="form-control" value={categoria} onChange={(e)=>setCategoria(e.target.value)}/>

        <button className="btn btn-light w-100" type='submit'>Registrar</button>

        
    </div>
    </form>
    
    )
}

export default RegistrarLibro;