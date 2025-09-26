import clsx from "clsx";
import { useState } from "react";
import "@/assets/animate.css";
import { Edit2Icon, XIcon } from "lucide-react";
import AddressAvatar from "@/components/AddressAvatar";
import { useOwnerSettingsState } from "./state";
import { IconsOwner } from "./Icons";
import { Copy } from "@/components/ui/copy";

export default function OwnerCard({
	onRemove,
	owner,
}: {
	owner: string;
	onRemove?: () => void;
}) {
	const [edit, setEdit] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const [nameInput, setNameInput] = useState("");
	const { data, setData: setSettings } = useOwnerSettingsState();
	const settings = data?.settings[owner];
	const defaultName = `Owner ${owner.slice(-3)}`;
	const name = settings?.name ?? defaultName;

	function editName() {
		setEdit(true);
		setNameInput(name);
	}

	function saveName() {
		setSettings({
			settings: {
				...data?.settings,
				[owner]: {
					name: nameInput,
				},
			},
		});

		setEdit(false);
		setFlipped(false);
	}

	return (
		<div className="relative flipper-container h-60 w-full flex">
			<div
				className={clsx(
					"absolute flipper-frontface bg-secondary w-full h-full rounded-xl transition-transform overflow-hidden flex flex-column",
					{ flipped },
				)}
			>
				<div className="relative py-6 w-full overflow-hidden z-0 flex items-center justify-center flex-col">
					<AddressAvatar
						seed={owner}
						size={96}
						className="relative w-24 h-24 rounded-full"
					/>
					<p className="mt-4 text-sm">{name}</p>
					<p className="mt-1 text-sm text-muted-foreground">
						...{owner.slice(-8)}
					</p>
				</div>

				<IconsOwner.info
					className="absolute right-0 cursor-pointer my-4 mr-4 z-10 invert dark:invert-0"
					onClick={setFlipped.bind(null, true)}
				/>
			</div>
			<div
				className={clsx(
					"absolute flipper-backface bg-secondary w-full h-full rounded-xl transition-transform overflow-hidden",
					{ flipped: !flipped },
				)}
			>
				<div className="flex m-4 mb-3 relative justify-center items-center">
					<p className="text-muted-foreground text-sm">Address</p>

					<XIcon
						className="cursor-pointer absolute right-0"
						onClick={setFlipped.bind(null, false)}
					/>
				</div>
				<div className="flex justify-center items-center text-wrap bg-fill-elevated rounded-lg mx-2 px-4 py-2">
					<p className="text-center">
						<span className="inline font-mono break-all text-base leading-[20px]">
							{owner}
						</span>
						<Copy
							value={owner}
							variant={"icon"}
							className="inline-block"
						/>
					</p>
				</div>
				<div className="relative flex flex-col z-10 p-2">
					<div className="flex flex-col items-center justify-center">
						{!edit ? (
							<div className="flex gap-2 items-center justify-center w-full my-2">
								<p className="font-display text-base font-semibold tracking-[0.1px] text-center">
									{name}
								</p>
								<button
									className="cursor-pointer rounded-full w-5 h-5 flex items-center duration-200 hover:bg-fill-accent-secondary bg-fill-quaternary justify-center"
									onClick={editName}
								>
									<Edit2Icon className="h-3 w-3" />
								</button>
							</div>
						) : (
							<div className="flex justify-between items-center w-full my-2">
								<input
									className="w-full font-display text-base font-semibold bg-transparent tracking-[0.1px] focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0 text-center"
									value={nameInput}
									onChange={(e) =>
										setNameInput(e.target.value)
									}
								/>
							</div>
						)}
						{!edit ? (
							<button
								className="font-display text-base font-bold my-4 text-negative"
								onClick={onRemove}
							>
								Remove
							</button>
						) : (
							<button
								className="font-display w-full rounded p-1 h-8 flex items-center justify-center mt-4 bg-pixel-pink text-base font-bold text-label-invert"
								onClick={saveName}
							>
								Done
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
