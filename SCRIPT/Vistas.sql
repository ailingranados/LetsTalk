SELECT * FROM VistaSeriesCompleta;

SELECT * FROM VistaReseñaSerie;

SELECT * FROM VistaReseñaLibro;

SELECT * FROM VistaLibrosCompleta;

SELECT * FROM v_resenas_peliculas;

SELECT * FROM v_top_peliculas;

SELECT * FROM v_detalle_peliculas;

CREATE VIEW VistaSeriesCompleta AS
SELECT 
	s.Titulo, 
	s.Actor_1,
    s.Actor_2,
    CASE
		WHEN s.Finalizada = 1 THEN 'Completa'
        ELSE 'Incompleta'
        END AS Estado,
	s.Temporadas,
    s.Capitulos,
    p.Nombre As Plataforma,
    c.Nombre As Categoria
    
FROM series s
JOIN Plataforma p ON s.Plataforma = p.Id
JOIN Categoria C ON s.Categoria = c.Id;


CREATE VIEW VistaReseñaSerie AS
SELECT 
	u.Id AS IdUsuario,
	u.Usuario,
    se.Id AS IdSerie,
    se.Titulo,
	s.Calificacion,
    s.Fecha, 
    s.Reseña

    
FROM usuario_series s
JOIN usuario u ON s.Usuario = u.Id
JOIN series se ON s.Serie = se.Id;

CREATE VIEW VistaReseñaLibro AS
SELECT 
    u.Id AS IdUsuario,
    u.Usuario,
    l.Id AS IdLibro,
    l.Titulo,
    ul.Calificacion,
    ul.Fecha,
    ul.Reseña
FROM Usuario_Libros ul
JOIN usuario u ON ul.Usuario = u.Id
JOIN libros l ON ul.Libro = l.Id;


CREATE VIEW VistaLibrosCompleta AS
SELECT 
    l.Titulo,
    l.Author,
    l.Editorial,
    l.ISBN,
    c.Nombre AS Categoria
FROM Libros l
JOIN Categoria c ON l.Categoria = c.Id;


CREATE VIEW v_detalle_peliculas AS
SELECT 
    p.id AS id_pelicula,
    p.Titulo AS titulo,
   /* p.Año AS año_lanzamiento,**/
    p.Director AS director,
    p.categoria AS categoria,
    /*p.Duracion AS duracion,**/
	/*p.Descripcion AS descripcion,**/
    ROUND(AVG(r.calificacion), 1) AS calificacion_promedio,
    COUNT(r.id) AS numero_reseñas
FROM 
    Peliculas p
LEFT JOIN 
    Usuario_Peliculas r ON p.Id = r.Id
GROUP BY 
    p.id, p.Titulo, p.Director, p.categoria;


CREATE VIEW v_resenas_peliculas AS
SELECT
    r.Id AS id_resena,
    p.Titulo AS titulo_pelicula,
    u.Nombre AS usuario,
    r.Calificacion,
    r.Reseña,
    r.Fecha
FROM
    Usuario_Peliculas r
JOIN
    peliculas p ON r.Id = p.id
JOIN
    usuario u ON r.Id = u.id;

CREATE VIEW v_top_peliculas AS
SELECT
    p.Id AS id,
    p.Titulo AS titulo_pelicula,
    AVG(r.calificacion) AS calificacion_promedio,
    COUNT(r.id) AS numero_resenas
FROM
    peliculas p
JOIN
    Usuario_Peliculas r ON p.Id = r.Id
GROUP BY
    p.id, p.Titulo
ORDER BY
    calificacion_promedio DESC;



