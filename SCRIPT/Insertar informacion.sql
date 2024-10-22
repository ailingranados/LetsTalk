
/************************************************************************************SELECTS EN BD******/

SELECT * FROM Usuario;

SELECT * FROM Usuario where Estado = 2; /*usuarios dados de baja*/

SELECT * FROM Estado_Usuario;

SELECT * FROM Categoria;

SELECT * FROM Plataforma;

SELECT * FROM Administrador;

SELECT * FROM libros;

/************************************************************************************INSERTS EN BD******/

INSERT INTO Usuario (USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENA, FECHA_NACIMIENTO, ESTADO, FECHA_REGISTRO)
VALUES ('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 1, NOW());

CALL SP_RegistrarUsuario('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0);

CALL SP_RegistrarUsuario('chuy', 'Jesus', 'Osorio', 'chuy@example.com', '123', '2001-04-26', 0);

CALL SP_BuscarIdUsuario('chuy@example.com', @ID);
select @ID;

CALL SP_ModificarUsuario(2, 'chuy2', '1234', 0);

CALL SP_BorrarUsuario(4);

CALL SP_BuscarUsuarioPorId(2, @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
select @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;


INSERT INTO Estado_Usuario(Estado)
VALUES ('ACTIVO');

INSERT INTO Estado_Usuario(Estado)
VALUES ('INACTIVO');

CALL IniciarSesion('ana@example.com', '123', @mensaje, @id_usuario);
SELECT @mensaje, @id_usuario;

CALL SP_CrearCategoria('Comedia');
CALL SP_CrearCategoria('Romantico');
CALL SP_CrearCategoria('Horror');
CALL SP_CrearCategoria('Suspenso');
CALL SP_CrearCategoria('Fantasia');
CALL SP_CrearCategoria('Historico');

CALL SP_CrearPlataforma('HBO');
CALL SP_CrearPlataforma('Netflix');
CALL SP_CrearPlataforma('Prime');
CALL SP_CrearPlataforma('Paramount+');
CALL SP_CrearPlataforma('Disney+');

CALL SP_RegistrarAdmin(1000, 'AILIN', 'AILIN', 'CANTU', 'ailin@admin.com', '123', '2002-08-28');

CALL SP_BuscarUsuarioPorId('2', @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
SELECT @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;

CALL SP_RegistrarLibro('Orgullo y prejuicio', 'jane austen', 'planeta', '123456789', 2);

CALL SP_ModificarUsuario(2, 'chuy2',  'jesus2', 'chuy2@gmail','osorio', 0);

CALL SP_CambiarContra (3, 'ailin')
