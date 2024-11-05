import { KeyModel } from "@/hooks/query/types";
import { cosmos } from "@wardenprotocol/wardenjs";
import { GetPriceResponse } from "@wardenprotocol/wardenjs/codegen/slinky/oracle/v1/query";
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
	logo?: string;
}

export type CosmosQueryClient = UnwrapPromise<
	ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>
>;

export interface BalanceQueryResult {
	results: BalanceEntry[];
	key: KeyModel;
}

export type PriceMapSlinky = Record<
	string,
	| undefined
	| (GetPriceResponse & {
			ticker: string;
			token: string;
	  })
>;
