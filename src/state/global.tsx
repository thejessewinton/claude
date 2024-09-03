"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type GlobalStateProps = {
  pinned: boolean;
};

type GlobalState = {
  responseIsLoading: boolean;
  setResponseIsLoading: (loading: boolean) => void;
  togglePinned: () => void;
} & GlobalStateProps;

const createGlobalStore = (initProps: GlobalStateProps) => {
  return createStore<GlobalState>((set, get) => ({
    ...initProps,
    responseIsLoading: false,
    setResponseIsLoading: (loading) => set({ responseIsLoading: loading }),
    togglePinned: () => set({ pinned: !get().pinned }),
  }));
};

type GlobalStore = ReturnType<typeof createGlobalStore>;

const GlobalContext = createContext<GlobalStore | null>(null);

export const useGlobalStore = <T extends GlobalState>(
  selector: (state: GlobalState) => T,
) => {
  const store = useContext(GlobalContext);
  if (!store) throw new Error("Missing GlobalProvider in the tree");
  return useStore(store, selector);
};

export const GlobalProvider = ({
  children,
  pinned,
}: { children: ReactNode } & GlobalStateProps) => {
  const store = useRef(createGlobalStore({ pinned })).current;
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};
