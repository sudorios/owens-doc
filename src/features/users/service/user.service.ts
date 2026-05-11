import { api } from "@/core/api";
import { User, UserFormData, PaginatedResponse } from "@/domain/models/user.model";

export const userService = {

  getUsers: async (page = 1, pageSize = 10): Promise<PaginatedResponse<User>> => {
    const res = await api.get("/api/user", {
      params: { page, pageSize },
    });
    return res.data;
  },

  createUser: async (data: UserFormData): Promise<User> => {
    const res = await api.post("/api/user", data);
    return res.data.data;
  },

  getUser: async (): Promise<User | null> => {
    try {
      const res = await api.get("/api/auth/me");
      return res.data?.data ? res.data.data : res.data;
    } catch (err) {
      return null;
    }
  },

  searchUsers: async (query: string): Promise<User[]> => {
    const res = await api.get("/api/user/search", {
      params: { q: query },
    });
    return res.data;
  },
};
