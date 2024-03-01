import { useState } from "react";
import useWardenWarden from "@/hooks/useWardenWarden";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import { useCurrency } from "@/hooks/useCurrency";

const url = "https://rpc2.sepolia.org";
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

function TotalAssetVaule() {
	const { currency } = useCurrency();
	const { spaceAddress } = useSpaceAddress();

	const [totalBalance, setTotalBalance] = useState(0);

	const { QueryKeys } = useWardenWarden();
	const query = QueryKeys(
		{
			type: WalletType.WALLET_TYPE_ETH,
			space_addr: spaceAddress,
		},
		{},
		10
	);

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	query.data?.pages[0].keys?.map(async (key) => {
		const balance = await getEthBalance(key?.wallets[0]?.address);
		const formattedBalance = ethers.formatEther(balance || 0);
		setTotalBalance(
			parseFloat(totalBalance) + parseFloat(formattedBalance)
		);
	});

	if (query.data?.pages[0].keys?.length === 0) {
		return (
			<div>
				<p className="text-muted-foreground">Total asset value</p>
				<span className="text-4xl font-bold">$0.00</span>
			</div>
		);
	}

	return (
		<div>
			<p className="text-muted-foreground">Total asset value</p>
			<span className="text-4xl font-bold">${totalBalance * 2940}</span>
		</div>
	);
}

export default TotalAssetVaule;
