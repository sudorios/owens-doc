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

export async function getGuildsByUser(userId, { start = 0, limit = 10, palabraClave = "" } = {}) {
  try {
    // Aseguramos obtener el userId de Discord directamente del storage
    const localUserStr = localStorage.getItem("user_info");
    let discordUserId = userId;
    
    if (localUserStr) {
      try {
        const localUser = JSON.parse(localUserStr);
        discordUserId = localUser.userId || userId;
      } catch (e) {}
    }

    const payload = {
      start: start,
      limit: limit,
      userDcId: discordUserId,
      palabraClave: palabraClave
    };

    const res = await api.post(`/api/guild/findGuilds`, payload, {
      withCredentials: true,
    });

    const data = res.data?.data || res.data;
    const elements = data?.elements || [];
    const totalCount = data?.totalCount || 0;

    // Mapeamos los campos y devolvemos también el totalCount para la paginación
    return {
      guilds: elements.map(g => ({
        id: g.guildId,
        guildId: g.guildDcId,
        name: g.guild,
        avatar: null 
      })),
      totalCount
    };
  } catch (err) {
    console.error("Error fetching guilds by user:", err.response?.data || err);
    throw err;
  }
}
