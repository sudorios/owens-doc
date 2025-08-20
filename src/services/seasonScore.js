
import api from "./api";

export const getSeasonScores = async (guildId, seasonId, page = 1, pageSize = 10) => {
  try {
    const res = await api.get(`/api/guild/${guildId}/season/${seasonId}/scores`, {
      params: { page, pageSize },
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching season scores:", err);
    throw err;
  }
};

export const createSeasonScore = async (guildId, seasonId, userId, totalPoints, position = 0, lastPosition = 0) => {
  try {
    const res = await api.post(
      `/api/seasonScore`,
      {
        guildId,
        seasonId,
        userId,
        totalPoints,
        position,
        lastPosition
      },
      {
        withCredentials: true
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating season score:", err);
    throw err;
  }
};