import { z } from "zod";
import { User } from "./user.model";

export const seasonSchema = z.object({
  guildId: z.string(),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  startDate: z.date().optional(),
  active: z.boolean().default(true),
});

export type Season = {
  id: number;
  guildId: string;
  name: string;
  description?: string;
  startDate?: string;
  active: boolean;
  guild?: {
    id: number;
    name: string;
  };
};

export type SeasonFormData = z.infer<typeof seasonSchema>;

export type SeasonScore = {
  id: number;
  guildId: number;
  seasonId: number;
  userId: number;
  points: number;
  position: number;
  lastPosition: number;
  user: User;
};

// Types for Guild Users (overall leaderboard)
export type GuildUser = {
  id: number;
  guildId: number;
  userId: number;
  points: number;
  position: number;
  lastPosition: number;
  role: string;
  user: User;
};
