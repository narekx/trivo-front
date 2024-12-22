import { useAxios } from "@api";
import type { RegisterResponseInterface} from "../model";

interface RegisterDataInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UseRegisterApiInterface {
  register(data: Readonly<RegisterDataInterface>): Promise<AppResponseInterface<RegisterResponseInterface>>;
}

export function useRegisterApi(): UseRegisterApiInterface {
  const $axios = useAxios();
  async function register(data: Readonly<RegisterDataInterface>): Promise<AppResponseInterface<RegisterResponseInterface>> {
    return await $axios.post<RegisterResponseInterface>("/register", {
      email: data.email,
      name: data.name,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    });
  }

  return {
    register,
  };
}