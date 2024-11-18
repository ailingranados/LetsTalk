import { useState } from 'react';
import '../CSS/RegisSerie.css';
import axios from 'axios';

function RegistrarSerie(){

const [TituloSE, setTituloSE] = useState('');
   const [FotoSe, setFotoSE] = useState(null);
   const [Actor1S, setActor1S] = useState('');
   const [Actor2S, setActor2S] = useState('');
   const [Finalizacion, setFinalizacion] = useState('');
    const [Temporada, setTemporada] = useState('');
    const [Capitulos, setCapitulos] = useState('');
   const [Plataforma, setPlataforma] = useState('');
   const [CategoSe, setCategoSe] = useState('');

   const changeImg = (event) => {
    setFotoSE(event.target.files[0]);
  };

  const sendDatos = async (e) => {

   const formData = new FormData();
    formData.append('Titulo', TituloSE);
    formData.append('Actor1S', Actor1S);
    formData.append('Actor2S', Actor2S);
     formData.append('Finalizacion', Finalizacion);
     formData.append('Temporada', Temporada);
     formData.append('Capitulos', Capitulos);
     formData.append('Plataforma', Plataforma);
     formData.append('CategoSe', CategoSe);

    if (FotoSe) { // Solo agregar la imagen si se ha seleccionado
      formData.append('FotoSe', FotoSe);
    }
    
    try {
      const response = await axios.post("http://localhost:3007/postserie", formData);
      console.log("Response data:", response.data);
      alert("Serie creada exitosamente");
    } catch (error) {
      console.error("Error enviando datos:", error);
      alert("Error al crear la Serie. Por favor, verifica los datos ingresados.");
    }
  

return(

<div className=".bg-dark">
    <form className="forms" onSubmit={ (e) => {e.preventDefault(); sendDatos();}}>
        

         <label className="form-label">Titulo</label>
        <input type="text" className="form-control" value={TituloSE} onChange={(e)=>setTituloSE(e.target.value)}/>

        <label className="form-label">Imagen de la Pelicula</label>
             <input type="file"  onChange={changeImg} />

        <label className="form-label">Actor 1</label>
        <input type="text" className="form-control" value={Actor1S} onChange={(e)=>setActor1S(e.target.value)}/>

        <label className="form-label">Actor 2</label>
        <input type="text" className="form-control" value={Actor2S} onChange={(e)=>setActor2S(e.target.value)}/>

        <label className="form-label">Finalizacion</label>
        <input type="int" className="form-control" value={Finalizacion} onChange={(e)=>setFinalizacion(e.target.value)}/>

        <label className="form-label">Temporada</label>
        <input type="int" className="form-control" value={Temporada} onChange={(e)=>setTemporada(e.target.value)}/>

        <label className="form-label">Capitulos</label>
        <input type="int" className="form-control" value={Capitulos} onChange={(e)=>setCapitulos(e.target.value)}/>

        <label className="form-label">Plataforma</label>
        <input type="int" className="form-control" value={Plataforma} onChange={(e)=>setPlataforma(e.target.value)}/>

        <label className="form-label">Categorias</label>
        <input type="int" className="form-control" value={CategoSe} onChange={(e)=>setCategoSe(e.target.value)}/>

        <button className="btd" type='submit'>Registrar Pelicula</button>

        
    </form>
     </div>
    );



}
};

export default RegistrarSerie;