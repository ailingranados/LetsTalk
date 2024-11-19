
/************************************************************************************PROCEDURES******/
/*PROCEDURES CON CAMBIOS*/

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

--libros, ya funciona
DELIMITER //
CREATE PROCEDURE SP_CrearReseñaLibro(
	In_Usuario 				INT,
	In_Libro 				VARCHAR(50),
	In_Calificacion			FLOAT,
	In_Reseña				VARCHAR(300)
)
BEGIN

	DECLARE Id_Libro INT;
    
    SELECT S.Id
    INTO Id_Libro
		FROM Libros S
			WHERE S.Titulo = In_Libro;
       

    INSERT INTO Usuario_Libros (Usuario, Libro, Calificacion, Fecha, Reseña)
		VALUES (In_Usuario, Id_Libro, In_Calificacion, now(), In_Reseña);
END //
DELIMITER ;

--crear libro
DELIMITER //
CREATE PROCEDURE SP_CrearLibro(
    In_Titulo VARCHAR(50),
    In_Author VARCHAR(50),
    In_Editorial VARCHAR(50),
    In_ISBN VARCHAR(15),
    In_Categoria VARCHAR(50)
)
BEGIN
    DECLARE Id_categoria INT;

    -- Obtener el ID de la categoría con el nombre especificado
    SELECT C.Id
    INTO Id_categoria
    FROM Categoria C
    WHERE C.Nombre = In_Categoria
    LIMIT 1;  -- Agregar LIMIT 1 para evitar múltiples resultados

    -- Insertar el libro en la tabla Libros
    INSERT INTO Libros (Titulo, Author, Editorial, ISBN, Categoria)
    VALUES (In_Titulo, In_Author, In_Editorial, In_ISBN, Id_categoria);
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
/*DROP PROCEDURE SP_CrearReseñaSerie*/
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

/***********BUSCAR SERIE******/
/*DROP PROCEDURE SP_BuscarSeriesPorId*/
DELIMITER //
CREATE PROCEDURE SP_BuscarSeriesPorId (
    IN IN_Id 			INT,
	OUT O_Titulo 		VARCHAR(50),
	OUT O_Actor_1 		VARCHAR(50),
	OUT O_Actor_2 		VARCHAR(50),
	OUT O_Finalizada 	VARCHAR(50), /*0 para incompleta, 1 para terminada*/
	OUT O_Temporadas	INT,
	OUT O_Capitulos		INT,
	OUT O_Plataforma	VARCHAR(50),
	OUT O_Categoria		VARCHAR(50)
)
BEGIN

DECLARE Id_plataforma INT;
DECLARE Id_categoria INT;
DECLARE finalizada tinyint(1);

  SELECT series.Titulo, series.Actor_1, series.Actor_2, series.Finalizada, series.Temporadas, series.Capitulos, series.Plataforma, series.categoria
    INTO O_Titulo, O_Actor_1, O_Actor_2, finalizada, O_Temporadas, O_Capitulos, Id_plataforma, Id_categoria
		FROM Series
			WHERE series.Id = IN_Id
		LIMIT 1;

	SELECT plataforma.Nombre
		INTO O_Plataforma
			FROM plataforma
				WHERE plataforma.Id = Id_plataforma;
                
	SELECT categoria.Nombre
		INTO O_Categoria
			FROM categoria
				WHERE categoria.Id = Id_categoria;
                
	if finalizada = 0 THEN
		SET O_Finalizada = 'Incompleta';
    END IF;
    
    if finalizada = 1 THEN
		SET O_Finalizada = 'Completa';
    END IF;
END //
DELIMITER ;

/***********BUSCAR TODAS LAS SERIE******/
/*DROP PROCEDURE SP_BuscarTodasLasSeries*/
DELIMITER //
CREATE PROCEDURE SP_BuscarTodasLasSeries (
	OUT O_Titulo 		VARCHAR(50),
	OUT O_Actor_1 		VARCHAR(50),
	OUT O_Actor_2 		VARCHAR(50),
	OUT O_Finalizada 	VARCHAR(50), /*0 para incompleta, 1 para terminada*/
	OUT O_Temporadas	INT,
	OUT O_Capitulos		INT,
	OUT O_Plataforma	VARCHAR(50),
	OUT O_Categoria		VARCHAR(50)
)
BEGIN

DECLARE Id_plataforma INT;
DECLARE Id_categoria INT;
DECLARE finalizada tinyint(1);

  SELECT series.Titulo, series.Actor_1, series.Actor_2, series.Finalizada, series.Temporadas, series.Capitulos, series.Plataforma, series.categoria
    INTO O_Titulo, O_Actor_1, O_Actor_2, finalizada, O_Temporadas, O_Capitulos, Id_plataforma, Id_categoria
		FROM Series;
			

	SELECT plataforma.Nombre
		INTO O_Plataforma
			FROM plataforma
				WHERE plataforma.Id = Id_plataforma;
                
	SELECT categoria.Nombre
		INTO O_Categoria
			FROM categoria
				WHERE categoria.Id = Id_categoria;
                
	if finalizada = 0 THEN
		SET O_Finalizada = 'Incompleta';
    END IF;
    
    if finalizada = 1 THEN
		SET O_Finalizada = 'Completa';
    END IF;
END //
DELIMITER ;


DROP PROCEDURE SP_BuscarReseñasSeries
DELIMITER //
CREATE PROCEDURE SP_BuscarReseñasSeries(
	In_Serie 	INT 
	
)
BEGIN

SELECT * FROM VistaReseñaSerie where IdSerie = In_Serie;
    
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_BuscarReseñasLibros(
	In_Libro 	INT 
	
)
BEGIN

SELECT * FROM VistaReseñaLibro where IdLibro = In_Libro;
    
END //
DELIMITER ;



