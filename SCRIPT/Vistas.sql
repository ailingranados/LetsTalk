SELECT * FROM VistaSeriesCompleta;

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


