-- trigger
use zentravel;

delimiter //
CREATE TRIGGER verificar_estado_reserva
BEFORE INSERT ON PAGO
FOR EACH ROW
BEGIN
    DECLARE reserva_estado VARCHAR(50);
    SELECT estado INTO reserva_estado FROM RESERVAS WHERE id_reservas = NEW.id_reserva;
    IF reserva_estado != 'confirmada' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede realizar el pago. La reserva no está confirmada.';
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER verificar_pago_reserva
AFTER INSERT ON pago
FOR EACH ROW
BEGIN
    DECLARE total_a_pagar DECIMAL(10,2);

    -- Obtener el precio total del paquete asociado a la reserva
    SELECT p.precioTotal INTO total_a_pagar
    FROM reservas r
    JOIN paquete p ON r.id_paquete = p.id_paquete
    WHERE r.id_reservas = NEW.id_reserva;

    -- Verificar si el pago cubre el total
    IF NEW.monto >= total_a_pagar THEN
        -- Actualizar estado de la reserva a "Pagado"
        UPDATE reservas
        SET estado = 'Pagado'
        WHERE id_reservas = NEW.id_reserva;
    ELSE
        -- Actualizar estado de la reserva a "Pendiente"
        UPDATE reservas
        SET estado = 'Pendiente'
        WHERE id_reservas = NEW.id_reserva;
    END IF;

END //

DELIMITER ;


INSERT INTO pago (id_pago, id_reserva, monto, metodoPago, fecha, estado)
VALUES (1, 10, 121313.00, 'Tarjeta', '2025-04-03', 'Confirmado');

INSERT INTO pago (id_pago, id_reserva, monto, metodoPago, fecha, estado)
VALUES (2, 10, 200.00, 'Efectivo', '2025-04-03', 'Pendiente');




