import { api } from "@/core/api";
import { Season, SeasonFormData, SeasonScore, GuildUser } from "@/domain/models/season.model";
import { PaginatedResponse } from "@/domain/models/user.model";

export const seasonService = {
  getSeasons: async (guildId: string): Promise<Season[]> => {
    const res = await api.get(`/api/season?guildId=${guildId}`);
    return Array.isArray(res.data) ? res.data : (res.data.data || []);
  },

  createSeason: async (data: SeasonFormData): Promise<Season> => {
    const res = await api.post("/api/season", data);
    return res.data;
  },

  getSeasonScores: async (guildId: string, seasonId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<SeasonScore>> => {
    const res = await api.get(`/api/guild/${guildId}/season/${seasonId}/scores`, {
      params: { page, pageSize },
    });
    return res.data;
  },

  createSeasonScore: async (data: any): Promise<any> => {
    const res = await api.post(`/api/seasonScore`, data);
    return res.data;
  },

  // Guild specific endpoints used in SeasonsDashboard
  getGuildScores: async (guildId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<GuildUser>> => {
    const res = await api.get(`/api/guild/${guildId}/users`, {
      params: { page, pageSize },
    });
    return res.data;
  },

  createGuildUser: async (guildId: string, userData: any): Promise<GuildUser> => {
    const payload = {
      guildId,
      userId: Number(userData.userId || userData.id),
      role: (userData.role || "USER").toUpperCase(),
      points: userData.points ?? 0,
      lastPosition: userData.lastPosition ?? 0,
      position: userData.position ?? 0,
    };
    const res = await api.post(`/api/guild/${guildId}/users`, payload);
    return res.data;
  }
};
