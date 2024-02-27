import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

// interface SpaceAddressState {
//   spaceAddress: string | null;
//   setSpaceAddress: (spaceAddress: string | null) => void;
// }

export const useSpaceAddress = create (
  persist(
    (set) => ({
  spaceAddress: "",
  setSpaceAddress: (spaceAddress: string | null) => set({ spaceAddress }),
    }),
    {
      name: 'space-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
