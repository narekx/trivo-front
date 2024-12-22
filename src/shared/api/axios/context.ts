import { type Context, createContext } from "react";
import type { AxiosInstance } from "axios";

export interface AxiosContextInterface {
  public: AxiosInstance;
  private: AxiosInstance;
}

export const AxiosContext: Context<AxiosContextInterface | undefined> = createContext<AxiosContextInterface | undefined>(undefined);