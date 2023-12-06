import useKeyringAddress from "@/hooks/useKeyringAddress";
import { Button } from "./ui/button";

function ChooseKeyringButton({ keyringAddress: newKeyringAddress }: { keyringAddress: string }) {
  const [keyringAddress, setKeyringAddress] = useKeyringAddress();

  return (
    <Button disabled={newKeyringAddress === keyringAddress} onClick={() => {
      setKeyringAddress(newKeyringAddress);
    }}>
      {keyringAddress === newKeyringAddress ? "In use" : "Use this keyring"}
    </Button>
  );
}

export default ChooseKeyringButton;
