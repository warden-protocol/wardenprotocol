import { useKeplrAddress } from "../keplr";
import { useQuery } from "@tanstack/react-query";
import { balances } from "../client/bank";
import FaucetButton from "./faucet_button";

function AccountInfo() {
  const addr = useKeplrAddress();
  const bq = useQuery({ queryKey: ["balances", addr], queryFn: () => balances(addr) });
  const nqrdo = bq.data?.balances.find((b) => b.denom === "nQRDO")?.amount || "0";
  const qrdo = parseInt(nqrdo) / 10 ** 9;

  return (
    <div className="flex flex-row gap-6 items-center">
      <div className="flex flex-col items-end">
        <span className="text-sm font-monospace">{addr}</span>
        <span className="text-xs">{qrdo.toFixed(2)} QRDO</span>
      </div>

      <FaucetButton />
    </div>
  );
}

export default AccountInfo;
