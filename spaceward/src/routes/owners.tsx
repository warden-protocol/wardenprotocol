import AddSpaceOwnerForm from "@/components/add-space-owner-form";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import AddressAvatar from "@/components/address-avatar";
import NoActiveSpace from "@/components/no-active-space";

function Owners() {
    const { spaceId } = useSpaceId();
    const { address } = useAddressContext();

    const client = useClient();
    const { toast } = useToast();
    const sendMsgRemoveSpaceOwner =
        client.WardenWardenV1Beta2.tx.sendMsgRemoveSpaceOwner;
    const { QuerySpaceById } = useWardenWardenV1Beta2();
    const wsQuery = QuerySpaceById({ id: spaceId }, {});
    const space = wsQuery.data?.space as Required<SpaceModel>;

    if (!space) {
        return <NoActiveSpace />;
    }

    return (
        <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
            <div className="flex items-center justify-between pb-4 space-y-2 border-b">
                <div>
                    <h2 className="text-4xl">Owners</h2>
                    <p className="text-muted-foreground hidden xl:block">
                        With default intents, owners will be able to perform
                        actions such as adding other owners or signing
                        transactions.
                    </p>
                </div>
            </div>
            <div>
                <div className="w-full items-center gap-4">
                    <div className="flex flex-col">
                        {space.owners.map((owner) => (
                            <div
                                key={owner}
                                className="group w-full flex items-center justify-between bg-card first:rounded-t-lg border border-b-0 px-4 py-4 border-t overflow-scroll last:border-b hover:bg-background"
                            >
                                <div className="flex flex-row space-x-4 items-center">
                                    <AddressAvatar
                                        seed={owner || ""}
                                        disableTooltip
                                    />
                                    <span>{owner}</span>
                                </div>

                                <Button
                                    variant="destructive"
                                    size={"sm"}
                                    className="opacity-40 group-hover:opacity-100"
                                    onClick={() => {
                                        monitorTx(
                                            sendMsgRemoveSpaceOwner({
                                                value: {
                                                    creator: address,
                                                    spaceId: spaceId,
                                                    owner,
                                                    btl: 0,
                                                },
                                            }),
                                            toast
                                        );
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <div className="group w-full bg-card hover:bg-background overflow-scroll flex items-center justify-between px-4 py-4 border rounded-b-lg">
                            <AddSpaceOwnerForm
                                addr={address}
                                spaceId={spaceId}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Owners;
