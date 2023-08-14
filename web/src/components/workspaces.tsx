import { useQuery } from "@tanstack/react-query";
import { workspacesByOwner } from "../client/identity";
import Workspace from "./workspace";

export default function Workspaces({ owner }: { owner: string }) {
  const wsQuery = useQuery({ queryKey: ["workspaces"], queryFn: () => workspacesByOwner(owner) });

  return (
    <div className="mt-6 space-y-3">
      {wsQuery.data?.workspaces.map((workspace) => (
        <Workspace key={workspace.address} workspace={workspace} />
      ))}
    </div>
  );
}
