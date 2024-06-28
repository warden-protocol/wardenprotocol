import BlockDetails from "@/components/BlockDetails";
import { useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { useParams } from "react-router-dom";

export function BlockByHeightPage() {
	const { height } = useParams();
	const { cosmos } = useQueryHooks();
	const q = cosmos.tx.v1beta1.useGetBlockWithTxs({
		request: {
			height: BigInt(height || "0"),
			pagination: PageRequest.fromPartial({
				limit: BigInt(100),
			}),
		},
		options: {
			enabled: !!height,
			refetchInterval: Infinity,
		},
	});

	if (!height) {
		return <div>No height provided</div>;
	}

	if (q.status === "loading") {
		return <div>Loading...</div>;
	}

	if (q.status === "error") {
		return <div>Error: {q.error.message}</div>;
	}

	if (!q.data.block) {
		return <div>Block not found</div>;
	}

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Block #{height}
					</h2>
				</div>
			</div>
			<BlockDetails
				block={q.data.block}
				txs={q.data.txs}
			/>
		</div>
	);
}
