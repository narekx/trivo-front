import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";


export function provide(app: ReactNode): ReactNode {
  const queryClient: QueryClient = new QueryClient();
  return (<QueryClientProvider client={queryClient}>{app}</QueryClientProvider>);
}