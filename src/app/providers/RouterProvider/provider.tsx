import { AppRouter } from "./AppRouter.tsx";
import { BrowserRouter } from "react-router";

import type { ReactNode } from "react";


export function provide(app: ReactNode): ReactNode {
  return (<BrowserRouter><AppRouter />{app}</BrowserRouter>);
}