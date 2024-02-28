import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/datetime";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import TxDetails from "./tx-details";
import CardRow from "./card-row";
import {
	Block,
	Tx,
} from "wardenprotocol-warden-client-ts/lib/cosmos.tx.v1beta1/rest";

function BlockDetails({ block, txs }: { block: Required<Block>; txs: Tx[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Block info</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<CardRow label="Hash">
					{block.header.last_block_id!.hash}
				</CardRow>
				<CardRow label="Height">{block.header.height}</CardRow>
				<CardRow label="Timestamp">
					{formatDateTime(block.header.time!)}
				</CardRow>
				<CardRow label="Transactions">
					{block.data.txs!.length} txs
				</CardRow>

				<div className="flex flex-row gap-4 pt-8">
					<Link
						to={`/explorer/block-by-height/${-1 + parseInt(block.header.height!, 10)}`}
					>
						<Button variant="secondary">Previous block</Button>
					</Link>
					<Link
						to={`/explorer/block-by-height/${1 + parseInt(block.header.height!, 10)}`}
					>
						<Button variant="secondary">Next block</Button>
					</Link>
				</div>

				<div>
					{txs.map((tx, i) => (
						<TxDetails key={i} tx={tx} />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between"></CardFooter>
		</Card>
	);
}

export default BlockDetails;
