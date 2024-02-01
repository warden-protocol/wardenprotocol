import { useLocalStorage } from "@uidotdev/usehooks";

export default function useKeychainAddress(): [string | null, (address: string | null) => void] {
  const [address, setAddress] = useLocalStorage<string | null>("keychain_address", null);
  return [address, setAddress];
}
