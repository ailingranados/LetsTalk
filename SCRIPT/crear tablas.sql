/*CREATE DATABASE LetsTalk;

USE LetsTalk;

DROP DATABASE LETSTALK

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
Finalizada 			TINYINT(1) NOT NULL, /*0 para incompleta, 1 para terminada*/
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
Reseña				VARCHAR(300),


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
Reseña				VARCHAR(300),

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
Calificacion		FLOAT, /*valor del 0 al 5*/
Fecha				DATETIME NOT NULL,
Reseña				VARCHAR(300),

/*LLAVES FORANEAS*/
 CONSTRAINT FK_IdUsuario_Serie
	FOREIGN KEY (Usuario) 
		REFERENCES Usuario(Id),
        
 CONSTRAINT FK_IdSerie
	FOREIGN KEY (Serie) 
		REFERENCES Series(Id)        
);

/*************************************************************************************TABLAS CON CAMBIOS******/

ALTER TABLE Usuario
ADD COLUMN rol VARCHAR(50);

ALTER TABLE Usuario
ADD COLUMN Aprobado VARCHAR(50);

ALTER TABLE Peliculas
ADD COLUMN Duracion INT;

ALTER TABLE Peliculas
DROP COLUMN Duracion;


