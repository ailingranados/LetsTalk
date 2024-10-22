
/************************************************************************************PROCEDURES******/

DELIMITER //
CREATE PROCEDURE SP_IniciarSesionAdmin(
    IN IN_correo VARCHAR(100),
    IN IN_contrasena VARCHAR(50), 
    OUT OUT_mensaje VARCHAR(255), 
    OUT OUT_id_usuario INT
)
BEGIN
    DECLARE id_usuario INT;

    -- Intentar obtener el ID del usuario con el correo y la contraseña proporcionados
    SELECT U.Id
		INTO id_usuario
			FROM Usuario U
				WHERE U.Correo = IN_correo AND U.Contraseña = IN_contrasena
    LIMIT 1;

    -- Si no se encuentra el usuario, verificar si el correo existe
    IF id_usuario IS NULL THEN
        SELECT U.Id
        INTO id_usuario
        FROM Usuario U
        WHERE U.Correo = p_correo
        LIMIT 1;

        -- Si el correo no existe
        IF id_usuario IS NULL THEN
            SET p_mensaje = 'El correo electrónico no existe en Administrador';
        ELSE
            SET p_mensaje = 'Correo electrónico o contraseña incorrectos';
        END IF;
    ELSE
        -- Inicio de sesión exitoso
        SET OUT_mensaje = 'Inicio de sesión exitoso';
        SET OUT_id_usuario = id_usuario;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_IniciarSesion(
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(50), 
    OUT p_mensaje VARCHAR(255), 
    OUT p_id_usuario INT
)
BEGIN
    DECLARE id_usuario INT;

    -- Intentar obtener el ID del usuario con el correo y la contraseña proporcionados
    SELECT U.Id
    INTO id_usuario
    FROM Usuario U
    WHERE U.Correo = p_correo AND U.Contraseña = p_contrasena
    LIMIT 1;

    -- Si no se encuentra el usuario, verificar si el correo existe
    IF id_usuario IS NULL THEN
        SELECT U.Id
        INTO id_usuario
        FROM Usuario U
        WHERE U.Correo = p_correo
        LIMIT 1;

        -- Si el correo no existe
        IF id_usuario IS NULL THEN
            SET p_mensaje = 'El correo electrónico no existe en la base de datos';
        ELSE
            SET p_mensaje = 'Correo electrónico o contraseña incorrectos';
        END IF;
    ELSE
        -- Inicio de sesión exitoso
        SET p_mensaje = 'Inicio de sesión exitoso';
        SET p_id_usuario = id_usuario;
    END IF;
END //
DELIMITER ;


/************************************************************************************USUARIO******/
DELIMITER //
CREATE PROCEDURE SP_RegistrarUsuario (
    IN p_usuario VARCHAR(50),
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(50),
    IN p_fecha_nacimiento DATE,
    IN p_img_perfil BLOB
)
BEGIN
    INSERT INTO Usuario (
        Usuario, Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento, Img_perfil, Estado, Fecha_registro
    ) 
    VALUES (
        p_usuario, p_nombre, p_apellido, p_correo, p_contrasena, p_fecha_nacimiento, p_img_perfil, 1, now()
    );
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_RegistrarAdmin (
	IN IN_id INT,
    IN IN_usuario VARCHAR(50),
    IN IN_nombre VARCHAR(50),
    IN IN_apellido VARCHAR(50),
    IN IN_correo VARCHAR(100),
    IN IN_contrasena VARCHAR(50),
    IN IN_fecha_nacimiento DATE
)
BEGIN
    INSERT INTO Administrador (
        Id, Usuario, Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento, Estado, Fecha_registro
    ) 
    VALUES (
        IN_id, IN_usuario, IN_nombre, IN_apellido, IN_correo, IN_contrasena, IN_fecha_nacimiento, 1, now()
    );
END //
DELIMITER ;
/*
DELIMITER //
CREATE PROCEDURE SP_ModificarUsuario (
    IN IN_Id INT,
    IN IN_usuario VARCHAR(50),
    IN IN_contrasena VARCHAR(50),
    IN IN_img_perfil BLOB
)
BEGIN

	UPDATE Usuario
		SET 
		Usuario = IN_usuario, 
		Contraseña = IN_contrasena,
		Img_perfil = IN_img_perfil
			WHERE Id = IN_Id;
END //
DELIMITER ;
*/

DELIMITER //
CREATE PROCEDURE SP_BorrarUsuario (
    IN IN_Id INT
)
BEGIN

	UPDATE Usuario
		SET 
		Estado = 2
			WHERE Id = IN_Id;
            
END //
DELIMITER ;

/***********BUSCAR ID USUARIO POR CORREO******/
DELIMITER //
CREATE PROCEDURE SP_BuscarIdUsuario (
    IN IN_correo VARCHAR(100),
    OUT OUT_id_usuario INT
)
BEGIN

  SELECT U.Id
    INTO OUT_id_usuario
		FROM Usuario U
			WHERE U.Correo = IN_correo
		LIMIT 1;

END //
DELIMITER ;

/***********CONSEGUIR INF POR ID******/
DELIMITER //
CREATE PROCEDURE SP_BuscarUsuarioPorId (
    IN IN_Id INT,
	OUT O_usuario VARCHAR(50),
    OUT O_nombre VARCHAR(50),
    OUT O_apellido VARCHAR(50),
    OUT O_correo VARCHAR(100),
    OUT O_contrasena VARCHAR(50),
    OUT O_fecha_nacimiento DATE,
    OUT O_img_perfil BLOB,
    OUT O_estado INT,
    OUT O_fecha_registro DATETIME
)
BEGIN

  SELECT U.Usuario, U.Nombre, U.Apellido, U.Correo, U.Contraseña, U.Fecha_nacimiento, U.Img_perfil, U.Estado, U.Fecha_registro
    INTO O_usuario, O_nombre, O_apellido, O_correo, O_contrasena, O_fecha_nacimiento, O_img_perfil, O_estado, O_fecha_registro
		FROM Usuario U
			WHERE U.Id = IN_Id
		LIMIT 1;

END //
DELIMITER ;

/***********CREAR CATEGORIA CON NOMBRE******/
DELIMITER //
CREATE PROCEDURE SP_CrearCategoria(
    IN IN_nombre VARCHAR(50)
)
BEGIN
    INSERT INTO Categoria (Nombre) 
		VALUES (IN_nombre);
END //
DELIMITER ;

/***********CREAR PLATAFORMA CON NOMBRE******/
DELIMITER //
CREATE PROCEDURE SP_CrearPlataforma(
    IN IN_nombre VARCHAR(50)
)
BEGIN
    INSERT INTO Plataforma (Nombre) 
		VALUES (IN_nombre);
END //
DELIMITER ;




DROP PROCEDURE SP_RegistrarLibro
DELIMITER //
CREATE PROCEDURE SP_RegistrarLibro (
    IN IN_titulo VARCHAR(50),
    IN IN_author VARCHAR(50),
    IN IN_editorial VARCHAR(100),
    IN IN_isbn VARCHAR(15),
    IN categoria INT
)
BEGIN
    INSERT INTO Libros (
		Titulo,
		Author,
		Editorial,
		ISBN,
		Categoria	
    ) 
    VALUES (
        IN_titulo, IN_author, IN_editorial, IN_isbn, categoria
    );
END //
DELIMITER ;

Drop procedure SP_ModificarUsuario
DELIMITER //
CREATE PROCEDURE SP_ModificarUsuario (
    IN IN_Id INT,
    IN IN_nombre VARCHAR(50),
    IN IN_usuario VARCHAR(50),
    IN IN_correo VARCHAR(50),
    IN IN_apellido VARCHAR(50),
    IN IN_img_perfil BLOB
)
BEGIN

	UPDATE Usuario
		SET 
        Nombre = IN_nombre,
		Usuario = IN_usuario, 
		Correo = IN_correo,
        Apellido = IN_apellido,
		Img_perfil = IN_img_perfil
			WHERE Id = IN_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_CambiarContra (
    IN IN_Id INT,
    IN IN_contra VARCHAR(50)
)
BEGIN

	UPDATE Usuario
		SET 
        Contraseña = IN_contra
			WHERE Id = IN_Id;
END //
DELIMITER ;

