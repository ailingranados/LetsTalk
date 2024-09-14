const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3001, 
    ()=>{
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
        console.log("Datos recibidos en el servidor:", usu, corr, pass);

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


app.get("/getU",
    (req, resp)=>{
        db.query('SELECT * FROM usuarios',
        (error, data)=>{
            if(error){
                console.log(error);
            }else{
                resp.send(data);
            }
        })
    }
)

app.delete("/delete/:nomUser",
(req, resp)=>{
    const nombreU = req.params.nomUser;

    db.query('DELETE FROM usuarios WHERE nomU=?',
    nombreU,
    (error, data)=>{
        if(error){
            console.log(error);
        }else{
            resp.send("Empleado eliminado");
        }
    })
}
)

app.post("/login", 
    (req, resp)=>{


        db.query("SELECT * FROM usuarios WHERE nomU=? AND passwU=?",
        [req.body.us, req.body.con],
        (err, data)=>{
            if(err){
                resp.send(err);
            }else{
                if(data.length > 0){
                    resp.json({
                        "alert": 'Success',
                        "usuario": data[0].nomU
                    })
                }else{
                    resp.json('Usuario no existe')
                }
            }
        })
})