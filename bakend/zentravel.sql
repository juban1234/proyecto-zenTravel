-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2025 a las 22:48:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `presupuesto` decimal(10,2) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `estiloVida` varchar(100) DEFAULT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`, `presupuesto`, `telefono`, `estiloVida`, `password`) VALUES
(1, 'Juan', 'juan@example.com', 2000.00, '123456789', 'activo', '$2b$10$y3vvQAA604RKqCxZ/e2pse4PWYqz8eoB2bpSsjJB5srIiQejFHR4q'),
(2, 'miguel', 'juan@example1.com', 2000.00, '123456789', 'activo', '$2b$10$EGjYoYeraFqsfPg2PGNOYOWEBXoExVn4WlQn0hTgZglTlBeFvPkAq'),
(3, 'jose', 'juan@example2.com', 2000.00, '123456789', 'activo', '$2b$10$h/08xIvD5MVgjO.4CWQymezRYI4VWtZES1PvNokbH3oKCKVuPrzrW'),
(4, 'maria', 'juan@example3.com', 2000.00, '123456789', 'activo', '$2b$10$TxCVnSdKgOQrTxusS9/9ruOyisxPTtrmdTjzqW4vB7ipGWwYl3zn2'),
(5, 'pepe', 'adsopei@gmail.com', 1313131.00, 'ewr3r3r33', 'activo', '$2b$10$nySaUa3n3wCYudNh0cWeg.uDXyZOBcj2EUN526TXlOrK8G2xFkz2a'),
(6, 'miguel', 'adsope1i@gmail.com', 1313131.00, 'ewr3r3r33 ', 'activo ', '$2b$10$LAZrzm.HA5jDUhYqcAU.lu4I68snpgPZNK8vEYJr8eR4ClB1KN0T2'),
(8, 'miguel', 'adsope2i@gmail.com', 1313131.00, 'ewr3r3r33 ', 'activo ', '$2b$10$lwg79GqPJ6wMy2QNFMpbn.WEgzZNDLIyhnUlvUdcGBeglinzdIb9C');

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
