
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


/*************/
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



