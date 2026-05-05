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
});
