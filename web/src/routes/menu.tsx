import { Link } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import { useQuery } from "@tanstack/react-query";
import { balances } from "../client/bank";

const items = [
  { name: "Home", path: "/" },
  { name: "Faucet", path: "/faucet" },
];

function Menu() {
  const addr = useKeplrAddress();
  const bq = useQuery({ queryKey: ["balances", addr], queryFn: () => balances(addr) });
  const nqrdo = bq.data?.balances.find((b) => b.denom === "nQRDO")?.amount || "0";
  const qrdo = parseInt(nqrdo) / 10**9;

  return (
    <nav className="flex flex-row items-center justify-between w-full bg-slate-100 px-4 py-2">
      <div>
        <ul className="flex flex-row gap-4">
          {items.map((item) => (
            <li key={item.path} className="rounded-md bg-blue-100 px-3 py-1 hover:bg-blue-200">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <span className="text-sm">
        {addr || "Wallet not connected"}
        {" "}({qrdo} QRDO)
      </span>
    </nav>
  )
}

export default Menu;
