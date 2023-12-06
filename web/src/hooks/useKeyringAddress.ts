import { useLocalStorage } from "@uidotdev/usehooks";

export default function useKeyringAddress(): [string | null, (address: string | null) => void] {
  const [address, setAddress] = useLocalStorage<string | null>("keyring_address", null);
  return [address, setAddress];
}
