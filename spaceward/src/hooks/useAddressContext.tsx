// useAddressContext.tsx
import { useContext } from "react";
import { AddressContext } from "./addressProvider";

export const useAddressContext = () => useContext(AddressContext);
