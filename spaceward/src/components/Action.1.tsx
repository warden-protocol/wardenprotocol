import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import CardRow from "./card-row";
import { TxMsgDetails } from "./tx-msg-details";
import { useAddressContext } from "@/def-hooks/addressContext";
import { Action as ActionModel } from "wardenprotocol-warden-client-ts/lib/warden.intent/rest";
import { useClient } from "@/hooks/useClient";
import { useToast } from "./ui/use-toast";
import { monitorTx } from "@/hooks/keplr";
import { prettyActionStatus } from "@/utils/formatting";

export default function Action({ action }: { action: Required<ActionModel> }) {
    const { address } = useAddressContext();
    const toast = useToast();
    const client = useClient();
    const sendMsgApproveAction = client.WardenIntent.tx.sendMsgApproveAction;

    if (!action.msg) {
        return <p>Missing action msg</p>;
    }

    const actionType = action.msg["@type"];
    if (!actionType) {
        return <p>Missing action type</p>;
    }

    return (
        <Card className="border-0 p-0 m-0 pt-4">
            {/* <CardHeader> */}
            {/* <CardTitle>Action #{action.id.toString()}</CardTitle> */}
            {/* <CardDescription>Created by <Address address={action.} />.</CardDescription> */}
            {/* </CardHeader> */}
            <CardContent className="p-0">
                <div className="grid w-full items-center gap-4">
                    <CardRow label="Intent">{action.intent_id.toString() == "0" ? `Default intent for ${actionType}` : `Intent #${action.intent_id.toString()}`}</CardRow>
                    <CardRow label="Status">{prettyActionStatus(action.status)}</CardRow>
                    <CardRow label="Action type">{actionType}</CardRow>
                    {action.msg ? (<TxMsgDetails msg={action.msg as any} />) : null}
                </div>
            </CardContent>
            <CardFooter className="p-0 pt-6">
                <Button onClick={async () => {
                    monitorTx(sendMsgApproveAction({
                        value: {
                            creator: address,
                            actionType,
                            actionId: parseInt(action.id, 10),
                            intentPayload: undefined,
                        }
                    }), toast);
                }}>
                    Approve action
                </Button>
            </CardFooter>
        </Card>
    );
}

