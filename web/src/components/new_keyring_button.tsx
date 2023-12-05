import { Button } from "./ui/button";
import { useKeplrAddress } from "@/keplr";
import { MsgNewKeyring } from "@/proto/fusionchain/identity/tx_pb";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";

function NewKeyringButton() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [description, setDescription] = useState("");

  async function createKeyring(creator: string, description: string) {
    await broadcast([
      new MsgNewKeyring({
        creator,
        description,
      }),
    ]);
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Create keyring
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New keyring</SheetTitle>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="description">
              Description
            </Label>
            <Input className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => createKeyring(addr, description)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NewKeyringButton;
