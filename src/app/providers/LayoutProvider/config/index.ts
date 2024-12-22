import { DefaultLayout, AuthLayout } from "../layouts";
import type { LayoutComponentMapType } from "../model";

export const LayoutComponentsMap: LayoutComponentMapType = {
  auth: AuthLayout,
  default: DefaultLayout,
};