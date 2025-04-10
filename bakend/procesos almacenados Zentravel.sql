use zentravel;
-- procesos

DELIMITER $$
CREATE PROCEDURE CrearUsuario(
    IN nombre VARCHAR(255),
    IN email VARCHAR(255),
    IN presupuesto DECIMAL(10, 2),
    IN telefono VARCHAR(15),
    IN estiloVida VARCHAR(255),
    IN password VARCHAR(255)
)
BEGIN
    INSERT INTO Usuario (nombre, email, presupuesto, telefono, estiloVida, password)
    VALUES (nombre, email, presupuesto, telefono, estiloVida, password);
END $$
DELIMITER ;

delimiter // 
create procedure loginUsuario(
	in email varchar(225)
)
begin
	select * from usuario where email = email;
end // 
delimiter ;

delimiter //
create procedure CrearReserva(
	in id_usuario int,
    in fecha date,
    in estado varchar(50),
    in id_paquete int
)
begin 
	insert into reservas(id_usuario,fecha,estado,id_paquete) value(id_usuario,fecha,estado,id_paquete);
end //
delimiter ;

drop procedure CrearReserva;
call CrearReserva(1,"2025-04-05","confirmada",1);

INSERT INTO reservas(id_usuario, fecha, estado, id_paquete)
VALUES (1, '2025-04-05', 'confirmada', 1);


SELECT * FROM reservas;

select * from usuario;


select * from reservas inner join usuario on reservas.id_usuario = usuario.id_usuario ;

-- En tabla Usuario
SHOW COLUMNS FROM Usuario;

-- En tabla RESERVAS
SHOW COLUMNS FROM RESERVAS;



DELIMITER //
CREATE PROCEDURE actualizar_contraseña(IN p_email VARCHAR(100), IN p_password VARCHAR(255))
BEGIN
  UPDATE usuario SET password = p_password WHERE email = p_email;
END //
DELIMITER ;

drop procedure actualizar_contraseña;





