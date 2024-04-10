import { Button } from "./ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { monitorTx } from "@/hooks/keplr";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { useToast } from "./ui/use-toast";

function NewKeychainButton() {
    const { address } = useAddressContext();
    const [description, setDescription] = useState("");

    const { toast } = useToast();
    const client = useClient();
    const sendMsgNewKeychain = client.WardenWardenV1Beta2.tx.sendMsgNewKeychain;

    async function createKeychain(creator: string, description: string) {
        await monitorTx(
            sendMsgNewKeychain({
                value: {
                    creator,
                    description,
                    adminIntentId: 0,
                    keychainFees: undefined,
                },
            }),
            toast
        );
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Create keychain</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New keychain</SheetTitle>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            className="col-span-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            type="submit"
                            onClick={() => createKeychain(address, description)}
                        >
                            Create
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default NewKeychainButton;
