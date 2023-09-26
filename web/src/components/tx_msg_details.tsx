import { Any } from "@bufbuild/protobuf";
import { registry } from "@/proto";
import { MsgSend } from "@/proto/cosmos/bank/v1beta1/tx_pb";
import Address from "./address";
import { MsgAddWorkspaceOwner, MsgNewWorkspace, MsgRemoveWorkspaceOwner } from "@/proto/fusionchain/identity/tx_pb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CardRow from "./card_row";

export function TxMsgDetails({ msg }: { msg: Any }) {
  try {
    const data = msg.unpack(registry);
    if (data instanceof MsgSend) {
      return <MsgSendDetails msg={data} />;
    }
    if (data instanceof MsgNewWorkspace) {
      return <MsgNewWorkspaceDetails msg={data} />;
    }
    if (data instanceof MsgAddWorkspaceOwner) {
      return <MsgAddWorkspaceOwnerDetails msg={data} />;
    }
    if (data instanceof MsgRemoveWorkspaceOwner) {
      return <MsgRemoveWorkspaceOwnerDetails msg={data} />;
    }
    throw new Error("Unsupported message type");
  } catch (e) {
    return <MsgFallback msg={msg} />
  }
}

function MsgSendDetails({ msg }: { msg: MsgSend }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank send</CardTitle>
        <CardDescription>Transfer of coins.</CardDescription>
      </CardHeader>
      <CardContent>
        <CardRow label="From"><Address address={msg.fromAddress} /></CardRow>
        <CardRow label="To"><Address address={msg.toAddress} /></CardRow>
        <CardRow label="Amount">{msg.amount.map((amount) => `${amount.amount} ${amount.denom}`).join(", ")}</CardRow>
      </CardContent>
    </Card>
  );
}

function MsgNewWorkspaceDetails({ msg }: { msg: MsgNewWorkspace }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New workspace</CardTitle>
        <CardDescription>Creation of a new workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <CardRow label="From"><Address address={msg.creator} /></CardRow>
        <CardRow label="Admin policy">{msg.adminPolicyId.toString()}</CardRow>
        <CardRow label="Sign policy">{msg.signPolicyId.toString()}</CardRow>
      </CardContent>
    </Card>
  );
}

function MsgAddWorkspaceOwnerDetails({ msg }: { msg: MsgAddWorkspaceOwner }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add owner</CardTitle>
        <CardDescription>Add a new owner to a workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <CardRow label="From"><Address address={msg.creator} /></CardRow>
        <CardRow label="Workspace">{msg.workspaceAddr}</CardRow>
        <CardRow label="New owner"><Address address={msg.newOwner} /></CardRow>
      </CardContent>
    </Card>
  );
}

function MsgRemoveWorkspaceOwnerDetails({ msg }: { msg: MsgRemoveWorkspaceOwner }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Remove owner</CardTitle>
        <CardDescription>Remove a new owner to a workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <CardRow label="From"><Address address={msg.creator} /></CardRow>
        <CardRow label="Workspace">{msg.workspaceAddr}</CardRow>
        <CardRow label="Removed owner"><Address address={msg.owner} /></CardRow>
      </CardContent>
    </Card>
  );
}

function MsgFallback({ msg }: { msg: Any }) {
  const type = msg.typeUrl;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>
          <span className="text-sm text-red-500">Unsupported message type.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm">Raw value</span>
          <span className="font-mono break-all">{msg.value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
