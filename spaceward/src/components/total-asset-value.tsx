import useWardenWarden from "@/hooks/useWardenWarden";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import { ethers, formatEther } from "ethers";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import { useCurrency } from "@/hooks/useCurrency";
import { useQueries } from "@tanstack/react-query";

const url = "https://rpc2.sepolia.org";
const chainId = 11155111;
const provider = new ethers.JsonRpcProvider(url);

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
const Euro = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
});
const GBP = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "GBP",
});

function TotalAssetValue() {
	const { currency } = useCurrency();
	const { spaceAddress } = useSpaceAddress();

	const { QueryKeys } = useWardenWarden();
	const { data: keysData } = QueryKeys(
		{
			type: WalletType.WALLET_TYPE_ETH,
			space_addr: spaceAddress,
		},
		{},
		10
	);

	const totalBalanceQuery = useQueries({
		queries: keysData ? keysData.pages.flatMap(page => page.keys).map(key => key?.wallets?.[0]?.address).map(ethAddr => (
			{
				queryKey: ['eth-balance', chainId, ethAddr],
				queryFn: () => getEthBalance(ethAddr!),
				enabled: !!ethAddr,
			}
		)) : [],
	})

	const totalBalance = totalBalanceQuery.reduce((partialSum, result) => partialSum + (BigInt(result.data || 0)), BigInt(0));
	// if we want some indicator to show that some of the queries are still pending (=> we're showing a partial result):
	// const isPending = totalBalanceQuery.some(result => result.status === 'loading');

	return (
		<div>
			<p className="text-muted-foreground">Total asset value</p>
			<span className="text-4xl font-bold">{formatEther(totalBalance)} ETH</span>
		</div>
	);
}

export default TotalAssetValue;
