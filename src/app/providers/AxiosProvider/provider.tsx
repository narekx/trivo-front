import axios from "axios";
import { AxiosContext } from "@api";
import { getCookie, redirectTo } from "@helpers";

import type { ReactNode } from "react";
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";


export function provide(app: ReactNode): ReactNode {
  const publicAxios: AxiosInstance = createPublicAxiosInstance();
  const privateAxios: AxiosInstance = createPrivateAxiosInstance();

  return (
    <AxiosContext.Provider
      value={({
        public: publicAxios,
        private: privateAxios,
      })}
    >
      {app}
    </AxiosContext.Provider>
  );
}

function createPublicAxiosInstance(): AxiosInstance {
  function responseOnFulfilled(response: AxiosResponse<unknown, unknown>): AxiosResponse["data"] {
    return response.data;
  }

  function responseOnRejected(error: AxiosError): Promise<AppErrorInterface> {
    return Promise.reject(error.response?.data);
  }

  const $axios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

  $axios.interceptors.response.use(responseOnFulfilled, responseOnRejected);

  return $axios;
}

function createPrivateAxiosInstance(): AxiosInstance {
  function requestOnFulfilled(request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token: string | null = getCookie("accessToken");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  }

  function responseOnFulfilled(response: AxiosResponse<unknown, unknown>): AxiosResponse["data"] {
    return response.data;
  }

  function responseOnRejected(error: AxiosError): Promise<AppErrorInterface> {
    if (error.response?.status === 401) {
      redirectTo("/login");
    }

    return Promise.reject(error.response?.data);
  }

  const $axios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

  $axios.interceptors.request.use(requestOnFulfilled);
  $axios.interceptors.response.use(responseOnFulfilled, responseOnRejected);

  return $axios;
}


