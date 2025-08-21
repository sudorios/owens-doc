import api from "./api";

export async function createEventScore(eventId, userId, guildId, seasonId, points) {
    try {
      const res = await api.post(
        `/api/scoreEvent`,
        {
          userId,
          guildId,
          eventId,
          seasonId,
          points
        },
        { withCredentials: true } 
      );
      return res.data;
    } catch (err) {
      console.error("Error creating event score:", err);
      throw err;
    }
}

export const getEventScore = async(eventId, page = 1, pageSize = 10) => {
    try {
        const res = await api.get(`/api/scoreEvent`, {
            params: { 
                eventId, 
                page, 
                pageSize 
            },
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching event scores:", err);
        throw err;
    }
}