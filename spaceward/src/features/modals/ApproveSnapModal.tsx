import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { Assets } from "@/features/walletconnect/assets";
import { ModalParams } from "./types";
import { useModalState } from "./state";
import clsx from "clsx";
import { KeyringRequest, KeyringSnapRpcClient } from "@metamask/keyring-api";
import { env } from "@/env";
import { useMetaMask } from "@/hooks/useMetaMask";
import { useQuery } from "@tanstack/react-query";
import { querySnapRequests } from "../metamask/queries";
import { ETH_CHAIN_CONFIG, ETH_CHAINID_MAP, getProvider, REVERSE_ETH_CHAINID_MAP } from "@/lib/eth";
import { SignTypedDataVersion, TypedDataUtils, TypedMessage } from "@metamask/eth-sig-util";
import { AssetIcon } from "../assets/AssetRow";
import { capitalize, prepareEth } from "./util";
import { bigintToFixed } from "@/lib/math";
import { hashMessage, isHex, toBytes } from "viem";

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

const getNetwork = (req: KeyringRequest) => {
	const [type, chainId] = req.scope.split(":");

	if (type === "eip155") {
		const chain = REVERSE_ETH_CHAINID_MAP[chainId];

		if (!chain) {
			return;
		}

		return chain;
	}

	return;
}

const formatRequest = (req: KeyringRequest): {
	chain?: string,
	from?: string,
	message?: string,
	title?: string,
	to?: string,
	data?: string,
	value?: string,
} => {
	const chain = getNetwork(req);

	switch (req.request.method) {
		case "eth_signTransaction": {
			const params: SignTransactionParams | undefined = (req.request.params as any)?.[0];
			const value = BigInt(params?.value ?? "0x0");
			// fixme
			const decimals = 18;
			const chainId = chain ? ETH_CHAINID_MAP[chain] : undefined;
			const token = (chainId ? ETH_CHAIN_CONFIG[chainId]?.token : undefined) ?? "ETH";


			return {
				chain,
				title: "Sign EVM transaction",
				from: params?.from,
				to: params?.to,
				data: params?.data,
				value: value ? `${bigintToFixed(value, { decimals, format: true })} ${token}` : undefined,
			}
		}

		case "personal_sign": {
			const [hexMsg, from]: [`0x${string}`, `0x${string}`] = req.request.params as any;

			if (!hexMsg) {
				return { chain, from };
			}

			return {
				chain,
				from,
				message: Buffer.from(hexMsg.slice(2), "hex").toString("utf-8"),
				title: "Sign message"
			};
		}
	}

	return {
		chain,
		title: "Unknown method"
	};
};

export default function ApproveModal({ hidden }: ModalParams<{}>) {
	const eth = useEthereumTx();
	const { installedSnap } = useMetaMask();
	const [loading, setLoading] = useState(false);
	const { setData: setModal } = useModalState();
	const { resolvedTheme } = useTheme();

	const keyringSnapClient = useMemo(() => new KeyringSnapRpcClient(
		env.snapOrigin,
		window.ethereum,
	), []);

	const requests = useQuery(querySnapRequests(keyringSnapClient, !!installedSnap));

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

				if (!msgHex || !isHex(msgHex)) {
					throw new Error("Request has no message");
				}

				const msg = hashMessage(
					{ raw: msgHex }
				);

				const storeId = await eth.signRaw(
					keyId,
					toBytes(msg),
					{ snap: { requestId: req.id } },
				);

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
					throw new Error(`chainId not supported: ${chainId}`);
				}

				const { provider } = getProvider(chainName);
				const { request } = prepareEth(provider, txParam as any /* fixme typing */);

				const storeId = await eth.signEthereumTx(
					keyId,
					request,
					chainName,
					{
						snap: { requestId: req.id },
						title: "Approve snap transaction",
					},
				);

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

				const storeId = await eth.signRaw(
					keyId,
					toSign,
					{ snap: { requestId: req.id } },
				);

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

	const req = requests.data?.[0];
	const count = Math.max(requests.data?.length ?? 0 - 1, 0);
	const data = req ? formatRequest(req) : undefined;
	const [collapsed, setCollapsed] = useState(true);


	return (
		<div className={clsx("max-w-[520px] w-[520px] pb-5", { hidden })}>
			<div className="flex flex-col gap-12">
				<div className="rounded-full mx-auto relative bg-white w-[100px] h-[100px] flex items-center justify-center">
					<img
						className="w-[52px] h-[52px] stroke-current"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src =
								resolvedTheme && resolvedTheme === "light"
									? "/app-fallback.svg"
									: "/app-fallback-dark.svg";
							target.onerror = null;
						}}
						src={
							"/logos/metamask.svg"
						}
					/>

					<div className="rounded-full absolute -right-3 -bottom-3 w-9 h-9 bg-fill-quaternary flex items-center justify-center">
						<Assets.approveDoc />
					</div>
				</div>

				<div>
					<div className="text-5xl font-display mb-6 font-bold tracking-[0.24px] text-center">
						Approve the action
					</div>

					<div className="text-center">
						From Metamask
					</div>
				</div>

				<div className="w-full rounded-lg bg-fill-quaternary">
					<div
						className="flex items-center justify-between w-full p-4 text-left cursor-pointer"
						onClick={() => setCollapsed(!collapsed)}
					>
						<span className="font-semibold text-xl">Details</span>
						<svg
							className={`h-5 w-5 transform transition-transform ${collapsed ? '' : 'rotate-180'}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</div>
					{!collapsed && (
						<div className="px-4 pb-4">
							{req && (
								<div className="space-y-2 text-sm">
									{data?.title ?
										<div className="flex items-center">
											<p className="text-base font-semibold">{data.title}</p>
										</div>
										: null}
									{data?.chain ?
										<div className="flex items-center">
											<p className="text-base">Network</p>
											<div className="ml-auto flex items-center gap-2 mb-1">
												<AssetIcon type="network" value={data.chain} />
												{capitalize(data.chain)}
											</div>
										</div>
										: null}
									{data?.from ?
										<div className="flex items-center">
											<p className="text-base">Address</p>
											<div className="ml-auto flex items-center gap-2">
												{data.from}
											</div>
										</div>
										: null}
									{data?.to ?
										<div className="flex items-center">
											<p className="text-base">To</p>
											<div className="ml-auto flex items-center gap-2">
												{data.to}
											</div>
										</div>
										: null}
									{data?.data ?
										<div className="flex">
											<p className="text-base self-start">Data</p>
											<p className="ml-auto flex gap-2 break-all max-w-[65%] max-h-24 overflow-auto">
												{data.data}
											</p>
										</div>
										: null}
									{data?.message ?
										<div className="flex items-center">
											<p className="text-base">Network</p>
											<div className="ml-auto flex items-center gap-2">
												{data.message}
											</div>
										</div>
										: null}
									{data?.value ?
										<div className="flex items-center">
											<p className="text-base">Value</p>
											<div className="ml-auto flex items-center gap-2">
												{data.value}
											</div>
										</div>
										: null}

									{/*req.request.params && (
										<div>
											<span className="text-base">Params:</span>
											<pre className="mt-1 whitespace-pre-wrap break-words">
												{JSON.stringify(req.request.params, null, 2)}
											</pre>
										</div>
									)*/}
								</div>
							)}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Button
						disabled={loading}
						onClick={async () => {
							const [req, ...rest] = requests.data ?? [];

							if (!req || loading) {
								return;
							}

							setLoading(true);

							try {
								await handleApproveRequest(req);

								if (!rest.length) {
									setModal({
										type: undefined,
										params: undefined,
									});
								}
							} catch (e) {
								console.error(e);
							}

							setLoading(false);
						}}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
					>
						{loading ? "Loading..." : "Approve"}
					</Button>

					<Button
						disabled={loading}
						onClick={async () => {
							const [req, ...rest] = requests.data ?? [];

							if (!req || loading) {
								return;
							}

							setLoading(true);

							try {
								await handleRejectRequest(req);

								if (!rest.length) {
									setModal({
										type: undefined,
										params: undefined,
									});
								}
							} catch (e) {
								console.error(e);
							}

							setLoading(false);
						}}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-fill-quaternary text-display font-semibold shrink-0 "
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}
