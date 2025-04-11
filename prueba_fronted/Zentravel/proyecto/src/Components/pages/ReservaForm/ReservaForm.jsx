import React, { useState } from "react";
import { crearReserva } from "../../api/api"; // Asegúrate que este archivo exporte la función

const ReservaForm = () => {
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [idPaquete, setIdPaquete] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await crearReserva(fecha, estado, parseInt(idPaquete));
      setMensaje("✅ Reserva creada con éxito");
      console.log(resultado);
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Crear Reserva</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Paquete</label>
          <input
            type="number"
            value={idPaquete}
            onChange={(e) => setIdPaquete(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Reservar
        </button>
      </form>

      {mensaje && (
        <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
      )}
    </div>
  );
};

export default ReservaForm;
