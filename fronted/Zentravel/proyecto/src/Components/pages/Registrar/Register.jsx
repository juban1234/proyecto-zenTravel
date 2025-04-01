import { useState } from "react";
import { registerUser } from "../../api/api"; // Importamos la función de conexión

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [presupuesto, setPresupuesto] = useState(0);
  const [telefono , setTelefono] = useState("");
  const [estiloVida, setEstilovida] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(nombre, email,presupuesto,telefono,estiloVida, password);
      setMensaje(data.message);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Registro</h2>

        <form onSubmit={handleRegister} className="mt-6">
          <div>
            <label className="block text-gray-600">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">estilo de vida</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="como vives"
              value={estiloVida}
              onChange={(e) => setEstilovida(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">telefono</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600">presupuesto</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="cual es tu presupuesto"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">{mensaje}</p>
      </div>
    </div>
  );
};
