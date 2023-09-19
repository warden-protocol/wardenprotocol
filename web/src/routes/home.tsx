import Workspaces from "../components/workspaces";
import { useKeplrAddress } from "../keplr";

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
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your workspaces</h2>
          <p className="text-muted-foreground">
            Click on a workspace to see and use its keys.
          </p>
        </div>
      </div>
      <Workspaces owner={addr} />
    </div>
  )
}

export default Home;
