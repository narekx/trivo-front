import {useAxios} from "@api";
import {getCookie, removeCookie} from "@helpers";
import {AuthUserInterface, useAuthUser} from "@entities";

interface FetchAuthUserInterface {
  user: AuthUserInterface
}

interface UseGetAuthUserApiInterface {
  getAuthUser: () => Promise<AuthUserInterface | null>;
}

export function useGetAuthUserApi(): UseGetAuthUserApiInterface {
  const $axios = useAxios("private");
  const authUser = useAuthUser();

  async function getAuthUser(): Promise<AuthUserInterface | null> {
    if (!!authUser) {
      return authUser;
    }

    if (!getCookie("accessToken")) {
      return null;
    }

    let result: AuthUserInterface | null = null;
    if (!authUser) {
      try {
        const response: AppResponseInterface<FetchAuthUserInterface> = await fetchAuthUser();
        result = response.data.user;
      } catch (err) {
        removeCookie("accessToken");
      }
    }

    return result;
  }

  async function fetchAuthUser(): Promise<AppResponseInterface<FetchAuthUserInterface>> {
    return $axios.get<FetchAuthUserInterface>("me");
  }

  return {
    getAuthUser,
  }
}