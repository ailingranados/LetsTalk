
/************************************************************************************PROCEDURES******/
/*PROCEDURES CON CAMBIOS*/
drop procedure SP_IniciarSesion;
drop procedure SP_RegistrarUsuario;

DELIMITER //

CREATE PROCEDURE SP_IniciarSesion (
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(50),
    OUT p_mensaje VARCHAR(255),
    OUT p_id_usuario INT,
    OUT p_rol VARCHAR(50)
)
BEGIN
    DECLARE v_aprobado INT;

    SELECT Id, rol, Aprobado INTO p_id_usuario, p_rol, v_aprobado
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

CREATE PROCEDURE SP_RegistrarUsuario (
    IN p_usuario VARCHAR(50),
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(50),
    IN p_fecha_nacimiento DATE,
    IN p_img_perfil BLOB,
    IN p_rol VARCHAR(50),
    IN p_aprobado INT -- ParÃ¡metro para aprobado
)
BEGIN
    INSERT INTO Usuario (
        Usuario, Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento, Img_perfil, Estado, Fecha_registro, rol, Aprobado
    ) 
    VALUES (
        p_usuario, p_nombre, p_apellido, p_correo, p_contrasena, p_fecha_nacimiento, p_img_perfil, 1, NOW(), p_rol, p_aprobado
    );
END //

DELIMITER ;



/************************************************************************************USUARIO******/

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


/***********No funciona***
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

******No funciona******/

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

/***********CREAR SERIE******/
DELIMITER //
CREATE PROCEDURE SP_CrearSerie(

	In_Titulo 			VARCHAR(50),
	In_Actor_1 			VARCHAR(50),
	In_Actor_2 			VARCHAR(50),
	In_Finalizada 		TINYINT(1),
	In_Temporadas			INT,
	In_Capitulos			INT,
	In_Plataforma			VARCHAR(50),
	In_Categoria			VARCHAR(50)
)
BEGIN
  DECLARE Id_plataforma INT;
  DECLARE Id_categoria INT;

SELECT P.Id
    INTO Id_plataforma
		FROM Plataforma P
			WHERE P.Nombre = In_Plataforma;
            
 SELECT C.Id
    INTO Id_categoria
		FROM Categoria C
			WHERE C.Nombre = In_Categoria;
            
                   
    INSERT INTO Series (Titulo, Actor_1, Actor_2, Finalizada, Temporadas, Capitulos, plataforma, categoria)
		VALUES (In_Titulo, In_Actor_1, In_Actor_2, In_Finalizada, In_Temporadas, In_Capitulos, Id_plataforma, Id_categoria);
END //
DELIMITER ;

/***********CREAR RESEÑA SERIE******/
DROP PROCEDURE SP_CrearReseñaSerie
DELIMITER //
CREATE PROCEDURE SP_CrearReseñaSerie(
	In_Usuario 				INT,
	In_Serie 				VARCHAR(50),
	In_Calificacion			FLOAT,
	In_Reseña				VARCHAR(300)
)
BEGIN

	DECLARE Id_serie INT;
    
    SELECT S.Id
    INTO Id_serie
		FROM Series S
			WHERE S.Titulo = In_Serie;
       

    INSERT INTO Usuario_Series (Usuario, Serie, Calificacion, Fecha, Reseña)
		VALUES (In_Usuario, Id_serie, In_Calificacion, now(), In_Reseña);
END //
DELIMITER ;
