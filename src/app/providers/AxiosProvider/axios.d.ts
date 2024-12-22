import type { AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosInstance {
    request<T = unknown>(config: AxiosRequestConfig): Promise<T>;
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AppResponseInterface<T>>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AppResponseInterface<T>>;
    head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AppResponseInterface<T>>;
    post<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AppResponseInterface<T>>;
    put<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AppResponseInterface<T>>;
    patch<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AppResponseInterface<T>>;
  }

  export type AxiosResponse<T = unknown> = AxiosReponse<AppResponseInterface<T>>
}


declare global {
  interface AppResponseInterface<T> {
    data: T;
    message: string;
    success: boolean;
  }

  interface AppPaginatedResponseInterface<T> extends AppResponseInterface<T[]> {
    meta: PaginateMetaInterface;
  }

  interface PaginateMetaInterface {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }

  interface AppErrorInterface<T = string, E = Record<string, string>> {
    message: T;
    errors?: E;
    success?: boolean;
  }
}