import { MsgAddKeychainParty } from "@/proto/wardenprotocol/identity/tx_pb";
import { useState } from "react";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";

function AddKeychainPartyForm({ addr, keychainAddr }: { addr: string, keychainAddr: string }) {
  const { broadcast } = useBroadcaster();
  const [newParty, setNewParty] = useState("");

  return (
    <div className="flex flex-row items-center mt-4 gap-2">
      <input className="px-3 py-2 border border-slate-200 rounded-lg" type="text" placeholder="Add new party" value={newParty} onChange={(v) => setNewParty(v.target.value)} />
      <Button onClick={async () => {
        await broadcast([
          new MsgAddKeychainParty({ creator: addr, keychainAddr, party: newParty }),
        ]);
        setNewParty("");
      }}>
        Add
      </Button>
    </div>
  );
}

export default AddKeychainPartyForm;
