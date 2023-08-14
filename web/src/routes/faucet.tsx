import { useState } from "react";
import { useKeplrAddress } from "../keplr";

async function getFaucetTokens(addr: string) {
  await fetch("/api/faucet", {
    method: "POST",
    body: JSON.stringify({ address: addr }),
  });
}

function Faucet() {
  const [loading, setLoading] = useState(false);
  const addr = useKeplrAddress();

  if (!addr) {
    return (
      <div className="px-6 mt-10">
        <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold text-lg">Faucet</h1>
            <span className="text-gray-800 italic">
              Workspace: a group of users managing a group of keys
            </span>
        </div>
      </div>
    );
  }

  const getTokens = async () => {
    setLoading(true);
    await getFaucetTokens(addr);
    setLoading(false);
  };

  return (
    <div className="px-6 mt-10">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Faucet</h1>
          <span className="text-gray-800 italic">
            Receive test tokens to start using the app
          </span>
        </div>
      </div>

      <div className="mt-10">
        <button 
          disabled={loading}
          className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => getTokens()}>
          Get tokens
        </button>
      </div>
    </div>
  );
}

export default Faucet;
