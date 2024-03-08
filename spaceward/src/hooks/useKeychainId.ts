import { useLocalStorage } from "@uidotdev/usehooks";

export default function useKeychainId(): [string | null, (address: string | null) => void] {
  const [address, setAddress] = useLocalStorage<string | null>("keychain_id", null);
  return [address, setAddress];
}
