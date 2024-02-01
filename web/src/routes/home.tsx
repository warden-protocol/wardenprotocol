import Spaces from "../components/spaces";
import { useKeplrAddress } from "../keplr";
import { MsgNewSpace } from "../proto/wardenprotocol/identity/tx_pb";
import { Button } from "@/components/ui/button";
import { useBroadcaster } from "@/hooks/keplr";

function Home() {
  const { broadcast } = useBroadcaster();
  const addr = useKeplrAddress();
  if (!addr) {
    return (
      <div className="px-6 mt-10">
        <h1 className="text-lg font-bold">Your spaces</h1>
        <p>Connect your wallet to see your spaces</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
      <div className="flex items-center justify-between pb-4 space-y-2 border-b">
        <div>
          <h2 className="text-4xl">Spaces</h2>
          <p className="text-muted-foreground">
            Click on a space to see and use its keys.
          </p>
        </div>
        <div>
          <Button onClick={() => {
            broadcast([
              new MsgNewSpace({ creator: addr }),
            ]);
          }}>
            Create
          </Button>
        </div>
      </div>
      <Spaces owner={addr} />
    </div>
  )
}

export default Home;
