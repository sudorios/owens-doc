import { api } from "@/core/api";
import { Event, EventFormData, EventScore, EventWinner, PredictionAccuracy } from "@/domain/models/event.model";
import { PaginatedResponse } from "@/domain/models/user.model";

export const eventService = {
  getEvents: async (seasonId: string): Promise<Event[]> => {
    const res = await api.get(`/api/event?seasonId=${seasonId}`);
    return Array.isArray(res.data) ? res.data : (res.data.data || []);
  },

  createEvent: async (data: EventFormData): Promise<Event> => {
    const res = await api.post("/api/event", data);
    return res.data;
  },

  getEventScores: async (eventId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<EventScore>> => {
    const res = await api.get(`/api/scoreEvent`, {
      params: { eventId, page, pageSize },
    });
    return res.data;
  },

  createEventScore: async (data: { eventId: number; userId: number; guildId: number; seasonId: number; points: number }): Promise<any> => {
    const res = await api.post(`/api/scoreEvent`, data);
    return res.data;
  },

  getEventWinners: async (guildId: string): Promise<EventWinner[]> => {
    const res = await api.get(`/api/guild/${guildId}/winners`);
    return res.data?.data || [];
  },

  getAccuracyByQuestion: async (guildId: string, eventId: string, order = "ASC"): Promise<PredictionAccuracy[]> => {
    const res = await api.get(`/api/predictions/accuracy/${guildId}/${eventId}?order=${order}`);
    return res.data;
  },
};
