import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const ENV = import.meta.env.MODE;

if (!API_BASE_URL && ENV === "development") {
  console.warn("⚠️ VITE_API_BASE_URL no está definido en tu .env");
}

if (ENV === "development") {
  console.warn(
    "%c🔧 Usando API Base URL:", 
    "color: #a855f7; font-weight: bold;", 
    API_BASE_URL || "relativo al dominio actual"
  );
}

export const api = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true,
  transformResponse: [
    (data) => {
      // Si la respuesta es un string (JSON crudo), buscamos números largos y les ponemos comillas
      if (typeof data === "string") {
        try {
          // Esta regex busca números de 16 o más dígitos que vengan después de un ":" 
          // y les pone comillas para que JSON.parse los trate como strings.
          const fixedData = data.replace(/:\s*(\d{16,})/g, ': "$1"');
          return JSON.parse(fixedData);
        } catch (e) {
          return data;
        }
      }
      return data;
    }
  ]
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    // Fallback: buscar el token dentro de user_info si no está en la raíz
    if (!token) {
      const userInfoStr = localStorage.getItem("user_info");
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo.token) {
            token = userInfo.token;
          }
        } catch (e) {}
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores (como 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("401 Unauthorized: El token es inválido o ha expirado.");
      localStorage.removeItem("token");
      localStorage.removeItem("user_info");
      sessionStorage.removeItem("token");
      
      // Redirigir al inicio
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
