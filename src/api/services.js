import api from "./api";

export const getEvents = async (seasonId) => {
  const res = await api.get(`/api/event?seasonId=${seasonId}`);
  return res.data;
};

export const getEventScore = async(eventId) => {
    const res = await api.get(`/api/scoreEvent?eventId=${eventId}`);
    return res.data;
}

export const getSeasons = async (guildId) => {
  const res = await api.get(`/api/season?guildId=${guildId}`);
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/api/auth/me");
  return res.data.data;
};

export const getGuilds = async () => {
  const res = await api.get("/api/guilds");
  return res.data.data;
};

export const syncGuilds = async () => {
  const res = await api.post("/api/guilds/sync", {});
  return res.data;
};
