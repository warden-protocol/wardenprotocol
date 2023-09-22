import { TxParsed } from "@/client/chain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Any } from "@bufbuild/protobuf";
import { registry } from "@/proto";
import { MsgSend } from "@/proto/cosmos/bank/v1beta1/tx_pb";
import Address from "./address";
import { MsgNewWorkspace } from "@/proto/fusionchain/identity/tx_pb";

export default function TxDetails({ tx, index }: { tx: TxParsed, index: number }) {
  const msgs = tx.body.messages;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction #{index}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Row label="Hash">{tx.hash}</Row>
        <Row label="Memo">{tx.body.memo}</Row>
        <Row label="Timeout height">{tx.body.timeoutHeight.toString()}</Row>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-sm w-[100px]">Messages ({msgs.length}):</span>
          <ul className="pl-4">
            {
              msgs.map((msg, i) => <li key={i}><TxMsgDetails msg={msg} /></li>)
            }
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <span className="font-bold text-sm w-[100px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

function TxMsgDetails({ msg }: { msg: Any }) {
  try {
    const data = msg.unpack(registry);
    if (data instanceof MsgSend) {
      return <MsgSendDetails msg={data} />;
    }
    if (data instanceof MsgNewWorkspace) {
      return <MsgNewWorkspaceDetails msg={data} />;
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
        <Row label="From"><Address address={msg.fromAddress} /></Row>
        <Row label="To"><Address address={msg.toAddress} /></Row>
        <Row label="Amount">{msg.amount.map((amount) => `${amount.amount} ${amount.denom}`).join(", ")}</Row>
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
        <Row label="From"><Address address={msg.creator} /></Row>
        <Row label="Admin policy">{msg.adminPolicyId.toString()}</Row>
        <Row label="Sign policy">{msg.signPolicyId.toString()}</Row>
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
