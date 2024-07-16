import clsx from "clsx";
import { Icons } from "@/components/ui/icons-assets";
import { useEffect, useRef, useState } from "react";
import { useWeb3Wallet } from "../walletconnect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { PowerIcon } from "lucide-react";
import { getClient, useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { fromHex } from "@cosmjs/encoding";
import useRequestSignature from "@/hooks/useRequestSignature";
import { ethers } from "ethers";
import { getProvider } from "@/lib/eth";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import SignRequestDialog from "@/components/SignRequestDialog";
import { env } from "@/env";
import Web3 from "web3";
import {
	ProposalTypes,
	PendingRequestTypes,
	SessionTypes,
} from "@walletconnect/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import MobileTransport from "../walletconnect/MobileTransport";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useSpaceId } from "@/hooks/useSpaceId";
import {
	IWeb3Wallet,
	Web3Wallet,
	Web3WalletTypes,
} from "@walletconnect/web3wallet";

import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { getSdkError, buildApprovedNamespaces } from "@walletconnect/utils";

const provider = getProvider("sepolia");

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

export default function WalletConnectModal() {
	const [uri, setUri] = useState("");
	const [loading, setLoading] = useState(false);
	const { w, sessionProposals, sessionRequests, activeSessions } =
		useWeb3Wallet("wss://relay.walletconnect.org");
	const readerRef = useRef<HTMLInputElement | null>(null);
	const { resolvedTheme } = useTheme();
	const { spaceId } = useSpaceId();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (sessionRequests.length > 0) {
			setOpen(true);
		}
	}, [sessionRequests]);

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

	const { address } = useAddressContext();
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
	const {
		state: reqSignatureState,
		error: reqSignatureError,
		requestSignature,
		reset: resetReqSignature,
	} = useRequestSignature();

	const {
		state: ethState,
		error: ethError,
		reset: ethReset,
		signEthereumTx,
	} = useEthereumTx();

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

	return (
		<div className="max-w-[520px] w-[520px] pb-5">
			<div className="flex items-center justify-between gap-2">
				<div>
					<p className="text-5xl font-display font-bold pb-2 tracking-[0.24px]">
						Connect dApp
					</p>
					<p>Paste a paring code to connect a dApp to Space</p>
				</div>
				<img src="/images/wc.svg" alt="" />
			</div>

			<div id="reader" ref={readerRef} style={{ display: "none" }} />
			<div className="flex flex-row w-full relative mt-10 mb-12">
				{uri && (
					<div className="absolute left-5 top-3 text-xs text-muted-foreground">
						Pairing code
					</div>
				)}
				<Input
					type="text"
					placeholder="Pairing code"
					value={uri}
					className={clsx(
						"h-[60px]  pr-[90px] pl-5 text-left bg-border-quaternary border-transparent rounded-lg focus-visible:!ring-0 focus-visible:!ring-offset-0 ring-0 focus-visible:border-2 border-2 focus-visible:border-pixel-pink border-solid",
						uri ? "pt-6 pb-1" : "py-3",
					)}
					onChange={(e) => setUri(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						pasteFromClipboard();
					}}
					className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground px-1 font-semibold py-2 hover:text-foreground transition-all duration-200"
				>
					Paste
				</button>
			</div>

			{/* <Button
				disabled={loading}
				type="submit"
				size={"sm"}
				// className="absolute top-1/2 right-5 -translate-y-1/2"
			>
				Connect
			</Button> */}

			<div>
				<form
					className="flex flex-row gap-4"
					onSubmit={async (e) => {
						e.preventDefault();
						try {
							setLoading(true);
							await w?.pair({ uri });
							console.log("WalletConnect session paired");
						} catch (error) {
							console.error(error);
						} finally {
							setUri("");
							setLoading(false);
						}
					}}
				></form>
			</div>
			{activeSessions.length > 0 ? (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col flex-wrap gap-4">
						{activeSessions.map((s) => (
							<div
								key={s.peer.publicKey}
								className="grow p-4 bg-background rounded-xl"
							>
								<div>
									<div className="flex flex-row gap-2 justify-between">
										<div className="flex flex-row gap-4 items-center">
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
													target.onerror = null;
												}}
												src={
													s.peer.metadata.icons[0].startsWith(
														"http",
													)
														? s.peer.metadata
																.icons[0]
														: `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
												}
											/>
											<span className="text-sm flex flex-col text-muted-foreground">
												<span>
													{s.peer.metadata.name}
												</span>
												<span className="text-muted-foreground">
													Space #
													{localStorage.getItem(
														`WALLETCONNECT_SESSION_WS_${s.topic}`,
													) || ""}
												</span>
											</span>
										</div>
										<div>
											<Button
												disabled={!w}
												onClick={async () => {
													await w!.disconnectSession({
														topic: s.topic,
														reason: {
															code: 1,
															message:
																"user disconnected",
														},
													});
												}}
												variant="destructive"
												size={"sm"}
											>
												<PowerIcon className="h-4 w-4 text-foreground" />
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div>
					<div className="mb-6 h-[1px] bg-border-quaternary" />

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem
							value="item-1"
							className="border-b-0 p-0"
						>
							<AccordionTrigger className="font-sans text-xl font-bold p-0">
								How do I connect to a dApp?
							</AccordionTrigger>
							<AccordionContent className="pt-4">
								<ol className="list-decimal space-y-1">
									<li>Open a WalletConnect supported dApp</li>
									<li>Connect a wallet</li>
									<li>Select WalletConnect as the wallet</li>
									<li>
										Copy the pairing code, paste it into the
										input field above
									</li>
									<li>Approve the session</li>
									<li>
										Your dApp is now connected to SpaceWard
									</li>
								</ol>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<Accordion
						type="single"
						collapsible
						className="w-full mt-6"
					>
						<AccordionItem
							value="item-1"
							className="border-b-0 p-0"
						>
							<AccordionTrigger className="font-sans text-xl font-bold p-0">
								If I don&apos;t have a paring code
							</AccordionTrigger>
							<AccordionContent className="pt-4">
								<MobileTransport
									onData={(data) => {
										setUri(Buffer.from(data).toString());
									}}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			)}

			{sessionProposals.length > 0 ? (
				<div>
					{sessionProposals.map((s) => (
						<div
							key={s.proposer.publicKey}
							className="flex flex-col gap-6 text-center pt-8"
						>
							<div>
								<div className="flex flex-col gap-4 text-center items-center">
									<p className="text-sm">WalletConnect</p>
									<img
										className="w-10 h-10"
										src={s.proposer.metadata.icons[0]}
									/>

									<div>
										<span className="font-bold">
											{s.proposer.metadata.name}
										</span>{" "}
										wants to connect.
									</div>
									<div className="bg-card rounded-lg py-2 px-4 text-sm">
										{s.proposer.metadata.url}
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
										{wsQuery.data?.spaces.map((w) =>
											w ? (
												<SelectItem
													className="hover:bg-card"
													value={w.id.toString()}
													key={w.id}
												>
													Space #{w.id.toString()}
													{w.id.toString() === spaceId
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
											rejectSession(w!, s.id);
										} finally {
											setLoading(false);
										}
									}}
								>
									{loading ? "Loading..." : "Reject"}
								</Button>
								<Button
									disabled={!w || loading || wsAddr === ""}
									size="sm"
									onClick={() => {
										try {
											setLoading(true);
											approveSession(w!, wsAddr, s);
										} finally {
											setLoading(false);
										}
									}}
								>
									{loading ? "Loading..." : "Approve"}
								</Button>
							</div>
						</div>
					))}
				</div>
			) : sessionRequests.length > 0 ? (
				<div>
					<div className="flex flex-col space-y-2">
						<span className="font-bold">Incoming request</span>
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
												onError={(e) => {
													const target =
														e.target as HTMLImageElement;
													target.src =
														resolvedTheme &&
														resolvedTheme ===
															"light"
															? "/app-fallback.svg"
															: "/app-fallback-dark.svg";
													target.onerror = null;
												}}
												src={
													activeSessions
														.find(
															(s) =>
																s.topic ===
																req.topic,
														)
														?.peer.metadata.icons[0].startsWith(
															"http",
														)
														? activeSessions.find(
																(s) =>
																	s.topic ===
																	req.topic,
															)?.peer.metadata
																.icons[0]
														: `${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.url}${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.icons[0]}`
												}
											/>
											<div className="flex flex-col">
												<span className="text-sm">
													{req.params.request.method}
												</span>
												<span className="text-sm text-muted-foreground">
													{
														activeSessions.find(
															(s) =>
																s.topic ===
																req.topic,
														)?.peer.metadata.name
													}
												</span>
											</div>
										</div>
										<div>
											<Button
												disabled={!w || loading}
												size={"sm"}
												onClick={() =>
													handleApprove(req)
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
	);
}
