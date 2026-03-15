import { listUsersRequestDtoSchema } from "../dto/list-users.request.dto";
import {
  type ListUsersResponseDto,
  listUsersResponseDtoSchema,
} from "../dto/list-users.response.dto";
import { useHttpClient } from "~/core/api/http-client";

const fallbackUsers: ListUsersResponseDto = {
  items: [
    {
      id: "1",
      name: "Ana Souza",
      email: "ana@demo.com",
      role: "admin",
      createdAt: "2026-01-12T10:00:00.000Z",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@demo.com",
      role: "member",
      createdAt: "2026-02-01T09:30:00.000Z",
    },
    {
      id: "3",
      name: "María Torres",
      email: "maria@demo.com",
      role: "member",
      createdAt: "2026-02-15T15:45:00.000Z",
    },
  ],
  page: 1,
  pageSize: 10,
  total: 3,
};

export const usersRepository = {
  async list(input: unknown): Promise<ListUsersResponseDto> {
    const request = listUsersRequestDtoSchema.parse(input);
    const httpClient = useHttpClient();

    try {
      const response = await httpClient("/users", {
        query: request,
      });

      return listUsersResponseDtoSchema.parse(response);
    } catch {
      return fallbackUsers;
    }
  },
};
