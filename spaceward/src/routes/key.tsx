import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useLoaderData } from "react-router";
import { Link, Params } from "react-router-dom";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import KeychainId from "@/components/keychain-address";
import { prettyKeyType } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import CardRow from "@/components/card-row";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import {
	Key as KeyModel,
	WalletType,
	WalletKeyResponse,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";

const layer1s = [
	{
		name: "Ethereum Sepolia",
		walletType: WalletType.WALLET_TYPE_ETH,
		operations: [
			// { name: "WalletConnect", url: (_: string) => `/walletconnect` },
			{
				name: "Deposit/Withdraw ETH",
				url: (id: string) => `/keys/${id}/sepolia`,
			},
		],
	},
	// {
	// 	name: "Celestia Testnet",
	// 	walletType: WalletType.WALLET_TYPE_CELESTIA,
	// 	operations: [
	// 		// { name: "WalletConnect", url: (_: string) => `/walletconnect` },
	// 		{
	// 			name: "Deposit/Withdraw",
	// 			url: (id: string) => `/keys/${id}/celestia`,
	// 		},
	// 	],
	// },
	// {
	// 	name: "Sui Testnet",
	// 	walletType: WalletType.WALLET_TYPE_SUI,
	// 	operations: [
	// 		{ name: "WalletConnect", url: (_: string) => `/walletconnect` },
	// 		{
	// 			name: "Deposit/Withdraw",
	// 			url: (id: string) => `/keys/${id}/sui`,
	// 		},
	// 	],
	// },
];

function Key() {
	const { keyId } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	const { QueryKeyById } = useWardenWardenV1Beta2();
	const q = QueryKeyById({ id: keyId }, {});

	if (q.status === "loading") {
		return (
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Key {keyId}
						</h2>
					</div>
				</div>
			</div>
		);
	}

	const key = q.data?.key as Required<KeyModel>;
	if (!key) {
		return (
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Key {keyId} not found
						</h2>
					</div>
				</div>
			</div>
		);
	}

	const addresses = (q.data?.wallets ||
		[]) as WalletKeyResponse[];

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
			<Breadcrumb>
				<BreadcrumbItem>
					<BreadcrumbLink to="/keys">Keys</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink to={`/keys/${key.id}`}>
						Key {key.id}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Key {key.id}
					</h2>
					<p className="text-muted-foreground">
						Managed by{" "}
						<KeychainId address={key.keychain_id} />.
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Details</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-bold">Type</span>
							<span>{prettyKeyType(key.type)}</span>
						</div>
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-bold">
								Key material
							</span>
							<span className="font-mono break-all">
								{key.public_key}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{layer1s.map((l1) => (
				<Card key={l1.name}>
					<CardHeader>
						<CardTitle>{l1.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardRow label="Address">
							{addresses?.find(
								(a) => a.type === l1.walletType
							) ? (
								<span className="font-mono break-all">
									{
										addresses.find(
											(a) => a.type === l1.walletType
										)?.address
									}
								</span>
							) : (
								<span className="font-mono break-all">
									Not available
								</span>
							)}
						</CardRow>
					</CardContent>
					<CardFooter>
						{l1.operations.map((op) => (
							<Link key={op.name} to={op.url(keyId)}>
								<Button
									variant="default"
									size="sm"
									className="ml-3"
								>
									{op.name}
								</Button>
							</Link>
						))}
					</CardFooter>
				</Card>
			))}
		</div>
	);
}

export async function loader({ params }: { params: Params<string> }) {
	if (!params.keyId) {
		throw new Error("No key id provided");
	}
	return {
		keyId: params.keyId,
	};
}

export default Key;
