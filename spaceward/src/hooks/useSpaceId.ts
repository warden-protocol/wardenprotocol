import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SpaceIdState {
    spaceId: string | null;
    setSpaceId: (spaceId: string | "") => void;
}

export const useSpaceId = create(
    persist<SpaceIdState>(
        (set) => ({
            spaceId: "",
            setSpaceId: (spaceId: string | null) => set({ spaceId }),
        }),
        {
            name: "space-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
