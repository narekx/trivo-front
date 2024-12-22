import { useAxios } from "@api";
import type { LogoutResponseInterface } from "../model";

interface UseLogoutApiInterface {
  logout(): Promise<AppResponseInterface<LogoutResponseInterface>>;
}

export function useLogoutApi(): UseLogoutApiInterface {
  const $axios = useAxios("private");
  async function logout(): Promise<AppResponseInterface<LogoutResponseInterface>> {
    return await $axios.post<LogoutResponseInterface>("/logout");
  }

  return {
    logout,
  };
}