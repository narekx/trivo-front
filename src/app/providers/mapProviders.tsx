import { AxiosProvider } from "./AxiosProvider";
import { RouterProvider } from "./RouterProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

import { AuthUserProvider } from "./AuthUserProvider";
import { ToastifyProvider } from "./ToastifyProvider";

import type { ReactNode } from "react";

export function mapProviders(app: ReactNode): ReactNode {
  const providers: Array<(app: ReactNode) => ReactNode> = [RouterProvider, ReactQueryProvider, AxiosProvider, ToastifyProvider];
  return providers.reduce((acc: ReactNode, provider: (app: ReactNode) => ReactNode): ReactNode => provider(acc), app);
}