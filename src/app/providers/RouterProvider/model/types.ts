import type { LayoutNameType } from "../../LayoutProvider";

export interface AppRouteType {
  name: string;
  path: string;
  layout?: LayoutNameType;
  component: React.ReactNode;
  middlewares?: AppRouterMiddlewareType[];
}

export type AppRouterMiddlewareType = (Component: React.ComponentType) => React.FC;