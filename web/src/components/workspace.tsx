import { Link } from "react-router-dom";
import Address from "./address";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Workspace as WorkspacePB } from "@/proto/fusionchain/identity/workspace_pb";
import { Button } from "./ui/button";

export default function Workspace({ workspace }: { workspace: WorkspacePB }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace {workspace.address}</CardTitle>
        <CardDescription>Created by <Address address={workspace.creator} />.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Admin policy</span>
            <span>{workspace.adminPolicyId.toString() == "0" ? "default" : `#${workspace.adminPolicyId}`}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold">Sign policy</span>
            <span>{workspace.signPolicyId.toString() == "0" ? "default" : `#${workspace.signPolicyId}`}</span>
          </div>
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
        </div>
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
