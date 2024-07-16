import { useState } from "react";
import { ProposalTypes } from "@walletconnect/types";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import type { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import clsx from "clsx";
import { Input } from "@/components/ui/input";

interface WCBindSpaceProps {
	enabled: boolean;
	loading: boolean;
	onApprove: (
		proposal: ProposalTypes.Struct,
		spaceId: string,
		addresses?: AddressResponse[],
	) => void;
	onReject: (proposal: ProposalTypes.Struct) => void;
	proposal: ProposalTypes.Struct;
}

export default function WCBindSpace({
	enabled: _enabled,
	loading,
	onApprove,
	onReject,
	proposal,
}: WCBindSpaceProps) {
	console.log({ proposal });
	const { useSpacesByOwner, useKeysBySpaceId } = useQueryHooks();
	const { spaceId } = useSpaceId();
	const { address } = useAddressContext();
	const [isSelectVesisble, setIsSelectVisible] = useState(false);

	const spacesQuery = useSpacesByOwner({
		request: {
			owner: address!,
		},
		options: {
			enabled: !!address && _enabled,
		},
	});

	const defaultSpace = spaceId ?? spacesQuery.data?.spaces[0]?.id.toString();
	const [pairedSpace, setPairedSpace] = useState(defaultSpace ?? "");

	const keysQuery = useKeysBySpaceId({
		request: {
			spaceId: BigInt(pairedSpace),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
		},
		options: {
			enabled: !!pairedSpace && _enabled,
		},
	});

	const enabled = Boolean(
		keysQuery.data?.keys.length && spacesQuery.data?.spaces.length,
	);

	const addresses = keysQuery.data?.keys.flatMap((keys) => keys.addresses);

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
				className="flex flex-row w-full relative mt-10 mb-12 cursor-pointer"
			>
				<img
					src="/images/somewallet.png"
					className="w-10 h-10 object-contain absolute left-4 top-1/2 -translate-y-1/2"
					alt=""
				/>
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
						"h-[60px] pointer-events-none  !opacity-100 pr-[90px] pl-[68px] text-left bg-border-quaternary border-transparent rounded-lg focus-visible:!ring-0 focus-visible:!ring-offset-0 ring-0 focus-visible:border-2 border-2 focus-visible:border-pixel-pink border-solid",
						{
							"pt-6 pb-1": pairedSpace,
							"py-3": !pairedSpace,
						},
					)}
					onChange={(e) => e.preventDefault}
					disabled
				/>
				{(spacesQuery.data?.spaces.length ?? 0) > 1 && (
					<IconsAssets.chevronDown className="absolute right-4 top-1/2 -translate-y-1/2" />
				)}

				{isSelectVesisble &&
					(spacesQuery.data?.spaces.length ?? 0) > 1 && (
						<div className="absolute left-0 -bottom-[6px] translate-y-full bg-bg-elevated rounded-xl w-full py-2 text-left">
							{spacesQuery.data?.spaces.map((w) =>
								w ? (
									<div
										className="flex items-center gap-3 py-3 px-5 hover:bg-card transition-all duration-200 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											setPairedSpace(w.id.toString());
											setIsSelectVisible(false);
										}}
									>
										<img
											src="/images/somewallet.png"
											className="w-10 h-10 object-contain"
											alt=""
										/>
										<div>
											{w.id.toString() === spaceId && (
												<div className="text-label-secondary text-xs">
													Active space
												</div>
											)}
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

			<div>{proposal.proposer.metadata.url}</div>

			<div></div>

			<div className="flex flex-row gap-4 place-content-center">
				<Button
					disabled={!enabled}
					size="sm"
					variant="destructive"
					onClick={onReject.bind(null, proposal)}
				>
					{loading ? "Loading..." : "Reject"}
				</Button>
				<Button
					disabled={!enabled || loading || !pairedSpace}
					size="sm"
					onClick={onApprove.bind(
						null,
						proposal,
						pairedSpace,
						addresses,
					)}
				>
					{loading ? "Loading..." : "Approve"}
				</Button>
			</div>
		</div>
	);
}
