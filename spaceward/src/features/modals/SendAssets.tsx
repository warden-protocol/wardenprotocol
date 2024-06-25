import clsx from "clsx";
import {
	AbiCoder,
	concat,
	keccak256,
	parseUnits,
	toUtf8Bytes,
	Transaction,
} from "ethers";
import { useContext, useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Icons } from "@/components/ui/icons-assets";
import type { TransferParams } from "./types";
import { balancesQuery } from "../assets/queries";
import { ModalContext } from "@/context/modalContext";
import { bigintToFixed } from "@/lib/math";
import type { BalanceEntry } from "../assets/types";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import { useQueryHooks } from "@/hooks/useClient";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import SignatureRequestDialog from "@/components/SignatureRequestDialog";
import { getAbiItem } from "../assets/util";
import erc20Abi from "@/contracts/eip155/erc20Abi";

function typedStartsWith<T extends string>(
	prefix: T,
	str?: string,
): str is `${T}${string}` {
	return Boolean(str?.startsWith(prefix));
}

async function buildTransaction({
	item,
	from,
	to,
	amount: _amount,
}: {
	item: BalanceEntry;
	from: string;
	to: string;
	amount: string;
}) {
	if (typedStartsWith("eip155:", item.type)) {
		if (!isSupportedNetwork(item.chainName)) {
			throw new Error(`Unsupported network: ${item.chainName}`);
		}

		const amount = parseUnits(_amount, item.decimals);
		const provider = getProvider(item.chainName);
		const nonce = await provider.getTransactionCount(from);
		const feeData = await provider.getFeeData();
		const gasLimit = BigInt(21000);

		if (item.type === "eip155:native") {
			const tx = Transaction.from({
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				to,
				value: amount,
				...feeData,
				gasLimit,
			});

			return { provider, tx, type: "eth" };
		} else if (item.type === "eip155:erc20") {
			if (!item.erc20Token) {
				throw new Error("missing token contract address");
			}

			const abiItem = getAbiItem(erc20Abi, "transfer")!;
			const signature = `${abiItem.name}(${abiItem.inputs.map((x) => x.type).join(",")})`;
			const sigHash = keccak256(toUtf8Bytes(signature));
			const selector = sigHash.slice(0, 10);
			const abiCoder = AbiCoder.defaultAbiCoder();

			const params = abiCoder.encode(
				abiItem.inputs.map((x) => x.type),
				[to, amount],
			);

			const data = concat([selector, params]);

			const tx = Transaction.from({
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				data,
				to: item.erc20Token,
				...feeData,
			});

			const gasLimit = await provider.estimateGas({ ...tx, from });
			// fixme gas limit
			tx.gasLimit = gasLimit * BigInt(2);
			return { provider, tx, type: "eth" };
		}
	}

	throw new Error(`not implemented: ${item.type}`);
}

export default function SendAssetsModal({
	address,
	chainName,
	token,
	type,
	keyId,
}: TransferParams) {
	const { dispatch } = useContext(ModalContext);
	const { isReady } = useQueryHooks();
	const eth = useEthereumTx();
	const enabled = Boolean(address && token && chainName && type && isReady);

	const balances = useQueries(
		balancesQuery(enabled, [
			{
				addresses: [
					// @ts-expect-error fixme refactor params
					{ address, type },
				],
			},
		]),
	);

	const tokens = useMemo(() => {
		const unique = new Set<string>();

		for (const entry of balances) {
			if (entry.data?.token) {
				unique.add(entry.data.token);
			}
		}

		return Array.from(unique);
	}, [balances]);

	const selectedToken = useMemo(
		() =>
			balances.find(
				({ data }) =>
					data?.chainName === chainName && data?.token === token,
			) ?? balances[0],
		[token, chainName],
	);

	const chains = useMemo(() => {
		return balances
			.filter(
				({ data }) => data && data?.token === selectedToken.data?.token,
			)
			.map(({ data }) => data?.chainName as string);
	}, [selectedToken, balances]);

	function selectToken(token: string) {
		let nextChain: string | undefined;

		for (const { data } of balances) {
			if (token !== data?.token) {
				continue;
			}

			if (!nextChain) {
				nextChain = data?.chainName;
			}

			if (data?.chainName === chainName) {
				nextChain = chainName;
				break;
			}
		}

		if (!nextChain) {
			console.warn("No chain found for token", token);
			return;
		}

		dispatch({
			type: "params",
			payload: { address, chainName: nextChain, keyId, token, type },
		});
	}

	const [amount, setAmount] = useState("");
	const [destinationAddress, setDestinationAddress] = useState("");
	const [assetDropdown, setAssetDropdown] = useState(false);
	const [destinationDropdown, setDestinationDropdown] = useState(false);

	async function submit() {
		if (!selectedToken.data || !keyId) {
			return;
		}

		const { address } = selectedToken.data;

		const { tx, provider, type } = await buildTransaction({
			item: selectedToken.data,
			from: address,
			to: destinationAddress,
			amount,
		});

		if (type === "eth") {
			const signedTx = await eth.signEthereumTx(keyId, tx);

			if (!signedTx) {
				return;
			}

			const res = await provider.broadcastTransaction(
				signedTx.serialized,
			);

			const receipt = await provider.waitForTransaction(res.hash)
			// TODO add step to signature request dialog; handle errors
			console.log({ receipt });
		}
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

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px]">
				Send asset
			</div>

			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div>
					<div className="grid grid-cols-[1fr_140px] gap-2">
						<div className="relative z-50 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between">
							{amount && (
								<label
									className="text-muted-foreground text-xs absolute top-3 left-5"
									htmlFor="address"
								>
									Address
								</label>
							)}
							<input
								className={clsx(
									"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
									amount && "translate-y-[8px]",
								)}
								id="address"
								onChange={(e) => setAmount(e.target.value)}
								value={amount}
								placeholder="Amount"
							/>
							<button
								className="text-muted-foreground font-semibold py-[6px] px-3"
								onClick={() => {
									if (!selectedToken.data) {
										return;
									}
									const { balance, decimals } =
										selectedToken.data;

									setAmount(
										bigintToFixed(balance, {
											decimals,
										}),
									);
								}}
							>
								Max
							</button>
						</div>

						<div className="relative z-40">
							<div
								onClick={() => setAssetDropdown(!assetDropdown)}
								className="cursor-pointer h-full bg-secondary-bg rounded-lg py-3 px-4 flex items-center gap-2"
							>
								<img
									src="/images/eth.png"
									alt=""
									className="w-6 h-6 object-contain"
								/>
								{selectedToken.data?.token}
								<Icons.chevronDown
									className={clsx(
										"ml-auto",
										assetDropdown && "rotate-180",
									)}
								/>
							</div>

							{assetDropdown && (
								<div className="absolute right-0 bottom-[-8px] translate-y-full w-full bg-secondary-bg backdrop-blur-[30px] rounded-lg py-2">
									{tokens.map((token) => (
										<div
											className="cursor-pointer flex items-center gap-2 px-4 h-12"
											key={token}
											onClick={() => {
												setAssetDropdown(false);
												selectToken(token);
											}}
										>
											<img
												src="/images/eth.png"
												alt=""
												className="w-6 h-6 object-contain"
											/>
											{token}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="relative mt-8 z-30">
						<div
							onClick={() => {
								setDestinationDropdown(!destinationDropdown);
							}}
							className="cursor-pointer bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between"
						>
							{selectedToken.data?.chainName && (
								<label
									className="text-muted-foreground text-xs absolute top-3 left-5"
									htmlFor="network"
								>
									Destination network
								</label>
							)}
							<input
								className={clsx(
									"block w-full h-[60px] pointer-events-none bg-transparent outline-none foces:outline-none",
									{
										["translate-y-[8px]"]: Boolean(
											selectedToken.data?.chainName,
										),
									},
								)}
								id="network"
								value={selectedToken.data?.chainName}
								placeholder="Destination network"
							/>
							<Icons.chevronDown
								className={
									destinationDropdown ? "rotate-180" : ""
								}
							/>
						</div>
						{destinationDropdown && (
							<div className="absolute right-0 bottom-[-8px] translate-y-full w-full bg-secondary-bg backdrop-blur-[30px] rounded-lg py-2">
								<div className="absolute left-0 top-0 w-full h-full z-[-1] backdrop-blur-[30px]"></div>
								{chains.map((chain) => (
									<div
										onClick={() => {
											setDestinationDropdown(false);

											dispatch({
												type: "params",
												payload: {
													address,
													chainName: chain,
													token,
													type,
												},
											});
										}}
										className="cursor-pointer flex items-center gap-2 px-4 h-12"
									>
										<img
											src="/images/eth.png"
											alt=""
											className="w-6 h-6 object-contain"
										/>
										{chain}
									</div>
								))}
							</div>
						)}
					</div>

					<div className="mt-8 relative z-20 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between">
						{destinationAddress && (
							<label
								className="text-muted-foreground text-xs absolute top-3 left-5"
								htmlFor="destinationAddress"
							>
								To address
							</label>
						)}
						<input
							className={clsx(
								"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
								destinationAddress && "translate-y-[8px]",
							)}
							id="destinationAddress"
							onChange={(e) =>
								setDestinationAddress(e.target.value)
							}
							value={destinationAddress}
							placeholder="To address"
						/>
						{destinationAddress ? (
							<button className="text-muted-foreground font-semibold py-[6px] px-3">
								<img src="/images/x.svg" alt="" />
							</button>
						) : (
							<button
								onClick={pasteFromClipboard}
								className="text-muted-foreground font-semibold py-[6px] px-3"
							>
								Paste
							</button>
						)}
					</div>
				</div>

				{/* TODO: add paste funcationality */}
				{/* <button className="font-medium text-muted-foreground px-2 hover:text-white transition-all duratioin-200">
                    Paste
                </button> */}
			</form>

			<div className="mt-12 pt-6">
				<button
					onClick={submit}
					disabled={amount == "" || destinationAddress == ""}
					className={clsx(
						`bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
					)}
				>
					Send
				</button>
			</div>

			<SignatureRequestDialog {...eth} />
		</div>
	);
}
