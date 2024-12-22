import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthUserInterface } from "../model/types.ts";

export interface AuthUserStoreInterface {
  authUser: AuthUserInterface | null
  loading: boolean;
  setAuthUser: (authUser: AuthUserInterface | null) => void;
  removeAuthUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthUserStore = create<AuthUserStoreInterface>()(devtools((set) => ({
  authUser: null,
  loading: false,
  setAuthUser: (authUser: AuthUserInterface | null) => set({ authUser: authUser }),
  removeAuthUser: () => set({ authUser: null }),
  setLoading: (loading: boolean) => set({ loading: loading }),
})));

export const useAuthUser = () => useAuthUserStore((state) => state.authUser);

export const useAuthLoading = () => useAuthUserStore((state) => state.loading);

export const useSetAuthUser = () => useAuthUserStore((state) => state.setAuthUser);

export const useSetAuthUserLoading = () => useAuthUserStore((state) => state.setLoading);

export const useRemoveAuthUser = () => useAuthUserStore((state) => state.removeAuthUser);