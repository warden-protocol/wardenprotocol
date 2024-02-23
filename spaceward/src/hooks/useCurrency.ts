import {create} from 'zustand';

interface CurrencyState {
  currency: string | "usd";
  setCurrency: (currency: string | "usd") => void;
}

export const useCurrency = create<CurrencyState>((set) => ({
  currency: "usd",
  setCurrency: (currency: string | "usd") => set({ currency }),
}));
