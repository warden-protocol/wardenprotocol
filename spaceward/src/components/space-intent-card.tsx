import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import CardRow from "./card-row";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import IntentPreviewCard from "./intent-preview-card";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "./ui/use-toast";
import { Space } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/module";

export default function SpaceIntentCard({ space }: { space: Space }) {
	const { address } = useAddressContext();
	const [editMode, setEditMode] = useState(false);

	const { toast } = useToast();
	const client = useClient();
	const sendMsgUpdateSpace = client.WardenWarden.tx.sendMsgUpdateSpace;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Intents</CardTitle>
				<CardDescription>
					Intents define who can operate on this space or use its keys
					to generate and sign transactions.
				</CardDescription>
			</CardHeader>
			{editMode ? (
				<EditCardContent
					space={space}
					onSave={async (adminIntentId, signIntentId) => {
						setEditMode(false);
						monitorTx(
							sendMsgUpdateSpace({
								value: {
									creator: address,
									spaceId: space.id,
									adminIntentId: adminIntentId,
									signIntentId: signIntentId,
									btl: 0,
								},
							}),
							toast
						);
					}}
				/>
			) : (
				<ViewCardContent
					space={space}
					onEdit={() => setEditMode(true)}
				/>
			)}
		</Card>
	);
}

function ViewCardContent({
	space,
	onEdit,
}: {
	space: Space;
	onEdit: () => void;
}) {
	return (
		<>
			<CardContent className="flex flex-col gap-4">
				<CardRow label="Admin intent">
					<IntentPreviewCard id={space.admin_intent_id} />
				</CardRow>
				<CardRow label="Sign intent">
					<IntentPreviewCard id={space.sign_intent_id} />
				</CardRow>
			</CardContent>
			<CardFooter>
				<Button onClick={onEdit}>Edit</Button>
			</CardFooter>
		</>
	);
}

function EditCardContent({
	space,
	onSave,
}: {
	space: Space;
	onSave: (
		adminIntentId: number,
		signIntentId: number
	) => void | Promise<void>;
}) {
	const [adminIntentId, setAdminIntentId] = useState(space.admin_intent_id);
	const [signIntentId, setSignIntentId] = useState(space.sign_intent_id);

	return (
		<>
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-3 items-center">
						<Label className="w-32">Admin intent ID:</Label>
						<Input
							value={adminIntentId}
							onChange={(e) =>
								setAdminIntentId(parseInt(e.target.value, 10))
							}
						/>
					</div>

					<IntentPreviewCard id={adminIntentId} />
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-3 items-center">
						<Label className="w-32">Sign intent ID:</Label>
						<Input
							value={signIntentId}
							onChange={(e) =>
								setSignIntentId(parseInt(e.target.value, 10))
							}
						/>
					</div>

					<IntentPreviewCard id={signIntentId} />
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={() => onSave(adminIntentId, signIntentId)}>
					Save
				</Button>
			</CardFooter>
		</>
	);
}
