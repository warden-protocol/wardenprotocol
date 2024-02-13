import { IntentResponse } from "wardenprotocol-warden-client-ts/lib/warden.intent/rest";
import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

function intentType(typeUrl: string | undefined) {
  switch (typeUrl) {
    case "/warden.intent.BoolparserIntent":
      return "Boolparser";
    default:
      return `Unknown (type ${typeUrl})`;
  }
}

export default function Intent({ response }: { response: IntentResponse }) {
  if (!response.intent || !response.intent.intent) {
    return <span>missing intent data</span>;
  }

  const data = response.intent.intent as {
    definition: string;
    participants: Array<{ abbreviation: string; address: string }>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{response.intent.name}</CardTitle>
        <CardDescription>Intent #{response.intent.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Engine</span>
            <span>{intentType(response.intent.intent["@type"])}</span>
          </div>

          <ul className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Participants</span>
            {data.participants.map((p) => (
              <li key={p.address} className="">
                @{p.abbreviation} ➡ <Address address={p.address} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Definition</span>
            <span>{data.definition}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}


