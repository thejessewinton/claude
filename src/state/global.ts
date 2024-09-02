import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

type GlobalStoreState = {
  pinned: boolean;
  setPinned: (pinned: boolean) => void;
};

export const useGlobalStore = create(
  persist<GlobalStoreState>(
    (set) => ({
      pinned: false,
      setPinned: (value) => set({ pinned: value }),
    }),
    {
      name: "global_state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
