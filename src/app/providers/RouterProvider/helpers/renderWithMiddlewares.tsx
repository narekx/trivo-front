import type { AppRouterMiddlewareType } from "../model";

export function renderWithMiddlewares (
  Component: React.ComponentType,
  middlewares?: AppRouterMiddlewareType[]
): React.ReactNode {
  if (!middlewares || middlewares.length === 0) {
    return <Component />;
  }

  Component = middlewares.reduce((acc: React.ComponentType, middleware: AppRouterMiddlewareType): React.ComponentType => middleware(acc), Component);
  return <Component/>;
}