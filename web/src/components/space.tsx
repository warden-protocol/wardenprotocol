import { Link } from "react-router-dom";
import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Space as SpacePB } from "@/proto/wardenprotocol/identity/space_pb";
import { Button } from "./ui/button";
import CardRow from "./card_row";
import IntentPreviewCard from "./intent_preview_card";

export default function Space({ space }: { space: SpacePB }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Space {space.address}</CardTitle>
        <CardDescription>Created by <Address address={space.creator} />.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardRow label="Admin intent">
          <IntentPreviewCard id={space.adminIntentId.toString()} />
        </CardRow>
        <CardRow label="Sign intent">
          <IntentPreviewCard id={space.signIntentId.toString()} />
        </CardRow>
        <ul className="flex flex-col space-y-1">
          <span className="text-sm font-bold">Owners</span>
          {space.owners.map((owner) => (
            <li key={owner} className="list-disc list-inside">
              <Address address={owner} />
            </li>
          ))}
        </ul>
        {space.childSpaces.length > 0 && (
          <span className="flex flex-col space-y-1 text-sm font-bold">
            {space.childSpaces.length} children spaces
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/spaces/${space.address}`}>
          <Button variant="secondary">
            Open details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
