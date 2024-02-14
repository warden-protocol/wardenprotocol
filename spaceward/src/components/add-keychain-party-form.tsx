import { useState } from "react";
import { Button } from "./ui/button";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "./ui/use-toast";

function AddKeychainPartyForm({ addr, keychainAddr }: { addr: string, keychainAddr: string }) {
  const { toast } = useToast();
  const client = useClient();
  const sendMsgAddKeychainParty = client.WardenWarden.tx.sendMsgAddKeychainParty;
  const [newParty, setNewParty] = useState("");

  return (
    <div className="flex flex-row items-center mt-4 gap-2">
      <input className="px-3 py-2 border border-slate-200 rounded-lg" type="text" placeholder="Add new party" value={newParty} onChange={(v) => setNewParty(v.target.value)} />
      <Button onClick={async () => {
        await monitorTx(sendMsgAddKeychainParty({
          value: {
            creator: addr,
            keychainAddr,
            party: newParty,
          }
        }), toast);
        setNewParty("");
      }}>
        Add
      </Button>
    </div>
  );
}

export default AddKeychainPartyForm;
