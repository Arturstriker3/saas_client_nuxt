import { z } from "zod";

export const listUsersRequestDtoSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
});

export type ListUsersRequestDto = z.infer<typeof listUsersRequestDtoSchema>;
