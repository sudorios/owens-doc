import { z } from "zod";

export const userSchema = z.object({
  userId: z.string().min(1, "El Discord ID es requerido"),
  username: z.string().min(1, "El nombre de usuario es requerido"),
});

export type User = {
  id: number;
  userId: string;
  username: string;
};

export type UserFormData = z.infer<typeof userSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
