import { useQuery } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Key as KeyProto } from "../proto/wardenprotocol/treasury/key_pb";
import { keys } from "../client/treasury";
import { prettyBytes, prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import KeychainAddress from "./keychain_address";

export default function Keys({ spaceAddr }: { spaceAddr: string }) {
  const wsQuery = useQuery({ queryKey: ["keys", spaceAddr], queryFn: () => keys({ spaceAddr }) });
  console.log(wsQuery.status,wsQuery.data,wsQuery.error);

  return (
    <div className="p-4 space-y-3">
      {wsQuery.data?.keys.map((key) => <Key key={key.key?.id.toString()} keyData={key.key!} />)}
    </div>
  );
}

function Key({ keyData }: { keyData: KeyProto }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key #{keyData.id.toString()}{" "}</CardTitle>
        <CardDescription>Managed by <KeychainAddress address={keyData.keychainAddr} />.</CardDescription>
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
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/keys/${keyData.id}`}>
          <Button variant="secondary" size="sm">
            Open
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export async function loader({ params }: { params: Params<string> }) {
  if (!params.spaceAddr) {
    throw new Error("No space address provided");
  }
  return {
    spaceAddr: params.spaceAddr,
  };
}
