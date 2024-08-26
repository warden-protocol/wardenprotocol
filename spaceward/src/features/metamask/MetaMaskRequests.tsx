import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InstallMetaMaskSnapButton } from "@/features/metamask";
import {
	KeyringAccount,
	KeyringRequest,
	KeyringSnapRpcClient,
} from "@metamask/keyring-api";
import { env } from "@/env";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import {
	TypedDataUtils,
	SignTypedDataVersion,
	TypedMessage,
} from "@metamask/eth-sig-util";
import { useMetaMask } from "@/hooks/useMetaMask";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { REVERSE_ETH_CHAINID_MAP } from "@/lib/eth";

interface SignTransactionParams {
	chainId: string;
	data: string;
	from: string;
	gasLimit: string;
	maxFeePerGas: string;
	maxPriorityFeePerGas: string;
	nonce: string;
	to: string;
	type: string;
	value: string;
}

async function buildSignTransaction(data: SignTransactionParams) {
	return ethers.Transaction.from({
		chainId: data.chainId,
		data: data.data,
		gasLimit: data.gasLimit,
		maxFeePerGas: data.maxFeePerGas,
		maxPriorityFeePerGas: data.maxPriorityFeePerGas,
		nonce: ethers.getNumber(data.nonce),
		to: data.to,
		type: ethers.getNumber(data.type),
		value: data.value,
	});
}

export function MetaMaskRequests() {
	const { signRaw, signEthereumTx } = useEthereumTx();
	const { installedSnap } = useMetaMask();

	const keyringSnapClient = new KeyringSnapRpcClient(
		env.snapOrigin,
		window.ethereum,
	);

	const requestsQ = useQuery(
		["metamask-keyring-requests"],
		() => keyringSnapClient.listRequests(),
		{
			refetchInterval: 1000,
			enabled: !!installedSnap,
		},
	);

	const accountsQ = useQueries({
		queries:
			requestsQ.data?.map((req) => ({
				queryKey: ["metamask-keyring-account", req.account],
				queryFn: () => keyringSnapClient.getAccount(req.account),
				refetchInterval: Infinity,
			})) ?? [],
	});

	const accountsQLoading = accountsQ.some((q) => q.isLoading);

	const accounts = accountsQ.reduce(
		(acc, q) => {
			if (q.data) {
				acc[q.data.id] = q.data;
			}
			return acc;
		},
		{} as Record<string, KeyringAccount>,
	);

	const handleApproveRequest = async (req: KeyringRequest) => {
		const account = await keyringSnapClient.getAccount(req.account);
		const keyId = BigInt(account.options.keyId?.valueOf() as string);

		switch (req.request.method) {
			case "personal_sign": {
				if (
					!(req.request.params instanceof Array) ||
					req.request.params?.length !== 2
				) {
					throw new Error("wrong params length");
				}
				const msgHex = req.request.params?.[0];
				if (!msgHex) {
					throw new Error("Request has no message");
				}
				const msg = ethers.hashMessage(
					ethers.getBytes(msgHex as string),
				);

				const storeId = await signRaw(keyId, ethers.getBytes(msg), undefined, { requestId: req.id });

				if (!storeId) {
					throw new Error(
						"Something went wrong waiting for signature request to complete",
					);
				}

				break;
			}
			case "eth_signTransaction": {
				if (
					!(req.request.params instanceof Array) ||
					req.request.params?.length !== 1
				) {
					throw new Error("wrong params length");
				}
				const txParam =
					req.request.params[0]?.valueOf() as SignTransactionParams;

				const chainId = parseInt(txParam.chainId.slice(2), 16);
				const chainName = REVERSE_ETH_CHAINID_MAP[chainId];

				if (!chainName) {
					throw new Error(`chainId not supported: ${chainId}`)
				}
				const tx = await buildSignTransaction(txParam);
				const storeId = await signEthereumTx(keyId, tx, chainName, undefined, { requestId: req.id });

				if (!storeId) {
					throw new Error(
						"Something went wrong waiting for signature request to complete",
					);
				}

				break;
			}
			case "eth_signTypedData_v4": {
				if (
					!(req.request.params instanceof Array) ||
					req.request.params?.length !== 2
				) {
					throw new Error("wrong params length");
				}
				const data =
					req.request.params[1]?.valueOf() as TypedMessage<never>;
				const toSign = TypedDataUtils.eip712Hash(
					data,
					SignTypedDataVersion.V4,
				);

				const storeId = await signRaw(keyId, ethers.getBytes(toSign), undefined, { requestId: req.id });

				if (!storeId) {
					throw new Error(
						"Something went wrong waiting for signature request to complete",
					);
				}

				break;
			}
		}
	};

	const handleRejectRequest = async (req: KeyringRequest) => {
		await keyringSnapClient.rejectRequest(req.id);
	};

	const [open, setOpen] = useState(false);

	return (
		<Popover.Root
			modal={true}
			open={open}
			onOpenChange={() => setOpen(!open)}
		>
			<Popover.Trigger asChild>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Update dimensions"
					className={cn(
						"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
					)}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-3 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<img
							src="/logos/metamask.svg"
							className="object-fill w-10 h-10 aspect-square"
						/>
					</div>
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					side="left"
					sideOffset={8}
					className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
				>
					<div
						className="inset-0 bg-card/40 backdrop-blur-md absolute"
						onClick={() => setOpen(false)}
					></div>
					<div className="p-3 md:p-10 pt-0 flex flex-col space-y-4 w-[600px] max-w-full bg-card fixed h-[calc(100vh-16px)] top-2 rounded-xl right-0">
						<div className="flex flex-col space-y-4">
							<div className="text-center pt-6 flex items-center place-content-center">
								<img
									src="/logos/metamask.svg"
									className="w-12 h-12"
								/>
							</div>
							<div className="text-center pt-0">
								<p className="text-4xl font-display pb-2">
									MetaMask Snap
								</p>
							</div>
						</div>

						<InstallMetaMaskSnapButton />

						<hr />

						<div className="text-center">
							{requestsQ.isLoading ? (
								<div>Loading...</div>
							) : requestsQ.isError ? (
								<div>
									Error: {JSON.stringify(requestsQ.error)}
								</div>
							) : requestsQ.data?.length === 0 ? (
								<div>No pending requests</div>
							) : (
								requestsQ.data?.map((req) => (
									<div
										key={req.id}
										className="flex flex-col gap-4"
									>
										<p>
											{accounts[req.account]?.address
												? `For ${accounts[req.account].address}`
												: accountsQLoading
													? "Loading info from MetaMask"
													: "Error fetching account details from MetaMask"}
										</p>
										<p>{req.request.method}</p>
										<div className="flex flex-row gap-4">
											<Button
												size="sm"
												onClick={() =>
													handleApproveRequest(req).then(() => setOpen(false))
												}
											>
												Approve
											</Button>
											<Button
												size="sm"
												variant="destructive"
												onClick={() =>
													handleRejectRequest(req)
												}
											>
												Reject
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
