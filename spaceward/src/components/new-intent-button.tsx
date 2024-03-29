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
        <Button className="flex gap-2 px-6 py-4 h-11 rounded-none">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.23223 2.23223C4.70107 1.76339 5.33696 1.5 6 1.5H14.5C14.6326 1.5 14.7598 1.55268 14.8536 1.64645L20.3536 7.14645C20.4473 7.24021 20.5 7.36739 20.5 7.5V20C20.5 20.663 20.2366 21.2989 19.7678 21.7678C19.2989 22.2366 18.663 22.5 18 22.5H4C3.72386 22.5 3.5 22.2761 3.5 22C3.5 21.7239 3.72386 21.5 4 21.5H18C18.3978 21.5 18.7794 21.342 19.0607 21.0607C19.342 20.7794 19.5 20.3978 19.5 20V7.70711L14.2929 2.5H6C5.60218 2.5 5.22064 2.65804 4.93934 2.93934C4.65804 3.22064 4.5 3.60218 4.5 4V8C4.5 8.27614 4.27614 8.5 4 8.5C3.72386 8.5 3.5 8.27614 3.5 8V4C3.5 3.33696 3.76339 2.70107 4.23223 2.23223Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 1.5C14.2761 1.5 14.5 1.72386 14.5 2V7.5H20C20.2761 7.5 20.5 7.72386 20.5 8C20.5 8.27614 20.2761 8.5 20 8.5H14C13.7239 8.5 13.5 8.27614 13.5 8V2C13.5 1.72386 13.7239 1.5 14 1.5Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.5 15C2.5 14.7239 2.72386 14.5 3 14.5H9C9.27614 14.5 9.5 14.7239 9.5 15C9.5 15.2761 9.27614 15.5 9 15.5H3C2.72386 15.5 2.5 15.2761 2.5 15Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 11.5C6.27614 11.5 6.5 11.7239 6.5 12V18C6.5 18.2761 6.27614 18.5 6 18.5C5.72386 18.5 5.5 18.2761 5.5 18V12C5.5 11.7239 5.72386 11.5 6 11.5Z"
              fill="black"
            />
          </svg>
          Create
        </Button>
      </SheetTrigger>

      

      {/* <SheetContent>
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
              onChange={(e) => setDefinition(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" size="sm" onClick={() => createIntent()}>
              Create
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent> */}
    </Sheet>
  );
}

export default NewIntentButton;
