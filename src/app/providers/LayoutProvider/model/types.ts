import type { FC, ReactNode } from "react";

export type LayoutComponentType = FC<{ children: ReactNode }>

export type LayoutNameType = "default" | "auth";

export type LayoutComponentMapType = Record<LayoutNameType, LayoutComponentType>