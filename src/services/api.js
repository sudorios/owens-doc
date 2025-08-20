import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ENV = process.env.REACT_APP_ENV;

if (!API_BASE_URL) {
  console.error("❌ REACT_APP_API_BASE_URL no está definido en tu .env");
}

if (ENV === "development") {
  console.warn(
    "%c⚠️ Usando API de desarrollo:", 
    "color: orange; font-weight: bold;", 
    API_BASE_URL
  );
}

const api = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true,
});

export default api;
