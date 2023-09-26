import { Link } from "react-router-dom";
import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Workspace as WorkspacePB } from "@/proto/fusionchain/identity/workspace_pb";
import { Button } from "./ui/button";
import CardRow from "./card_row";
import PolicyPreviewCard from "./policy_preview_card";

export default function Workspace({ workspace }: { workspace: WorkspacePB }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace {workspace.address}</CardTitle>
        <CardDescription>Created by <Address address={workspace.creator} />.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardRow label="Admin policy">
          <PolicyPreviewCard id={workspace.adminPolicyId.toString()} />
        </CardRow>
        <CardRow label="Sign policy">
          <PolicyPreviewCard id={workspace.signPolicyId.toString()} />
        </CardRow>
        <ul className="flex flex-col space-y-1">
          <span className="text-sm font-bold">Owners</span>
          {workspace.owners.map((owner) => (
            <li key={owner} className="list-disc list-inside">
              <Address address={owner} />
            </li>
          ))}
        </ul>
        {workspace.childWorkspaces.length > 0 && (
          <span className="flex flex-col space-y-1 text-sm font-bold">
            {workspace.childWorkspaces.length} children workspaces
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/workspaces/${workspace.address}`}>
          <Button variant="secondary">
            Open details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
