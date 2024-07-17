import { formatEther } from "ethers";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useCurrency } from "@/hooks/useCurrency";
import { useQueries } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { getProvider } from "@/lib/eth";

const chainId = 11155111;
const provider = getProvider("sepolia");

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

export function TotalAssetValue() {
	const { currency } = useCurrency();
	const { spaceId } = useSpaceId();

	const { useKeysBySpaceId, isReady } = useQueryHooks();
	const keysQ = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId || ""),
			deriveAddresses: [AddressType.ADDRESS_TYPE_ETHEREUM],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady && !!spaceId,
		},
	});

	const totalBalanceQuery = useQueries({
		queries: keysQ.data
			? keysQ.data.keys
					.map((key) => key?.addresses?.[0]?.address)
					.map((ethAddr) => ({
						queryKey: ["eth-balance", chainId, ethAddr],
						queryFn: () => getEthBalance(ethAddr),
						enabled: !!ethAddr,
					}))
			: [],
	});

	const totalBalance = totalBalanceQuery.reduce(
		(partialSum, result) => partialSum + BigInt(result.data || 0),
		BigInt(0),
	);
	// if we want some indicator to show that some of the queries are still pending (=> we're showing a partial result):
	const isPending = totalBalanceQuery.some(
		(result) => result.status === "loading",
	);

	return (
		<div>
			<p className="text-muted-foreground text-sm">Total asset value</p>
			{isPending ? (
				<Skeleton className="h-10 w-60" />
			) : (
				<span className="text-5xl pt-2 tracking-wide font-display flex">
					{currency === "usd"
						? USDollar.format(
								parseFloat(formatEther(totalBalance)) * 2940,
							)
						: currency === "eur"
							? Euro.format(
									parseFloat(formatEther(totalBalance)) *
										2756,
								)
							: GBP.format(
									parseFloat(formatEther(totalBalance)) *
										2358,
								)}
				</span>
			)}
		</div>
	);
}
