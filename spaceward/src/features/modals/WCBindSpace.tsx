import { useState } from "react";
import { ProposalTypes } from "@walletconnect/types";
import { Button } from "@/components/ui/button";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { useModalState } from "./state";
import AddressAvatar from "@/components/AddressAvatar";
import { AddressType, useKeysBySpaceId, useSpacesByOwner } from "@/hooks/query/warden";
import { useConnectWallet } from "@web3-onboard/react";
import { KeyModel } from "@/hooks/query/types";

interface WCBindSpaceProps {
	enabled: boolean;
	loading: boolean;
	onApprove: (
		proposal: ProposalTypes.Struct,
		spaceId: string,
		addresses?: KeyModel["addresses"],
	) => void;
	onReject: (proposal: ProposalTypes.Struct) => void;
	proposal: ProposalTypes.Struct;
}

const DERIVE_ADDRESSES = [
	AddressType.Ethereum,
	AddressType.Osmosis,
];


export default function WCBindSpace({
	enabled: _enabled,
	loading,
	onApprove,
	onReject,
	proposal,
}: WCBindSpaceProps) {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;
	const { spaceId } = useSpaceId();
	const [isSelectVesisble, setIsSelectVisible] = useState(false);
	const { setData: setModal } = useModalState();

	const spacesQuery = useSpacesByOwner({
		request: {
			owner: address!,
		},
		options: {
			enabled: _enabled,
		},
	});

	const defaultSpace = spaceId ?? spacesQuery.data?.[0]?.[0]?.id.toString();
	const [pairedSpace, setPairedSpace] = useState(defaultSpace ?? "");

	const keysQuery = useKeysBySpaceId({
		request: {
			spaceId: BigInt(pairedSpace),
			deriveAddresses: DERIVE_ADDRESSES,
		},
		options: {
			enabled: !!pairedSpace && _enabled,
		},
	});

	const keys = keysQuery.data?.[0];

	const enabled = Boolean(
		keys?.length && spacesQuery.data?.[0].length,
	);

	const addresses = keys?.flatMap((k) => k.addresses);

	return (
		<div className="flex flex-col gap-12 text-center">
			<div className="flex items-center mx-auto">
				<div className="w-[97px] h-[97px] rounded-full flex items-center justify-center bg-white">
					<img
						className="w-[52px] h-[52px]"
						src={proposal.proposer.metadata.icons[0]}
					/>
				</div>

				<div className="-ml-8 w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white">
					<IconsAssets.connectLogo className="w-[100px] h-[100px]" />
				</div>
			</div>

			<div>
				<div className="font-bold text-5xl mb-6">
					Approve connection
				</div>
				<div>
					{proposal.proposer.metadata.name} will be connected to the
					selected space
				</div>
			</div>

			<div
				onClick={() => setIsSelectVisible(true)}
				className="flex flex-row w-full relative cursor-pointer"
			>
				<div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
					<AddressAvatar
						seed={pairedSpace}
						disableTooltip
						className="w-10 h-10 object-contain"
					/>
				</div>
				{pairedSpace && (
					<div className="absolute left-[68px] top-3 text-xs text-muted-foreground">
						Space to connect
					</div>
				)}
				<Input
					type="text"
					placeholder="Space to connect"
					value={pairedSpace}
					className={clsx(
						"h-[60px] pointer-events-none  !opacity-100 pr-[90px] pl-[68px] text-left bg-fill-elevated border-transparent rounded-lg focus-visible:!ring-0 focus-visible:!ring-offset-0 ring-0 focus-visible:border-2 border-2 focus-visible:border-border-secondary border-solid",
						{
							"pt-6 pb-1": pairedSpace,
							"py-3": !pairedSpace,
						},
					)}
					onChange={(e) => e.preventDefault}
					disabled
				/>
				{(spacesQuery.data?.[0].length ?? 0) > 1 && (
					<IconsAssets.chevronDown className="absolute right-4 top-1/2 -translate-y-1/2" />
				)}

				{isSelectVesisble &&
					(spacesQuery.data?.[0].length ?? 0) > 1 && (
						<div className="absolute left-0 -bottom-[6px] translate-y-full bg-card rounded-xl w-full py-2 text-left">
							{spacesQuery.data?.[0].map((w) =>
								w ? (
									<div
										className="flex items-center gap-3 py-3 px-5 hover:bg-fill-quaternary transition-all duration-200 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											setPairedSpace(w.id.toString());
											setIsSelectVisible(false);
										}}
									>
										<AddressAvatar
											seed={w.id.toString()}
											disableTooltip
											className="w-10 h-10 object-contain"
										/>
										<div>
											{/* {w.id.toString() === spaceId && (
												<div className="text-label-secondary text-xs">
													Active space
												</div>
											)} */}
											#{w.id.toString()}
										</div>

										{w.id.toString() === spaceId && (
											<IconsAssets.check className="ml-auto" />
										)}
									</div>
								) : undefined,
							)}
						</div>
					)}
			</div>

			<div className="flex flex-col gap-2">
				{!keys?.length ? (
					<Button
						disabled={loading || !pairedSpace}
						onClick={setModal.bind(null, {
							background: { walletconnect: {} },
							type: "create-key",
							params: {
								next: "walletconnect",
								spaceId: pairedSpace,
							},
						})}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-fill-accent-primary rounded-lg h-[56px] font-semibold shrink-0 bg-foreground text-background"
					>
						Create key
					</Button>
				) : (
					<Button
						disabled={!enabled || loading || !pairedSpace}
						onClick={onApprove.bind(
							null,
							proposal,
							pairedSpace,
							addresses,
						)}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-fill-accent-primary hover:text-background rounded-lg h-[56px] font-semibold shrink-0 bg-foreground text-background"
					>
						{loading ? "Loading..." : "Approve"}
					</Button>
				)}

				<Button
					disabled={!_enabled}
					onClick={onReject.bind(null, proposal)}
					className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-fill-accent-primary hover:text-background rounded-lg h-[56px] bg-fill-quaternary text-display font-semibold shrink-0 "
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}
