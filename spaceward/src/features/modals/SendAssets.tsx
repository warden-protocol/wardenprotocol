import clsx from "clsx";
import { useContext, useMemo, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import type { TransferParams } from "./types";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { TxBuild, buildTransaction, createAminoSignDoc } from "./util";
import { useAssetQueries } from "../assets/hooks";
import { useSpaceId } from "@/hooks/useSpaceId";
import useFiatConversion from "@/hooks/useFiatConversion";
import { numRestrict } from "../staking/util";
import { useKeychainSigner } from "@/hooks/useKeychainSigner";
import { AssetIcon } from "../assets/AssetRow";
import { validateAddress } from "../intents/AddAddressModal";
import { StargateClient } from "@cosmjs/stargate";
import { useModalState } from "./state";
import KeySelector from "./KeySelector";
import { walletContext } from "@cosmos-kit/react-lite";
import { BalanceEntry } from "../assets/types";
import { useQuery } from "@tanstack/react-query";
import { queryCosmosClients } from "../assets/queries";
import { useConnectWallet } from "@web3-onboard/react";

export default function SendAssetsModal({
	// address,
	chainName,
	token,
	keyResponse: key,
}: TransferParams) {
	const { walletManager } = useContext(walletContext);
	const { setData: setModal } = useModalState();
	const { formatter, fiatConversion } = useFiatConversion();
	const [{ wallet }] = useConnectWallet();
	const evmAddress = wallet?.accounts?.[0]?.address;

	const { spaceId } = useSpaceId();
	const { queryBalances } = useAssetQueries(spaceId);
	const cosmosClients = useQuery({ ...(evmAddress ? queryCosmosClients(walletManager, evmAddress) : {}), enabled: Boolean(evmAddress) }).data;

	const results: (BalanceEntry & { refetch: () => void })[] = queryBalances
		.filter((result) => result.data?.key?.key?.id === key?.key?.id)
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
	const [amount, setAmount] = useState("");
	const [destinationAddress, setDestinationAddress] = useState("");
	const amountNum = parseFloat(amount);

	const amountWarning =
		amountNum && selectedToken
			? Number.isFinite(amountNum)
				? bigintToFloat(selectedToken.balance, selectedToken.decimals) <
				amountNum
				: true
			: false;

	const addressWarning =
		destinationAddress && selectedToken
			? !validateAddress(destinationAddress, [
				selectedToken.type.startsWith("eip155:") ? "eth" : "bech32",
			]).ok
			: false;

	const { signEthereumTx } = useEthereumTx();
	const { signAmino } = useKeychainSigner();

	async function submit() {
		if (!key || !selectedToken || !evmAddress) {
			return;
		}

		const { address, chainName, token } = selectedToken;
		const title = `Send ${amount} ${token}`;
		setPending(true);

		try {
			const txBuild = await buildTransaction({
				address: evmAddress,
				item: selectedToken,
				from: address,
				to: destinationAddress,
				amount,
			});


			if (txBuild.type === "eth") {
				const { tx } = txBuild;
				const storeId = await signEthereumTx(key.key.id, tx, chainName, { title });

				if (storeId) {
					setModal({ type: undefined });
				}
			} else if (txBuild.type === "cosmos") {
				const [, , rpc] = cosmosClients?.find((item) => {
					return item[1] === chainName
				}) ?? [];

				if (!rpc) {
					throw new Error(`unable to find rpc for ${chainName}`);
				}

				const client = await StargateClient.connect(rpc);

				const signDoc = await createAminoSignDoc({
					tx: txBuild as TxBuild<"cosmos">,
					client,
					address,
				});

				const storeId = await signAmino(key, signDoc, chainName, { title });

				if (storeId) {
					setModal({ type: undefined });
				}
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

	const maxAmount = selectedToken
		? bigintToFixed(selectedToken.balance, {
			decimals: selectedToken.decimals,
		})
		: "0";

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px]">Send</div>

			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div>
					<KeySelector
						currentKey={key}
						token={selectedToken?.token}
						className="relative mb-8 z-50"
						onKeyChange={k => {
							setModal({
								params: {
									chainName,
									token,
									keyResponse: k
								},
							});
						}}
					/>

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
									onClick={setModal.bind(null, {
										type: "select-asset",
										params: {
											keyResponse: key,
										},
									})}
									className="cursor-pointer h-[32px] bg-fill-quaternary rounded-[20px] p-1 pr-2 flex items-center gap-[6px]"
								>
									<div className="relative w-6 h-6 ">
										<AssetIcon
											type="token"
											value={selectedToken?.token ?? ""}
											logo={selectedToken?.logo}
											className="w-6 h-6 object-contain"
										/>
										<AssetIcon
											type="network"
											value={
												selectedToken?.chainName ?? ""
											}
											className="absolute bottom-[-1px] right-[-1px] w-[10px] h-[10px]"
										/>
									</div>
									{selectedToken?.token}
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
									(fiatConversion && selectedToken
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
								onClick={() => {
									setAmount(maxAmount);
								}}
								className={clsx(
									"text-xs cursor-pointer",
									amountWarning && "text-negative",
									!amountWarning && "text-label-accent",
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
						(amount === "" ||
							destinationAddress === "" ||
							noAssets ||
							pending) &&
						"pointer-events-none opacity-50",
					)}
				>
					{pending ? "Loading.." : "Send"}
				</button>
			</div>
		</div>
	);
}
