import { Button } from "./ui/button";
import { useKeplrAddress } from "@/keplr";
import { MsgNewIntent } from "@/proto/wardenprotocol/intent/tx_pb";
import { BoolparserIntent, IntentParticipant } from "@/proto/wardenprotocol/intent/intent_pb";
import { Any } from "@bufbuild/protobuf";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";

function NewIntentButton() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [name, setName] = useState("");
  const [intentDefinition, setIntentDefinition] = useState("");
  const [participants, setParticipants] = useState<{ abbr: string, addr: string }[]>([]);
  const [newAbbr, setNewAbbr] = useState("");
  const [newAddr, setNewAddr] = useState("");

  async function createIntent(creator: string, name: string, definition: string, participants: { addr: string, abbr: string }[]) {
    const participantsList = participants.map(({ abbr, addr }) => {
      if (abbr.startsWith("@")) {
        abbr = abbr.slice(1);
      }
      return new IntentParticipant({ abbreviation: abbr, address: addr.trim() });
    });

    await broadcast([
      new MsgNewIntent({
        creator,
        name,
        intent: new Any({
          typeUrl: "/" + BoolparserIntent.typeName,
          value: new BoolparserIntent({
            definition,
            participants: participantsList,
          }).toBinary(),
        }),
      }),
    ]);
  }


  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Create intent
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Boolparser intent</SheetTitle>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">
              Definition
            </Label>
            <Input className="col-span-3" value={intentDefinition} onChange={(e) => setIntentDefinition(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <Label htmlFor="name">
            Participants
          </Label>
          {participants.map(({ abbr, addr }) => (
            <div className="flex flex-row gap-4" key={abbr}>
              <Input disabled value={abbr} />
              <Input disabled value={addr} />
              <Button onClick={() => {
                setParticipants(participants.filter((p) => p.abbr !== abbr));
              }}>Remove</Button>
            </div>
          ))}

          <div className="flex flex-row gap-4">
            <Input placeholder="Abbreviation" value={newAbbr} onChange={(e) => setNewAbbr(e.target.value)} />
            <Input placeholder="Address" value={newAddr} onChange={(e) => setNewAddr(e.target.value)} />
            <Button onClick={() => {
              setParticipants([
                ...participants,
                { abbr: newAbbr, addr: newAddr },
              ]);
              setNewAbbr("");
              setNewAddr("");
            }}>Add</Button>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => createIntent(addr, name, intentDefinition, participants)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NewIntentButton;