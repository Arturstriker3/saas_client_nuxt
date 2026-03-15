import type { User } from "../types";

export const useUsersStore = defineStore("users", () => {
  const selectedUser = ref<User | null>(null);

  const selectUser = (user: User) => {
    selectedUser.value = user;
  };

  const clearSelectedUser = () => {
    selectedUser.value = null;
  };

  return {
    selectedUser,
    selectUser,
    clearSelectedUser,
  };
});
