import { z } from "zod";
import { User } from "./user.model";

export const eventSchema = z.object({
  guildId: z.number().or(z.string()),
  seasonId: z.number().or(z.string()),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  state: z.string().default("ACTIVE"),
});

export type Event = {
  id: number;
  seasonId: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  state: string;
};

export type EventFormData = z.infer<typeof eventSchema>;

export type EventScore = {
  id: number;
  userId: number;
  eventId: number;
  seasonId: number;
  guildId: number;
  points: number;
  user: User;
};

export type EventWinner = {
  eventId: number;
  eventName: string;
  seasonId: number;
  seasonName: string;
  firstPlace: {
    userId: number;
    username: string;
    points: number;
  } | null;
  secondPlace: {
    userId: number;
    username: string;
    points: number;
  } | null;
  thirdPlace: {
    userId: number;
    username: string;
    points: number;
  } | null;
};

export type PredictionAccuracy = {
  question: string;
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  questionId: number;
};
