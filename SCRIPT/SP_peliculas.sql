Sus procedure: 

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE SP_CrearPelicula (
    IN In_Titulo VARCHAR(50),
    IN In_Director VARCHAR(50),
    IN In_Actor_1 VARCHAR(50),
    IN In_Actor_2 VARCHAR(50),
    IN In_Categoria VARCHAR(50),
    IN In_Plataforma VARCHAR(50)
)
BEGIN
    DECLARE Id_categoria INT;
    DECLARE Id_plataforma INT;

    -- Obtener el Id de la categoría
    SELECT C.Id INTO Id_categoria
    FROM Categoria C
    WHERE C.Nombre = In_Categoria
    LIMIT 1;

    -- Obtener el Id de la plataforma
    SELECT P.Id INTO Id_plataforma
    FROM Plataforma P
    WHERE P.Nombre = In_Plataforma
    LIMIT 1;

    -- Verificar si los Ids obtenidos no son NULL
    IF Id_categoria IS NOT NULL AND Id_plataforma IS NOT NULL THEN
        -- Insertar la película con los Ids de categoría y plataforma
        INSERT INTO Peliculas (Titulo, Director, Actor_1, Actor_2, Duracion, Categoria, Plataforma)
        VALUES (In_Titulo, In_Director, In_Actor_1, In_Actor_2, In_Duracion, Id_categoria, Id_plataforma);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Categoría o Plataforma no encontrados.';
    END IF;
END$$
DELIMITER ;
SHOW COLUMNS FROM peliculas;


DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE SP_CrearReseñaPelicula (
    IN In_Usuario INT,
    IN In_Pelicula VARCHAR(50),
    IN In_Calificacion FLOAT,
    IN In_Reseña VARCHAR(300)
)
BEGIN
    DECLARE Id_pelicula INT;

    -- Obtener el Id de la película
    SELECT P.Id INTO Id_pelicula
    FROM Peliculas P
    WHERE P.Titulo = In_Pelicula
    LIMIT 1;

    -- Verificar si se encontró la película
    IF Id_pelicula IS NOT NULL THEN
        -- Insertar la reseña
        INSERT INTO Usuario_Peliculas (Usuario, Pelicula, Calificacion, Fecha, Reseña)
        VALUES (In_Usuario, Id_pelicula, In_Calificacion, NOW(), In_Reseña);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Película no encontrada';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE SP_ObtenerPeliculas ()
BEGIN
    SELECT Id, Titulo 
    FROM Peliculas;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE SP_ObtenerReseñasPelicula ()
BEGIN
    SELECT * 
    FROM VistaReseñaPelicula;
END$$
DELIMITER ;