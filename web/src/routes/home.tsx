import Workspaces from "../components/workspaces";
import { useKeplrAddress } from "../keplr";
import { keplrBuildAndBroadcast } from "../newclient";
import { MsgNewWorkspace } from "../proto/fusionchain/identity/tx_pb";

async function createWorkspace(owner: string) {
  await keplrBuildAndBroadcast([
    new MsgNewWorkspace({ creator: owner }),
  ]);
}

function Home() {
  const addr = useKeplrAddress();
  if (!addr) {
    return (
      <div className="px-6 mt-10">
        <h1 className="font-bold text-lg">Your workspaces</h1>
        <p>Connect your wallet to see your workspaces</p>
      </div>
    );
  }

  return (
    <div className="px-6 mt-10">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Your workspaces</h1>
          <span className="text-gray-800 italic">
            Workspace: a group of users managing a group of keys
          </span>
        </div>

        <button className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg" onClick={() => createWorkspace(addr)}>
          Create workspace
        </button>
      </div>

      <Workspaces owner={addr} />
    </div>
  )
}

export default Home;
