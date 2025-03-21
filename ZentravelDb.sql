create database Zentravel;
use Zentravel;


create table Usuario(
id_usuario int auto_increment,
nombre varchar(50),
email varchar(100) unique ,
presupuesto decimal(10,2),
telefono varchar (30),
estiloVida Varchar (100),
primary key(id_usuario)
);

CREATE TABLE PAQUETE (
    id_paquete INT PRIMARY KEY AUTO_INCREMENT,
    nombrePaquete VARCHAR(100),
    descripcion TEXT,
    precioTotal DECIMAL(10,2)
);

CREATE TABLE Sugerencia (
    id_sugerencia INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

create table Hotel(
	id_hotel int auto_increment primary key,
	nombreHotel varchar(50),
    descripcion text
);

create table Transporte(
	id_transporte int auto_increment primary key,
    tipoTransporte varchar (50),
    empresa varchar (100)
);

CREATE TABLE DESTINO (
    id_destino INT PRIMARY KEY AUTO_INCREMENT,
    direccion VARCHAR(200),
    descripcion TEXT
);

CREATE TABLE RESERVAS (
    id_reservas INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    estado VARCHAR(50),
    id_usuario INT,
    id_paquete INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_paquete) REFERENCES PAQUETE(id_paquete)
);

-- Tabla Pago
CREATE TABLE PAGO (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_reserva INT,
    monto DECIMAL(10,2),
    metodoPago VARCHAR(50),
    fecha DATE,
    estado VARCHAR(50),
    FOREIGN KEY (id_reserva) REFERENCES RESERVAS(id_reservas)
);


CREATE TABLE PAQUETE_HOTEL (
    id_paquete INT,
    id_hotel INT,
    PRIMARY KEY (id_paquete, id_hotel),
    FOREIGN KEY (id_paquete) REFERENCES PAQUETE(id_paquete),
    FOREIGN KEY (id_hotel) REFERENCES HOTEL(id_hotel)
);

CREATE TABLE PAQUETE_TRANSPORTE (
    id_paquete INT,
    id_transporte INT,
    PRIMARY KEY (id_paquete, id_transporte),
    FOREIGN KEY (id_paquete) REFERENCES PAQUETE(id_paquete),
    FOREIGN KEY (id_transporte) REFERENCES TRANSPORTE(id_transporte)
);

CREATE TABLE PAQUETE_DESTINO (
    id_paquete INT,
    id_destino INT,
    PRIMARY KEY (id_paquete, id_destino),
    FOREIGN KEY (id_paquete) REFERENCES PAQUETE(id_paquete),
    FOREIGN KEY (id_destino) REFERENCES DESTINO(id_destino)
);







