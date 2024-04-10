// addressProvider.tsx
import { createContext, ReactNode } from "react";
import { useAddress } from "./useAddress";

interface Props {
  children?: ReactNode;
}

export const AddressContext = createContext({
  address: "",
  shortAddress: "",
});

export function AddressProvider({ children }: Props) {
  const { address, shortAddress } = useAddress();

  return <AddressContext.Provider value={{ address, shortAddress }}>{children}</AddressContext.Provider>;
}