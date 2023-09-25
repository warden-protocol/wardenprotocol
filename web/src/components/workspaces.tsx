import { useQuery } from "@tanstack/react-query";
import { workspacesByOwner } from "../client/identity";
import Workspace from "./workspace";
import { MsgNewWorkspace } from "../proto/fusionchain/identity/tx_pb";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";

export default function Workspaces({ owner }: { owner: string }) {
  const { broadcast } = useBroadcaster();
  const wsQuery = useQuery({ queryKey: ["workspaces", "owner", owner], queryFn: () => workspacesByOwner(owner) });
  const count = wsQuery.data?.workspaces.length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="ml-2">
          {count}{" "}
          {count === 1 ? "workspace" : "workspaces"}
        </span>
        <Button onClick={() => {
          broadcast([
            new MsgNewWorkspace({ creator: owner }),
          ]);
        }}>
          Create workspace
        </Button>
      </div>

      <div className="mt-6">
        {wsQuery.data?.workspaces.map((workspace) => (
          <Workspace key={workspace.address} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}
