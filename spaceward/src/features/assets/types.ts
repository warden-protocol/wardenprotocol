import { cosmos } from "@wardenprotocol/wardenjs";
import type { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export interface BalanceEntry {
	address: string;
	balance: bigint;
	chainId: string;
	chainName: string;
	decimals: number;
	erc20Token?: `0x${string}`;
	price: bigint;
	priceDecimals: number;
	type: "eip155:native" | "eip155:erc20" | "osmosis";
	token: string;
	title: string;
}

export type CosmosQueryClient = UnwrapPromise<
	ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>
>;

export interface BalanceQueryResult {
	results: BalanceEntry[];
	key: QueryKeyResponse;
}
