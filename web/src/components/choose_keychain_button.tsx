import useKeychainAddress from "@/hooks/useKeychainAddress";
import { Button } from "./ui/button";

function ChooseKeychainButton({ keychainAddress: newKeychainAddress }: { keychainAddress: string }) {
  const [keychainAddress, setKeychainAddress] = useKeychainAddress();

  return (
    <Button disabled={newKeychainAddress === keychainAddress} onClick={() => {
      setKeychainAddress(newKeychainAddress);
    }}>
      {keychainAddress === newKeychainAddress ? "In use" : "Use this keychain"}
    </Button>
  );
}

export default ChooseKeychainButton;
