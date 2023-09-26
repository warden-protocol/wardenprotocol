import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Action as ActionPB, ActionStatus } from "@/proto/fusionchain/policy/action_pb";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";
import { MsgApproveAction } from "@/proto/fusionchain/policy/tx_pb";
import { useKeplrAddress } from "@/keplr";
import CardRow from "./card_row";
import { TxMsgDetails } from "./tx_msg_details";

export default function Action({ action }: { action: ActionPB }) {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const actionType = action.msg?.typeUrl.startsWith("type.googleapis.com") ? action.msg?.typeUrl.slice(19) : action.msg?.typeUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Action #{action.id.toString()}</CardTitle>
        {/* <CardDescription>Created by <Address address={action.} />.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <CardRow label="Policy">{action.policyId.toString() == "0" ? `Default policy for ${actionType}` : `Policy #${action.policyId.toString()}`}</CardRow>
          <CardRow label="Status">{prettyActionStatus(action.status)}</CardRow>
          <CardRow label="Intent">{actionType}</CardRow>
          { action.msg ? ( <TxMsgDetails msg={action.msg} /> ) : null }
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={async () => {
          await broadcast([
            new MsgApproveAction({
              creator: addr,
              actionType,
              actionId: action.id,
            })
          ]);
        }}>
          Approve action
        </Button>
      </CardFooter>
    </Card>
  );
}

function prettyActionStatus(s: ActionStatus) {
  switch (s) {
    case ActionStatus.PENDING:
      return "Pending approvals";
    case ActionStatus.COMPLETED:
      return "Completed";
    case ActionStatus.REVOKED:
      return "Revoked";
    default:
      return "Unknown";
  }
}
