import { useState } from "react";
import { useKeplrAddress } from "../keplr";
import { Button } from "@/components/ui/button";

const FAUCET_URL = import.meta.env.VITE_FAUCET_URL || "/api/faucet";

async function getFaucetTokens(addr: string) {
  await fetch(FAUCET_URL, {
    method: "POST",
    body: JSON.stringify({ address: addr }),
  });
}

function FaucetButton() {
  const [loading, setLoading] = useState(false);
  const addr = useKeplrAddress();

  const getTokens = async () => {
    setLoading(true);
    await getFaucetTokens(addr);
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={() => getTokens()}>
      Get WARD
    </Button>
  );
}

export default FaucetButton;
