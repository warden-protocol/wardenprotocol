import { createContext, ReactNode, useContext } from "react";
import { useAddress } from "./useAddress";

interface Props {
  children?: ReactNode;
}
const AddressContext = createContext({
  address: "",
  shortAddress: "",
});

export const useAddressContext = () => useContext(AddressContext);

export default function AddressProvider({ children }: Props) {
  const { address, shortAddress } = useAddress();

  return <AddressContext.Provider value={{ address, shortAddress }}>{children}</AddressContext.Provider>;
}
