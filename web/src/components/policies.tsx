import { policies } from "@/client/policy";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useKeplrAddress } from "@/keplr";
import Policy from "./policy";
import { keplrBuildAndBroadcast } from "@/newclient";
import { MsgNewPolicy } from "@/proto/fusionchain/policy/tx_pb";
import { BlackbirdPolicy, BlackbirdPolicyParticipant } from "@/proto/fusionchain/policy/policy_pb";
import { Any } from "@bufbuild/protobuf";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Web3 from "web3";

async function createPolicy(creator: string, name: string, data: string, participants: string) {
  const dataBytes = Web3.utils.hexToBytes(data);
  const participantsList = participants.split(",").map((p) => {
    const [abbr, addr] = p.split(":");
    return new BlackbirdPolicyParticipant({ abbreviation: abbr.trim(), address: addr.trim() });
  });

  await keplrBuildAndBroadcast([
    new MsgNewPolicy({
      creator,
      name,
      policy: new Any({
        typeUrl: "/" + BlackbirdPolicy.typeName,
        value: new BlackbirdPolicy({
          data: dataBytes,
          participants: participantsList,
        }).toBinary(),
      }),
    }),
  ]);
}

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
          <Policy key={p.id.toString()} policy={p} />
        ))}
      </div>
    </div>
  )
}

function NewPolicyButton() {
  const addr = useKeplrAddress();
  const [name, setName] = useState("");
  const [policyData, setPolicyData] = useState("");
  const [participants, setParticipants] = useState("");

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Create policy
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Blackbird policy</SheetTitle>
          <SheetDescription>
            Obtain your compiled Blackbird policy from the Blackbird UI and paste the hex string here.
          </SheetDescription>
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
              Hex data
            </Label>
            <Input className="col-span-3" value={policyData} onChange={(e) => setPolicyData(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">
              Participants
              <br />
              <span>(e.g. "foo:qredo1234,bar:qredoAAAA")</span>
            </Label>
            <Input className="col-span-3" value={participants} onChange={(e) => setParticipants(e.target.value)} />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => createPolicy(addr, name, policyData, participants)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Policies;
