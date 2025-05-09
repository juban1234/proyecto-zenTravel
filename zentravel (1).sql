-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2025 a las 22:21:18
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearReserva` (IN `id_usuario` INT, IN `estado` VARCHAR(50), IN `cedula` VARCHAR(50), IN `id_paquete` INT)   begin 
	insert into reservas(id_usuario,estado,cedula,id_paquete) value(id_usuario,estado,cedula,id_paquete);
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearUsuario` (IN `nombre` VARCHAR(255), IN `email` VARCHAR(255), IN `telefono` VARCHAR(15), IN `password` VARCHAR(255), IN `rol` VARCHAR(10))   BEGIN
    INSERT INTO Usuario (nombre, email, telefono, password,rol)
    VALUES (nombre, email, telefono, password,rol);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_paquete_con_nombres` (IN `p_id_usuario` INT, IN `p_nombrePaquete` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_precioTotal` DECIMAL(10,2), IN `p_imagenUrl` VARCHAR(255), IN `p_duracionDias` INT, IN `p_fechaInicioDisponible` DATE, IN `p_fechaFinDisponible` DATE, IN `p_descuento` DECIMAL(5,2), IN `p_nombreHotel` VARCHAR(100), IN `p_nombreTransporte` VARCHAR(100), IN `p_nombreDestino` VARCHAR(200))   BEGIN
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

    -- Verificar si los IDs se encontraron
    IF v_id_hotel IS NULL OR v_id_transporte IS NULL OR v_id_destino IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Uno o más de los elementos no existen en la base de datos.';
    ELSE
        -- ✅ Insertar paquete incluyendo id_usuario
        INSERT INTO PAQUETE (
            id_usuario, nombrePaquete, descripcion, precioTotal, imagenUrl,
            duracionDias, fechaInicioDisponible, fechaFinDisponible, descuento,
            id_hotel, id_transporte, id_destino
        )
        VALUES (
            p_id_usuario, p_nombrePaquete, p_descripcion, p_precioTotal, p_imagenUrl,
            p_duracionDias, p_fechaInicioDisponible, p_fechaFinDisponible, p_descuento,
            v_id_hotel, v_id_transporte, v_id_destino
        );

        -- Devolver ID del paquete creado
        SELECT LAST_INSERT_ID() AS id_paquete_creado;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarPaquetes` (IN `id_usuario` INT)   BEGIN
    SELECT 
        id_paquete,
        nombrePaquete,
        precioTotal,
        duracionDias,
        imagenUrl,
        descuento
    FROM paquete
    WHERE id_usuario = id_usuario;
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
  `pais` varchar(200) DEFAULT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `Nombre` varchar(200) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id_destino`, `pais`, `departamento`, `Nombre`, `descripcion`) VALUES
(3, 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Cartagena', 'Cartagena es una ciudad costera famosa por sus playas doradas y su arquitectura colonial que conserva un aire histórico, con calles empedradas y coloridas casas coloniales. Es uno de los destinos más visitados de Colombia.'),
(4, 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Medellín', 'Medellín, conocida como la ciudad de la eterna primavera, es famosa por su clima templado, su desarrollo urbano y su cultura vibrante. La ciudad se caracteriza por su innovadora infraestructura y su vida nocturna dinámica.'),
(5, 'Colombia', 'La Candelaria, Bogotá, Cundinamarca', 'Bogotá', 'Bogotá es la capital cultural y política de Colombia, ubicada en el centro del país. Ofrece una mezcla de historia, arte y cultura, con museos de renombre como el Museo del Oro y el Museo Botero. Su altitud proporciona vistas espectaculares.'),
(6, 'Colombia', 'Avenida Sexta, Cali, Valle del Cauca', 'Cali', 'Cali es la salsa capital del mundo, famosa por su vibrante música y su vida nocturna llena de movimiento. La ciudad también es conocida por su gastronomía y la calidez de su gente.'),
(7, 'Colombia', 'Centro histórico, Santa Marta, Magdalena', 'Santa Marta', 'Santa Marta es un puerto histórico y uno de los destinos de playa más famosos en la región caribeña. Además de sus playas, es el punto de entrada al Parque Nacional Natural Tayrona, que ofrece naturaleza exuberante.'),
(8, 'Colombia', 'Avenida 38, Barranquilla, Atlántico', 'Barranquilla', 'Barranquilla es conocida por su carnaval, uno de los más grandes y famosos de América Latina. La ciudad también es un importante centro comercial y cultural en la región Caribe de Colombia.'),
(9, 'Colombia', 'Isla San Andrés, Archipiélago de San Andrés, Providencia y Santa Catalina', 'San Andrés', 'San Andrés es un paraíso tropical ubicado en el mar Caribe, famoso por sus aguas cristalinas y playas de arena blanca. La isla es conocida por sus deportes acuáticos y su cultura caribeña.'),
(10, 'Colombia', 'Quindío, Risaralda y Caldas', 'Eje cafetero', 'El Eje cafetero es una región montañosa que abarca los departamentos de Quindío, Risaralda y Caldas, famosa por sus plantaciones de café. Aquí se puede disfrutar de paisajes hermosos, pueblos pintorescos y la cultura del café.'),
(11, 'Colombia', 'Centro histórico, Popayán, Cauca', 'Popayán', 'Popayán, conocida como la ciudad blanca, es famosa por su bien conservada arquitectura colonial. La ciudad es un importante centro religioso y cultural, y alberga una de las procesiones de Semana Santa más importantes de Colombia.'),
(12, 'Colombia', 'Centro histórico, Villa de Leyva, Boyacá', 'Villa de Leyva', 'Villa de Leyva es un pequeño pueblo colonial lleno de encanto, con calles empedradas y casas de época. Es un destino turístico popular por su arquitectura, su cercanía al Parque Arqueológico de Monquirá y su ambiente tranquilo.'),
(13, 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Cartagena', 'Famosa por sus playas y arquitectura colonial.'),
(14, 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Medellín', 'Conocida como la ciudad de la eterna primavera.'),
(15, 'Colombia', 'Centro histórico, Cartagena, Bolívar', 'Cartagena', 'Famosa por sus playas y arquitectura colonial.'),
(16, 'Colombia', 'Avenida El Poblado, Medellín, Antioquia', 'Medellín', 'Conocida como la ciudad de la eterna primavera.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id_hotel` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `tipo_habitacion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagenes` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_hotel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id_hotel`, `nombre`, `descripcion`, `ubicacion`, `tipo_habitacion`, `precio`, `imagenes`) VALUES
(1, 'Hotel Colonial Cartagena', 'Hotel en el corazón del centro histórico.', 'Centro histórico, Cartagena, Bolívar', NULL, 150.00, NULL),
(2, 'Hotel Primavera Medellín', 'Hotel moderno en El Poblado.', 'Avenida El Poblado, Medellín, Antioquia', NULL, 120.00, NULL),
(3, 'Hotel Colonial Cartagena', 'Hotel en el corazón del centro histórico.', 'Centro histórico, Cartagena, Bolívar', NULL, 150.00, NULL),
(4, 'Hotel Primavera Medellín', 'Hotel moderno en El Poblado.', 'Avenida El Poblado, Medellín, Antioquia', NULL, 120.00, NULL);

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
  `id_usuario` int(11) DEFAULT NULL,
  `id_paquete` int(11) NOT NULL,
  `nombrePaquete` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precioTotal` decimal(10,2) DEFAULT NULL,
  `imagenUrl` varchar(255) DEFAULT 'no hay imagen',
  `duracionDias` int(11) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `id_hotel` int(11) DEFAULT NULL,
  `id_transporte` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_paquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id_usuario`, `id_paquete`, `nombrePaquete`, `descripcion`, `precioTotal`, `imagenUrl`, `duracionDias`, `fechaInicio`, `descuento`, `id_hotel`, `id_transporte`, `id_destino`) VALUES
(2, 1, 'Paquete Vacaciones', 'Paquete completo de vacaciones', 500.00, 'https://example.com/imagen.jpg', 7, '2025-05-31', 10.00, 1, 1, 3),
(NULL, 2, 'Paquete Aventura', 'Excursión extrema de montaña', 300.00, 'https://example.com/aventura.jpg', 5, '2025-05-20', 5.00, NULL, NULL, NULL),
(NULL, 3, 'Paquete Relax', 'Relajación en la playa con spa', 450.00, 'https://example.com/relax.jpg', 7, '2025-06-01', 7.50, NULL, NULL, NULL),
(NULL, 4, 'Paquete Cultural', 'Visitas a museos y sitios históricos', 350.00, 'https://example.com/cultural.jpg', 4, '2025-06-10', 0.00, NULL, NULL, NULL),
(NULL, 5, 'Paquete Aventura', 'Excursión extrema de montaña', 300.00, 'https://example.com/aventura.jpg', 5, '2025-05-20', 5.00, NULL, NULL, NULL),
(NULL, 6, 'Paquete Relax', 'Relajación en la playa con spa', 450.00, 'https://example.com/relax.jpg', 7, '2025-06-01', 7.50, NULL, NULL, NULL),
(NULL, 7, 'Paquete Cultural', 'Visitas a museos y sitios históricos', 350.00, 'https://example.com/cultural.jpg', 4, '2025-06-14', 0.00, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reservas` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_paquete` int(11) DEFAULT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_reservas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reservas`, `fecha`, `estado`, `id_usuario`, `id_paquete`, `cedula`) VALUES
(11, '2025-05-01 00:00:00', 'cancelado', 1, 2, NULL),
(12, '2025-05-03 00:00:00', 'disponible', 2, 1, NULL),
(13, '2025-05-05 00:00:00', 'cancelada', 3, 3, NULL),
(14, '2025-05-06 00:00:00', 'pendiente', 1, 1, NULL),
(15, '2025-05-07 00:00:00', 'confirmada', 1, 3, NULL),
(16, '2025-05-01 10:00:00', 'pendiente', 1, 2, NULL),
(17, '2025-05-03 11:30:00', 'confirmada', 2, 1, NULL),
(18, '2025-05-05 14:00:00', 'cancelada', 3, 3, NULL),
(19, '2025-05-06 09:00:00', 'pendiente', 1, 1, NULL),
(20, '2025-05-07 08:45:00', 'confirmada', 1, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_atencion`
--

CREATE TABLE `solicitudes_atencion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes_atencion`
--

INSERT INTO `solicitudes_atencion` (`id`, `nombre`, `email`, `asunto`, `mensaje`, `fecha`) VALUES
(1, 'Juan Pérez', 'juan@example.com', 'Problema con la cuenta', 'No puedo acceder a mi cuenta.', '2025-05-06 13:07:19');

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
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('cliente','vendedor','admin','soporte') DEFAULT 'cliente',
  `refresh_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`, `telefono`, `password`, `rol`, `refresh_token`) VALUES
(1, 'juanito pepe', 'gjuanesteban413@gmail.com', '3172398182', '$2b$10$M0lr/UoqLwTcilShiPAJv.G87gMkOwK3b/6nzHBSTq/dEBoIxaxB2', 'cliente', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2wiOiJjbGllbnRlIn0sImlhdCI6MTc0NjczMDY0NywiZXhwIjoxNzQ3MzM1NDQ3fQ.JxdMnaCTpvePF7RbLOC4E3rRZvZsD3MJ_ngtssPb2Tw');

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
set foreign_key_checks = 0;

ALTER TABLE `paquete`
  ADD CONSTRAINT `fk_paquete_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reservas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `fk_reservas_paquete` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`);
 
 set foreign_key_checks = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
