import {create} from 'zustand';
import type { Wallet } from "../utils/interfaces";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useActiveWallet = create(
  persist(
    (set) => ({
      activeWallet: <Wallet>{},
      setActiveWallet: (activeWallet: Wallet | undefined) => set({ activeWallet }),
    }),
    {
      name: 'wallet-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
