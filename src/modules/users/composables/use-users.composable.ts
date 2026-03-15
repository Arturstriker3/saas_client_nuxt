import Fuse from "fuse.js";
import { useQuery } from "@tanstack/vue-query";
import type { ListUsersRequestDto } from "../dto/list-users.request.dto";
import { usersRepository } from "../repository/users.repository";

export const useUsers = (request: ListUsersRequestDto) => {
  const normalizedRequest = computed(() => ({
    page: request.page,
    pageSize: request.pageSize,
    search: request.search?.trim(),
  }));

  const query = useQuery({
    queryKey: ["users", normalizedRequest],
    queryFn: () => usersRepository.list(normalizedRequest.value),
  });

  const filteredItems = computed(() => {
    const items = query.data.value?.items ?? [];
    const search = normalizedRequest.value.search;

    if (!search) {
      return items;
    }

    const fuse = new Fuse(items, {
      keys: ["name", "email"],
      threshold: 0.35,
    });

    return fuse.search(search).map(({ item }) => item);
  });

  return {
    ...query,
    filteredItems,
  };
};
