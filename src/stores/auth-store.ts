"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  account_confirmed: boolean;
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clear: () => set({ user: null }),
    }),
    {
      name: "sb_auth", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Persist only non-sensitive user details; never persist tokens
      partialize: (state) => ({ user: state.user }),
    }
  )
);


