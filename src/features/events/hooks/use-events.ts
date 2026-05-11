import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../service/event.service";
import { EventFormData } from "@/domain/models/event.model";

export const useGetEventsQuery = (seasonId: string) => {
  return useQuery({
    queryKey: ["events", seasonId],
    queryFn: () => eventService.getEvents(seasonId),
    enabled: !!seasonId,
  });
};

export const useCreateEventMutation = (seasonId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: EventFormData) => eventService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", seasonId] });
    },
  });
};

export const useGetEventScoresQuery = (eventId: string, page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["eventScores", eventId, page, pageSize],
    queryFn: () => eventService.getEventScores(eventId, page, pageSize),
    enabled: !!eventId,
  });
};

export const useCreateEventScoreMutation = (eventId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { eventId: number; userId: number; guildId: number; seasonId: number; points: number }) => 
      eventService.createEventScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventScores", eventId] });
    },
  });
};

export const useGetEventWinnersQuery = (guildId: string) => {
  return useQuery({
    queryKey: ["eventWinners", guildId],
    queryFn: () => eventService.getEventWinners(guildId),
    enabled: !!guildId,
  });
};

export const useGetPredictionAccuracyQuery = (guildId: string, eventId: string, order: string = "ASC") => {
  return useQuery({
    queryKey: ["predictionAccuracy", guildId, eventId, order],
    queryFn: () => eventService.getAccuracyByQuestion(guildId, eventId, order),
    enabled: !!guildId && !!eventId,
  });
};
