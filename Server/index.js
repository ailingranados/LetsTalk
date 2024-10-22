const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');

// Verificar si la carpeta 'uploads' existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Guardar archivos en 'uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
    }
});


const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "letstalk",
    port: 3306,
    multipleStatements: true // Permite ejecutar múltiples consultas
});

app.listen(3001, () => {
    console.log("Escuchando en el puerto 3001");
});

app.post("/create", upload.single('fotoPerfil'), (req, res) => {
    const { usuario, nombre, apellido, correo, contrasena, fechaNacimiento } = req.body;
    const fotoPerfil = req.file ? req.file.path : null; // Ruta del archivo cargado

    const sql = 'CALL SP_RegistrarUsuario(?, ?, ?, ?, ?, ?, ?)';
    const values = [usuario, nombre, apellido, correo, contrasena, fechaNacimiento, fotoPerfil];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al insertar datos:", error);
            res.status(500).send("Error al insertar datos");
        } else {
            res.send("Usuario creado con éxito");
        }
    });
});

// Ruta para manejo de login
app.post("/login", (req, res) => {
    const { correo, contrasena } = req.body;

    db.query('CALL SP_IniciarSesion (?, ?, @mensaje, @id_usuario); SELECT @mensaje AS mensaje, @id_usuario AS id_usuario;', 
        [correo, contrasena], 
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                const result = results[1][0];
                res.send({
                    mensaje: result.mensaje,
                    id_usuario: result.id_usuario
                });
            }
        }
    );
});

// Ruta para obtener usuarios
app.get("/getUsuarios", (req, res) => {
    db.query('SELECT * FROM Usuario;', (err, data) => {
        if (err) {
            res.status(500).json({ error: "FATAL ERROR al obtener los usuarios" });
        } else {
            res.json(data);
        }
    });
});

//modificar usuarios
app.put("/modificarUsuario/:ModUsu", 
    (req, resp)=>{
        const NueNom = req.body.nuevoNombre;
        const NueCorr = req.body.nuevoCorreo;
        const UsuModif = req.params.ModUsu;

        db.query("update Usuario set nombre=?, correo=? where nombre=?",
            [NueNom, NueCorr, UsuModif],
            (err, respuesta)=>{
                if(err){
                    resp.json({"status": 'Error'});
                    console.log(err);
                }else{
                    resp.json({"status": 'Ok'});
                }
            }
        )

    }
   
)

app.post("/postlibro", upload.single('fotoPerfil'), (req, res) => {
    const { titulo, author, editorial, isbn, categoria } = req.body;

    console.log(req.body.titulo);

    const sql = 'CALL SP_RegistrarLibro(?, ?, ?, ?, ?)';
    const values = [titulo, author, editorial, isbn, categoria];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al insertar datos:", error);
            res.status(500).send("Error al insertar datos");
        } else {
            res.send("Libro creado con éxito");
        }
    });
});


app.get("/getUsuarioPorId/:id", (req, res) => {
    const id_usuario = req.params.id;
    console.log("ID recibido:", id_usuario); // Verificar que el ID se recibe correctamente

    // Llamar al procedimiento almacenado
    db.query(
        'CALL SP_BuscarUsuarioPorId(?, @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro); SELECT @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;',
        [id_usuario],
        (err, data) => {
            if (err) {
                console.error("Error al obtener el usuario por id:", err); // Imprimir el error para depuración
                res.status(500).json({ error: "FATAL ERROR al obtener el usuario por id" });
            } 
            
            console.log("Datos devueltos:", data);

            if (data[1] && data[1][0]) {
                const result = data[1][0];
                const cleanedData = {
                    O_usuario: result['@O_usuario'],
                    O_nombre: result['@O_nombre'],
                    O_apellido: result['@O_apellido'],
                    O_correo: result['@O_correo'],
                    O_contrasena: result['@O_contrasena'],
                    O_fecha_nacimiento: result['@O_fecha_nacimiento'],
                    O_img_perfil: result['@O_img_perfil'],
                    O_estado: result['@O_estado'],
                    O_fecha_registro: result['@O_fecha_registro']
                };
                return res.json(cleanedData);
             }
            else {
                console.log("Datos devueltos:", data); // Verificar la estructura de la respuesta
                res.json(data[1][0]); // Asumimos que la información relevante está en data[1][0]
            
            }
            
        }
    );

    
});

app.post("/ModUsuarioPorId/:id", upload.single('fotoPerfil'), (req, res) => {
    const id_usuario = req.params.id;
    const fotoPerfil = req.file ? req.file.path : null; // Ruta del archivo cargado

    const NueNom = req.body.nuevoNombre;
    const NueUsu = req.body.nuevoUsu;
    const NueCor = req.body.nuevoCorr;
    const NueApe = req.body.nuevoApe;
    const NueFoto = req.file ? req.file.path : null; // Ruta del archivo cargado

    console.log("ID recibido:", id_usuario);

    // Llamar al procedimiento almacenado
    db.query(
        'CALL SP_ModificarUsuario(?, ?, ?, ?, ?, ?);',
        [id_usuario, NueNom, NueUsu, NueCor,NueApe, NueFoto],
        (err, data) => {
            if (err) {
                console.error("Error al modificar usuario:", err); // Imprimir el error para depuración
                res.status(500).json({ error: "FATAL ERROR al modificar usuario" });
            } else {
                res.json({ "status": 'Ok' });
            }
        }
    );
});

app.put("/modificarContrasena/:Id", 
    (req, resp)=>{
        const NueCon = req.body.nuevoPass;
        const UsuId = req.params.Id;

        db.query("CALL SP_CambiarContra (?, ?)",
            [UsuId, NueCon],
            (err, respuesta)=>{
                if(err){
                    resp.json({"status": 'Error'});
                    console.log(err);
                }else{
                    resp.json({"status": 'Ok'});
                }
            }
        )

    }
   
)

app.put("/InactivarPerfil/:Id", 
    (req, resp)=>{ 
        const UsuId = req.params.Id;

        db.query("CALL SP_BorrarUsuario (?)",
            [UsuId],
            (err, respuesta)=>{
                if(err){
                    resp.json({"status": 'Error'});
                    console.log(err);
                }else{
                    resp.json({"status": 'Ok'});
                }
            }
        )

    }
   
)
