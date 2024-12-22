import { useAxios } from "@api";
import type { LoginResponseInterface } from "../model";



interface LoginDataInterface {
  email: string;
  password: string;
}

interface UseLoginApiInterface {
  login(data: Readonly<LoginDataInterface>): Promise<AppResponseInterface<LoginResponseInterface>>;
}

export function useLoginApi(): UseLoginApiInterface {
  const $axios = useAxios();
  async function login(data: Readonly<LoginDataInterface>): Promise<AppResponseInterface<LoginResponseInterface>> {
    return await $axios.post<LoginResponseInterface>("/login", {
      email: data.email,
      password: data.password,
    });
  }

  return {
    login,
  };
}