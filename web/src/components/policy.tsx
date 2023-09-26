import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { BlackbirdPolicy, BlackbirdPolicyMetadata } from "@/proto/fusionchain/policy/policy_pb";
import { registry } from "@/proto";
import Web3 from "web3";
import { PolicyResponse } from "@/proto/fusionchain/policy/query_pb";

function policyType(typeUrl: string) {
  switch (typeUrl) {
    case "type.googleapis.com/fusionchain.policy.BlackbirdPolicy":
      return "Blackbird";
    default:
      return `Unknown (type ${typeUrl})`;
  }
}

export default function Policy({ response }: { response: PolicyResponse }) {
  if (!response.policy || !response.policy.policy) {
    return <span>missing policy data</span>;
  }

  const metadata = response.metadata?.unpack(registry);
  const data = response.policy.policy.unpack(registry);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{response.policy.name}</CardTitle>
        <CardDescription>Policy #{response.policy.id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Engine</span>
            <span>{policyType(response.policy.policy.typeUrl)}</span>
          </div>

          {data instanceof BlackbirdPolicy && (
            <>
              <ul className="flex flex-col space-y-1">
                <span className="text-sm font-bold">Participants</span>
                {data.participants.map((p) => (
                  <li key={p.address} className="list-disc list-inside">
                    @{p.abbreviation} ➡ <Address address={p.address} />
                  </li>
                ))}
              </ul>

              {metadata instanceof BlackbirdPolicyMetadata && (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold">Blackbird definition</span>
                  <span>{metadata.pretty}</span>
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-bold">Blackbird compiled data</span>
                <span className="font-mono break-all">{Web3.utils.bytesToHex(data.data)}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}


