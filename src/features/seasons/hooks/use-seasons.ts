import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seasonService } from "../service/season.service";
import { SeasonFormData } from "@/domain/models/season.model";

export const useGetSeasonsQuery = (guildId: string, page: number, pageSize: number, palabraClave: string = "", filters: any = {}) => {
  return useQuery({
    queryKey: ["seasons", guildId, page, pageSize, palabraClave, filters],
    queryFn: () => seasonService.getSeasons(guildId, page, pageSize, palabraClave, filters),
    enabled: !!guildId,
  });
};

export const useCreateSeasonMutation = (guildId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SeasonFormData) => seasonService.createSeason(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons", guildId] });
    },
  });
};

export const useGetGuildScoresQuery = (guildId: string, page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["guildScores", guildId, page, pageSize],
    queryFn: () => seasonService.getGuildScores(guildId, page, pageSize),
    enabled: !!guildId,
  });
};

export const useGetSeasonScoresQuery = (guildId: string, seasonId: string, page: number, pageSize: number, palabraClave: string = "", filters: any = {}) => {
  return useQuery({
    queryKey: ["seasonScores", guildId, seasonId, page, pageSize, palabraClave, filters],
    queryFn: () => seasonService.getSeasonScores(guildId, seasonId, page, pageSize, palabraClave, filters),
    enabled: !!guildId && !!seasonId,
  });
};

export const useCreateSeasonScoreMutation = (guildId: string, seasonId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => seasonService.createSeasonScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasonScores", guildId, seasonId] });
    },
  });
};

export const useCreateGuildUserMutation = (guildId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => seasonService.createGuildUser(guildId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guildScores", guildId] });
    },
  });
};
