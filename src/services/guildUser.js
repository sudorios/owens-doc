import api from "./api";

export async function getScore(guildId, page = 1, pageSize = 10) {
  try {
    const res = await api.get(
      `/api/guild/${guildId}/users?page=${page}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching season scores:", err);
    return null;
  }
}

export async function createGuildUser(guildId, userData) {
  try {
    const payload = {
      guildId,
      userId: Number(userData.id || userData.userId),
      role: (userData.role || "USER").toUpperCase(),
      points: userData.points ?? 0,
      lastPosition: userData.lastPosition ?? 0,
      position: userData.position ?? 0,
    };

    const res = await api.post(`/api/guild/${guildId}/users`, payload);
    return res.data;
  } catch (err) {
    console.error("Error creating guild user:", err.response?.data || err);
    throw err;
  }
}
