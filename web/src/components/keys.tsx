import { useQuery } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Key as KeyProto } from "../proto/fusionchain/treasury/key_pb";
import { keys, wallets } from "../client/treasury";
import { prettyBytes, prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import KeyringAddress from "./keyring_address";
import { WalletType } from "@/proto/fusionchain/treasury/wallet_pb";

export default function Keys({ workspaceAddr }: { workspaceAddr: string }) {
  const wsQuery = useQuery({ queryKey: ["keys", workspaceAddr], queryFn: () => keys(workspaceAddr) });
  console.log(wsQuery.status,wsQuery.data,wsQuery.error);

  return (
    <div className="p-4 space-y-3">
      {wsQuery.data?.keys.map((key) => <Key key={key.key?.id.toString()} keyData={key.key!} />)}
    </div>
  );
}

function Wallets({ walletType, workspaceAddr, keyId }: { walletType: number, workspaceAddr: string, keyId: string} ) {
  const walletQuery = useQuery({
    queryKey: ["keys", walletType, workspaceAddr, keyId],
    queryFn: () => wallets(walletType, workspaceAddr, keyId)
  });

  const wallet = walletQuery.data?.keys[0].wallets.find((wallet) => wallet.type === walletType);

  return (
    <div>
       <span>
          <span className="font-semibold">Ethereum Sepolia: </span>
          <span className="font-mono">
            {wallet?.address}
          </span>
          <Link to={`/wallet/${workspaceAddr}/${keyId}`}>
            <Button variant="default" size="sm" className="ml-3">
              Sign transactions
            </Button>
          </Link>
      </span>
    </div>  
  );
}


function Key({ keyData }: { keyData: KeyProto }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key #{keyData.id.toString()}{" "}</CardTitle>
        <CardDescription>Managed by <KeyringAddress address={keyData.keyringAddr} />.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Type</span>
            <span>{prettyKeyType(keyData.type)}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Key material</span>
            <span className="font-mono break-all">{prettyBytes(keyData.publicKey)}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Sign Web3 Transactions</span>
            <span className="font-mono break-all">
              <Wallets walletType={WalletType.ETH} workspaceAddr={keyData.workspaceAddr} keyId={keyData.id.toString()}/>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/sign-data/${keyData.id}`}>
          <Button variant="secondary" size="sm">
            Sign arbitrary data
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export async function loader({ params }: { params: Params<string> }) {
  if (!params.workspaceAddr) {
    throw new Error("No workspace address provided");
  }
  return {
    workspaceAddr: params.workspaceAddr,
  };
}
