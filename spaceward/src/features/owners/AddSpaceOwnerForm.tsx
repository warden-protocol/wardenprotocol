import { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { fromBech32 } from "@cosmjs/encoding";
import { useNewAction } from "@/hooks/useAction";
import { warden } from "@wardenprotocol/wardenjs";

const { MsgAddSpaceOwner } = warden.warden.v1beta3;

export function AddSpaceOwnerForm({ spaceId }: { spaceId: string }) {
	const { newAction, authority } = useNewAction(MsgAddSpaceOwner);
	const [newOwner, setNewOwner] = useState("");
	const [avatar, setAvatar] = useState("");

	const isValid = useMemo(() => {
		try {
			return Boolean(fromBech32(newOwner));
		} catch {
			return false;
		}
	}, [newOwner]);

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

	async function addOwner(newOwner: string) {
		if (!authority) return;
		await newAction({
			newOwner,
			spaceId: BigInt(spaceId),
			authority,
		}, {});
	}

	return (
		<div className="flex flex-row items-center gap-2 w-full justify-between bg-background p-4 rounded-lg">
			<div className="flex flex-row items-center gap-4 w-full">
				{newOwner !== "" ? (
					<img className="w-10 h-10 rounded-full" src={avatar} />
				) : (
					<div className="w-10 h-10 bg-border rounded-full"></div>
				)}

				<input
					className="px-3 py-2 border rounded-lg ring-foreground xl:min-w-96"
					type="text"
					placeholder="Add new owner"
					value={newOwner}
					onChange={(v) => setNewOwner(v.target.value)}
				/>
				{!isValid && newOwner !== "" && (
					<span className="text-xs text-red-400">
						Invalid address
					</span>
				)}
			</div>

			<Button
				size={"sm"}
				disabled={!isValid}
				onClick={async () => {
					await addOwner(newOwner);
					setNewOwner("");
				}}
			>
				Add
			</Button>
		</div>
	);
}
