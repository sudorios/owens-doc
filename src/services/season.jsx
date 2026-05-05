

import api from "./api";

export const getSeasons = async (guildId) => {
  const res = await api.get(`/api/season?guildId=${guildId}`);
  return res.data;
};

export const createSeason = async (data) => {
  const res = await api.post("/api/season", data);
  return res.data;
};


export const syncGuilds = async () => {
  const res = await api.post("/api/guilds/sync", {});
  return res.data;
};
