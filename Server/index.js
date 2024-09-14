import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(express.json());



app.listen(3001,
    () =>{
        console.log("Escuchando en el puerto 3001");
    }
)

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        pasword: "",
        database:"letsTalk"
    }
)

app.post("/create", 
    (req, resp)=>{
        const usu = req.body.usuario;
        const corr = req.body.correo;
        const pass = req.body.contra;

        db.query('INSERT INTO usuario(Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento) VALUES (?,?,?,?,?)',
                [usu, "prueba",corr, pass, "2000-01-01"],
                (error, data)=>{
                    if(error){
                        console.log(error);
                    }else{
                        resp.send("Información insertada");
                    }
                }
        )
    }
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


