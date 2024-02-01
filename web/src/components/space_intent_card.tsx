import { Space } from "@/proto/wardenprotocol/identity/space_pb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import CardRow from "./card_row";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";
import { useKeplrAddress } from "@/keplr";
import { MsgUpdateSpace } from "@/proto/wardenprotocol/identity/tx_pb";
import IntentPreviewCard from "./intent_preview_card";

export default function SpaceIntentCard({ space }: { space: Space }) {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [editMode, setEditMode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intents</CardTitle>
        <CardDescription>Intents define who can operate on this space or use its keys to generate and sign transactions.</CardDescription>
      </CardHeader>
      {editMode ? (
        <EditCardContent space={space} onSave={async (adminIntentId, signIntentId) => {
          setEditMode(false);
          await broadcast([
            new MsgUpdateSpace({
              creator: addr,
              spaceAddr: space.address,
              adminIntentId: BigInt(adminIntentId),
              signIntentId: BigInt(signIntentId),
            })
          ]);
        }} />
      ) : (
        <ViewCardContent space={space} onEdit={() => setEditMode(true)} />
      )}
    </Card>
  )
}

function ViewCardContent({ space, onEdit }: { space: Space, onEdit: () => void }) {
  return (
    <>
      <CardContent className="flex flex-col gap-4">
        <CardRow label="Admin intent">
          <IntentPreviewCard id={space.adminIntentId.toString()} />
        </CardRow>
        <CardRow label="Sign intent">
          <IntentPreviewCard id={space.signIntentId.toString()} />
        </CardRow>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit}>Edit</Button>
      </CardFooter>
    </>
  );
}

function EditCardContent({ space, onSave }: { space: Space, onSave: (adminIntentId: string, signIntentId: string) => void | Promise<void> }) {
  const [adminIntentId, setAdminIntentId] = useState(space.adminIntentId.toString());
  const [signIntentId, setSignIntentId] = useState(space.signIntentId.toString());

  return (
    <>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Label className="w-32">Admin intent ID:</Label>
            <Input value={adminIntentId} onChange={e => setAdminIntentId(e.target.value)} />
          </div>

          <IntentPreviewCard id={adminIntentId} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Label className="w-32">Sign intent ID:</Label>
            <Input value={signIntentId} onChange={e => setSignIntentId(e.target.value)} />
          </div>

          <IntentPreviewCard id={signIntentId} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSave(adminIntentId, signIntentId)}>Save</Button>
      </CardFooter>
    </>
  );
}

