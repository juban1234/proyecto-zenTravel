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


