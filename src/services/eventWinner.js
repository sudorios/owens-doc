import api from "./api";

export async function getEventWinners(guildId, eventId) {
    try {
      const res = await api.get(`/api/guild/${guildId}/winners`);
      return res.data?.data || [];
    } catch (err) {
      console.error("Error fetching event winners:", err);
      return [];
    }
}

