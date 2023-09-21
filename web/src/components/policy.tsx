import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { BlackbirdPolicy, Policy as PolicyPB } from "@/proto/fusionchain/policy/policy_pb";
import { registry } from "@/proto";
import Web3 from "web3";

function policyType(typeUrl: string) {
  switch (typeUrl) {
    case "type.googleapis.com/fusionchain.policy.BlackbirdPolicy":
      return "Blackbird";
    default:
      return `Unknown (type ${typeUrl})`;
  }
}

export default function Policy({ policy }: { policy: PolicyPB }) {
  if (!policy.policy) {
    return <span>missing policy data</span>;
  }

  const data = policy.policy.unpack(registry);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{policy.name}</CardTitle>
        <CardDescription>Policy #{policy.id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Engine</span>
            <span>{policyType(policy.policy.typeUrl)}</span>
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

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-bold">Blackbird data</span>
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


