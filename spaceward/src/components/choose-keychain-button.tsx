import useKeychainId from "@/hooks/useKeychainId";
import { Button } from "./ui/button";

function ChooseKeychainButton({ keychainId: newKeychainId }: { keychainId: string }) {
  const [keychainId, setKeychainId] = useKeychainId();

  return (
    <Button disabled={newKeychainId === keychainId} onClick={() => {
      setKeychainId(newKeychainId);
    }}>
      {keychainId === newKeychainId ? "In use" : "Use this keychain"}
    </Button>
  );
}

export default ChooseKeychainButton;
