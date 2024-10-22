CREATE DATABASE LetsTalk;

USE LetsTalk;

/*DROP DATABASE LETSTALK

/************************************************************************************TABLAS DE USUARIO******/

CREATE TABLE Estado_Usuario(
	Id 				INT AUTO_INCREMENT PRIMARY KEY,
	Estado 			VARCHAR(15) NOT NULL
	
);

CREATE TABLE Usuario (
    Id 					INT AUTO_INCREMENT PRIMARY KEY,
	Usuario				VARCHAR(50) NOT NULL UNIQUE,
    Nombre 				VARCHAR(50) NOT NULL,
    Apellido 			VARCHAR(50) NOT NULL,
    Correo 				VARCHAR(100) NOT NULL UNIQUE,
    Contraseña 			VARCHAR(50) NOT NULL,
    Fecha_nacimiento	DATE NOT NULL,
	Img_perfil			BLOB,
    Estado				INT,
    Fecha_registro		DATETIME,
    
    FOREIGN KEY (Estado) REFERENCES Estado_Usuario(Id)
);

/*DROP TABLE Administrador*/
CREATE TABLE Administrador (
    Id 					INT PRIMARY KEY,
	Usuario				VARCHAR(50) NOT NULL UNIQUE,
    Nombre 				VARCHAR(50) NOT NULL,
    Apellido 			VARCHAR(50) NOT NULL,
    Correo 				VARCHAR(100) NOT NULL UNIQUE,
    Contraseña 			VARCHAR(50) NOT NULL,
    Fecha_nacimiento	DATE NOT NULL,
	
    Estado				INT,
    Fecha_registro		DATETIME,
    
    FOREIGN KEY (Estado) REFERENCES Estado_Usuario(Id)
);


/*************************************************************************************TABLAS DE LISTBOX******/
CREATE TABLE Categoria(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Nombre 				VARCHAR(50)
);

CREATE TABLE Plataforma(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Nombre 				VARCHAR(50)
);

/*************************************************************************************TABLAS DE RESEÑAS******/
CREATE TABLE Libros(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Titulo 				VARCHAR(50),
Author 				VARCHAR(50),
Editorial 			VARCHAR(50),
ISBN 				VARCHAR(15),
Categoria			INT,

/*LLAVES FORANEAS*/

 CONSTRAINT FK_Categoria_Libros
	FOREIGN KEY (Categoria) 
		REFERENCES Categoria(Id)
);

CREATE TABLE Peliculas(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Titulo 				VARCHAR(50),
Director 			VARCHAR(50),
Actor_1 			VARCHAR(50),
Actor_2 			VARCHAR(50),
Duracion			INT,
Categoria			INT,
Plataforma			INT,

/*LLAVES FORANEAS*/
 CONSTRAINT FK_Categoria_Peliculas
	FOREIGN KEY (Categoria) 
		REFERENCES Categoria(Id),
	
 CONSTRAINT FK_Plataforma_Peliculas
	FOREIGN KEY (Plataforma) 
		REFERENCES Plataforma(Id)   
);

CREATE TABLE Series(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Titulo 				VARCHAR(50),
Actor_1 			VARCHAR(50),
Actor_2 			VARCHAR(50),
Finalizada 			TINYINT(1) NOT NULL,
Temporadas			INT,
Capitulos			INT,
Plataforma			INT,
Categoria			INT,


/*LLAVES FORANEAS*/
 CONSTRAINT FK_Categoria_Series
	FOREIGN KEY (Categoria) 
		REFERENCES Categoria(Id),
        
 CONSTRAINT FK_Plataforma_Series
	FOREIGN KEY (Plataforma) 
		REFERENCES Plataforma(Id)        
);

/*************************************************************************************TABLAS DE RELACIONES******/

CREATE TABLE Usuario_Libros(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Usuario				INT,
Libro				INT,
Calificacion		INT,
Fecha				DATETIME NOT NULL,

/*LLAVES FORANEAS*/
 CONSTRAINT FK_IdUsuario_Libros
	FOREIGN KEY (Usuario) 
		REFERENCES Usuario(Id),
        
 CONSTRAINT FK_IdLibro
	FOREIGN KEY (Libro) 
		REFERENCES Libros(Id)        
);

CREATE TABLE Usuario_Peliculas(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Usuario				INT,
Pelicula			INT,
Calificacion		INT,
Fecha				DATETIME NOT NULL,

/*LLAVES FORANEAS*/
 CONSTRAINT FK_IdUsuario_Pelicula
	FOREIGN KEY (Usuario) 
		REFERENCES Usuario(Id),
        
 CONSTRAINT FK_IdPelicula
	FOREIGN KEY (Pelicula) 
		REFERENCES Peliculas(Id)        
);

CREATE TABLE Usuario_Series(
Id 					INT AUTO_INCREMENT PRIMARY KEY,
Usuario				INT,
Serie				INT,
Calificacion		INT,
Fecha				DATETIME NOT NULL,

/*LLAVES FORANEAS*/
 CONSTRAINT FK_IdUsuario_Serie
	FOREIGN KEY (Usuario) 
		REFERENCES Usuario(Id),
        
 CONSTRAINT FK_IdSerie
	FOREIGN KEY (Serie) 
		REFERENCES Series(Id)        
);



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

CALL SP_CrearPlataforma('HBO');
CALL SP_CrearPlataforma('Netflix');
CALL SP_CrearPlataforma('Prime');
CALL SP_CrearPlataforma('Paramount+');
CALL SP_CrearPlataforma('Disney+');

/*
CALL SP_RegistrarAdmin(1000, 'AILIN', 'AILIN', 'CANTU', 'ailin@admin.com', '123', '2002-08-28');

CALL SP_BuscarUsuarioPorId('2', @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
SELECT @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;

CALL SP_RegistrarLibro('Orgullo y prejuicio', 'jane austen', 'planeta', '123456789', 2);

CALL IniciarSesion('ana@example.com', '123', @mensaje, @id_usuario);
SELECT @mensaje, @id_usuario;


INSERT INTO Usuario (USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENA, FECHA_NACIMIENTO, ESTADO, FECHA_REGISTRO)
VALUES ('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 1, NOW());

CALL SP_RegistrarUsuario('ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0);

CALL SP_RegistrarUsuario('chuy', 'Jesus', 'Osorio', 'chuy@example.com', '123', '2001-04-26', 0);

CALL SP_BuscarIdUsuario('chuy@example.com', @ID);
select @ID;

CALL SP_ModificarUsuario(2, 'chuy2', '1234', 0);

CALL SP_BorrarUsuario(3);

CALL SP_BuscarUsuarioPorId(2, @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro);
select @O_usuario, @O_nombre, @O_apellido, @O_correo, @O_contrasena, @O_fecha_nacimiento, @O_img_perfil, @O_estado, @O_fecha_registro;
*/
