import { create } from "zustand";

export const useResponse = create((set) => ({
    response: null,
    state: "idle",
    setResponse: (response: object | null) => set({ response }),
    setState: (state: string) => set({ state }),
}));
