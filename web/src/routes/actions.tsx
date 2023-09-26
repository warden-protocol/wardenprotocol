import { useKeplrAddress } from "../keplr";
import Actions from "@/components/actions";

function ActionsPage() {
  const addr = useKeplrAddress();
  if (!addr) {
    return (
      <div className="px-6 mt-10">
        <h1 className="font-bold text-lg">Your actions</h1>
        <p>Connect your wallet to see your actions</p>
      </div>
    );
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your actions</h2>
          <p className="text-muted-foreground">
            Actions that interest you
          </p>
        </div>
      </div>

      <Actions />
    </div>
  )
}

export default ActionsPage;
