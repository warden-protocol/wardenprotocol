import {create} from 'zustand';

interface SpaceAddressState {
  spaceAddress: string | null;
  setSpaceAddress: (spaceAddress: string | null) => void;
}

export const useSpaceAddress = create<SpaceAddressState>((set) => ({
  spaceAddress: "",
  setSpaceAddress: (spaceAddress: string | null) => set({ spaceAddress }),
}));
