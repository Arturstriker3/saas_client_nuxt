import type { $Fetch } from "nitropack";
import { useAppRuntimeConfig } from "../config/runtime.config";

export const useHttpClient = (): $Fetch => {
  const { apiBase } = useAppRuntimeConfig();

  return $fetch.create({
    baseURL: apiBase,
  });
};
