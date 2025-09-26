import { create } from "zustand";
import type { Wallet } from "../utils/interfaces";
import { persist, createJSONStorage } from "zustand/middleware";

interface ActiveWalletState {
    activeWallet: Wallet;
    setActiveWallet: (activeWallet: Wallet | undefined) => void;
}

export const useActiveWallet = create(
    persist<ActiveWalletState>(
        (set) => ({
            activeWallet: <Wallet>{},
            setActiveWallet: (activeWallet: Wallet | undefined) =>
                set({ activeWallet }),
        }),
        {
            name: "wallet-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
