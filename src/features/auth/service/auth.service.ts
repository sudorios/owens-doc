import { api } from "@/core/api";
import { OauthRequest, AutorizacionResponse } from "@/domain/models/auth.model";

export const authService = {
  loginWithDiscord: async (data: OauthRequest): Promise<AutorizacionResponse> => {
    const res = await api.post<AutorizacionResponse>("/api/auth/login", data);
    const payload = res.data?.data ? res.data.data : res.data;
    
    if (payload) {
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
      localStorage.setItem("user_info", JSON.stringify(payload));
    }
    
    return payload;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("token");
    
    // Redirigir al inicio
    window.location.href = "/";
  }
};
