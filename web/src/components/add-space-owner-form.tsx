import { MsgAddSpaceOwner } from "@/proto/wardenprotocol/identity/tx_pb";
import { useState } from "react";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";

function AddSpaceOwnerForm({ addr, spaceAddr }: { addr: string, spaceAddr: string }) {
  const { broadcast } = useBroadcaster();
  const [newOwner, setNewOwner] = useState("");

  return (
    <div className="flex flex-row items-center mt-4 gap-2">
      <input className="px-3 py-2 border border-slate-200 rounded-lg" type="text" placeholder="Add new owner" value={newOwner} onChange={(v) => setNewOwner(v.target.value)} />
      <Button onClick={async () => {
        await broadcast([
          new MsgAddSpaceOwner({ creator: addr, spaceAddr, newOwner }),
        ]);
        setNewOwner("");
      }}>
        Add
      </Button>
    </div>
  );
}

export default AddSpaceOwnerForm;
