import { useState } from "react";
import { ProposalTypes } from "@walletconnect/types";
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
	onApprove: (proposal: ProposalTypes.Struct, spaceId: string) => void;
	onReject: (proposal: ProposalTypes.Struct) => void;
	proposal: ProposalTypes.Struct;
}

export default function WCBindSpace({
	enabled,
	loading,
	onApprove,
	onReject,
	proposal,
}: WCBindSpaceProps) {
	const { useSpacesByOwner } = useQueryHooks();
	const { spaceId } = useSpaceId();
	const { address } = useAddressContext();
	const [wsAddr, setWsAddr] = useState("");

	const wsQuery = useSpacesByOwner({
		request: {
			owner: address!,
		},
		options: {
			enabled: !!address,
		},
	});

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
						setWsAddr(value);
					}}
					defaultValue={wsAddr}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a space to pair" />
					</SelectTrigger>
					<SelectContent>
						{wsQuery.data?.spaces.map((w) =>
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
					disabled={!enabled || loading || !wsAddr}
					size="sm"
					onClick={onApprove.bind(null, proposal, wsAddr)}
				>
					{loading ? "Loading..." : "Approve"}
				</Button>
			</div>
		</div>
	);
}
