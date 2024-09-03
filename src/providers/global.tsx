"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type GlobalStateProps = {
  pinned: boolean;
};

type GlobalState = {
  togglePinned: () => void;
} & GlobalStateProps;

const createGlobalStore = (initProps: GlobalStateProps) => {
  return createStore<GlobalState>((set, get) => ({
    ...initProps,
    togglePinned: () => set({ pinned: !get().pinned }),
  }));
};

type GlobalStore = ReturnType<typeof createGlobalStore>;

const GlobalContext = createContext<GlobalStore | null>(null);

export function useGlobalStore<T>(selector: (state: GlobalState) => T): T {
  const store = useContext(GlobalContext);
  if (!store) throw new Error("Missing GlobalProvider in the tree");
  return useStore(store, selector);
}

export const GlobalProvider = ({
  children,
  pinned,
}: { children: ReactNode } & GlobalStateProps) => {
  const store = useRef(createGlobalStore({ pinned })).current;
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};
