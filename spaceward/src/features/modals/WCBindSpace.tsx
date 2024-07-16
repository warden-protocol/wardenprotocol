import { useState } from "react";
import { ProposalTypes } from "@walletconnect/types";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import type { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";

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
		<div className="flex flex-col gap-6 text-center pt-8">
			<div>
				<div className="flex flex-col gap-4 text-center items-center">
					<p className="text-sm">WalletConnect</p>
					<img
						className="w-10 h-10"
						src={proposal.proposer.metadata.icons[0]}
					/>

					<div>
						<span className="font-bold">
							{proposal.proposer.metadata.name}
						</span>{" "}
						wants to connect.
					</div>
					<div className="bg-card rounded-lg py-2 px-4 text-sm">
						{proposal.proposer.metadata.url}
					</div>
				</div>
			</div>

			<div>
				<Select
					onValueChange={(value) => {
						setPairedSpace(value);
					}}
					defaultValue={defaultSpace}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a space to pair" />
					</SelectTrigger>
					<SelectContent>
						{spacesQuery.data?.spaces.map((w) =>
							w ? (
								<SelectItem
									className="hover:bg-card"
									value={w.id.toString()}
									key={w.id}
								>
									Space #{w.id.toString()}
									{w.id.toString() === spaceId
										? " (Active Space)"
										: ""}
								</SelectItem>
							) : undefined,
						)}
					</SelectContent>
				</Select>
			</div>

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
