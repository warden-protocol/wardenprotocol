import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { BoolparserIntent } from "@/proto/wardenprotocol/intent/intent_pb";
import { registry } from "@/proto";
import { IntentResponse } from "@/proto/wardenprotocol/intent/query_pb";

function intentType(typeUrl: string) {
  switch (typeUrl) {
    case "type.googleapis.com/wardenprotocol.intent.BoolparserIntent":
      return "Boolparser";
    default:
      return `Unknown (type ${typeUrl})`;
  }
}

export default function Intent({ response }: { response: IntentResponse }) {
  if (!response.intent || !response.intent.intent) {
    return <span>missing intent data</span>;
  }

  const data = response.intent.intent.unpack(registry);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{response.intent.name}</CardTitle>
        <CardDescription>Intent #{response.intent.id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Engine</span>
            <span>{intentType(response.intent.intent.typeUrl)}</span>
          </div>

          {data instanceof BoolparserIntent && (
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
                <span className="text-sm font-bold">Definition</span>
                <span>{data.definition}</span>
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


