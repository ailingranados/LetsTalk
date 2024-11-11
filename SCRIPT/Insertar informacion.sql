
/************************************************************************************SELECTS EN BD******/

SELECT * FROM Usuario;

SELECT * FROM Usuario where Estado = 2; /*usuarios dados de baja*/

SELECT * FROM Estado_Usuario;

SELECT * FROM Categoria;

SELECT * FROM Plataforma;

SELECT * FROM Administrador;

SELECT * FROM libros;

SELECT * FROM series;

SELECT * FROM usuario_series;

/************************************************************************************Modificacion en tablas******/

delete from Plataforma where Id = 10;

delete from series where Id = 2;

ALTER TABLE Plataforma AUTO_INCREMENT = 5;
/************************************************************************************INSERTS EN BD******/

INSERT INTO Usuario (USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENA, FECHA_NACIMIENTO, ESTADO, FECHA_REGISTRO)
VALUES ('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 1, NOW());

CALL SP_RegistrarUsuario('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0);

CALL SP_RegistrarUsuario('chuy', 'Jesus', 'Osorio', 'chuy@example.com', '123', '2001-04-26', 0);

CALL SP_RegistrarUsuario('luna', 'luna', 'cantu', 'luna@example.com', '123', '2000-02-20', 0, "administrador", 0);

CALL SP_BuscarIdUsuario('chuy@example.com', @ID);
select @ID;

CALL SP_ModificarUsuario(2, 'chuy2', '1234', 0);

CALL SP_BorrarUsuario(4);

CALL SP_BuscarUsuarioPorId(2, @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
select @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;

CALL SP_RegistrarAdmin(1000, 'AILIN', 'AILIN', 'CANTU', 'ailin@admin.com', '123', '2002-08-28');

CALL SP_BuscarUsuarioPorId('2', @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
SELECT @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;

CALL SP_RegistrarLibro('Orgullo y prejuicio', 'jane austen', 'planeta', '123456789', 2);

CALL SP_ModificarUsuario(2, 'chuy2',  'jesus2', 'chuy2@gmail','osorio', 0);

CALL SP_CambiarContra (3, 'ailin');

CALL IniciarSesion('ana@example.com', '123', @mensaje, @id_usuario);
SELECT @mensaje, @id_usuario;


INSERT INTO Estado_Usuario(Estado)
VALUES ('ACTIVO');

INSERT INTO Estado_Usuario(Estado)
VALUES ('INACTIVO');


CALL SP_CrearCategoria('Comedia');
CALL SP_CrearCategoria('Romantico');
CALL SP_CrearCategoria('Horror');
CALL SP_CrearCategoria('Suspenso');
CALL SP_CrearCategoria('Fantasia');
CALL SP_CrearCategoria('Historico');
CALL SP_CrearCategoria('Ciencia Ficcion');

CALL SP_CrearPlataforma('HBO');
CALL SP_CrearPlataforma('Netflix');
CALL SP_CrearPlataforma('Prime');
CALL SP_CrearPlataforma('Paramount+');
CALL SP_CrearPlataforma('Disney+');

CALL SP_CrearSerie('Euforia', 'Zendaya', 'jacob Elordi', 0, 2, 16, 'HBO', 'Suspenso');

CALL SP_CrearSerie('Arcane', 'Vee', 'Jinx', 0, 1, 8, 'Netflix', 'Ciencia Ficcion');

CALL SP_CrearReseñaSerie(2, 'Euforia', 3.5, 'buena serie con un buen comienzo, no me gusto el final de temporada');

CALL SP_BuscarSeriesPorId(1, @titulo, @actor1, @actor2, @finalizada, @temporadas, @capitulo, @plataforma, @categoria);
select @titulo, @actor1, @actor2, @finalizada, @temporadas, @capitulo, @plataforma, @categoria;

CALL SP_BuscarTodasLasSeries(@titulo, @actor1, @actor2, @finalizada, @temporadas, @capitulo, @plataforma, @categoria);
select @titulo, @actor1, @actor2, @finalizada, @temporadas, @capitulo, @plataforma, @categoria;

CALL SP_CrearLibro(
    'El Principito',       
    'Antoine de Saint-Exupéry', 
    'Reynal & Hitchcock',   
    '9781234567890',        
    'Suspenso'             
);
