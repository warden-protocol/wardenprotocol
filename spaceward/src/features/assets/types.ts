export interface BalanceEntry {
	address: string;
	balance: bigint;
	chainId: string;
	chainName: string;
	decimals: number;
	erc20Token?: `0x${string}`;
	price: bigint;
	priceDecimals: number;
	type: "eip155:native" | "eip155:erc20";
	token: string;
	title: string;
}
