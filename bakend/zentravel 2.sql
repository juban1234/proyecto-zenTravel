-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2025 a las 19:15:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_paquete_con_nombres` (IN `p_nombrePaquete` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_precioTotal` DECIMAL(10,2), IN `p_imagenUrl` VARCHAR(255), IN `p_duracionDias` INT, IN `p_fechaInicioDisponible` DATE, IN `p_fechaFinDisponible` DATE, IN `p_descuento` DECIMAL(5,2), IN `p_nombreHotel` VARCHAR(100), IN `p_nombreTransporte` VARCHAR(100), IN `p_nombreDestino` VARCHAR(200))   BEGIN
    DECLARE v_id_hotel INT;
    DECLARE v_id_transporte INT;
    DECLARE v_id_destino INT;

    -- Obtener el id del hotel por su nombre
    SELECT id_hotel INTO v_id_hotel
    FROM HOTEL
    WHERE nombre = p_nombreHotel
    LIMIT 1;

    -- Obtener el id del transporte por su nombre
    SELECT id_transporte INTO v_id_transporte
    FROM TRANSPORTE
    WHERE empresa = p_nombreTransporte
    LIMIT 1;

    -- Obtener el id del destino por su nombre
    SELECT id_destino INTO v_id_destino
    FROM DESTINOS
    WHERE nombre = p_nombreDestino
    LIMIT 1;

    -- Verificar si los IDs se encontraron (de lo contrario, se detiene el proceso)
    IF v_id_hotel IS NULL OR v_id_transporte IS NULL OR v_id_destino IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Uno o más de los elementos no existen en la base de datos.';
    ELSE
        -- Crear el paquete en la tabla PAQUETE con los IDs encontrados
        INSERT INTO PAQUETE (nombrePaquete, descripcion, precioTotal, imagenUrl, duracionDias, fechaInicioDisponible, fechaFinDisponible, descuento, id_hotel, id_transporte, id_destino)
        VALUES (p_nombrePaquete, p_descripcion, p_precioTotal, p_imagenUrl, p_duracionDias, p_fechaInicioDisponible, p_fechaFinDisponible, p_descuento, v_id_hotel, v_id_transporte, v_id_destino);

        -- Devolver el ID del paquete creado
        SELECT LAST_INSERT_ID() AS id_paquete_creado;
    END IF;

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
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id_destino` int(11) NOT NULL,
  `Nombre` varchar(200) DEFAULT NULL,
  `pais` varchar(200) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id_destino`, `Nombre`, `pais`, `direccion`, `descripcion`) VALUES
(3, 'Cartagena', 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Cartagena es una ciudad costera famosa por sus playas doradas y su arquitectura colonial que conserva un aire histórico, con calles empedradas y coloridas casas coloniales. Es uno de los destinos más visitados de Colombia.'),
(4, 'Medellín', 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Medellín, conocida como la ciudad de la eterna primavera, es famosa por su clima templado, su desarrollo urbano y su cultura vibrante. La ciudad se caracteriza por su innovadora infraestructura y su vida nocturna dinámica.'),
(5, 'Bogotá', 'Colombia', 'La Candelaria, Bogotá, Cundinamarca', 'Bogotá es la capital cultural y política de Colombia, ubicada en el centro del país. Ofrece una mezcla de historia, arte y cultura, con museos de renombre como el Museo del Oro y el Museo Botero. Su altitud proporciona vistas espectaculares.'),
(6, 'Cali', 'Colombia', 'Avenida Sexta, Cali, Valle del Cauca', 'Cali es la salsa capital del mundo, famosa por su vibrante música y su vida nocturna llena de movimiento. La ciudad también es conocida por su gastronomía y la calidez de su gente.'),
(7, 'Santa Marta', 'Colombia', 'Centro histórico, Santa Marta, Magdalena', 'Santa Marta es un puerto histórico y uno de los destinos de playa más famosos en la región caribeña. Además de sus playas, es el punto de entrada al Parque Nacional Natural Tayrona, que ofrece naturaleza exuberante.'),
(8, 'Barranquilla', 'Colombia', 'Avenida 38, Barranquilla, Atlántico', 'Barranquilla es conocida por su carnaval, uno de los más grandes y famosos de América Latina. La ciudad también es un importante centro comercial y cultural en la región Caribe de Colombia.'),
(9, 'San Andrés', 'Colombia', 'Isla San Andrés, Archipiélago de San Andrés, Providencia y Santa Catalina', 'San Andrés es un paraíso tropical ubicado en el mar Caribe, famoso por sus aguas cristalinas y playas de arena blanca. La isla es conocida por sus deportes acuáticos y su cultura caribeña.'),
(10, 'Eje cafetero', 'Colombia', 'Quindío, Risaralda y Caldas', 'El Eje cafetero es una región montañosa que abarca los departamentos de Quindío, Risaralda y Caldas, famosa por sus plantaciones de café. Aquí se puede disfrutar de paisajes hermosos, pueblos pintorescos y la cultura del café.'),
(11, 'Popayán', 'Colombia', 'Centro histórico, Popayán, Cauca', 'Popayán, conocida como la ciudad blanca, es famosa por su bien conservada arquitectura colonial. La ciudad es un importante centro religioso y cultural, y alberga una de las procesiones de Semana Santa más importantes de Colombia.'),
(12, 'Villa de Leyva', 'Colombia', 'Centro histórico, Villa de Leyva, Boyacá', 'Villa de Leyva es un pequeño pueblo colonial lleno de encanto, con calles empedradas y casas de época. Es un destino turístico popular por su arquitectura, su cercanía al Parque Arqueológico de Monquirá y su ambiente tranquilo.'),
(13, 'Cartagena', 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Famosa por sus playas y arquitectura colonial.'),
(14, 'Medellín', 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Conocida como la ciudad de la eterna primavera.'),
(15, 'Cartagena', 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Famosa por sus playas y arquitectura colonial.'),
(16, 'Medellín', 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Conocida como la ciudad de la eterna primavera.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id_hotel` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagenes` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id_hotel`, `nombre`, `descripcion`, `ubicacion`, `precio`, `imagenes`) VALUES
(1, 'Hotel Colonial Cartagena', 'Hotel en el corazón del centro histórico.', 'Centro histórico, Cartagena, Bolívar', 150.00, NULL),
(2, 'Hotel Primavera Medellín', 'Hotel moderno en El Poblado.', 'Avenida El Poblado, Medellín, Antioquia', 120.00, NULL),
(3, 'Hotel Colonial Cartagena', 'Hotel en el corazón del centro histórico.', 'Centro histórico, Cartagena, Bolívar', 150.00, NULL),
(4, 'Hotel Primavera Medellín', 'Hotel moderno en El Poblado.', 'Avenida El Poblado, Medellín, Antioquia', 120.00, NULL);

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
  `imagenUrl` varchar(255) DEFAULT NULL,
  `duracionDias` int(11) DEFAULT NULL,
  `fechaInicioDisponible` date DEFAULT NULL,
  `fechaFinDisponible` date DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `id_hotel` int(11) DEFAULT NULL,
  `id_transporte` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id_paquete`, `nombrePaquete`, `descripcion`, `precioTotal`, `imagenUrl`, `duracionDias`, `fechaInicioDisponible`, `fechaFinDisponible`, `descuento`, `id_hotel`, `id_transporte`, `id_destino`) VALUES
(1, 'Paquete Vacacional Cartagena', 'Disfruta de un paquete completo con hotel, transporte y destino en Cartagena.', 1200.00, 'http://link-de-imagen.com/imagen.jpg', 7, '2025-06-01', '2025-06-07', 10.00, 1, 1, 3),
(2, 'Paquete Caribe', 'Un viaje inolvidable al Caribe', 1200.00, 'null', 7, '2025-05-31', '2025-06-14', 10.00, 1, 1, 3),
(3, 'Paquete vacacional', 'Un viaje inolvidable ', 1200.00, 'null', 7, '2025-05-31', '2025-06-14', 10.00, 2, 1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reservas` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp,
  `cedula` varchar(65) default null, 
  `id_usuario` int(11) DEFAULT NULL,
  `id_paquete` int(11) DEFAULT NULL
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
  `tipo` varchar(50) NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `origen` varchar(100) NOT NULL,
  `destino` varchar(100) NOT NULL,
  `fecha_salida` datetime NOT NULL,
  `fecha_llegada` datetime NOT NULL,
  `duracion` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `clase` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id_transporte`, `tipo`, `empresa`, `origen`, `destino`, `fecha_salida`, `fecha_llegada`, `duracion`, `precio`, `capacidad`, `clase`) VALUES
(1, 'Avión', 'Avianca', 'Bogotá', 'Cartagena', '2025-05-15 08:00:00', '2025-05-15 09:30:00', '1h 30min', 250.00, 180, 'Económica'),
(2, 'Avión', 'LATAM', 'Medellín', 'San Andrés', '2025-05-16 10:30:00', '2025-05-16 12:40:00', '2h 10min', 400.00, 150, 'Ejecutiva'),
(3, 'Autobús', 'Copetran', 'Bogotá', 'Medellín', '2025-05-14 21:00:00', '2025-05-15 06:00:00', '9h', 100.00, 45, 'Económica'),
(4, 'Autobús', 'Expreso Brasilia', 'Cartagena', 'Santa Marta', '2025-05-18 07:00:00', '2025-05-18 11:00:00', '4h', 40.00, 50, 'Económica'),
(5, 'Autobús', 'Tren Turístico', 'Zipaquirá', 'Bogotá', '2025-05-20 09:00:00', '2025-05-20 10:20:00', '1h 20min', 30.00, 60, 'Turística'),
(6, 'Avión', 'SATENA', 'Cali', 'Popayán', '2025-05-17 12:00:00', '2025-05-17 12:45:00', '0h 45min', 150.00, 70, 'Económica'),
(7, 'Autobús', 'Bolivariano', 'Pereira', 'Manizales', '2025-05-13 15:30:00', '2025-05-13 17:30:00', '2h', 20.00, 40, 'Económica'),
(8, 'Avión', 'Avianca', 'Bogotá', 'San Andrés', '2025-05-19 11:00:00', '2025-05-19 13:00:00', '2h', 300.00, 180, 'Ejecutiva'),
(9, 'Autobús', 'Flota Magdalena', 'Neiva', 'Bogotá', '2025-05-15 20:00:00', '2025-05-16 03:00:00', '7h', 90.00, 50, 'Económica'),
(10, 'Autobús', 'Expreso', 'Armenia', 'Pijao', '2025-05-21 08:00:00', '2025-05-21 09:00:00', '1h', 25.00, 35, 'Turística'),
(11, 'Avión', 'Avianca', 'Bogotá', 'Cartagena', '2025-05-15 08:00:00', '2025-05-15 09:30:00', '1h 30min', 250.00, 180, 'Económica'),
(12, 'Autobús', 'Copetran', 'Bogotá', 'Medellín', '2025-05-14 21:00:00', '2025-05-15 06:00:00', '9h', 100.00, 45, 'Económica'),
(13, 'Avión', 'Avianca', 'Bogotá', 'Cartagena', '2025-05-15 08:00:00', '2025-05-15 09:30:00', '1h 30min', 250.00, 180, 'Económica'),
(14, 'Autobús', 'Copetran', 'Bogotá', 'Medellín', '2025-05-14 21:00:00', '2025-05-15 06:00:00', '9h', 100.00, 45, 'Económica');

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
  `rol` enum('cliente','vendedor','admin','soporte') DEFAULT 'cliente',
  `password` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`, `telefono`, `estiloVida`, `rol`, `password`) VALUES
(1, 'Juanito alimaña', 'juanito8676@gmail.com', '3111234567', NULL, 'cliente', '$2b$10$mg30RrllU/fJFkjFgvI3KOp8pBDjBRYVE/I6fRMzY1iGIKc761l8G');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `destinos`
--
ALTER TABLE `destinos`
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
  ADD PRIMARY KEY (`id_paquete`),
  ADD KEY `id_hotel` (`id_hotel`),
  ADD KEY `id_transporte` (`id_transporte`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reservas`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_paquete` (`id_paquete`);

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
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id_destino` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id_hotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `id_paquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reservas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sugerencia`
--
ALTER TABLE `sugerencia`
  MODIFY `id_sugerencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id_transporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD CONSTRAINT `paquete_ibfk_1` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id_hotel`),
  ADD CONSTRAINT `paquete_ibfk_2` FOREIGN KEY (`id_transporte`) REFERENCES `transporte` (`id_transporte`),
  ADD CONSTRAINT `paquete_ibfk_3` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
