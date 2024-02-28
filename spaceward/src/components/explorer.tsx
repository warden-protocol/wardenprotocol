import { useQueries } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { formatDateTime } from "@/lib/datetime";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useCosmosBaseTendermintV1Beta1 from "@/hooks/useCosmosBaseTendermintV1Beta1";
import { useClient } from "@/hooks/useClient";
import { Block as BlockModel } from "wardenprotocol-warden-client-ts/lib/cosmos.tx.v1beta1/rest";

export default function Explorer() {
	const { ServiceGetLatestBlock } = useCosmosBaseTendermintV1Beta1();
	const latestBlockQuery = ServiceGetLatestBlock({});

	const data = latestBlockQuery.data;
	const latestHeight = parseInt(data?.block?.header?.height || "0", 10);

	const client = useClient();
	const blocks = useQueries({
		queries: latestHeight
			? Array.from({ length: 10 }, (_, i) => ({
					queryKey: ["block", latestHeight - i],
					queryFn: () =>
						client.CosmosBaseTendermintV1Beta1.query.serviceGetBlockByHeight(
							(latestHeight - i).toString()
						),
					refetchInterval: Infinity,
				}))
			: [],
	});

	return (
		<div className="bg-card border rounded-lg overflow-clip">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Block</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead>Proposer</TableHead>
						<TableHead className="text-right">
							Transactions count
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{blocks
						.filter((q) => q.data)
						.map((q) => (
							<Block
								key={q.data!.data.block?.header?.height}
								block={
									q.data!.data.block! as Required<BlockModel>
								}
							/>
						))}
				</TableBody>
			</Table>
		</div>
	);
}

function Block({ block }: { block: Required<BlockModel> }) {
	return (
		<TableRow
			className={
				block.data.txs!.length === 0
					? "opacity-50 hover:opacity-100"
					: ""
			}
		>
			<TableCell className="font-medium">
				<div className="flex flex-col gap-1">
					<span>Block #{block.header.height}</span>
					<span className="font-mono text-xs">
						{block.last_commit.block_id!.hash!.slice(0, 20)}...
					</span>
				</div>
			</TableCell>
			<TableCell>{formatDateTime(block.header.time!)}</TableCell>
			<TableCell>
				<span className="font-mono">
					{block.header.proposer_address}
				</span>
			</TableCell>
			<TableCell className="text-right">
				{block.data.txs!.length} txs
			</TableCell>
			<TableCell className="text-right">
				<Button variant="outline" size={"sm"}>
					<Link
						to={`/explorer/block-by-height/${block.header.height}`}
					>
						Details
					</Link>
				</Button>
			</TableCell>
		</TableRow>
	);
}
