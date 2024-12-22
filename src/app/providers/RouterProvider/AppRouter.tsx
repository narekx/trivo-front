import { AppRoutesMap } from "./config";
import { Route, Routes } from "react-router";
import { renderWithLayout } from "../LayoutProvider";

import { FC, ReactNode, useEffect, useState } from "react";
import type { AppRouteType } from "./model";
import { renderWithMiddlewares } from "./helpers";
import type {
  AuthUserInterface,
} from "@entities";

export const AppRouter: FC = (): ReactNode => {
  return (
    <Routes>
      {
        AppRoutesMap.map((route: AppRouteType) =>
            <Route
              key={route.name}
              path={route.path}
              element={renderWithLayout(route.layout, renderWithMiddlewares((): React.ReactNode => route.component, route.middlewares))}
            />
        )
      }
    </Routes>
  );
};