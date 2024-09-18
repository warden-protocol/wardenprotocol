import { useQueries } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import { formatDateTime } from "@/lib/datetime";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { getClient, useQueryHooks } from "@/hooks/useClient";
import { Block as BlockModel } from "@wardenprotocol/wardenjs/codegen/tendermint/types/block";

export function Explorer() {
	const { cosmos } = useQueryHooks();

	const latestBlockQ = cosmos.base.tendermint.v1beta1.useGetLatestBlock({});
	const latestHeight = latestBlockQ.data?.block?.header?.height;

	const blocks = useQueries({
		queries: latestHeight
			? Array.from({ length: 10 }, (_, i) => ({
				queryKey: ["block", latestHeight - BigInt(i)],
				queryFn: async () => {
					const client = await getClient();
					return client.cosmos.tx.v1beta1.getBlockWithTxs({
						height: (latestHeight - BigInt(i)),
					});
				},
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
						<TableHead>Time</TableHead>
						<TableHead>Proposer</TableHead>
						<TableHead className="text-right">
							Tx&nbsp;count
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{blocks
						.filter((q) => q.data)
						.map((q) => (
							q.data?.block && q.data?.block.header ? (
								<Block
									key={q.data?.block?.header?.height}
									block={q.data?.block}
									txCount={q.data?.txs?.length ?? 0}
								/>
							) : null
						))}
				</TableBody>
			</Table>
		</div>
	);
}

function Block({ block, txCount }: { block: BlockModel, txCount: number }) {
	return (
		<TableRow
			className={
				block.data.txs.length === 0
					? "opacity-50 hover:opacity-100"
					: ""
			}
		>
			<TableCell className="font-medium">
				<div className="flex flex-col gap-1">
					<span>Block #{block.header.height.toString()}</span>
					<span className="font-mono text-xs">
						{block.lastCommit?.blockId.hash.slice(0, 20)}...
					</span>
				</div>
			</TableCell>
			<TableCell>{formatDateTime(block.header.time)}</TableCell>
			<TableCell>
				<span className="font-mono">
					{block.header.proposerAddress}
				</span>
			</TableCell>
			<TableCell className="text-right">
				{txCount} txs
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
