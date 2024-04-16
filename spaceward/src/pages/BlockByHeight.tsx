import BlockDetails from "@/components/BlockDetails";
import useCosmosTxV1Beta1 from "@/hooks/useCosmosTxV1Beta1";
import { Params, useLoaderData } from "react-router-dom";
import { Block } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.tx.v1beta1/rest";

export function BlockByHeightPage() {
	const { height } = useLoaderData() as Awaited<
		ReturnType<typeof BlockByHeightLoader>
	>;
	const { ServiceGetBlockWithTxs } = useCosmosTxV1Beta1();
	const q = ServiceGetBlockWithTxs(
		height,
		{},
		{ refetchInterval: Infinity },
		1,
	);

	if (!q.data || q.data.pages.length === 0) {
		return <div>Loading...</div>;
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
				block={q.data.pages[0].block as Required<Block>}
				txs={q.data.pages.flatMap((p) => p.txs || [])}
			/>
		</div>
	);
}

export function BlockByHeightLoader({ params }: { params: Params<string> }) {
	if (!params.height) {
		throw new Error("No height provided");
	}

	return { height: params.height };
}
