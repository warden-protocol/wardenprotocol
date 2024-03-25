import { Link, Params, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CardRow from "@/components/card-row";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ethers } from "ethers";
import useRequestTransactionSignature from "@/hooks/useRequestTransactionSignature";
import SignTransactionRequestDialog from "@/components/sign-transaction-request-dialog";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import {
	Key,
	WalletType,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { MetadataEthereum } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";

const url = "https://ethereum-sepolia-rpc.publicnode.com";

const provider = new ethers.JsonRpcProvider(url);

async function buildEthTransaction(
	chainId: string | number,
	{
		gas,
		value,
		from,
		to,
	}: { gas: string; value: ethers.BigNumberish; from: string; to: string }
) {
	const nonce = await provider.getTransactionCount(from);
	const feeData = await provider.getFeeData();

	const tx = ethers.Transaction.from({
		type: 2, // 2: Dynamic fee transaction
		chainId,
		maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
		maxFeePerGas: feeData.maxFeePerGas,
		nonce,
		to,
		value,
		gasLimit: gas,
	});

	return tx;
}

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

function LayerOneEthereum({ chainId }: { chainId: number }) {
	const { state, error, requestTransactionSignature, reset } =
		useRequestTransactionSignature();
	const { keyId } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	const { QueryKeyById } = useWardenWardenV1Beta2();
	const q = QueryKeyById(
		{ id: keyId, derive_wallets: WalletType.WALLET_TYPE_ETH },
		{},
	);

	const k = q.data?.key as Required<Key>;

	const ethAddr =
		q.data?.wallets?.find(
			(wallet) => wallet.type === WalletType.WALLET_TYPE_ETH
		)?.address || "";

	const balQ = useQuery({
		queryKey: ["eth-balance", chainId, ethAddr],
		queryFn: () => getEthBalance(ethAddr),
		refetchInterval: 10000,
		enabled: !!ethAddr,
	});

	if (q.status === "loading") {
		return <div>Loading key...</div>;
	}

	if (balQ.isLoading) {
		return <div>Loading ETH balance...</div>;
	}

	if (!k) {
		return <div>Key not found</div>;
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const gasLimit = formData.get("gasLimit") as string;
		const amount = formData.get("amount") as string;
		const toAddr = formData.get("toAddr") as string;

		const tx = await buildEthTransaction(chainId, {
			from: ethAddr,
			gas: gasLimit,
			value: ethers.parseEther(amount),
			to: toAddr,
		});

		const signature = await requestTransactionSignature(
			parseInt(k.id, 10),
			ethers.getBytes(tx.unsignedSerialized),
			{
				typeUrl: "/warden.warden.MetadataEthereum",
				value: MetadataEthereum.encode({
					chainId,
				}).finish(),
			}
		);
		if (!signature) {
			return;
		}

		// add the signature to the transaction
		const signedTx = tx.clone();
		signedTx.signature = ethers.hexlify(signature);

		// instead of waiting for realyer-eth to pick this
		// up, we broadcast it directly for a faster user
		// experience
		await provider.broadcastTransaction(signedTx.serialized);
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="mt-6">
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink to="/keys">Keys</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbLink to={`/keys/${k.id}`}>
							Key {k.id.toString()}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink to={`/keys/${k.id}/sepolia`}>
							Ethereum Sepolia
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Deposit ETH</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<CardRow label="ETH Address">
						<div className="flex flex-row gap-2 justify-center items-center">
							<span className="font-mono">{ethAddr}</span>
							<Button
								size="iconxs"
								variant="ghost"
								onClick={() =>
									navigator.clipboard.writeText(ethAddr)
								}
							>
								<Copy
									className="h-4 w-4"
									onClick={() =>
										navigator.clipboard.writeText(ethAddr)
									}
								/>
							</Button>
						</div>
					</CardRow>
					<CardRow label="Balance">
						{ethers.formatEther(balQ.data || 0)} ETH
					</CardRow>
				</CardContent>
				<CardFooter>
					<Link
						target="_blank"
						to={`https://sepolia.etherscan.io/address/${ethAddr}`}
					>
						<Button size="sm" variant="secondary">
							View on Etherscan
						</Button>
					</Link>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Withdraw ETH</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<input
							type="text"
							name="amount"
							placeholder="Amount (in ETH)"
							className="border border-slate-200 rounded-lg px-4 py-2"
						/>
						<input
							type="text"
							name="gasLimit"
							placeholder="Gas limit"
							defaultValue="21000"
							className="border border-slate-200 rounded-lg px-4 py-2"
						/>
						<input
							type="text"
							name="toAddr"
							placeholder="To address (e.g. 0x9b7E335088762aD8061C04D08C37902ABC8ACb87)"
							className="border border-slate-200 rounded-lg px-4 py-2"
						/>
						<Button type="submit" variant="secondary">
							Withdraw
						</Button>
					</form>
				</CardContent>
			</Card>

			<SignTransactionRequestDialog
				state={state}
				error={error}
				reset={reset}
			/>
		</div>
	);
}

export function loader({ params }: { params: Params<string> }) {
	if (!params.keyId) {
		throw new Error("No keyId provided");
	}

	return {
		keyId: params.keyId,
	};
}

export default LayerOneEthereum;
