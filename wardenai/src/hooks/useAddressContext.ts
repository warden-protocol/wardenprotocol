// useAddressContext.tsx
import { useContext } from "react";
import { AddressContext } from "@/hooks/addressProvider";

export const useAddressContext = () => useContext(AddressContext);
