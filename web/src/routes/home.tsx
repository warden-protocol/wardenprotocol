import Workspaces from "../components/workspaces";
import { useKeplrAddress } from "../keplr";
import { MsgNewWorkspace } from "../proto/fusionchain/identity/tx_pb";
import { Button } from "@/components/ui/button";
import { useBroadcaster } from "@/hooks/keplr";

function Home() {
  const { broadcast } = useBroadcaster();
  const addr = useKeplrAddress();
  if (!addr) {
    return (
      <div className="px-6 mt-10">
        <h1 className="text-lg font-bold">Your workspaces</h1>
        <p>Connect your wallet to see your workspaces</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
      <div className="flex items-center justify-between pb-4 space-y-2 border-b">
        <div>
          <h2 className="text-4xl">Workspaces</h2>
          <p className="text-muted-foreground">
            Click on a workspace to see and use its keys.
          </p>
        </div>
        <div>
          <Button onClick={() => {
            broadcast([
              new MsgNewWorkspace({ creator: addr }),
            ]);
          }}>
            Create
          </Button>
        </div>
      </div>
      <Workspaces owner={addr} />
    </div>
  )
}

export default Home;
