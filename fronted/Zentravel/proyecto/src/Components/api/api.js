import axios from "axios";

// URL base del servidor
const API_URL = "http://localhost:10101";

// Función para registrar un usuario
export const registerUser = async (
  nombre,
  email,
  presupuesto,
  telefono,
  estiloVida,
  password ) => {
    
  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombre,
      email,
      presupuesto,
      telefono,
      estiloVida,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error(error.response?.data?.message || "Error en el servidor");
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw new Error(error.response?.data?.message || "Credenciales incorrectas");
  }
};
