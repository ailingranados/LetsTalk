
/************************************************************************************PROCEDURES******/

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



