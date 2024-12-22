import { LayoutComponentsMap } from "../config";

import type { ReactNode } from "react";
import type { LayoutComponentType, LayoutNameType } from "../model";


export function renderWithLayout(layoutName: LayoutNameType = "default", children: ReactNode): ReactNode {
  const LayoutComponent: LayoutComponentType = LayoutComponentsMap[layoutName];
  return (<LayoutComponent>{children}</LayoutComponent>);
}