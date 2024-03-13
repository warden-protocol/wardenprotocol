import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Core } from "@walletconnect/core";
import { IWeb3Wallet, Web3Wallet } from "@walletconnect/web3wallet";
import { buildApprovedNamespaces } from "@walletconnect/utils";
import {
	ProposalTypes,
	PendingRequestTypes,
	SessionTypes,
} from "@walletconnect/types";
import { AuthEngineTypes } from "@walletconnect/auth-client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
import useRequestTransactionSignature from "@/hooks/useRequestTransactionSignature";
import SignTransactionRequestDialog from "@/components/sign-transaction-request-dialog";
import useRequestSignature from "@/hooks/useRequestSignature";
import SignatureRequestDialog from "@/components/signature-request-dialog";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import useWardenWarden from "@/hooks/useWardenWarden";
import {
	Key,
	WalletType,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import * as Popover from "@radix-ui/react-popover";
import { PowerIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { MetadataEthereum } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/module";
import { cn } from "@/lib/utils";

function useWeb3Wallet(relayUrl: string) {
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
		[]
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
					error
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
				w.getActiveSessions()
			) as any as SessionTypes.Struct[]),
		]);
	}, [w]);

	useEffect(() => {
		if (!w) {
			return;
		}

		w.on("session_proposal", updateState);
		w.on("auth_request", updateState);
		w.on("session_request", updateState);
		w.on("session_delete", updateState);

		// TODO
		const onSessionPing = (data: any) => console.log("ping", data);
		w.engine.signClient.events.on("session_ping", onSessionPing);

		return () => {
			w.off("session_proposal", updateState);
			w.off("auth_request", updateState);
			w.off("session_request", updateState);
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
};

async function fetchEthAddresses(spaceId: string) {
	const client = useClient();
	const queryKeys = client.WardenWarden.query.queryKeys;
	const res = await queryKeys({
		space_id: spaceId,
		type: WalletType.WALLET_TYPE_ETH,
	});
	return res.data.keys?.map((key) => key.wallets?.map((w) => w.address));
}

async function findKeyByAddress(spaceId: string, address: string) {
	const client = useClient();
	const queryKeys = client.WardenWarden.query.queryKeys;
	const res = await queryKeys({
		space_id: spaceId,
		type: WalletType.WALLET_TYPE_ETH,
	});
	return res.data.keys?.find((key) =>
		key.wallets
			?.map((w) => w.address?.toLowerCase())
			.includes(address.toLowerCase())
	)?.key as Required<Key>;
}

async function approveSession(
	w: IWeb3Wallet,
	spaceId: string,
	proposal: any
) {
	const { id, relays } = proposal;

	const ethereumAddresses = await fetchEthAddresses(spaceId);
	if (!ethereumAddresses) {
		console.error("No Ethereum addresses found for space", spaceId);
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
						(address) => `eip155:1:${address}`
					),
					...ethereumAddresses.map(
						(address) => `eip155:5:${address}`
					),
					...ethereumAddresses.map(
						(address) => `eip155:11155111:${address}`
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
			spaceId
		);
		console.log("session proposal approved. Session:", session);
	} catch (e) {
		console.error("Failed to approve session", e);
	}
}

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

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
	const { resolvedTheme } = useTheme();
	const { address } = useAddressContext();

	const {
		state: reqSignatureState,
		error: reqSignatureError,
		requestSignature,
		reset: resetReqSignature,
	} = useRequestSignature();
	const {
		state: reqTxSignatureState,
		error: reqTxSignatureError,
		requestTransactionSignature,
		reset: resetReqTxSignature,
	} = useRequestTransactionSignature();
	const { w, sessionProposals, sessionRequests, activeSessions } =
		useWeb3Wallet("wss://relay.walletconnect.org");
	const [loading, setLoading] = useState(false);
	const [uri, setUri] = useState("");
	const [wsAddr, setWsAddr] = useState("");

	const { QuerySpacesByOwner } = useWardenWarden();
	const wsQuery = QuerySpacesByOwner({ owner: address }, {}, 10);

	// if (wsQuery.isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (wsQuery.isError) {
	// 	return <div>Error: {`${wsQuery.error}`}</div>;
	// }

	return (
		<Popover.Root modal={true}>
			<Popover.Trigger asChild>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Update dimensions"
					className={cn(
						"h-16 w-16 rounded-none border-l hover:bg-muted hover:border-b-accent hover:border-b-2",
						sessionRequests.length > 0 && "animate-pulse"
					)}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={cn(
							"h-[3rem]",
							sessionRequests.length > 0 && "animate-bounce"
						)}
						focusable="false"
						aria-hidden="true"
					>
						<path
							d="M6.09442 8.34459C9.35599 5.21847 14.644 5.21847 17.9056 8.34459L18.2981 8.72082C18.4612 8.87713 18.4612 9.13055 18.2981 9.28686L16.9554 10.5739C16.8738 10.652 16.7416 10.652 16.6601 10.5739L16.1199 10.0561C13.8445 7.87528 10.1555 7.87528 7.88012 10.0561L7.30164 10.6106C7.2201 10.6887 7.0879 10.6887 7.00636 10.6106L5.66357 9.32358C5.50049 9.16727 5.50049 8.91385 5.66357 8.75754L6.09442 8.34459ZM20.6826 11.0063L21.8777 12.1517C22.0408 12.308 22.0408 12.5615 21.8777 12.7178L16.489 17.8828C16.3259 18.0391 16.0615 18.0391 15.8984 17.8828C15.8984 17.8828 15.8984 17.8828 15.8984 17.8828L12.0739 14.217C12.0331 14.1779 11.967 14.1779 11.9262 14.217C11.9262 14.217 11.9262 14.217 11.9262 14.217L8.10172 17.8828C7.93865 18.0391 7.67424 18.0391 7.51116 17.8828C7.51116 17.8828 7.51117 17.8828 7.51116 17.8828L2.12231 12.7177C1.95923 12.5614 1.95923 12.308 2.12231 12.1517L3.31739 11.0062C3.48047 10.8499 3.74487 10.8499 3.90795 11.0062L7.73258 14.672C7.77335 14.7111 7.83945 14.7111 7.88022 14.672C7.88022 14.672 7.88022 14.672 7.88022 14.672L11.7047 11.0062C11.8677 10.8499 12.1321 10.8499 12.2952 11.0062C12.2952 11.0062 12.2952 11.0062 12.2952 11.0062L16.1198 14.672C16.1606 14.7111 16.2267 14.7111 16.2675 14.672L20.0921 11.0063C20.2551 10.85 20.5195 10.85 20.6826 11.0063Z"
							fill="currentColor"
						></path>
					</svg>
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="bg-card border border-t-0 w-96 rounded-b-lg max-h-[calc(100vh-64px)] overflow-scroll no-scrollbar">
					<div className="p-4 flex flex-col space-y-4">
						<SignatureRequestDialog
							state={reqSignatureState}
							error={reqSignatureError}
							reset={resetReqSignature}
						/>
						<SignTransactionRequestDialog
							state={reqTxSignatureState}
							error={reqTxSignatureError}
							reset={resetReqTxSignature}
						/>

						<div className="flex flex-col space-y-6">
							<div className="text-center pt-6">
								<h4 className="text-xl">
									Connect dApps to SpaceWard
								</h4>
								<p className="text-sm">
									Paste the pairing code below to connect your
									keys via WalletConnect
								</p>
							</div>
							<div>
								<form
									className="flex flex-row gap-4"
									onSubmit={async (e) => {
										e.preventDefault();
										try {
											setLoading(true);
											await w?.pair({ uri });
											console.log(
												"WalletConnect session paired"
											);
										} catch (error) {
											console.error(error);
										} finally {
											setUri("");
											setLoading(false);
										}
									}}
								>
									<div className="flex flex-row border rounded-lg p-2 w-full">
										<Input
											type="text"
											placeholder="Pairing code"
											value={uri}
											className="border-0 focus-visible:!ring-0 ring-0 bg-card focus-visible:ring-card"
											onChange={(e) =>
												setUri(e.target.value)
											}
										/>
										<Button
											disabled={loading}
											type="submit"
											size={"sm"}
										>
											Connect
										</Button>
									</div>
								</form>
							</div>
						</div>

						{sessionProposals.length > 0 && (
							<div>
								<div>
									{sessionProposals.map((s) => (
										<div
											key={s.proposer.publicKey}
											className="flex flex-col gap-4"
										>
											<div>
												<div className="flex flex-row gap-2">
													<img
														className="w-12 h-12"
														src={
															s.proposer.metadata
																.icons[0]
														}
													/>
													<div className="flex flex-col">
														<div>
															{
																s.proposer
																	.metadata
																	.name
															}
														</div>
														<div>
															{
																s.proposer
																	.metadata
																	.description
															}
														</div>
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
														<SelectValue placeholder="Select one space to pair" />
													</SelectTrigger>
													<SelectContent>
														{wsQuery.data.pages
															?.flatMap(
																(p) => p.spaces
															)
															.map((w) =>
																w ? (
																	<SelectItem
																		value={
																			w.address!
																		}
																		key={
																			w.address!
																		}
																	>
																		{
																			w.address!
																		}
																	</SelectItem>
																) : undefined
															)}
													</SelectContent>
												</Select>
											</div>

											<div>
												<Button
													disabled={
														!w ||
														loading ||
														wsAddr === ""
													}
													onClick={() => {
														try {
															setLoading(true);
															approveSession(
																w!,
																wsAddr,
																s
															);
														} finally {
															setLoading(false);
														}
													}}
												>
													{loading
														? "Loading..."
														: "Approve connection"}
												</Button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{sessionRequests.length > 0 && (
							<div>
								<div className="flex flex-col space-y-2">
									<span className="font-bold">
										Incoming request
									</span>
									{sessionRequests.map((req) => (
										<div
											key={req.publicKey}
											className="grow p-2 border rounded-md"
										>
											<div>
												<div className="flex flex-row gap-2 justify-between">
													<div className="flex flex-row gap-2 items-center">
														<img
															className="w-8 h-8 stroke-current"
															onError={(e) => {
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
																		(s) =>
																			s.topic ===
																			req.topic
																	)
																	?.peer.metadata.icons[0].startsWith(
																		"http"
																	)
																	? activeSessions.find(
																			(
																				s
																			) =>
																				s.topic ===
																				req.topic
																		)?.peer
																			.metadata
																			.icons[0]
																	: `${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.url}${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.icons[0]}`
															}
														/>
														<div className="flex flex-col">
															<span className="text-sm">
																{
																	req.params
																		.request
																		.method
																}
															</span>
															<span className="text-sm text-muted-foreground">
																{
																	activeSessions.find(
																		(s) =>
																			s.topic ===
																			req.topic
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
																!w || loading
															}
															size={"sm"}
															onClick={async () => {
																setLoading(
																	true
																);
																const topic =
																	req.topic;

																try {
																	const wsAddr =
																		localStorage.getItem(
																			`WALLETCONNECT_SESSION_WS_${topic}`
																		);

																	if (
																		!wsAddr
																	) {
																		throw new Error(
																			`Unknown space address for session topic: ${topic}`
																		);
																	}

																	let response =
																		null;
																	switch (
																		req
																			.params
																			.request
																			.method
																	) {
																		case "personal_sign": {
																			// find Warden Protocol key associated with the requested ETH address
																			const address =
																				req
																					.params
																					.request
																					.params[1];
																			const key =
																				await findKeyByAddress(
																					wsAddr,
																					address
																				);
																			if (
																				!key
																			) {
																				console.error(
																					"Unknown address",
																					address
																				);
																				return;
																			}

																			// prepare message
																			const msg =
																				fromHex(
																					req.params.request.params[0].slice(
																						2
																					)
																				);
																			const text =
																				new TextDecoder().decode(
																					msg
																				);
																			const hash =
																				Web3.utils.keccak256(
																					"\x19Ethereum Signed Message:\n" +
																						text.length +
																						text
																				);

																			// send signature request to Warden Protocol and wait response
																			const sig =
																				await requestSignature(
																					parseInt(
																						key.id,
																						10
																					),
																					ethers.getBytes(
																						hash
																					)
																				);
																			if (
																				!sig
																			) {
																				return;
																			}

																			response =
																				{
																					result: ethers.hexlify(
																						sig
																					),
																					id: req.id,
																					jsonrpc:
																						"2.0",
																				};

																			break;
																		}
																		case "eth_sendTransaction": {
																			const txParam =
																				req
																					.params
																					.request
																					.params[0];
																			const key =
																				await findKeyByAddress(
																					wsAddr,
																					txParam.from
																				);
																			if (
																				!key
																			) {
																				throw new Error(
																					`Unknown address ${txParam.from}`
																				);
																			}

																			const tx =
																				await buildEthTransaction(
																					txParam
																				);
																			const signature =
																				await requestTransactionSignature(
																					parseInt(
																						key.id,
																						10
																					),
																					ethers.getBytes(
																						tx.unsignedSerialized
																					),
																					{
																						typeUrl:
																							"/warden.warden.MetadataEthereum",
																						value: MetadataEthereum.encode(
																							{
																								chainId: 11155111,
																							}
																						).finish(),
																					}
																				);
																			if (
																				!signature
																			) {
																				return;
																			}

																			// add the signature to the transaction
																			const signedTx =
																				tx.clone();
																			signedTx.signature =
																				ethers.hexlify(
																					signature
																				);

																			// instead of waiting for realyer-eth to pick this
																			// up, we broadcast it directly for a faster user
																			// experience
																			await provider.broadcastTransaction(
																				signedTx.serialized
																			);

																			response =
																				{
																					result: signedTx.hash,
																					id: req.id,
																					jsonrpc:
																						"2.0",
																				};
																			break;
																		}
																		case "eth_signTypedData_v4": {
																			const from =
																				req
																					.params
																					.request
																					.params[0];
																			const key =
																				await findKeyByAddress(
																					wsAddr,
																					from
																				);
																			if (
																				!key
																			) {
																				throw new Error(
																					`Unknown address ${from}`
																				);
																			}
																			const data =
																				JSON.parse(
																					req
																						.params
																						.request
																						.params[1]
																				);

																			// ethers.TypedDataEncoder tries to determine the
																			// primaryType automatically, but it fails because we
																			// have multiple "roots" in the DAG: one is
																			// EIP712Domain, one is specified in
																			// `data.primaryType` (e.g. "PermitSingle" for
																			// Uniswap, "dYdX", ...).
																			// I split the types into two objects and manually
																			// create two different encoders.
																			const typesWithoutDomain =
																				{
																					...data.types,
																				};
																			delete typesWithoutDomain.EIP712Domain;
																			const domainEncoder =
																				new ethers.TypedDataEncoder(
																					{
																						EIP712Domain:
																							data
																								.types
																								.EIP712Domain,
																					}
																				);
																			const messageEncoder =
																				new ethers.TypedDataEncoder(
																					typesWithoutDomain
																				);

																			// In short, we need to sign:
																			//   sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))
																			//
																			// See EIP-712 for the definition of the message to be signed.
																			// https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator
																			const domainSeparator =
																				domainEncoder.hashStruct(
																					"EIP712Domain",
																					data.domain
																				);
																			const message =
																				messageEncoder.hashStruct(
																					data.primaryType,
																					data.message
																				);
																			const toSign =
																				ethers.keccak256(
																					ethers.concat(
																						[
																							ethers.getBytes(
																								"0x1901"
																							),
																							ethers.getBytes(
																								domainSeparator
																							),
																							ethers.getBytes(
																								message
																							),
																						]
																					)
																				);

																			const signature =
																				await requestSignature(
																					parseInt(
																						key.id,
																						10
																					),
																					ethers.getBytes(
																						toSign
																					)
																				);
																			if (
																				!signature
																			) {
																				return;
																			}

																			response =
																				{
																					result: ethers.hexlify(
																						signature
																					),
																					id: req.id,
																					jsonrpc:
																						"2.0",
																				};
																			break;
																		}
																		default:
																			throw new Error(
																				`Unknown or unsupported method: ${req.params.request.method}`
																			);
																	}

																	await w!.respondSessionRequest(
																		{
																			topic,
																			response,
																		}
																	);
																} catch (error) {
																	console.error(
																		error
																	);
																	await w!.respondSessionRequest(
																		{
																			topic,
																			response:
																				{
																					jsonrpc:
																						"2.0",
																					id: req.id,
																					error: {
																						code: 1,
																						message: `${error}`,
																					},
																				},
																		}
																	);
																} finally {
																	setLoading(
																		false
																	);
																}
															}}
														>
															{loading
																? "Loading..."
																: "Approve"}
														</Button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{activeSessions.length > 0 && (
							<div className="flex flex-col gap-4">
								<hr />
								<div className="flex flex-col flex-wrap gap-4">
									{activeSessions.map((s) => (
										<div
											key={s.peer.publicKey}
											className="grow p-2 border rounded-md"
										>
											<div>
												<div className="flex flex-row gap-2 justify-between">
													<div className="flex flex-row gap-2 items-center">
														<img
															className="w-6 h-6 stroke-current"
															onError={(e) => {
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
																s.peer.metadata.icons[0].startsWith(
																	"http"
																)
																	? s.peer
																			.metadata
																			.icons[0]
																	: `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
															}
														/>
														<span className="text-base">
															{
																s.peer.metadata
																	.name
															}
														</span>
													</div>
													<div>
														<Button
															disabled={!w}
															onClick={async () => {
																await w!.disconnectSession(
																	{
																		topic: s.topic,
																		reason: {
																			code: 1,
																			message:
																				"user disconnected",
																		},
																	}
																);
															}}
															variant="destructive"
															size={"sm"}
														>
															<PowerIcon className="h-4 w-4 text-foreground" />
														</Button>
													</div>
												</div>
											</div>

											{/* <div>
												<div className="flex flex-col gap-2">
													<span className="font-bold text-sm">
														Linked key
													</span>
													<span>
														{localStorage.getItem(
															`WALLETCONNECT_SESSION_WS_${s.topic}`
														) ||
															"Unknown (an error occurred)"}
													</span>
												</div>
											</div> */}
										</div>
									))}
								</div>
							</div>
						)}

						<div>
							<Accordion
								type="single"
								collapsible
								className="w-full border rounded-lg px-4 text-muted-foreground"
							>
								<AccordionItem
									value="item-1"
									className="border-b-0"
								>
									<AccordionTrigger className="font-sans text-sm">
										How do I connect to a dApp?
									</AccordionTrigger>
									<AccordionContent className="px-4">
										<ol className="list-decimal space-y-1">
											<li>
												Open a WalletConnect supported
												dApp
											</li>
											<li>Connect a wallet</li>
											<li>
												Select WalletConnect as the
												wallet
											</li>
											<li>
												Copy the pairing code, paste it
												into the input field above
											</li>
											<li>Approve the session</li>
											<li>
												Your dApp is now connected to
												SpaceWard
											</li>
										</ol>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
