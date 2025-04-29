-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2025 a las 02:31:12
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
-- Base de datos: `zentravel`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_contraseña` (IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255))   BEGIN
  UPDATE usuario SET password = p_password WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearReserva` (IN `id_usuario` INT, IN `fecha` DATE, IN `estado` VARCHAR(50), IN `id_paquete` INT)   begin 
	insert into reservas(id_usuario,fecha,estado,id_paquete) value(id_usuario,fecha,estado,id_paquete);
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearUsuario` (IN `nombre` VARCHAR(255), IN `email` VARCHAR(255), IN `telefono` VARCHAR(15), IN `password` VARCHAR(255), IN `rol` ENUM('cliente','proveedor','admin'))   BEGIN
    INSERT INTO Usuario (nombre, email, telefono, password,rol)
    VALUES (nombre, email, telefono, password,rol);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarPaquetes` ()   BEGIN
    SELECT 
        id_paquete,
        nombrePaquete,
        precioTotal,
        duracionDias,
        imagenUrl,
        descuento
    FROM paquete
    WHERE estado = 'activo';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `loginUsuario` (IN `p_email` VARCHAR(225))   BEGIN
    SELECT * FROM usuario WHERE email = p_email;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destino`
--

CREATE TABLE `destino` (
  `id_destino` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destino`
--

INSERT INTO `destino` (`id_destino`, `nombre`, `direccion`, `descripcion`) VALUES
(1, 'paquistan', 'armenia', 'es un lugar colotido'),
(2, 'villa nueva', 'calarca ', 'es una villa en calarca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id_hotel` int(11) NOT NULL,
  `nombreHotel` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id_hotel`, `nombreHotel`, `descripcion`) VALUES
(1, 'wonjd', 'ccecec');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `metodoPago` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `id_paquete` int(11) NOT NULL,
  `nombrePaquete` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  `imagenUrl` varchar(255) DEFAULT NULL COMMENT 'URL de imagen de portada del paquete',
  `duracionDias` int(11) DEFAULT NULL COMMENT 'Duración en días del paquete',
  `fechaInicioDisponible` date DEFAULT NULL COMMENT 'Desde qué fecha se puede reservar',
  `fechaFinDisponible` date DEFAULT NULL COMMENT 'Hasta qué fecha se puede reservar',
  `estado` enum('activo','inactivo') DEFAULT 'activo' COMMENT 'Estado del paquete',
  `descuento` decimal(5,2) DEFAULT 0.00 COMMENT 'Porcentaje de descuento aplicado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id_paquete`, `nombrePaquete`, `descripcion`, `precioTotal`, `imagenUrl`, `duracionDias`, `fechaInicioDisponible`, `fechaFinDisponible`, `estado`, `descuento`) VALUES
(1, 'pepe', 'eded', 121313.00, NULL, NULL, NULL, NULL, 'activo', 0.00),
(2, 'Prueba', 'Desc', 0.00, NULL, NULL, NULL, NULL, 'activo', 0.00),
(3, 'Prueba', 'Desc', 0.00, NULL, NULL, NULL, NULL, 'activo', 0.00),
(999, 'Prueba', 'Desc', 0.00, NULL, NULL, NULL, NULL, 'activo', 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_destino`
--

CREATE TABLE `paquete_destino` (
  `id_paquete` int(11) NOT NULL,
  `id_destino` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_hotel`
--

CREATE TABLE `paquete_hotel` (
  `id_paquete` int(11) NOT NULL,
  `id_hotel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete_hotel`
--

INSERT INTO `paquete_hotel` (`id_paquete`, `id_hotel`) VALUES
(999, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_transporte`
--

CREATE TABLE `paquete_transporte` (
  `id_paquete` int(11) NOT NULL,
  `id_transporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sugerencia`
--

CREATE TABLE `sugerencia` (
  `id_sugerencia` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `presupuestol` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id_transporte` int(11) NOT NULL,
  `tipoTransporte` varchar(50) DEFAULT NULL,
  `empresa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id_transporte`, `tipoTransporte`, `empresa`) VALUES
(1, 'acuatico', 'arbales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `estiloVida` varchar(100) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `rol` enum('cliente','proveedor','admin') NOT NULL DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`, `telefono`, `estiloVida`, `password`, `rol`) VALUES
(24, '1', 'gjuanesteban413@gmail.com', '201234567', 'Activo', '$2b$10$q6puD.iJyr218eXu6pzEeeCkSGHar3b1VrJpLZYNkmvYoMVAvXR8S', 'cliente'),
(26, 'Juan Pérez', 'alexzo8677@gmail.com', '3111234567', NULL, '$2b$10$VR1FASdKG.1NadiJRkSJQujXlyu2p85D2/5MNvYrFVQXkH1uvliRe', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `destino`
--
ALTER TABLE `destino`
  ADD PRIMARY KEY (`id_destino`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id_hotel`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`id_paquete`);

--
-- Indices de la tabla `paquete_destino`
--
ALTER TABLE `paquete_destino`
  ADD PRIMARY KEY (`id_paquete`,`id_destino`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `paquete_hotel`
--
ALTER TABLE `paquete_hotel`
  ADD PRIMARY KEY (`id_paquete`,`id_hotel`),
  ADD KEY `id_hotel` (`id_hotel`);

--
-- Indices de la tabla `paquete_transporte`
--
ALTER TABLE `paquete_transporte`
  ADD PRIMARY KEY (`id_paquete`,`id_transporte`),
  ADD KEY `id_transporte` (`id_transporte`);

--
-- Indices de la tabla `sugerencia`
--
ALTER TABLE `sugerencia`
  ADD PRIMARY KEY (`id_sugerencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id_transporte`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `destino`
--
ALTER TABLE `destino`
  MODIFY `id_destino` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id_hotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sugerencia`
--
ALTER TABLE `sugerencia`
  MODIFY `id_sugerencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id_transporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reservas`);

--
-- Filtros para la tabla `paquete_destino`
--
ALTER TABLE `paquete_destino`
  ADD CONSTRAINT `fk_paquete_destino_paquete` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`) ON DELETE CASCADE,
  ADD CONSTRAINT `paquete_destino_ibfk_2` FOREIGN KEY (`id_destino`) REFERENCES `destino` (`id_destino`);

--
-- Filtros para la tabla `paquete_hotel`
--
ALTER TABLE `paquete_hotel`
  ADD CONSTRAINT `paquete_hotel_ibfk_2` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id_hotel`);

--
-- Filtros para la tabla `paquete_transporte`
--
ALTER TABLE `paquete_transporte`
  ADD CONSTRAINT `fk_paquete_transporte_paquete` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`) ON DELETE CASCADE,
  ADD CONSTRAINT `paquete_transporte_ibfk_2` FOREIGN KEY (`id_transporte`) REFERENCES `transporte` (`id_transporte`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
