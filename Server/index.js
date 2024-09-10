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
        database:"LetsTalk"
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


