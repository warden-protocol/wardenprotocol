import { Button } from "./ui/button";
import { useKeplrAddress } from "@/keplr";
import { MsgNewKeychain } from "@/proto/wardenprotocol/identity/tx_pb";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";

function NewKeychainButton() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [description, setDescription] = useState("");

  async function createKeychain(creator: string, description: string) {
    await broadcast([
      new MsgNewKeychain({
        creator,
        description,
      }),
    ]);
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Create keychain
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New keychain</SheetTitle>
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
            <Button type="submit" onClick={() => createKeychain(addr, description)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NewKeychainButton;
