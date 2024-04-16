import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

export function AddSpaceOwnerForm({
	addr,
	spaceId,
}: {
	addr: string;
	spaceId: string;
}) {
	const { toast } = useToast();
	const client = useClient();
	const sendMsgAddSpaceOwner =
		client.WardenWardenV1Beta2.tx.sendMsgAddSpaceOwner;
	const [newOwner, setNewOwner] = useState("");
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		const avatarNew = createAvatar(shapes, {
			size: 512,
			seed: newOwner,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
		setAvatar(avatarNew);
	}, [newOwner]);

	return (
		<div className="flex flex-row items-center gap-2 w-full justify-between">
			<div className="flex flex-row items-center gap-4 w-full">
				{newOwner !== "" ? (
					<img className="w-10 h-10 rounded-full" src={avatar} />
				) : (
					<div className="w-10 h-10 bg-border rounded-full"></div>
				)}

				<input
					className="px-3 py-2 border rounded-lg ring-foreground min-w-96"
					type="text"
					placeholder="Add new owner"
					value={newOwner}
					onChange={(v) => setNewOwner(v.target.value)}
				/>
			</div>
			<Button
				size={"sm"}
				onClick={async () => {
					await monitorTx(
						sendMsgAddSpaceOwner({
							value: {
								creator: addr,
								spaceId,
								newOwner,
								btl: 0,
							},
						}),
						toast,
					);
					setNewOwner("");
				}}
			>
				Add
			</Button>
		</div>
	);
}
