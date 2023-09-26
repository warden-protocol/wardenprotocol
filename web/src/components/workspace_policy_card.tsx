import { Workspace } from "@/proto/fusionchain/identity/workspace_pb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import CardRow from "./card_row";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBroadcaster } from "@/hooks/keplr";
import { useKeplrAddress } from "@/keplr";
import { MsgUpdateWorkspace } from "@/proto/fusionchain/identity/tx_pb";
import PolicyPreviewCard from "./policy_preview_card";

export default function WorkspacePolicyCard({ workspace }: { workspace: Workspace }) {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [editMode, setEditMode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Policies</CardTitle>
        <CardDescription>Policies define who can operate on this workspace or use its keys to generate and sign transactions.</CardDescription>
      </CardHeader>
      {editMode ? (
        <EditCardContent workspace={workspace} onSave={async (adminPolicyId, signPolicyId) => {
          setEditMode(false);
          await broadcast([
            new MsgUpdateWorkspace({
              creator: addr,
              workspaceAddr: workspace.address,
              adminPolicyId: BigInt(adminPolicyId),
              signPolicyId: BigInt(signPolicyId),
            })
          ]);
        }} />
      ) : (
        <ViewCardContent workspace={workspace} onEdit={() => setEditMode(true)} />
      )}
    </Card>
  )
}

function ViewCardContent({ workspace, onEdit }: { workspace: Workspace, onEdit: () => void }) {
  return (
    <>
      <CardContent className="flex flex-col gap-4">
        <CardRow label="Admin policy">
          <PolicyPreviewCard id={workspace.adminPolicyId.toString()} />
        </CardRow>
        <CardRow label="Sign policy">
          <PolicyPreviewCard id={workspace.signPolicyId.toString()} />
        </CardRow>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit}>Edit</Button>
      </CardFooter>
    </>
  );
}

function EditCardContent({ workspace, onSave }: { workspace: Workspace, onSave: (adminPolicyId: string, signPolicyId: string) => void | Promise<void> }) {
  const [adminPolicyId, setAdminPolicyId] = useState(workspace.adminPolicyId.toString());
  const [signPolicyId, setSignPolicyId] = useState(workspace.signPolicyId.toString());

  return (
    <>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Label className="w-32">Admin policy ID:</Label>
            <Input value={adminPolicyId} onChange={e => setAdminPolicyId(e.target.value)} />
          </div>

          <PolicyPreviewCard id={adminPolicyId} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Label className="w-32">Sign policy ID:</Label>
            <Input value={signPolicyId} onChange={e => setSignPolicyId(e.target.value)} />
          </div>

          <PolicyPreviewCard id={signPolicyId} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSave(adminPolicyId, signPolicyId)}>Save</Button>
      </CardFooter>
    </>
  );
}

