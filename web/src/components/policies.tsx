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
import { compile } from "@/client/blackbird";
import { useDebounce } from "use-debounce";

async function createPolicy(creator: string, name: string, data: string, participants: Record<string, string>) {
  const dataBytes = Web3.utils.hexToBytes(data);
  const participantsList = Object.entries(participants).map(([abbr, addr]) => {
    if (abbr.startsWith("@")) {
      abbr = abbr.slice(1);
    }
    return new BlackbirdPolicyParticipant({ abbreviation: abbr, address: addr.trim() });
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
  const [policySrc, setPolicySrc] = useState("");
  const [debouncedPolicySrc] = useDebounce(policySrc, 500);
  const [participants, setParticipants] = useState<Record<string, string>>({});
  const compileQ = useQuery(["compile", debouncedPolicySrc], () => compile(debouncedPolicySrc), {
    retry: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });
  const participantsSrc = compileQ.data?.signatures.map(([_, abbr]) => abbr);
  const policyCompiled = compileQ.data?.protobuffer;

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Create policy
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
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
              Definition
            </Label>
            <Input className="col-span-3" value={policySrc} onChange={(e) => setPolicySrc(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">
              Blackbird output
            </Label>
            { compileQ.status === "loading" && <Input className="col-span-3" disabled value="Loading..." /> }
            { compileQ.status === "error" && <Input className="col-span-3" disabled value="Error!" /> }
            { compileQ.status === "success" && <Input className="col-span-3" disabled value={policyCompiled} /> }
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <Label htmlFor="name">
            Participants
          </Label>
          {
            !participantsSrc && (
              <div className="flex flex-col gap-4">
                <Input className="col-span-3" disabled value="Loading..." />
              </div>
            )
          }

          { participantsSrc && participantsSrc.map(abbr => (
            <div className="flex flex-col gap-4" key={abbr}>
              <Label>
                {abbr}
              </Label>
              <Input className="col-span-3" placeholder={`Address for ${abbr}`} value={participants[abbr] || ""} onChange={(e) => setParticipants({
                ...participants,
                [abbr]: e.target.value,
              })} />
            </div>
          )) }
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={!policyCompiled || compileQ.status !== "success"} onClick={() => createPolicy(addr, name, policyCompiled!, participants)}>Create</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Policies;
