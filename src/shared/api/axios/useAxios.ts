import { useContext } from "react";
import { AxiosContext, AxiosContextInterface } from "./context";

import type { AxiosInstance } from "axios";

export function useAxios(type: keyof AxiosContextInterface = "public"): AxiosInstance {
  const $axios: AxiosContextInterface | undefined = useContext(AxiosContext);
  if (!$axios) {
    throw new Error("useAxios must be used within the Axios");
  }
  
  return $axios[type];
}