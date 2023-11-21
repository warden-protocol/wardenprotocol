import { policies } from "@/client/policy";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useKeplrAddress } from "@/keplr";
import Policy from "./policy";
import { MsgNewPolicy } from "@/proto/fusionchain/policy/tx_pb";
import { BoolparserPolicy, PolicyParticipant } from "@/proto/fusionchain/policy/policy_pb";
import { Any } from "@bufbuild/protobuf";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";

function Policies() {
  const policiesQ = useQuery({ queryKey: ["policies"], queryFn: () => policies() });
  const count = policiesQ.data?.policies.length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="ml-2">
          {count}{" "}
          {count === 1 ? "policy" : "policies"}
        </span>
        <NewPolicyButton />
      </div>

      <div className="mt-6">
        {policiesQ.data?.policies.map((p) => (
          <Policy key={p.policy!.id.toString()} response={p} />
        ))}
      </div>
    </div>
  )
}

function NewPolicyButton() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [name, setName] = useState("");
  const [policyDefinition, setPolicyDefinition] = useState("");
  const [participants, setParticipants] = useState<{ abbr: string, addr: string }[]>([]);
  const [newAbbr, setNewAbbr] = useState("");
  const [newAddr, setNewAddr] = useState("");

  async function createPolicy(creator: string, name: string, definition: string, participants: { addr: string, abbr: string }[]) {
    const participantsList = participants.map(({ abbr, addr }) => {
      if (abbr.startsWith("@")) {
        abbr = abbr.slice(1);
      }
      return new PolicyParticipant({ abbreviation: abbr, address: addr.trim() });
    });

    await broadcast([
      new MsgNewPolicy({
        creator,
        name,
        policy: new Any({
          typeUrl: "/" + BoolparserPolicy.typeName,
          value: new BoolparserPolicy({
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
          Create policy
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Boolparser policy</SheetTitle>
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
            <Input className="col-span-3" value={policyDefinition} onChange={(e) => setPolicyDefinition(e.target.value)} />
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
            <Button type="submit" onClick={() => createPolicy(addr, name, policyDefinition, participants)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Policies;
