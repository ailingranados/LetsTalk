SELECT * FROM VistaSeriesCompleta;

SELECT * FROM VistaReseñaSerie;

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




