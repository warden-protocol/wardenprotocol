import useWardenWarden from "@/hooks/useWardenWarden";
import { WalletType } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

// async function getEthBalance(address: string) {
// 	const balance = await provider.getBalance(address);
// 	return balance;
// }

function TotalAssetVaule() {
	const { spaceAddress } = useSpaceAddress();

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
			<span className="text-4xl font-bold">$523.00</span>
		</div>
	);
}

export default TotalAssetVaule;
