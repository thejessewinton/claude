import { create } from "zustand";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

import {
  type StateStorage,
  createJSONStorage,
  persist,
} from "zustand/middleware";

type GlobalStoreState = {
  pinned: string;
  setPinned: (pinned: string) => void;
};

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? "false";
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 365 });
  },
  removeItem: (name: string) => {
    removeCookie(name);
  },
};

export const useGlobalStore = create(
  persist<GlobalStoreState>(
    (set) => ({
      pinned: "false",
      setPinned: (value) => set({ pinned: value }),
    }),
    {
      name: "global_state",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
