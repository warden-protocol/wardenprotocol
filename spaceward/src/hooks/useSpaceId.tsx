import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSpaceId = create<{
	spaceId: string | null;
	setSpaceId: (spaceId: string | null) => void;
}>()(
	persist(
		(set) => ({
			spaceId: "",
			setSpaceId: (spaceId: string | null) => set({ spaceId }),
		}),
		{
			name: "space-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		},
	),
);
