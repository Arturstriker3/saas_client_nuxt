import { z } from "zod"

export const listUsersResponseDtoSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      role: z.enum(["admin", "member"]),
      createdAt: z.string(),
    }),
  ),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
})

export type ListUsersResponseDto = z.infer<typeof listUsersResponseDtoSchema>
