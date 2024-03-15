import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";

export default function NoActiveSpace() {
    const { address } = useAddressContext();
    const { toast } = useToast();
    const client = useClient();
    const sendMsgNewSpace = client.WardenWarden.tx.sendMsgNewSpace;
    return (
        <div className="w-full min-h-[60vh] flex flex-col gap-4 items-center place-content-center text-center">
            <h1 className="text-4xl font-bold">No Active Space</h1>
            <p className="text-muted-foreground">
                You have no active spaces, use the button below to create one.
            </p>
            <Button
                onClick={() => {
                    monitorTx(
                        sendMsgNewSpace({
                            value: {
                                creator: address,
                                signIntentId: 0,
                                adminIntentId: 0,
                                additionalOwners: [],
                            },
                        }),
                        toast
                    );
                }}
            >
                Create a new space
            </Button>
        </div>
    );
}
