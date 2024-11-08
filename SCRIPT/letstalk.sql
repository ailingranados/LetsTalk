-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2024 a las 06:47:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `letstalk`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BorrarUsuario` (IN `IN_Id` INT)   BEGIN

	UPDATE Usuario
		SET 
		Estado = 2
			WHERE Id = IN_Id;
            
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarIdUsuario` (IN `IN_correo` VARCHAR(100), OUT `OUT_id_usuario` INT)   BEGIN

  SELECT U.Id
    INTO OUT_id_usuario
		FROM Usuario U
			WHERE U.Correo = IN_correo
		LIMIT 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarSeriesPorId` (IN `IN_Id` INT, OUT `O_Titulo` VARCHAR(50), OUT `O_Actor_1` VARCHAR(50), OUT `O_Actor_2` VARCHAR(50), OUT `O_Finalizada` VARCHAR(50), OUT `O_Temporadas` INT, OUT `O_Capitulos` INT, OUT `O_Plataforma` VARCHAR(50), OUT `O_Categoria` VARCHAR(50))   BEGIN

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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BuscarUsuarioPorId` (IN `IN_Id` INT, OUT `O_usuario` VARCHAR(50), OUT `O_nombre` VARCHAR(50), OUT `O_apellido` VARCHAR(50), OUT `O_correo` VARCHAR(100), OUT `O_contrasena` VARCHAR(50), OUT `O_fecha_nacimiento` DATE, OUT `O_img_perfil` BLOB, OUT `O_estado` INT, OUT `O_fecha_registro` DATETIME)   BEGIN

  SELECT U.Usuario, U.Nombre, U.Apellido, U.Correo, U.Contraseña, U.Fecha_nacimiento, U.Img_perfil, U.Estado, U.Fecha_registro
    INTO O_usuario, O_nombre, O_apellido, O_correo, O_contrasena, O_fecha_nacimiento, O_img_perfil, O_estado, O_fecha_registro
		FROM Usuario U
			WHERE U.Id = IN_Id
		LIMIT 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CambiarContra` (IN `IN_Id` INT, IN `IN_contra` VARCHAR(50))   BEGIN

	UPDATE Usuario
		SET 
        Contraseña = IN_contra
			WHERE Id = IN_Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CrearCategoria` (IN `IN_nombre` VARCHAR(50))   BEGIN
    INSERT INTO Categoria (Nombre) 
		VALUES (IN_nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CrearPlataforma` (IN `IN_nombre` VARCHAR(50))   BEGIN
    INSERT INTO Plataforma (Nombre) 
		VALUES (IN_nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CrearReseñaSerie` (`In_Usuario` INT, `In_Serie` VARCHAR(50), `In_Calificacion` FLOAT, `In_Reseña` VARCHAR(300))   BEGIN

	DECLARE Id_serie INT;
    
    SELECT S.Id
    INTO Id_serie
		FROM Series S
			WHERE S.Titulo = In_Serie;
       

    INSERT INTO Usuario_Series (Usuario, Serie, Calificacion, Fecha, Reseña)
		VALUES (In_Usuario, Id_serie, In_Calificacion, now(), In_Reseña);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CrearSerie` (`In_Titulo` VARCHAR(50), `In_Actor_1` VARCHAR(50), `In_Actor_2` VARCHAR(50), `In_Finalizada` TINYINT(1), `In_Temporadas` INT, `In_Capitulos` INT, `In_Plataforma` VARCHAR(50), `In_Categoria` VARCHAR(50))   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_IniciarSesion` (IN `p_correo` VARCHAR(100), IN `p_contrasena` VARCHAR(50), OUT `p_mensaje` VARCHAR(255), OUT `p_id_usuario` INT, OUT `p_rol` VARCHAR(50))   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ModificarUsuario` (IN `IN_Id` INT, IN `IN_nombre` VARCHAR(50), IN `IN_usuario` VARCHAR(50), IN `IN_correo` VARCHAR(50), IN `IN_apellido` VARCHAR(50), IN `IN_img_perfil` BLOB)   BEGIN

	UPDATE Usuario
		SET 
        Nombre = IN_nombre,
		Usuario = IN_usuario, 
		Correo = IN_correo,
        Apellido = IN_apellido,
		Img_perfil = IN_img_perfil
			WHERE Id = IN_Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RegistrarAdmin` (IN `IN_id` INT, IN `IN_usuario` VARCHAR(50), IN `IN_nombre` VARCHAR(50), IN `IN_apellido` VARCHAR(50), IN `IN_correo` VARCHAR(100), IN `IN_contrasena` VARCHAR(50), IN `IN_fecha_nacimiento` DATE)   BEGIN
    INSERT INTO Administrador (
        Id, Usuario, Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento, Estado, Fecha_registro
    ) 
    VALUES (
        IN_id, IN_usuario, IN_nombre, IN_apellido, IN_correo, IN_contrasena, IN_fecha_nacimiento, 1, now()
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RegistrarUsuario` (IN `p_usuario` VARCHAR(50), IN `p_nombre` VARCHAR(50), IN `p_apellido` VARCHAR(50), IN `p_correo` VARCHAR(100), IN `p_contrasena` VARCHAR(50), IN `p_fecha_nacimiento` DATE, IN `p_img_perfil` BLOB, IN `p_rol` VARCHAR(50), IN `p_aprobado` INT)   BEGIN
    INSERT INTO Usuario (
        Usuario, Nombre, Apellido, Correo, Contraseña, Fecha_nacimiento, Img_perfil, Estado, Fecha_registro, rol, Aprobado
    ) 
    VALUES (
        p_usuario, p_nombre, p_apellido, p_correo, p_contrasena, p_fecha_nacimiento, p_img_perfil, 1, NOW(), p_rol, p_aprobado
    );
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contraseña` varchar(50) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Estado` int(11) DEFAULT NULL,
  `Fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`Id`, `Usuario`, `Nombre`, `Apellido`, `Correo`, `Contraseña`, `Fecha_nacimiento`, `Estado`, `Fecha_registro`) VALUES
(1000, 'AILIN', 'AILIN', 'CANTU', 'ailin@admin.com', '123', '2002-08-28', 1, '2024-10-15 00:40:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`Id`, `Nombre`) VALUES
(1, 'Comedia'),
(2, 'Romantico'),
(3, 'Horror'),
(4, 'Suspenso'),
(5, 'Fantasia'),
(6, 'Historico'),
(7, 'Ciencia Ficcion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_usuario`
--

CREATE TABLE `estado_usuario` (
  `Id` int(11) NOT NULL,
  `Estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_usuario`
--

INSERT INTO `estado_usuario` (`Id`, `Estado`) VALUES
(1, 'ACTIVO'),
(2, 'INACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `Id` int(11) NOT NULL,
  `Titulo` varchar(50) DEFAULT NULL,
  `Author` varchar(50) DEFAULT NULL,
  `Editorial` varchar(50) DEFAULT NULL,
  `ISBN` varchar(15) DEFAULT NULL,
  `Categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `Id` int(11) NOT NULL,
  `Titulo` varchar(50) DEFAULT NULL,
  `Director` varchar(50) DEFAULT NULL,
  `Actor_1` varchar(50) DEFAULT NULL,
  `Actor_2` varchar(50) DEFAULT NULL,
  `Duracion` int(11) DEFAULT NULL,
  `Categoria` int(11) DEFAULT NULL,
  `Plataforma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

CREATE TABLE `plataforma` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`Id`, `Nombre`) VALUES
(1, 'HBO'),
(2, 'Netflix'),
(3, 'Prime'),
(4, 'Paramount+'),
(5, 'Disney+');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `series`
--

CREATE TABLE `series` (
  `Id` int(11) NOT NULL,
  `Titulo` varchar(50) DEFAULT NULL,
  `Actor_1` varchar(50) DEFAULT NULL,
  `Actor_2` varchar(50) DEFAULT NULL,
  `Finalizada` tinyint(1) NOT NULL,
  `Temporadas` int(11) DEFAULT NULL,
  `Capitulos` int(11) DEFAULT NULL,
  `Plataforma` int(11) DEFAULT NULL,
  `Categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `series`
--

INSERT INTO `series` (`Id`, `Titulo`, `Actor_1`, `Actor_2`, `Finalizada`, `Temporadas`, `Capitulos`, `Plataforma`, `Categoria`) VALUES
(1, 'Euforia', 'Zendaya', 'jacob Elordi', 0, 2, 16, 1, 4),
(3, 'Arcane', 'Vee', 'Jinx', 0, 1, 8, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contraseña` varchar(50) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Img_perfil` blob DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  `Fecha_registro` datetime DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `Aprobado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id`, `Usuario`, `Nombre`, `Apellido`, `Correo`, `Contraseña`, `Fecha_nacimiento`, `Img_perfil`, `Estado`, `Fecha_registro`, `rol`, `Aprobado`) VALUES
(1, 'ana', 'Ana', 'Ambris', 'ana@example.com', '123', '2002-07-22', 0x30, 1, '2024-09-23 22:39:58', NULL, NULL),
(2, 'jesus2', 'chuy2', 'osorio', 'chuy2@gmail', '1234', '2001-04-26', 0x30, 1, '2024-09-29 19:07:43', NULL, NULL),
(3, 'a', 'a', 'a', 'a@a', 'ailin2', '2024-09-01', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313732373635393130333233332e6a7067, 2, '2024-09-29 19:18:23', NULL, NULL),
(4, '123', '123', '123', 'a@q', '123', '2024-09-01', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313732373636303037333438332e6a7067, 2, '2024-09-29 19:34:33', NULL, NULL),
(5, 'luna123', 'luna', 'cat', 'luna@gmail.com', '12345678', '2002-08-28', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313732373636303732363636302e6a706567, 1, '2024-09-29 19:45:26', NULL, NULL),
(6, 'ailin', 'ailin', 'cantu', 'ailin@example.com', '12345678', '2004-08-28', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313732373636303838323632372e6a7067, 1, '2024-09-29 19:48:02', NULL, NULL),
(7, 'luis3', 'luis3', 'garcia3', 'luis3@gmail', '12345678', '2001-09-10', NULL, 2, '2024-10-21 23:07:15', NULL, NULL),
(8, 'erick', 'erick', 'rosa', 'erick@gmail.com', '12345678', '2000-01-01', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313732393538313139373833312e6a7067, 1, '2024-10-22 01:13:17', 'administrador', '0'),
(10, 'luna', 'luna', 'cantu', 'luna@example.com', '123', '2000-02-20', 0x30, 1, '2024-10-28 23:06:42', 'administrador', '0'),
(11, 'chloe', 'chloe', 'dog', 'chloe@example.com', '12345678', '2000-08-05', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c7365727665725c75706c6f6164735c313733303137383936333135372e6a706567, 1, '2024-10-28 23:16:03', 'administrador', '0'),
(12, 'usuario', 'ejemplo', '1', 'ejemplo@gmail.com', '12345678', '2000-01-01', 0x433a5c78616d70705c6874646f63735c4c65747354616c6b5c5365727665725c75706c6f6164735c313733303639343639313333342e6a706567, 1, '2024-11-03 22:31:31', 'colaborador', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_libros`
--

CREATE TABLE `usuario_libros` (
  `Id` int(11) NOT NULL,
  `Usuario` int(11) DEFAULT NULL,
  `Libro` int(11) DEFAULT NULL,
  `Calificacion` int(11) DEFAULT NULL,
  `Fecha` datetime NOT NULL,
  `Reseña` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_peliculas`
--

CREATE TABLE `usuario_peliculas` (
  `Id` int(11) NOT NULL,
  `Usuario` int(11) DEFAULT NULL,
  `Pelicula` int(11) DEFAULT NULL,
  `Calificacion` int(11) DEFAULT NULL,
  `Fecha` datetime NOT NULL,
  `Reseña` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_series`
--

CREATE TABLE `usuario_series` (
  `Id` int(11) NOT NULL,
  `Usuario` int(11) DEFAULT NULL,
  `Serie` int(11) DEFAULT NULL,
  `Calificacion` float DEFAULT NULL,
  `Fecha` datetime NOT NULL,
  `Reseña` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_series`
--

INSERT INTO `usuario_series` (`Id`, `Usuario`, `Serie`, `Calificacion`, `Fecha`, `Reseña`) VALUES
(1, 2, 1, 3.5, '2024-11-03 22:27:15', 'buena serie con un buen comienzo, no me gusto el final de temporada'),
(2, 2, 1, 3.5, '2024-11-06 00:55:49', 'buena serie con un buen comienzo, no me gusto el final de temporada'),
(3, 12, 1, 2, '2024-11-06 01:34:03', 'no');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistaseriescompleta`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistaseriescompleta` (
`Titulo` varchar(50)
,`Actor_1` varchar(50)
,`Actor_2` varchar(50)
,`Estado` varchar(10)
,`Temporadas` int(11)
,`Capitulos` int(11)
,`Plataforma` varchar(50)
,`Categoria` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaseriescompleta`
--
DROP TABLE IF EXISTS `vistaseriescompleta`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistaseriescompleta`  AS SELECT `s`.`Titulo` AS `Titulo`, `s`.`Actor_1` AS `Actor_1`, `s`.`Actor_2` AS `Actor_2`, CASE WHEN `s`.`Finalizada` = 1 THEN 'Completa' ELSE 'Incompleta' END AS `Estado`, `s`.`Temporadas` AS `Temporadas`, `s`.`Capitulos` AS `Capitulos`, `p`.`Nombre` AS `Plataforma`, `c`.`Nombre` AS `Categoria` FROM ((`series` `s` join `plataforma` `p` on(`s`.`Plataforma` = `p`.`Id`)) join `categoria` `c` on(`s`.`Categoria` = `c`.`Id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Usuario` (`Usuario`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD KEY `Estado` (`Estado`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Categoria_Libros` (`Categoria`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Categoria_Peliculas` (`Categoria`),
  ADD KEY `FK_Plataforma_Peliculas` (`Plataforma`);

--
-- Indices de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Categoria_Series` (`Categoria`),
  ADD KEY `FK_Plataforma_Series` (`Plataforma`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Usuario` (`Usuario`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD KEY `Estado` (`Estado`);

--
-- Indices de la tabla `usuario_libros`
--
ALTER TABLE `usuario_libros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_IdUsuario_Libros` (`Usuario`),
  ADD KEY `FK_IdLibro` (`Libro`);

--
-- Indices de la tabla `usuario_peliculas`
--
ALTER TABLE `usuario_peliculas`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_IdUsuario_Pelicula` (`Usuario`),
  ADD KEY `FK_IdPelicula` (`Pelicula`);

--
-- Indices de la tabla `usuario_series`
--
ALTER TABLE `usuario_series`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_IdUsuario_Serie` (`Usuario`),
  ADD KEY `FK_IdSerie` (`Serie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `series`
--
ALTER TABLE `series`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuario_libros`
--
ALTER TABLE `usuario_libros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario_peliculas`
--
ALTER TABLE `usuario_peliculas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario_series`
--
ALTER TABLE `usuario_series`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`Estado`) REFERENCES `estado_usuario` (`Id`);

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `FK_Categoria_Libros` FOREIGN KEY (`Categoria`) REFERENCES `categoria` (`Id`);

--
-- Filtros para la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD CONSTRAINT `FK_Categoria_Peliculas` FOREIGN KEY (`Categoria`) REFERENCES `categoria` (`Id`),
  ADD CONSTRAINT `FK_Plataforma_Peliculas` FOREIGN KEY (`Plataforma`) REFERENCES `plataforma` (`Id`);

--
-- Filtros para la tabla `series`
--
ALTER TABLE `series`
  ADD CONSTRAINT `FK_Categoria_Series` FOREIGN KEY (`Categoria`) REFERENCES `categoria` (`Id`),
  ADD CONSTRAINT `FK_Plataforma_Series` FOREIGN KEY (`Plataforma`) REFERENCES `plataforma` (`Id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Estado`) REFERENCES `estado_usuario` (`Id`);

--
-- Filtros para la tabla `usuario_libros`
--
ALTER TABLE `usuario_libros`
  ADD CONSTRAINT `FK_IdLibro` FOREIGN KEY (`Libro`) REFERENCES `libros` (`Id`),
  ADD CONSTRAINT `FK_IdUsuario_Libros` FOREIGN KEY (`Usuario`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `usuario_peliculas`
--
ALTER TABLE `usuario_peliculas`
  ADD CONSTRAINT `FK_IdPelicula` FOREIGN KEY (`Pelicula`) REFERENCES `peliculas` (`Id`),
  ADD CONSTRAINT `FK_IdUsuario_Pelicula` FOREIGN KEY (`Usuario`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `usuario_series`
--
ALTER TABLE `usuario_series`
  ADD CONSTRAINT `FK_IdSerie` FOREIGN KEY (`Serie`) REFERENCES `series` (`Id`),
  ADD CONSTRAINT `FK_IdUsuario_Serie` FOREIGN KEY (`Usuario`) REFERENCES `usuario` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
