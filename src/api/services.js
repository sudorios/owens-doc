

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

export const createSeason = async (data) => {
  const res = await api.post("/api/season", data);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await api.post("/api/event", data);
  return res.data;
}

export const getUser = async () => {
  try {
    const res = await api.get("/api/auth/me", { withCredentials: true });
    return res.data && res.data.data ? res.data.data : res.data;
  } catch (err) {
    return null;
  }
};

export const getGuilds = async () => {
  const res = await api.get("/api/guilds");
  return res.data.data;
};

export const syncGuilds = async () => {
  const res = await api.post("/api/guilds/sync", {});
  return res.data;
};
