

/************************************************************************************INSERTS EN BD******/

INSERT INTO Usuario (USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENA, FECHA_NACIMIENTO, ESTADO, FECHA_REGISTRO)
VALUES ('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 1, NOW());

CALL SP_RegistrarUsuario('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0);

CALL SP_RegistrarUsuario('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0);

CALL SP_RegistrarUsuario('chuy', 'Jesus', 'Osorio', 'chuy@example.com', '123', '2001-04-26', 0);

CALL SP_IniciarSesion('ana@example.com','ana@example.com');

INSERT INTO Estado_Usuario(Estado)
VALUES ('ACTIVO');

INSERT INTO Estado_Usuario(Estado)
VALUES ('INACTIVO');

SELECT * FROM Usuario;

SELECT * FROM Estado_Usuario;


CALL IniciarSesion('ana@example.com', '123', @mensaje, @id_usuario);
SELECT @mensaje, @id_usuario;

