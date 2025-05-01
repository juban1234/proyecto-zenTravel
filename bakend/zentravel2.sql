

-- Configuración inicial
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Charset y collation
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos
CREATE DATABASE IF NOT EXISTS zentravel;
USE zentravel;

-- Procedimientos
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_contraseña` (IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255))
BEGIN
  UPDATE usuario SET password = p_password WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearReserva` (IN `id_usuario` INT, IN `fecha` DATE, IN `estado` VARCHAR(50), IN `id_paquete` INT)
BEGIN
  INSERT INTO reservas(id_usuario,fecha,estado,id_paquete) VALUES (id_usuario,fecha,estado,id_paquete);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearUsuario` (
    IN `nombre` VARCHAR(255),
    IN `email` VARCHAR(255),
    IN `telefono` VARCHAR(15),
    IN `password` VARCHAR(255),
    IN `rol` ENUM('cliente','proveedor','admin'))
BEGIN
    INSERT INTO Usuario (nombre, email, telefono, password, rol)
    VALUES (nombre, email, telefono, password, rol);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarPaquetes` ()
BEGIN
    SELECT id_paquete, nombrePaquete, precioTotal, duracionDias, imagenUrl, descuento
    FROM paquete
    WHERE estado = 'activo';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `loginUsuario` (IN `p_email` VARCHAR(225))
BEGIN
    SELECT * FROM usuario WHERE email = p_email;
END$$

DELIMITER ;

-- Tablas

CREATE TABLE `usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `telefono` VARCHAR(30) DEFAULT NULL,
  `estiloVida` VARCHAR(100) DEFAULT NULL,
  `password` VARCHAR(60) NOT NULL,
  `rol` ENUM('cliente','proveedor','admin') NOT NULL DEFAULT 'cliente',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `destinos` (
  `id_destino` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(200) DEFAULT NULL,
  `pais` VARCHAR(200) DEFAULT NULL,
  `direccion` VARCHAR(200) DEFAULT NULL,
  `descripcion` TEXT DEFAULT NULL,
  PRIMARY KEY (`id_destino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `hotel` (
  `id_alojamiento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `ubicacion` VARCHAR(100) DEFAULT NULL,
  `precio` DECIMAL(10,2) DEFAULT NULL,
  `imagenes` VARCHAR(250) DEFAULT NULL,
  PRIMARY KEY (`id_alojamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paquete` (
  `id_paquete` INT NOT NULL AUTO_INCREMENT,
  `nombrePaquete` VARCHAR(100) DEFAULT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `precioTotal` DECIMAL(10,2) DEFAULT NULL,
  `imagenUrl` VARCHAR(255) DEFAULT NULL,
  `duracionDias` INT DEFAULT NULL,
  `fechaInicioDisponible` DATE DEFAULT NULL,
  `fechaFinDisponible` DATE DEFAULT NULL,
  `estado` ENUM('activo','inactivo') DEFAULT 'activo',
  `descuento` DECIMAL(5,2) DEFAULT 0.00,
  PRIMARY KEY (`id_paquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reservas` (
  `id_reservas` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE DEFAULT NULL,
  `estado` VARCHAR(50) DEFAULT NULL,
  `id_usuario` INT DEFAULT NULL,
  `id_paquete` INT DEFAULT NULL,
  PRIMARY KEY (`id_reservas`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuario(`id_usuario`),
  FOREIGN KEY (`id_paquete`) REFERENCES paquete(`id_paquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pago` (
  `id_pago` INT NOT NULL AUTO_INCREMENT,
  `id_reserva` INT DEFAULT NULL,
  `monto` DECIMAL(10,2) DEFAULT NULL,
  `metodoPago` VARCHAR(50) DEFAULT NULL,
  `fecha` DATE DEFAULT NULL,
  `estado` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  FOREIGN KEY (`id_reserva`) REFERENCES reservas(`id_reservas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paquete_destino` (
  `id_paquete` INT NOT NULL,
  `id_destino` INT NOT NULL,
  PRIMARY KEY (`id_paquete`, `id_destino`),
  FOREIGN KEY (`id_paquete`) REFERENCES paquete(`id_paquete`),
  FOREIGN KEY (`id_destino`) REFERENCES destinos(`id_destino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paquete_hotel` (
  `id_paquete` INT NOT NULL,
  `id_hotel` INT NOT NULL,
  PRIMARY KEY (`id_paquete`, `id_hotel`),
  FOREIGN KEY (`id_paquete`) REFERENCES paquete(`id_paquete`),
  FOREIGN KEY (`id_hotel`) REFERENCES hotel(`id_alojamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transporte` (
  `id_transporte` INT NOT NULL AUTO_INCREMENT,
  `tipoTransporte` VARCHAR(50) DEFAULT NULL,
  `empresa` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id_transporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paquete_transporte` (
  `id_paquete` INT NOT NULL,
  `id_transporte` INT NOT NULL,
  PRIMARY KEY (`id_paquete`, `id_transporte`),
  FOREIGN KEY (`id_paquete`) REFERENCES paquete(`id_paquete`),
  FOREIGN KEY (`id_transporte`) REFERENCES transporte(`id_transporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sugerencia` (
  `id_sugerencia` INT NOT NULL AUTO_INCREMENT,
  `descripcion` TEXT DEFAULT NULL,
  `id_usuario` INT DEFAULT NULL,
  `presupuestol` DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_sugerencia`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuario(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Aquí podrías añadir los INSERT si los necesitas

COMMIT;
