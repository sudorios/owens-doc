import api from "./api";

export const getUser = async () => {
  try {
    const res = await api.get("/api/auth/me", { withCredentials: true });
    return res.data && res.data.data ? res.data.data : res.data;
  } catch (err) {
    return null;
  }
};

export const searchUsers = async (query) => {
  try {
    const res = await api.get("/api/user/search", {
      withCredentials: true,
      params: { q: query }  
    });
    return res.data;
  } catch (err) {
    console.error("Error searching users:", err);
    throw err;
  }
};

export const getAllUser = async (page = 1, pageSize = 10) => {
  try {
    const res = await api.get("/api/user", {
      withCredentials: true,
      params: { page, pageSize }, 
    });
    return res.data; 
  } catch (err) {
    console.error("Error fetching users:", err);
    return null;
  }
};

export const createUser = async (data) => {
  try {
    const res = await api.post("/api/user", data, { withCredentials: true });
    return res.data.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}