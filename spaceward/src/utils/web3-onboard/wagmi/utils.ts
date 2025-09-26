// fixme
// copied from https://github.com/blocknative/web3-onboard/blob/develop/packages/wagmi/src/utils.ts
// to pass transport options

import { Chain, chainIdToViemImport } from "@web3-onboard/common";
import { fromHex, http } from "viem";
import type { Chain as ViemChain, Transport } from "viem";

export const createWalletId = (walletLabel: string): string =>
	walletLabel.replace(/\s/g, "") + "Id";

export async function createWagmiChains(
	chains: Chain[],
	transports: Record<ViemChain["id"], Transport>,
) {
	return (await Promise.all(
		chains.map(async (w3OChain: Chain) => {
			const { id } = w3OChain;
			const chain = (await chainIdToViemImport(w3OChain)) as ViemChain;
			transports[fromHex(id as `0x${string}`, "number")] = http(
				undefined,
				{
					// todo pass transport options somewhere in config
					batch: {
						wait: 16,
						batchSize: 1000,
					},
				},
			);
			return chain;
		}),
	)) as [ViemChain, ...ViemChain[]];
}
