import clsx from "clsx";
import { useState } from "react";
import { isAddress } from "viem";
import { Button } from "@/components/ui/button";
import { pasteFromClipboard } from "@/utils/browser";
import type { ModalParams } from "./types";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useModalState } from "./state";
import { Icons } from "@/components/ui/icons-assets";
import { useOwnerSettingsState } from "../owners/state";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { useActionHandler } from "../actions/hooks";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import { useSpaceById } from "@/hooks/query/warden";


export default function AddOwnerModal({ hidden }: ModalParams<{}>) {
	const { spaceId } = useSpaceId();

	const space = useSpaceById({
		request: {
			id: BigInt(spaceId!),
		}
	}).data;

	const { add, expectedApproveExpression, expectedRejectExpression } = useActionHandler(
		PRECOMPILE_WARDEN_ADDRESS,
		wardenPrecompileAbi,
		"addSpaceOwner",
		true
	);

	const { data, setData } = useOwnerSettingsState();
	const { setData: setModal } = useModalState();

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [pending, setPending] = useState(false);

	async function create() {
		if (
			pending ||
			!spaceId ||
			!space ||
			!isAddress(address)
		) {
			return;
		}

		const settings = {
			name,
		};

		try {
			setPending(true);

			add([
				BigInt(spaceId),
				address,
				BigInt(space?.nonce ?? 0),
				BigInt(0),
				expectedApproveExpression,
				expectedRejectExpression,
			], {
				title: `Adding ${name} as owner`,
			});

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
				className="font-bold text-5xl mb-12
			 leading-[56px] tracking-[0.24px] font-display"
			>
				New owner
			</div>

			<div>
				<div
					className={clsx(
						"mb-8 rounded-lg text-left flex items-center justify-between gap-2 bg-fill-elevated border-[1px] px-4 h-[60px] border-border-quaternary",
						{
							"!border-negative":
								address && !isAddress(address),
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
						"rounded-lg	text-left flex items-center justify-between gap-2 bg-fill-elevated border-[1px] px-4 h-[60px] border-border-quaternary",
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
					{name && (
						<Icons.clearCircle
							className="cursor-pointer"
							onClick={() => setName("")}
						/>
					)}
				</div>

				<div className="mt-12 flex flex-col gap-2">
					<Button
						onClick={create}
						disabled={!name || !address}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold w-full hover:bg-fill-accent-primary duration-200 hover:text-background"
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
