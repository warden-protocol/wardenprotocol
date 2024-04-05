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
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { useToast } from "./ui/use-toast";

function NewIntentButton() {
    const { address } = useAddressContext();
    const [name, setName] = useState("");
    const [definition, setDefinition] = useState("");
    const { toast } = useToast();
    const client = useClient();
    const sendMsgNewIntent = client.WardenIntent.tx.sendMsgNewIntent;

    async function createIntent() {
        await monitorTx(
            sendMsgNewIntent({
                value: {
                    creator: address,
                    name,
                    definition,
                },
            }),
            toast
        );
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button size="sm">Create intent</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Intent</SheetTitle>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="name">Definition</Label>
                        <Input
                            className="col-span-3"
                            value={definition}
                            onChange={(e) =>
                                setDefinition(e.target.value)
                            }
                        />
                    </div>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            type="submit"
                            size="sm"
                            onClick={() => createIntent()}
                        >
                            Create
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default NewIntentButton;
