DELIMITER //

CREATE PROCEDURE SP_IniciarSesion (
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(50),
    OUT p_mensaje VARCHAR(255),
    OUT p_id_usuario INT,
    OUT p_rol VARCHAR(50),
    OUT out_estado INT
)
BEGIN
    DECLARE v_aprobado INT;

    SELECT Id, rol, Aprobado, Estado INTO p_id_usuario, p_rol, v_aprobado, out_estado
    FROM Usuario
    WHERE Correo = p_correo AND Contraseña = p_contrasena;

    IF p_id_usuario IS NULL THEN
        SET p_mensaje = 'Credenciales incorrectas';
    ELSEIF v_aprobado = 1 THEN
        SET p_mensaje = 'El usuario no está aprobado para iniciar sesión';
        SET p_id_usuario = NULL; -- No se debe permitir el acceso
    ELSE
        SET p_mensaje = 'Inicio de sesión exitoso';
    END IF;
END //
DELIMITER ;

DELIMITER //
