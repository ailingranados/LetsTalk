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
    const { usuario, nombre, apellido, correo, contrasena, fechaNacimiento, rol } = req.body; // Agregado: rol
    const fotoPerfil = req.file ? req.file.path : null; // Ruta del archivo cargado

    const sql = 'CALL SP_RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [usuario, nombre, apellido, correo, contrasena, fechaNacimiento, fotoPerfil, rol, 1]; // Aprobado es 1 por defecto


    db.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al insertar datos:", error);
            res.status(500).send("Error al insertar datos");
        } else {
            res.send("Usuario creado con éxito");
        }
    });
});

app.put("/aprobarUsuario/:id", (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE Usuario SET Aprobado = 0 WHERE Id = ?';

    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error("Error al aprobar usuario:", error);
            res.status(500).send({ mensaje: "Error al aprobar usuario" });
        } else {
            res.send({ mensaje: "Usuario aprobado correctamente" });
        }
    });
});

// Ruta para manejo de login
app.post("/login", (req, res) => {
    const { correo, contrasena } = req.body;

    db.query('CALL SP_IniciarSesion (?, ?, @mensaje, @id_usuario, @rol, @estado); SELECT @mensaje AS mensaje, @id_usuario AS id_usuario, @rol AS rol, @estado AS estado;',
        [correo, contrasena],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                const result = results[1][0];

                // Verificar si el mensaje indica que el usuario no está aprobado
                if (result.mensaje === 'El usuario no está aprobado para iniciar sesión') {


                }

                const rol = result.rol;

                // Redirigir según el rol
                if (rol === 'administrador') {
                    res.send({
                        mensaje: result.mensaje,
                        id_usuario: result.id_usuario,
                        estado: result.estado,
                        rol: 2
                    });
                } else if (rol === 'colaborador') {
                    res.send({
                        mensaje: result.mensaje,
                        id_usuario: result.id_usuario,
                        estado: result.estado,
                        rol: 1
                    });
                } else {
                    res.send({
                        mensaje: result.mensaje,
                        id_usuario: result.id_usuario,
                        estado: null,
                        rol: null
                    });
                }
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

app.get("/getAdministradores", (req, res) => {
    const sql = 'SELECT * FROM Usuario WHERE Aprobado = 1 AND rol = "administrador"'; // Filtrar administradores aprobados

    db.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener administradores:", error);
            res.status(500).send("Error al obtener administradores");
        } else {
            res.json(results); // Envía los resultados como JSON
        }
    });
});

app.get("/getColaboradores", (req, res) => {
    const sql = 'SELECT * FROM Usuario WHERE Aprobado = 1 AND rol = "colaborador"'; // Filtrar administradores aprobados

    db.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener administradores:", error);
            res.status(500).send("Error al obtener administradores");
        } else {
            res.json(results); // Envía los resultados como JSON
        }
    });
});

app.get("/Administrador/:id_usuario", (req, res) => {
    const { id_usuario } = req.params; // Obtiene el id_usuario del parámetro

    const sql = 'SELECT * FROM usuario WHERE Id = ?'; // Filtra por el ID del usuario
    db.query(sql, [id_usuario], (error, results) => {
        if (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).send("Error al obtener usuarios");
        } else {
            res.json(results); // Envía los resultados como JSON
        }
    });
});
//modificar usuarios
app.put("/modificarUsuario/:ModUsu",
    (req, resp) => {
        const NueNom = req.body.nuevoNombre;
        const NueCorr = req.body.nuevoCorreo;
        const UsuModif = req.params.ModUsu;

        db.query("update Usuario set nombre=?, correo=? where nombre=?",
            [NueNom, NueCorr, UsuModif],
            (err, respuesta) => {
                if (err) {
                    resp.json({ "status": 'Error' });
                    console.log(err);
                } else {
                    resp.json({ "status": 'Ok' });
                }
            }
        )

    }

)



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
        [id_usuario, NueNom, NueUsu, NueCor, NueApe, NueFoto],
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
    (req, resp) => {
        const NueCon = req.body.nuevoPass;
        const UsuId = req.params.Id;

        db.query("CALL SP_CambiarContra (?, ?)",
            [UsuId, NueCon],
            (err, respuesta) => {
                if (err) {
                    resp.json({ "status": 'Error' });
                    console.log(err);
                } else {
                    resp.json({ "status": 'Ok' });
                }
            }
        )

    }

)

app.put("/InactivarPerfil/:Id",
    (req, resp) => {
        const UsuId = req.params.Id;

        db.query("CALL SP_BorrarUsuario (?)",
            [UsuId],
            (err, respuesta) => {
                if (err) {
                    resp.json({ "status": 'Error' });
                    console.log(err);
                } else {
                    resp.json({ "status": 'Ok' });
                }
            }
        )

    }

)
//libros
app.get('/getLibros', (req, res) => {
    const query = 'SELECT Id, Titulo FROM Libros';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener libros:", error);
            res.status(500).send("Error al obtener libros");
        } else {
            res.json(rows);
        }
    });
});
app.post("/resenaLibro", (req, res) => {
    const { id_sesion, titulo, calificacion, reseña } = req.body;

    const query = 'CALL SP_CrearReseñaLibro(?, ?, ?, ?)';
    const values = [id_sesion, titulo, calificacion, reseña];

    console.log(req.body);
    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar reseña del libro desde la base de datos:", error);
            res.status(500).send("Error al insertar reseña del libro desde la base de datos");
        } else {
            res.send({ mensaje: "Reseña agregada con éxito" });
        }
    });
});
app.get('/getDatosLibros', (req, res) => {
    const query = 'SELECT * FROM VistaLibrosCompleta';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener series:", error);
            res.status(500).send("Error al obtener series");
        } else {
            res.json(rows);
        }
    });
});

app.get('/getResenaLibros/:id', (req, res) => {
    const query = 'CALL SP_BuscarReseñasLibros(?)';
    const idLibro = req.params.id;

    db.query(query,[idLibro], (error, results) => {
        if (error) {
            console.error("Error al obtener reseñas de libros:", error);
            res.status(500).send("Error al obtener reseñas de series");
        } else {
            if (results && results[0]) {
                console.log("Resultados de la consulta:", results[0]);
                res.json(results[0]);
            } else {
                res.json([]);
            } 
        }
    });
});
//series
app.get('/getSeries', (req, res) => {
    const query = 'SELECT Id, Titulo FROM Series';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener series:", error);
            res.status(500).send("Error al obtener series");
        } else {
            res.json(rows);
        }
    });
});

app.post("/resenaSerie", (req, res) => {
    const { id_sesion, titulo, calificacion, reseña } = req.body;

    const query = 'CALL SP_CrearReseñaSerie(?, ?, ?, ?)';
    const values = [id_sesion, titulo, calificacion, reseña];

    console.log(req.body);
    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar reseña desde la base de datos:", error);
            res.status(500).send("Error al insertar reseña desde la base de datos");
        } else {
            res.send({ mensaje: "Reseña agregada con éxito" });
        }
    });
});

app.get('/getDatosSeries', (req, res) => {
    const query = 'SELECT * FROM VistaSeriesCompleta';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener series:", error);
            res.status(500).send("Error al obtener series");
        } else {
            res.json(rows);
        }
    });
});

app.get('/getResenaSerie/:id', (req, res) => {
    const query = 'CALL SP_BuscarReseñasSeries(?)';
    const idSerie = req.params.id;

    console.log("ID de la serie:", idSerie);
    db.query(query, [idSerie], (error, results) => {
        if (error) {
            console.error("Error al obtener reseñas de series:", error);
            res.status(500).send("Error al obtener reseñas de series");
        } else {
            if (results && results[0]) {
                console.log("Resultados de la consulta:", results[0]);
                res.json(results[0]);
            } else {
                res.json([]);
            }
        }
    });
});



// Obtener categorías
app.get('/getCategorias', (req, res) => {
    const query = 'SELECT Id, Nombre FROM Categoria';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener categorías:", error);
            res.status(500).send("Error al obtener categorías");
        } else {
            res.json(rows); // Enviar la lista de categorías
        }
    });
});

// Obtener plataformas
app.get('/getPlataformas', (req, res) => {
    const query = 'SELECT Id, Nombre FROM Plataforma';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener plataformas:", error);
            res.status(500).send("Error al obtener plataformas");
        } else {
            res.json(rows); // Enviar la lista de plataformas
        }
    });
});



//pelicula
// app.post("/postPelicula", (req, res) => {
//     const { titulo, director, actor_1, actor_2, anio, categoria } = req.body;

//     const sql = 'CALL SP_CrearPelicula(?, ?, ?, ?, ?, ?)';
//     const values = [titulo, director, actor_1, actor_2, anio, categoria];

//     db.query(sql, values, (error, results) => {
//         if (error) {
//             console.error("Error al insertar película:", error);
//             res.status(500).send("Error al insertar película");
//         } else {
//             res.send("Película creada con éxito");
//         }
//     });
// });

app.get('/getPeliculas', (req, res) => {
    const query = 'CALL SP_ObtenerPeliculas()';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener películas:", error);
            res.status(500).send("Error al obtener películas");
        } else {
            res.json(rows[0]); // Se devuelve el resultado de la llamada al procedimiento
        }
    });
});

app.post("/resenaPelicula", (req, res) => {
    const { id_sesion, titulo, calificacion, reseña } = req.body;

    const sql = 'CALL SP_CrearReseñaPelicula(?, ?, ?, ?)';
    const values = [id_sesion, titulo, calificacion, reseña];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al insertar reseña de película:", error);
            res.status(500).send("Error al insertar reseña de película");
        } else {
            res.send({ mensaje: "Reseña agregada con éxito" });
        }
    });
});

app.get('/getResenaPeliculas/:id', (req, res) => {
    const query = 'CALL SP_ObtenerReseñasPelicula(?)';
    const idPelicula = req.params.id;

    db.query(query,[idPelicula], (error, results) => {
        if (error) {
            console.error("Error al obtener reseñas de películas:", error);
            res.status(500).send("Error al obtener reseñas de películas");
        } else {
            if (results && results[0]) {
                console.log("Resultados de la consulta:", results[0]);
                res.json(results[0]);
            } else {
                res.json([]);
            } }
    });
});

app.get('/getDatosPeliculas', (req, res) => {
    const query = 'SELECT * FROM VistaPeliculasCompleta';

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Error al obtener series:", error);
            res.status(500).send("Error al obtener series");
        } else {
            res.json(rows);
        }
    });
});

//Registro administrador
const filtro = (req, file, cb) => {
    const formatos = ['image/png', 'image/jpg', 'image/jpeg'];

    if (formatos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Archivo no aceptacdo')); // Maintain error handling
    }
};

const str = multer.memoryStorage();
const archivo = multer({ storage: str, fileFilter: filtro }); // Apply filter

app.post("/imagen", archivo.single('imagenForm'),
    (req, resp) => {
        const userName = req.body.usuario;
        const imag64 = req.file.buffer.toString('base64');

        db.query("insert into imagen(imag64,usuario) values (?,?)",
            [imag64, userName],
            (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    resp.json({
                        "status": "OK"
                    })
                }
            }
        )
    }
)

app.get("/getAllImag",
    (req, resp) => {
        db.query("select * from imagen",
            (error, result) => {
                if (error) {
                    resp.json({
                        "status": "Error"
                    })
                    console.log(error);
                } else {
                    if (result.length > 0) {
                        resp.json(result);
                        console.log(result);
                    }
                }
            }
        )
    }
)

//Funciones de administrador

app.post("/postpelicula", (req, res) => {

    const { Titulo, Director, Actor1, Actor2, Duracion, Categoria, Plataforma } = req.body;

    const query = 'CALL SP_CrearPelicula(?, ?, ?, ?, ?, ?, ?)';
    const values = [Titulo, Director, Actor1, Actor2, Duracion, Categoria, Plataforma];

    console.log(req.body);
    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar serie desde la base de datos:", error);
            res.status(500).send("Error al insertar serie desde la base de datos");
        } else {
            res.send({ mensaje: "serie agregada con éxito" });
        }
    });
});

app.post("/postserie", (req, res) => {

    const { Titulo, Actor1S, Actor2S, Finalizacion, Temporada, Capitulos, Plataforma, Categoria } = req.body;

    const query = 'CALL SP_CrearSerie(?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [Titulo, Actor1S, Actor2S, Finalizacion, Temporada, Capitulos, Plataforma, Categoria];

    console.log(req.body);
    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar serie desde la base de datos:", error);
            res.status(500).send("Error al insertar serie desde la base de datos");
        } else {
            res.send({ mensaje: "serie agregada con éxito" });
        }
    });
});

app.post("/postLibro", (req, res) => {

    const { Titulo, Author, Editorial, Isbn, Categoria } = req.body;

    const query = 'CALL SP_CrearLibro(?, ?, ?, ?, ?)';
    const values = [Titulo, Author, Editorial, Isbn, Categoria];

    console.log(req.body);
    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar serie desde la base de datos:", error);
            res.status(500).send("Error al insertar serie desde la base de datos");
        } else {
            res.send({ mensaje: "serie agregada con éxito" });
        }
    });
});