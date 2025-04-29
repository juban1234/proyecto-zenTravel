import axios from "axios";

// URL base del servidor

const API_URL = "http://localhost:20101/Auth";


export const registerUser = async (
  nombre,
  email,
  telefono,
  estiloVida,
  password ) => {
    
  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombre,
      email,
      telefono,
      estiloVida,
      password
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
    
    return response.data.message;
  } catch (error) {
    console.error("Error en el login:", error);
    throw new Error(error.response?.data?.message || "Credenciales incorrectas");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};