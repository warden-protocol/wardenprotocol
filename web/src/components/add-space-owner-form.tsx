import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";

function AddSpaceOwnerForm({ addr, spaceAddr }: { addr: string, spaceAddr: string }) {
  const { toast } = useToast();
  const client = useClient();
  const sendMsgAddSpaceOwner = client.WardenWarden.tx.sendMsgAddSpaceOwner;
  const [newOwner, setNewOwner] = useState("");

  return (
    <div className="flex flex-row items-center mt-4 gap-2">
      <input className="px-3 py-2 border border-slate-200 rounded-lg" type="text" placeholder="Add new owner" value={newOwner} onChange={(v) => setNewOwner(v.target.value)} />
      <Button onClick={async () => {
        await monitorTx(sendMsgAddSpaceOwner({
          value: {
            creator: addr,
            spaceAddr,
            newOwner,
            btl: 0,
          },
        }), toast);
        setNewOwner("");
      }}>
        Add
      </Button>
    </div>
  );
}

export default AddSpaceOwnerForm;
