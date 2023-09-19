import { keplrBuildAndBroadcast } from "@/newclient";
import { MsgAddWorkspaceOwner } from "@/proto/fusionchain/identity/tx_pb";
import { useState } from "react";
import { Button } from "./ui/button";

async function addOwner(creator: string, workspaceAddr: string, newOwner: string) {
  await keplrBuildAndBroadcast([
    new MsgAddWorkspaceOwner({ creator, workspaceAddr, newOwner }),
  ]);
}

function AddWorkspaceOwnerForm({ addr, workspaceAddr }: { addr: string, workspaceAddr: string }) {
  const [newOwner, setNewOwner] = useState("");

  return (
    <div className="flex flex-row items-center mt-4 gap-2">
      <input className="px-3 py-2 border border-slate-200 rounded-lg" type="text" placeholder="Add new owner" value={newOwner} onChange={(v) => setNewOwner(v.target.value)} />
      <Button onClick={async () => {
        await addOwner(addr, workspaceAddr, newOwner);
        setNewOwner("");
      }}>
        Add
      </Button>
    </div>
  );
}

export default AddWorkspaceOwnerForm;
