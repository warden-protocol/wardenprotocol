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
import { StargateClient } from "@cosmjs/stargate";
import useRequestTransactionSignature from "@/hooks/useRequestTransactionSignature";
import SignTransactionRequestDialog from "@/components/sign-transaction-request-dialog";
import useWardenWarden from "@/hooks/useWardenWarden";
import {
	Key,
	WalletType,
} from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
// import { useClient } from "@/hooks/useClient";

const url = "https://celestia-rpc.publicnode.com:443";
const provider = await StargateClient.connect(url);

async function buildCelestiaTransaction({
	gas,
	value,
	from,
	to,
}: {
	gas: string;
	value: string;
	from: string;
	to: string;
}) {
	// const client = useClient();

	const tx = "test";
	return tx;
}

async function getCelestiaBalance(address: string, searchDenom: string) {
	const balance = await provider.getBalance(address, searchDenom);
	return balance;
}

function LayerOneCelestia({ chainId }: { chainId: number }) {
	const { state, error, requestTransactionSignature, reset } =
		useRequestTransactionSignature();
	const { keyId } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	const { QueryKeys } = useWardenWarden();
	const q = QueryKeys(
		{ key_id: keyId, type: WalletType.WALLET_TYPE_CELESTIA },
		{},
		10
	);

	const key = q.data?.pages?.[0].keys?.[0];
	// if (!key) {
	// 	return <div>Key not found</div>;
	// }
	const k = key?.key as Required<Key>;

	const celestiaAddr =
		key?.wallets?.find(
			(wallet) => wallet.type === WalletType.WALLET_TYPE_CELESTIA
		)?.address || "";
	const searchDenom = "utia";

	const balQ = useQuery({
		queryKey: ["celestia-balance", chainId, celestiaAddr],
		queryFn: () => getCelestiaBalance(celestiaAddr, searchDenom),
		refetchInterval: 10000,
	});

	if (q.status === "loading" || balQ.isLoading) {
		return <div>Loading...</div>;
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const gasLimit = formData.get("gasLimit") as string;
		const amount = formData.get("amount") as string;
		const toAddr = formData.get("toAddr") as string;

		const tx = await buildCelestiaTransaction({
			from: celestiaAddr,
			gas: gasLimit,
			value: amount,
			to: toAddr,
		});

		const signature = await requestTransactionSignature(
			parseInt(k.id, 10),
			new Uint8Array(2) // "unsignedTx"
		);
		if (!signature) {
			return;
		}

		// add the signature to the transaction
		const signedTx = tx.clone();
		// signedTx.signature = ethers.hexlify(signature);

		// instead of waiting for realyer-eth to pick this
		// up, we broadcast it directly for a faster user
		// experience

		// await provider.broadcastTransaction(signedTx.serialized);
		await provider.broadcastTx(signedTx.serialized);
	};

	// const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const formData = new FormData(e.currentTarget);
	// 	const gasLimit = formData.get("gasLimit") as string;
	// 	const amount = formData.get("amount") as string;
	// 	const toAddr = formData.get("toAddr") as string;

	// 	const tx = await buildCelestiaTransaction({
	// 		from: celestiaAddr,
	// 		gas: gasLimit,
	// 		value: parseInt(amount * 1000000),
	// 		to: toAddr,
	// 		getOfflineSigner: signer,
	// 	});

	// 	console.log(tx);
	// };

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
						<BreadcrumbLink to={`/keys/${k.id}/celestia`}>
							Celestia
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Deposit CELESTIA</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<CardRow label="CELESTIA Address">
						<div className="flex flex-row gap-2 justify-center items-center">
							<span className="font-mono">{celestiaAddr}</span>
							<Button
								size="iconxs"
								variant="ghost"
								onClick={() =>
									navigator.clipboard.writeText(celestiaAddr)
								}
							>
								<Copy
									className="h-4 w-4"
									onClick={() =>
										navigator.clipboard.writeText(
											celestiaAddr
										)
									}
								/>
							</Button>
						</div>
					</CardRow>
					<CardRow label="Balance">
						{balQ?.data?.amount / 1000000} TIA
					</CardRow>
				</CardContent>
				<CardFooter>
					<Link
						target="_blank"
						to={`https://www.mintscan.io/celestia/address/${celestiaAddr}`}
					>
						<Button size="sm" variant="secondary">
							View on Mintscan
						</Button>
					</Link>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Withdraw TIA</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<input
							type="text"
							name="amount"
							placeholder="Amount (in TIA)"
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
							placeholder="To address (e.g. celestia1wxt0klszu7287nmsx07duucp7e6qln4zhrj2ph)"
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

export default LayerOneCelestia;
