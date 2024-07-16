import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { Core } from "@walletconnect/core";
import {
	IWeb3Wallet,
	Web3Wallet,
	Web3WalletTypes,
} from "@walletconnect/web3wallet";
import { getSdkError, buildApprovedNamespaces } from "@walletconnect/utils";
import {
	ProposalTypes,
	PendingRequestTypes,
	SessionTypes,
} from "@walletconnect/types";
import { AuthEngineTypes } from "@walletconnect/auth-client";

import { fromHex } from "@cosmjs/encoding";
import Web3 from "web3";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ethers } from "ethers";
import useRequestSignature from "@/hooks/useRequestSignature";
import SignRequestDialog from "@/components/SignRequestDialog";
import { useAddressContext } from "@/hooks/useAddressContext";
import { getClient, useQueryHooks } from "@/hooks/useClient";
import * as Popover from "@radix-ui/react-popover";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { getProvider } from "@/lib/eth";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { env } from "@/env";
import { useModalContext } from "@/context/modalContext";

export function useWeb3Wallet(relayUrl: string) {
	const [w, setW] = useState<IWeb3Wallet | null>(null);
	const [sessionProposals, setSessionProposals] = useState<
		ProposalTypes.Struct[]
	>([]);
	const [authRequests, setAuthRequests] = useState<
		AuthEngineTypes.PendingRequest[]
	>([]);
	const [sessionRequests, setSessionRequests] = useState<
		PendingRequestTypes.Struct[]
	>([]);
	const [activeSessions, setActiveSessions] = useState<SessionTypes.Struct[]>(
		[],
	);

	useEffect(() => {
		if (!w) {
			return;
		}
	}, [w]);

	useEffect(() => {
		if (w) {
			return;
		}

		const core = new Core({
			projectId: "4fda584de3c28e97dfa5847023e337c8",
			relayUrl,
			logger: "info",
		});

		Web3Wallet.init({
			core,
			metadata: {
				name: "Warden Protocol Wallets",
				description: "Warden Protocol WalletConnect",
				url: "https://wardenprotocol.org/",
				icons: ["https://avatars.githubusercontent.com/u/158038121"],
			},
		}).then(async (wallet) => {
			try {
				const clientId =
					await wallet.engine.signClient.core.crypto.getClientId();
				console.log("WalletConnect ClientID: ", clientId);
				localStorage.setItem("WALLETCONNECT_CLIENT_ID", clientId);
				setW(wallet);
			} catch (error) {
				console.error(
					"Failed to set WalletConnect clientId in localStorage: ",
					error,
				);
			}
		});

		return () => {
			setW(null);
		};
	}, []);

	const updateState = useCallback(() => {
		if (!w) {
			return;
		}
		setSessionProposals([
			...(w.getPendingSessionProposals() as any as ProposalTypes.Struct[]),
		]);
		setAuthRequests([
			...(w.getPendingAuthRequests() as any as AuthEngineTypes.PendingRequest[]),
		]);
		setSessionRequests([...w.getPendingSessionRequests()]);
		setActiveSessions([
			...(Object.values(
				w.getActiveSessions(),
			) as any as SessionTypes.Struct[]),
		]);
	}, [w]);

	const expireProposal = async (event: Web3WalletTypes.ProposalExpire) => {
		await w!.rejectSession({
			id: event.id,
			reason: getSdkError("USER_REJECTED"),
		});

		updateState();
	};

	const expireRequest = async (
		event: Web3WalletTypes.SessionRequestExpire,
	) => {
		const request = w!
			.getPendingSessionRequests()
			.find((r) => r.id === event.id);

		if (!request) {
			return;
		}

		await w!.respondSessionRequest({
			topic: request.topic,
			response: {
				jsonrpc: "2.0",
				id: event.id,
				error: getSdkError("USER_REJECTED"),
			},
		});

		updateState();
	};

	useEffect(() => {
		if (!w) {
			return;
		}

		w.on("session_proposal", updateState);
		w.on("proposal_expire", expireProposal);
		w.on("auth_request", updateState);
		w.on("session_request", updateState);
		w.on("session_request_expire", expireRequest);
		w.on("session_delete", updateState);

		// keepalive for sessions
		const keepalive = setInterval(() => {
			const sessions = w.getActiveSessions();

			for (const session of Object.values(sessions)) {
				w.core.pairing.ping({ topic: session.pairingTopic });
			}
		}, 15000);

		// TODO
		const onSessionPing = (data: any) => console.log("ping", data);
		w.engine.signClient.events.on("session_ping", onSessionPing);

		return () => {
			clearInterval(keepalive);

			w.off("session_proposal", updateState);
			w.off("proposal_expire", expireProposal);
			w.off("auth_request", updateState);
			w.off("session_request", updateState);
			w.off("session_request_expire", expireRequest);
			w.off("session_delete", updateState);
			w.engine.signClient.events.off("session_ping", onSessionPing);
		};
	}, [w]);

	useEffect(() => {
		const t = setInterval(() => {
			if (!w) {
				return;
			}
			updateState();
		}, 1000);

		return () => {
			clearInterval(t);
		};
	});

	return {
		w,
		activeSessions,
		sessionProposals,
		authRequests,
		sessionRequests,
	};
}

const supportedNamespaces = {
	eip155: {
		chains: [
			"eip155:1", // ETH mainnet
			"eip155:5", // ETH Goerli testnet
			"eip155:11155111", // ETH Sepolia testnet
		],
		methods: [
			"personal_sign",
			"eth_sign",
			"eth_signTransaction",
			"eth_signTypedData",
			"eth_signTypedData_v3",
			"eth_signTypedData_v4",
			"eth_sendRawTransaction",
			"eth_sendTransaction",
		],
		events: ["accountsChanged", "chainChanged"],
	},

	cosmos: {
		chains: [
			"cosmos:osmosis-1", // Osmosis mainnet
			"cosmos:osmo-test-5", // Osmosis testnet
		],
		methods: [
			"cosmos_getAccounts",
			"cosmos_signAmino",
			"cosmos_signDirect",
		],
		events: ["accountsChanged", "chainChanged"],
	},
};

async function fetchAddresses(spaceId: string, type: AddressType) {
	const client = await getClient();
	const queryKeys = client.warden.warden.v1beta2.keysBySpaceId;
	const res = await queryKeys({
		spaceId: BigInt(spaceId),
		deriveAddresses: [type],
	});
	return res.keys?.map((key) => ({
		id: key.key.id,
		publicKey: key.key.publicKey,
		address: key.addresses[0].address,
	}));
}

async function findKeyByAddress(spaceId: string, address: string) {
	const client = await getClient();
	const queryKeys = client.warden.warden.v1beta2.keysBySpaceId;
	const res = await queryKeys({
		spaceId: BigInt(spaceId),
		deriveAddresses: [
			AddressType.ADDRESS_TYPE_ETHEREUM,
			AddressType.ADDRESS_TYPE_OSMOSIS,
		],
	});
	return res.keys?.find((key) =>
		key.addresses
			?.map((w) => w.address?.toLowerCase())
			.includes(address.toLowerCase()),
	)?.key;
}
async function rejectSession(w: IWeb3Wallet, id: number) {
	try {
		const session = await w.rejectSession({
			id,
			reason: getSdkError("USER_REJECTED_METHODS"),
		});
		console.log("session proposal rejected. Session:", session);
	} catch (e) {
		console.error("Failed to reject session", e);
	}
}
async function approveSession(w: IWeb3Wallet, spaceId: string, proposal: any) {
	const { id, relays } = proposal;

	const ethereumAddresses = await fetchAddresses(
		spaceId,
		AddressType.ADDRESS_TYPE_ETHEREUM,
	);
	const osmosisAddresses = await fetchAddresses(
		spaceId,
		AddressType.ADDRESS_TYPE_OSMOSIS,
	);

	if (!ethereumAddresses && !osmosisAddresses) {
		console.error("No addresses found for space", spaceId);
		return;
	}

	const namespaces = buildApprovedNamespaces({
		proposal,
		supportedNamespaces: {
			...supportedNamespaces,
			eip155: {
				...supportedNamespaces.eip155,
				accounts: [
					...ethereumAddresses.map(
						({ address }) => `eip155:1:${address}`,
					),
					...ethereumAddresses.map(
						({ address }) => `eip155:5:${address}`,
					),
					...ethereumAddresses.map(
						({ address }) => `eip155:11155111:${address}`,
					),
				],
			},
			cosmos: {
				...supportedNamespaces.cosmos,
				accounts: [
					...osmosisAddresses.map(
						({ address }) => `cosmos:osmosis-1:${address}`,
					),
					...osmosisAddresses.map(
						({ address }) => `cosmos:osmo-test-5:${address}`,
					),
				],
			},
		},
	});

	try {
		const session = await w.approveSession({
			id,
			relayProtocol: relays[0].protocol,
			namespaces,
		});
		localStorage.setItem(
			`WALLETCONNECT_SESSION_WS_${session.topic}`,
			spaceId,
		);
		console.log("session proposal approved. Session:", session);
	} catch (e) {
		console.error("Failed to approve session", e);
	}
}

const provider = getProvider("sepolia");

async function buildEthTransaction({
	gas,
	value,
	from,
	to,
	data,
}: {
	gas: string;
	value: string;
	from: string;
	to: string;
	data: string;
}) {
	const nonce = await provider.getTransactionCount(from);
	const feeData = await provider.getFeeData();

	const tx = ethers.Transaction.from({
		type: 2,
		chainId: 11155111, // Sepolia chain ID; change if using another network
		maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
		maxFeePerGas: feeData.maxFeePerGas,
		nonce,
		to,
		value,
		gasLimit: gas,
		data,
	});

	return tx;
}

export function WalletConnect() {
	const [open, setOpen] = useState(false);

	const { resolvedTheme } = useTheme();
	const { address } = useAddressContext();

	const { spaceId } = useSpaceId();

	const {
		state: ethState,
		error: ethError,
		reset: ethReset,
		signEthereumTx,
	} = useEthereumTx();
	const {
		state: reqSignatureState,
		error: reqSignatureError,
		requestSignature,
		reset: resetReqSignature,
	} = useRequestSignature();

	const { w, sessionProposals, sessionRequests, activeSessions } =
		useWeb3Wallet("wss://relay.walletconnect.org");

	const [loading, setLoading] = useState(false);
	const [uri, setUri] = useState("");
	const readerRef = useRef<HTMLInputElement | null>(null);

	async function pasteFromClipboard() {
		try {
			const clipboardItems = await navigator.clipboard.read();

			for (const clipboardItem of clipboardItems) {
				const textTypes =
					clipboardItem.types.filter((type) =>
						type.startsWith("text/"),
					) ?? [];

				for (const textType of textTypes) {
					const text = await (
						await clipboardItem.getType(textType)
					).text();

					setUri(text);
					break;
				}
			}
		} catch (err) {
			console.error(err);
		}
	}
	const [wsAddr, setWsAddr] = useState("");

	const { useSpacesByOwner } = useQueryHooks();
	const wsQuery = useSpacesByOwner({
		request: {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			owner: address!,
			pagination: PageRequest.fromPartial({
				limit: BigInt(100),
			}),
		},
		options: {
			enabled: !!address,
		},
	});

	useEffect(() => {
		if (sessionRequests.length > 0) {
			setOpen(true);
		}
	}, [sessionRequests]);

	async function handleApprove(req: PendingRequestTypes.Struct) {
		setLoading(true);
		const topic = req.topic;

		try {
			const wsAddr = localStorage.getItem(
				`WALLETCONNECT_SESSION_WS_${topic}`,
			);
			if (!wsAddr) {
				throw new Error(
					`Unknown space address for session topic: ${topic}`,
				);
			}

			let response = null;
			switch (req.params.request.method) {
				case "personal_sign": {
					const address = req.params.request.params[1];
					const key = await findKeyByAddress(wsAddr, address);
					if (!key) {
						console.error("Unknown address", address);
						return;
					}

					// prepare message
					const msg = fromHex(req.params.request.params[0].slice(2));
					const text = new TextDecoder().decode(msg);
					const hash = Web3.utils.keccak256(
						"\x19Ethereum Signed Message:\n" + text.length + text,
					);

					// send signature request to Warden Protocol and wait response
					const sig = await requestSignature(
						key.id,
						[],
						ethers.getBytes(hash),
					);
					if (!sig) {
						return;
					}

					response = {
						result: ethers.hexlify(sig),
						id: req.id,
						jsonrpc: "2.0",
					};

					break;
				}
				case "eth_sendTransaction": {
					const txParam = req.params.request.params[0];
					const key = await findKeyByAddress(wsAddr, txParam.from);
					if (!key) {
						throw new Error(`Unknown address ${txParam.from}`);
					}

					const tx = await buildEthTransaction(txParam);
					const signedTx = await signEthereumTx(key.id, tx);
					if (!signedTx) {
						return;
					}
					await provider.broadcastTransaction(signedTx.serialized);

					response = {
						result: signedTx.hash,
						id: req.id,
						jsonrpc: "2.0",
					};
					break;
				}
				case "eth_signTypedData_v4": {
					const from = req.params.request.params[0];
					const key = await findKeyByAddress(wsAddr, from);
					if (!key) {
						throw new Error(`Unknown address ${from}`);
					}
					const data = JSON.parse(req.params.request.params[1]);

					// ethers.TypedDataEncoder tries to determine the
					// primaryType automatically, but it fails because we
					// have multiple "roots" in the DAG: one is
					// EIP712Domain, one is specified in
					// `data.primaryType` (e.g. "PermitSingle" for
					// Uniswap, "dYdX", ...).
					// I split the types into two objects and manually
					// create two different encoders.
					const typesWithoutDomain = { ...data.types };
					delete typesWithoutDomain.EIP712Domain;
					const domainEncoder = new ethers.TypedDataEncoder({
						EIP712Domain: data.types.EIP712Domain,
					});
					const messageEncoder = new ethers.TypedDataEncoder(
						typesWithoutDomain,
					);

					// In short, we need to sign:
					//   sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))
					//
					// See EIP-712 for the definition of the message to be signed.
					// https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator
					const domainSeparator = domainEncoder.hashStruct(
						"EIP712Domain",
						data.domain,
					);
					const message = messageEncoder.hashStruct(
						data.primaryType,
						data.message,
					);
					const toSign = ethers.keccak256(
						ethers.concat([
							ethers.getBytes("0x1901"),
							ethers.getBytes(domainSeparator),
							ethers.getBytes(message),
						]),
					);

					const signature = await requestSignature(
						key.id,
						[],
						ethers.getBytes(toSign),
					);
					if (!signature) {
						return;
					}

					response = {
						result: ethers.hexlify(signature),
						id: req.id,
						jsonrpc: "2.0",
					};
					break;
				}
				case "cosmos_getAccounts": {
					const addresses = await fetchAddresses(
						wsAddr,
						// fixme resolve against chainid provided by the request
						AddressType.ADDRESS_TYPE_OSMOSIS,
					);

					response = {
						result: addresses?.map(({ address, publicKey }) => ({
							address,
							algo: "secp256k1",
							pubkey: base64FromBytes(publicKey),
						})),
						id: req.id,
						jsonrpc: "2.0",
					};

					break;
				}
				case "cosmos_signAmino": {
					const {
						signerAddress,
						signDoc,
					}: {
						signerAddress: string;
						signDoc: any;
					} = req.params.request.params;

					const key = await findKeyByAddress(wsAddr, signerAddress);
					if (!key) {
						throw new Error(`Unknown address ${signerAddress}`);
					}

					let signature = await requestSignature(
						key.id,
						[env.aminoAnalyzerContract],
						Uint8Array.from(
							JSON.stringify(signDoc)
								.split("")
								.map((c) => c.charCodeAt(0)),
						),
					);

					if (signature?.length === 65) {
						signature = signature.slice(0, -1);
					}

					if (signature?.length !== 64) {
						throw new Error("unexpected signature length");
					}

					response = {
						jsonrpc: "2.0",
						id: req.id,
						result: {
							signed: signDoc,
							signature: {
								signature: base64FromBytes(signature),
								pub_key: {
									type: "tendermint/PubKeySecp256k1", // hardcoded value
									value: base64FromBytes(key.publicKey),
								},
							},
						},
					};

					break;
				}
				default:
					throw new Error(
						`Unknown or unsupported method: ${req.params.request.method}`,
					);
			}

			await w!.respondSessionRequest({ topic, response });
		} catch (error) {
			console.error(error);
			await w!.respondSessionRequest({
				topic,
				response: {
					jsonrpc: "2.0",
					id: req.id,
					error: {
						code: 1,
						message: `${error}`,
					},
				},
			});
		} finally {
			setLoading(false);
		}
	}

	// if (wsQuery.isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (wsQuery.isError) {
	// 	return <div>Error: {`${wsQuery.error}`}</div>;
	// }
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { dispatch: modalDispatch } = useModalContext();

	return (
		<div>
			<Popover.Root
				modal={true}
				open={open}
				onOpenChange={() => setOpen(!open)}
			>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
						sessionRequests.length > 0 && "animate-pulse",
					)}
					onClick={modalDispatch.bind(null, {
						type: "set",
						payload: {
							type: "walletconnect",
							params: undefined,
						},
					})}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-0 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={cn(
								"h-[3rem]",
								sessionRequests.length > 0 && "animate-bounce",
							)}
							focusable="false"
							aria-hidden="true"
						>
							<path
								d="M6.09442 8.34459C9.35599 5.21847 14.644 5.21847 17.9056 8.34459L18.2981 8.72082C18.4612 8.87713 18.4612 9.13055 18.2981 9.28686L16.9554 10.5739C16.8738 10.652 16.7416 10.652 16.6601 10.5739L16.1199 10.0561C13.8445 7.87528 10.1555 7.87528 7.88012 10.0561L7.30164 10.6106C7.2201 10.6887 7.0879 10.6887 7.00636 10.6106L5.66357 9.32358C5.50049 9.16727 5.50049 8.91385 5.66357 8.75754L6.09442 8.34459ZM20.6826 11.0063L21.8777 12.1517C22.0408 12.308 22.0408 12.5615 21.8777 12.7178L16.489 17.8828C16.3259 18.0391 16.0615 18.0391 15.8984 17.8828C15.8984 17.8828 15.8984 17.8828 15.8984 17.8828L12.0739 14.217C12.0331 14.1779 11.967 14.1779 11.9262 14.217C11.9262 14.217 11.9262 14.217 11.9262 14.217L8.10172 17.8828C7.93865 18.0391 7.67424 18.0391 7.51116 17.8828C7.51116 17.8828 7.51117 17.8828 7.51116 17.8828L2.12231 12.7177C1.95923 12.5614 1.95923 12.308 2.12231 12.1517L3.31739 11.0062C3.48047 10.8499 3.74487 10.8499 3.90795 11.0062L7.73258 14.672C7.77335 14.7111 7.83945 14.7111 7.88022 14.672C7.88022 14.672 7.88022 14.672 7.88022 14.672L11.7047 11.0062C11.8677 10.8499 12.1321 10.8499 12.2952 11.0062C12.2952 11.0062 12.2952 11.0062 12.2952 11.0062L16.1198 14.672C16.1606 14.7111 16.2267 14.7111 16.2675 14.672L20.0921 11.0063C20.2551 10.85 20.5195 10.85 20.6826 11.0063Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
				</Button>
				<Popover.Portal>
					<Popover.Content
						side={isDesktop ? "left" : "bottom"}
						sideOffset={8}
						className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
					>
						<div
							className="inset-0 bg-card/40 backdrop-blur-md absolute"
							onClick={() =>
								sessionRequests.length === 0
									? setOpen(false)
									: null
							}
						></div>
						<div className="p-3 md:p-4 pt-0 flex flex-col space-y-4 w-[600px] max-w-full bg-card fixed h-[calc(100vh-16px)] rounded-xl top-2 right-0">
							<SignRequestDialog
								state={ethState}
								error={ethError}
								reset={ethReset}
							/>
							<SignRequestDialog
								state={reqSignatureState}
								error={reqSignatureError}
								reset={resetReqSignature}
							/>
							{sessionProposals.length > 0 ? (
								<div>
									{sessionProposals.map((s) => (
										<div
											key={s.proposer.publicKey}
											className="flex flex-col gap-6 text-center pt-8"
										>
											<div>
												<div className="flex flex-col gap-4 text-center items-center">
													<p className="text-sm">
														WalletConnect
													</p>
													<img
														className="w-10 h-10"
														src={
															s.proposer.metadata
																.icons[0]
														}
													/>

													<div>
														<span className="font-bold">
															{
																s.proposer
																	.metadata
																	.name
															}
														</span>{" "}
														wants to connect.
													</div>
													<div className="bg-card rounded-lg py-2 px-4 text-sm">
														{
															s.proposer.metadata
																.url
														}
													</div>
												</div>
											</div>

											<div>
												<Select
													onValueChange={(value) => {
														setWsAddr(value);
													}}
													defaultValue={wsAddr}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select a space to pair" />
													</SelectTrigger>
													<SelectContent>
														{wsQuery.data?.spaces.map(
															(w) =>
																w ? (
																	<SelectItem
																		className="hover:bg-card"
																		value={w.id.toString()}
																		key={
																			w.id
																		}
																	>
																		Space #
																		{w.id.toString()}
																		{w.id.toString() ===
																		spaceId
																			? " (Active Space)"
																			: ""}
																	</SelectItem>
																) : undefined,
														)}
													</SelectContent>
												</Select>
											</div>

											<div className="flex flex-row gap-4 place-content-center">
												<Button
													disabled={!w}
													size="sm"
													variant="destructive"
													onClick={() => {
														try {
															setLoading(true);
															rejectSession(
																w!,
																s.id,
															);
														} finally {
															setLoading(false);
														}
													}}
												>
													{loading
														? "Loading..."
														: "Reject"}
												</Button>
												<Button
													disabled={
														!w ||
														loading ||
														wsAddr === ""
													}
													size="sm"
													onClick={() => {
														try {
															setLoading(true);
															approveSession(
																w!,
																wsAddr,
																s,
															);
														} finally {
															setLoading(false);
														}
													}}
												>
													{loading
														? "Loading..."
														: "Approve"}
												</Button>
											</div>
										</div>
									))}
								</div>
							) : sessionRequests.length > 0 ? (
								<div>
									<div className="flex flex-col space-y-2">
										<span className="font-bold">
											Incoming request
										</span>
										{sessionRequests.map((req) => (
											<div
												key={req.id}
												className="grow p-4 border rounded-md"
											>
												<div>
													<div className="flex flex-row gap-2 justify-between">
														<div className="flex flex-row gap-4 items-center">
															<img
																className="w-10 h-10 stroke-current"
																onError={(
																	e,
																) => {
																	const target =
																		e.target as HTMLImageElement;
																	target.src =
																		resolvedTheme &&
																		resolvedTheme ===
																			"light"
																			? "/app-fallback.svg"
																			: "/app-fallback-dark.svg";
																	target.onerror =
																		null;
																}}
																src={
																	activeSessions
																		.find(
																			(
																				s,
																			) =>
																				s.topic ===
																				req.topic,
																		)
																		?.peer.metadata.icons[0].startsWith(
																			"http",
																		)
																		? activeSessions.find(
																				(
																					s,
																				) =>
																					s.topic ===
																					req.topic,
																			)
																				?.peer
																				.metadata
																				.icons[0]
																		: `${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.url}${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.icons[0]}`
																}
															/>
															<div className="flex flex-col">
																<span className="text-sm">
																	{
																		req
																			.params
																			.request
																			.method
																	}
																</span>
																<span className="text-sm text-muted-foreground">
																	{
																		activeSessions.find(
																			(
																				s,
																			) =>
																				s.topic ===
																				req.topic,
																		)?.peer
																			.metadata
																			.name
																	}
																</span>
															</div>
														</div>
														<div>
															<Button
																disabled={
																	!w ||
																	loading
																}
																size={"sm"}
																onClick={() =>
																	handleApprove(
																		req,
																	)
																}
															>
																{loading
																	? "Loading..."
																	: "Approve"}
															</Button>
														</div>
													</div>
												</div>
												<SignRequestDialog
													state={reqSignatureState}
													error={reqSignatureError}
													reset={resetReqSignature}
												/>
											</div>
										))}
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			{isDesktop && activeSessions.length > 0 ? (
				<div className="flex flex-col flex-wrap bg-background rounded-xl mx-2 gap-2">
					{activeSessions.map((s) => (
						<div key={s.peer.publicKey}>
							<Link to={`/apps/open?url=${s.peer.metadata.url}`}>
								<div className="flex flex-row w-12 h-12 items-center place-content-center">
									<img
										className="w-6 h-6 stroke-current"
										onError={(e) => {
											const target =
												e.target as HTMLImageElement;
											target.src =
												resolvedTheme &&
												resolvedTheme === "light"
													? "/app-fallback.svg"
													: "/app-fallback-dark.svg";
											target.onerror = null;
										}}
										src={
											s.peer.metadata.icons[0].startsWith(
												"http",
											)
												? s.peer.metadata.icons[0]
												: `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
										}
									/>
								</div>
							</Link>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
