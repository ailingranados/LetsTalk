const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
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

app.post("/create", (req, resp) => {
    const { usuario, nombre, apellido, correo, contrasena, fechaNacimiento, fotoPerfil } = req.body;
  
    db.query('CALL SP_RegistrarUsuario(?, ?, ?, ?, ?, ?, ?)', 
        [usuario, nombre, apellido, correo, contrasena, fechaNacimiento, fotoPerfil], 
        (error, results) => {
            if (error) {
                console.error("Error en la base de datos:", error);
                if (error.code === 'ER_SIGNAL_EXCEPTION') {
                    const mensaje = error.sqlMessage.includes('El correo electrónico ya está registrado.')
                        ? 'El correo electrónico ya está registrado.'
                        : 'Error al registrar usuario';
                    resp.status(400).send({ mensaje });
                } else {
                    resp.status(500).send({ mensaje: "Error al registrar usuario" });
                }
            } else {
                // Verificar si results tiene datos
                if (results && results.length > 0 && results[0].length > 0) {
                    const result = results[0][0]; // Ajusta esto si es necesario
                    if (result && result.mensaje) {
                        resp.send({ mensaje: result.mensaje });
                    } else {
                        resp.status(500).send({ mensaje: "Error al registrar usuario" });
                    }
                } else {
                    resp.status(500).send({ mensaje: "No se recibieron resultados del procedimiento almacenado" });
                }
            }
        }
    );
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