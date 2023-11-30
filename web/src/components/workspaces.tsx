import { useQuery } from "@tanstack/react-query";
import { workspacesByOwner } from "../client/identity";
import Workspace from "./workspace";
import { MsgNewWorkspace } from "../proto/fusionchain/identity/tx_pb";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";
import { PlusIcon } from '@heroicons/react/20/solid'

export default function Workspaces({ owner }: { owner: string }) {
  const { broadcast } = useBroadcaster();
  const wsQuery = useQuery({ queryKey: ["workspaces", "owner", owner], queryFn: () => workspacesByOwner(owner) });
  const count = wsQuery.data?.workspaces.length;

  return (
    <div className="flex items-center content-center h-[50vh] place-content-center">
      {count && count > 0 ? (
        <div className="mt-6">
          {wsQuery.data?.workspaces.map((workspace) => (
            <Workspace key={workspace.address} workspace={workspace} />
          ))}
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h3 className="mt-2 text-3xl text-gray-900">No workspaces</h3>
            <p className="mt-1 text-gray-500">Get started by creating a new workspace.</p>
            <div className="mt-6">
              <Button
                type="button"
                onClick={() => {
                  broadcast([
                    new MsgNewWorkspace({ creator: owner }),
                  ]);
                }}
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                New Workspace
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
