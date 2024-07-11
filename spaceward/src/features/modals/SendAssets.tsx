import clsx from "clsx";
import type { TransactionReceipt } from "ethers";
import { useCallback, useContext, useMemo, useState } from "react";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import type { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import { Icons } from "@/components/ui/icons-assets";
import type { TransferParams } from "./types";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import SignRequestDialog from "@/components/SignRequestDialog";
import { SignRequesterState } from "@/hooks/useRequestSignature";
import { useModalContext } from "@/context/modalContext";
import { TxBuild, buildTransaction } from "./util";
import Key from "../assets/Key";
import { useAssetQueries } from "../assets/hooks";
import { useSpaceId } from "@/hooks/useSpaceId";
import { FIAT_FORMAT } from "../assets/util";
import { useCurrency } from "@/hooks/useCurrency";
import { numRestrict } from "../staking/util";
import { useKeychainSigner } from "@/hooks/useKeychainSigner";
import { NetworkIcons, TokenIcons } from "@/components/ui/icons-crypto";
import { AssetPlaceholder } from "../assets/AssetRow";
import { validateAddress } from "../intents/AddAddressModal";
import { SigningStargateClient } from "@cosmjs/stargate";
import { walletContext } from "@cosmos-kit/react-lite";

const getAddress = (key?: QueryKeyResponse, type?: AddressType) =>
	key?.addresses.find((a) => a.type === type)?.address;

type Currency = keyof typeof FIAT_FORMAT;

export default function SendAssetsModal({
	// address,
	chainName,
	token,
	type,
	keyResponse: key,
}: TransferParams) {
	const { walletManager } = useContext(walletContext);
	// todo useFiatConversion hook
	const currency = useCurrency().currency as Currency;
	// todo useFiatConversion hook
	const formatter = FIAT_FORMAT[currency];
	const { dispatch } = useModalContext();

	const { spaceId } = useSpaceId();
	const {
		queryKeys,
		queryBalances,
		// todo useFiatConversion hook
		queryPrices,
	} = useAssetQueries(spaceId);

	// todo useFiatConversion hook
	const fiatConversion = useMemo(() => {
		if (currency === "usd") {
			return {
				name: "usd",
				value: BigInt(1),
				decimals: 0,
			};
		}

		for (const entry of queryPrices) {
			if (!entry.data) {
				continue;
			}

			if (entry.data.name === currency) {
				return entry.data;
			}
		}
	}, [queryPrices, currency]);

	const results = queryBalances
		.filter((result) => result.data?.key.key.id === key?.key.id)
		.flatMap(({ data, refetch }) => {
			return (data?.results ?? []).map((item) => ({ ...item, refetch }));
		});

	const noAssets = results.every((result) => !result.balance);

	const selectedToken = useMemo(
		() =>
			results.find(
				(data) => data.chainName === chainName && data.token === token,
			) ?? results[0],
		[token, chainName, results],
	);

	const [pending, setPending] = useState(false);
	const [receipt, setReceipt] = useState<TransactionReceipt>();
	const [amount, setAmount] = useState("");
	const [destinationAddress, setDestinationAddress] = useState("");
	const [keyDropdown, setKeyDropdown] = useState(false);
	const amountNum = parseFloat(amount);

	const amountWarning = amountNum
		? Number.isFinite(amountNum)
			? bigintToFloat(selectedToken.balance, selectedToken.decimals) <
				amountNum
			: true
		: false;

	const addressWarning = destinationAddress
		? !validateAddress(destinationAddress, [
				selectedToken.type.startsWith("eip155:") ? "eth" : "bech32",
			]).ok
		: false;

	const { signEthereumTx, ...eth } = useEthereumTx();

	const keys = useMemo(() => (key ? [key] : []), [key]);

	const { signer, ...cosm } = useKeychainSigner({
		keys,
	});

	const req =
		type === AddressType.ADDRESS_TYPE_ETHEREUM
			? eth
			: type === AddressType.ADDRESS_TYPE_OSMOSIS
				? cosm
				: null;

	const state =
		(req?.state === SignRequesterState.IDLE && pending
			? SignRequesterState.BROADCAST_SIGN_REQUEST
			: req?.state) ?? SignRequesterState.IDLE;

	const error = req ? req.error : "Wrong address type"; // todo tx broadcast error

	const reset = useCallback(() => {
		req?.reset();
		setReceipt(undefined);

		if (receipt) {
			dispatch({ type: "type", payload: undefined });
		}
	}, [dispatch, receipt, req]);

	async function submit() {
		if (!key) {
			return;
		}

		const { address, chainName } = selectedToken;
		setPending(true);

		try {
			const txBuild = await buildTransaction({
				item: selectedToken,
				from: address,
				to: destinationAddress,
				amount,
			});

			if (txBuild.type === "eth") {
				const { provider, tx } = txBuild;
				const signedTx = await signEthereumTx(key.key.id, tx);

				if (!signedTx) {
					throw new Error("Failed to sign transaction");
				}

				const res = await provider.broadcastTransaction(
					signedTx.serialized,
				);

				const receipt = await provider.waitForTransaction(res.hash);

				if (!receipt) {
					throw new Error("Failed to get transaction receipt");
				}

				setReceipt(receipt);
			} else if (txBuild.type === "cosmos") {
				const { fee, msgs } = txBuild as TxBuild<"cosmos">;
				const repo = walletManager.getWalletRepo(chainName);
				repo.activate();
				const rpc = await repo.getRpcEndpoint();

				const endpoint = rpc
					? typeof rpc === "string"
						? rpc
						: rpc.url
					: `https://rpc.cosmos.directory/${chainName}`;

				const client = await SigningStargateClient.connectWithSigner(
					endpoint,
					signer,
				);

				const res = await client.signAndBroadcast(address, msgs, fee);

				if (res.code) {
					console.error(res);
					throw new Error("tx failed");
				}

				// fixme types
				setReceipt(res as any);
			} else {
				throw new Error(`not implemented: ${txBuild.type}`);
			}
		} catch (err) {
			console.error(err);
		}

		await selectedToken.refetch();
		setPending(false);
	}

	function pasteFromClipboard(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (!navigator?.clipboard) {
			console.error("Clipboard API not available");
			return;
		}

		navigator.clipboard
			.readText()
			.then((text) => {
				setDestinationAddress(text);
			})
			.catch((err) => {
				console.error("Failed to read clipboard contents: ", err);
			});
	}

	const address = getAddress(key, type);

	const maxAmount = bigintToFixed(selectedToken.balance, {
		decimals: selectedToken.decimals,
	});

	const Token = TokenIcons[selectedToken.token] ?? AssetPlaceholder;
	const Network = NetworkIcons[selectedToken.chainName] ?? AssetPlaceholder;

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px]">Send</div>

			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div>
					<div className="relative mb-8 z-50 ">
						<div
							onClick={() => {
								setKeyDropdown(!keyDropdown);
							}}
							className="min-h-[60px] cursor-pointer text-left bg-secondary-bg rounded-lg pl-4 pr-3 flex items-center  relative z-50 gap-3"
						>
							<Key keyValue={address} />

							<div>
								<label
									className="text-label-secondary text-xs "
									htmlFor="network"
								>
									From Key
								</label>

								<div
									className={clsx(
										"block w-full mt-[-4px] text-left pointer-events-none bg-transparent outline-none foces:outline-none",
									)}
								>
									{address
										? `${address.slice(0, 8)}...${address.slice(-8)}`
										: ""}
								</div>
							</div>
							<Icons.chevronDown
								className={
									keyDropdown
										? "rotate-180 ml-auto"
										: " ml-auto"
								}
							/>
						</div>
						{keyDropdown && (
							<div className="absolute right-0 bottom-[-8px] translate-y-full w-full bg-secondary-bg backdrop-blur-[20px] rounded-lg py-2">
								{queryKeys.data?.keys.map((item) => {
									const addr = getAddress(item, type);

									return (
										<div
											onClick={() => {
												// setCurrentKey(item.address);
												dispatch({
													type: "params",
													payload: {
														chainName,
														keyResponse: item,
														token,
														type,
													},
												});
												setKeyDropdown(false);
											}}
											key={addr}
											className="cursor-pointer flex items-center gap-2 px-4 h-12"
										>
											<Key keyValue={addr} />
											{addr?.slice(0, 8)}...
											{address?.slice(-8)}
											{addr === address && (
												<Icons.check className="ml-auto" />
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>

					{noAssets && (
						<div className="flex rounded-lg px-4 h-[56px] bg-negative-secondary mb-8 items-center gap-3">
							<Icons.redInfo />
							No available assets in this key. Select an another
							key
						</div>
					)}

					<div
						className={clsx(
							"relative z-40 mb-[2px] text-left rounded-lg rounded-bl-none rounded-br-none p-6 border-[1px] border-border-quaternary",
							noAssets && "pointer-events-none opacity-30	",
							amountWarning && "bg-negative-secondary",
							!amountWarning && "bg-secondary-bg",
						)}
					>
						<div className="text-label-secondary mb-3">
							You&apos;re sending
						</div>

						<div className="relative flex items-center justify-between">
							<input
								className={clsx(
									"block w-full h-10 bg-transparent outline-none foces:outline-none text-[32px] font-bold",
								)}
								id="address"
								onChange={(e) =>
									setAmount(numRestrict(e.target.value))
								}
								value={amount}
								placeholder="Amount"
							/>

							<div className="relative z-40">
								<div
									onClick={dispatch.bind(null, {
										type: "set",
										payload: {
											type: "select-asset",
											params: {
												keyResponse: key,
											},
										},
									})}
									className="cursor-pointer h-[32px] bg-fill-quaternary rounded-[20px] p-1 pr-2 flex items-center gap-[6px]"
								>
									<div className="relative w-6 h-6 ">
										<Token className="w-6 h-6 object-contain" />
										<Network className="absolute bottom-[-1px] right-[-1px] w-[10px] h-[10px]" />
									</div>
									{selectedToken.token}
									<Icons.chevronDown
										className={clsx(
											"ml-auto invert dark:invert-0",
										)}
									/>
								</div>
							</div>
						</div>

						<div className="flex mt-1 justify-between">
							<div className="text-label-secondary opacity-50 text-xs">
								{/* todo useFiatConversion hook */}
								{formatter.format(
									(amount ? parseFloat(amount) : 0) *
										(fiatConversion
											? bigintToFloat(
													(selectedToken.price *
														BigInt(10) **
															BigInt(
																fiatConversion.decimals,
															)) /
														fiatConversion.value,
													selectedToken.priceDecimals,
												)
											: 0),
								)}
							</div>
							<div
								className={clsx(
									"text-xs",
									amountWarning && "text-negative",
									!amountWarning && "text-pixel-pink",
								)}
							>
								Max:{maxAmount}{" "}
							</div>
						</div>
					</div>

					<div
						className={clsx(
							"relative z-40 mb-8 text-left rounded-lg flex items-center justify-between rounded-tl-none rounded-tr-none p-6 border-[1px] border-border-quaternary",
							noAssets && "pointer-events-none opacity-30	",
							addressWarning && "bg-negative-secondary",
							!addressWarning && "bg-secondary-bg",
						)}
					>
						{destinationAddress && (
							<label
								className="text-label-secondary text-xs absolute top-[16px] left-5"
								htmlFor="destinationAddress"
							>
								To address
							</label>
						)}
						<input
							className={clsx(
								"block w-full bg-transparent outline-none foces:outline-none",
								destinationAddress && "translate-y-[8px]",
							)}
							id="destinationAddress"
							onChange={(e) =>
								setDestinationAddress(e.target.value)
							}
							value={destinationAddress}
							placeholder="To..."
						/>
						{destinationAddress ? (
							<>
								{addressWarning ? (
									<Icons.alert className="ml-4 mr-4" />
								) : null}
								<button
									className="text-label-secondary font-semibold"
									onClick={() => setDestinationAddress("")}
								>
									<img src="/images/x.svg" alt="" />
								</button>
							</>
						) : (
							<button
								onClick={pasteFromClipboard}
								className="text-label-secondary font-semibold"
							>
								Paste
							</button>
						)}

						{addressWarning && (
							<div className="absolute left-0 -bottom-1 translate-y-full text-negative text-xs">
								Add correct address
							</div>
						)}
					</div>
				</div>
			</form>

			<div className="mt-12 pt-6">
				<button
					onClick={submit}
					className={clsx(
						`bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
						(amount == "" ||
							destinationAddress == "" ||
							noAssets) &&
							"pointer-events-none opacity-50",
					)}
				>
					Send
				</button>
			</div>

			<SignRequestDialog
				state={state}
				reset={reset}
				error={error}
				pending={pending}
				step={{
					title: "Broadcast",
					description: `Transaction was broadcasted to ${selectedToken.chainName} network`,
				}}
			/>
		</div>
	);
}
