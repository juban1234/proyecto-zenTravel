import { useState } from "react";
import { loginUser } from "../../api/api"; 

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      setMensaje(data.message);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setMensaje(error.message);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="mt-6">
          <div>
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
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">{mensaje}</p>

      </div>
    </div>
  );
};

