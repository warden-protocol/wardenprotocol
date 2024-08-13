import clsx from "clsx";
import { useState } from "react";
import { warden } from "@wardenprotocol/wardenjs";
import { Button } from "@/components/ui/button";
import { pasteFromClipboard } from "@/utils/browser";
import type { ModalParams } from "./types";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useModalState } from "./state";
import { Icons } from "@/components/ui/icons-assets";
import { useOwnerSettingsState } from "../owners/state";
import { useNewAction } from "@/hooks/useAction";
import { isValidBech32 } from "@/utils/validate";

const { MsgAddSpaceOwner } = warden.warden.v1beta3;

export default function AddOwnerModal({ hidden }: ModalParams<{}>) {
	const { newAction, authority } = useNewAction(MsgAddSpaceOwner);
	const { data, setData } = useOwnerSettingsState();
	const { setData: setModal } = useModalState();
	const { spaceId } = useSpaceId();

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [pending, setPending] = useState(false);

	async function create() {
		if (pending || !spaceId || !authority || !isValidBech32(address)) {
			return;
		}

		const settings = {
			name,
		};

		try {
			setPending(true);
			await newAction(
				{
					newOwner: address,
					spaceId: BigInt(spaceId),
					authority,
				},
				{},
			);

			setData({ settings: { ...data?.settings, [address]: settings } });

			setModal({
				type: undefined,
				params: {},
			});
		} catch (e) {
			console.error(e);
		}

		setPending(false);
	}

	return hidden ? null : (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div
				className="font-bold text-5xl mb-6
			 leading-[56px] tracking-[0.24px]"
			>
				New owner
			</div>

			<div>
				<div
					className={clsx(
						"my-4 rounded-lg text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] px-4 h-[60px] border-white",
						{
							"!border-negative":
								address && !isValidBech32(address),
						},
					)}
				>
					<div className="w-full">
						<label
							className="text-label-secondary text-xs"
							htmlFor="address"
						>
							Address
						</label>
						<input
							className="block w-full bg-transparent outline-none foces:outline-none"
							id="address"
							onChange={(e) => setAddress(e.target.value)}
							value={address}
						/>
					</div>
					{!address ? (
						<button
							className="font-medium text-label-secondary px-2 hover:text-white transition-all duration-200"
							onClick={async (e) => {
								e.preventDefault();
								const text = await pasteFromClipboard();
								setAddress(text);
							}}
						>
							Paste
						</button>
					) : (
						<Icons.clearCircle
							className="cursor-pointer"
							onClick={() => setAddress("")}
						/>
					)}
				</div>
				<div
					className={clsx(
						"rounded-lg	text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] px-4 h-[60px] border-white",
					)}
				>
					<div className="w-full">
						<label
							className="text-label-secondary text-xs"
							htmlFor="address"
						>
							Name
						</label>
						<input
							className="block w-full bg-transparent outline-none foces:outline-none"
							id="address"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					{!name ? (
						<button
							className="font-medium text-label-secondary px-2 hover:text-white transition-all duration-200"
							onClick={async (e) => {
								e.preventDefault();
								const text = await pasteFromClipboard();
								setName(text);
							}}
						>
							Paste
						</button>
					) : (
						<Icons.clearCircle
							className="cursor-pointer"
							onClick={() => setName("")}
						/>
					)}
				</div>

				<div className="mt-12 flex flex-col gap-2">
					<Button
						onClick={create}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold w-full hover:bg-pixel-pink duration-200 hover:text-background"
					>
						{pending
							? "Waiting for tx..."
							: `Add ${!name ? "owner" : name}`}
					</Button>
				</div>
			</div>
		</div>
	);
}
