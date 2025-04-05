import axios from "axios";

// URL base del servidor
const API_URL = "http://localhost:10101/";


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
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error(error.response?.data?.message || "Error en el servidor");
  }
};

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

export const crearReserva = async (fecha, estado, id_paquete) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${API_URL}/reserva`, {
      fecha,
      estado,
      id_paquete,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear reserva:", error);
    throw new Error(error.response?.data?.errorInfo || "Error al crear reserva");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};