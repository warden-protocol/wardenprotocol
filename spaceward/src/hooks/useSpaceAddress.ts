import { useLocalStorage } from "@uidotdev/usehooks";

export default function useSpaceAddress(): [string | null, (address: string | null) => void] {
  const [address, setAddress] = useLocalStorage<string | null>("space_address", null);
  return [address, setAddress];
}
