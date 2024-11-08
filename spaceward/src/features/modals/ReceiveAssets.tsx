import clsx from "clsx";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Copy } from "@/components/ui/copy";
import { TransferParams } from "./types";
import { Icons } from "../dashboard/icons";
import KeySelect from "./KeySelector";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAssetQueries } from "../assets/hooks";
import SelectAsset from "./AssetSelector";
import { AssetIcon } from "@/features/assets/AssetRow";
import { capitalize } from "./util";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { getCosmosChain, isOsmosis } from "../assets/util";
import { fromBech32, toBech32 } from "@cosmjs/encoding";
import { useModalState } from "./state";
import { KeyModel } from "@/hooks/query/types";

const TokenSelect = ({
	chainName,
	token,
	isSelect,
	switchToSelect,
}: {
	token?: string;
	chainName?: string;
	isSelect: boolean;
	switchToSelect: () => void;
}) => {
	return (
		<div
			className="relative flex z-10 items-center"
			onClick={switchToSelect}
		>
			<div
				className={clsx(
					"rounded-lg z-20 py-3 px-4 flex items-center gap-4 h-[72px] bg-fill-elevated border-[1px] border-solid border-border-quaternary w-full",
					isSelect && "pointer-events-none opacity-30",
				)}
			>
				{token && (
					<AssetIcon
						type="token"
						value={token}
						/* fixme logo from balancequery */
						className="w-10 h-10"
					/>
				)}

				<div>
					<div className="">{token}</div>

					<div className="text-xs text-label-secondary">
						{capitalize(chainName)}
					</div>
				</div>

				<Icons.chevronDown
					className={clsx(
						"ml-auto duration-200 invert dark:invert-0 shrink-0 w-6 h-6",
						isSelect && "rotate-180",
					)}
				/>
			</div>
		</div>
	);
};

const getQrValue = (_chainName: string, address: string) => {
	// fixme
	const chainName = isOsmosis(_chainName) ? "osmosis" : "ethereum";
	return `${chainName}:${address}`;
};

/** @deprecated refactor chain select */
export const fixAddress = (
	addressResponse?: KeyModel["addresses"][number],
	chainName?: string,
) => {
	if (!addressResponse) {
		return;
	}

	if (isOsmosis(chainName)) {
		const chain = getCosmosChain(chainName);

		if (!chain) {
			return;
		}

		return {
			...addressResponse,
			addressValue: toBech32(
				chain.bech32_prefix,
				fromBech32(addressResponse.addressValue).data,
			),
		};
	} else {
		return addressResponse;
	}
};

export default function ReceiveAssetsModal(props: TransferParams) {
	const copyRef = useRef<HTMLButtonElement>(null);
	const { setData: setModal } = useModalState();
	const { spaceId } = useSpaceId();
	const { queryBalances } = useAssetQueries(spaceId);
	const [isSelectAsset, setSelectAsset] = useState(false);
	const key = props?.keyResponse ?? queryBalances[0]?.data?.key;
	const token = props?.token ?? queryBalances[0]?.data?.results[0]?.token;

	const chainName =
		props?.chainName ?? queryBalances[0]?.data?.results[0]?.chainName;
	// fixme
	const addressType = isOsmosis(chainName)
		? AddressType.ADDRESS_TYPE_OSMOSIS
		: AddressType.ADDRESS_TYPE_ETHEREUM;

	const address = fixAddress(
		key?.addresses?.find((a) => a.addressType === addressType),
		chainName,
	);

	return (
		<div className="grid grid-cols-[1fr_520px] gap-12 pb-5 max-w-[928px] mx-auto">
			<div>
				<Icons.arrInCircle className="w-20 h-20 mt-6 mb-8 mx-auto invert dark:invert-0" />
				<div className="font-bold text-2xl leading-[32px] tracking-[0.12px] mb-8 text-center">
					Choose a key and asset to&nbsp;receive
				</div>

				<div className="mb-5 font-bold text-xl">Key</div>

				<KeySelect
					className="relative flex z-20 items-center mb-8"
					currentKey={key}
					token={token}
					onKeyChange={(k) => {
						setModal({
							params: {
								...props,
								keyResponse: k
							},
						});
					}

					}
				/>

				<div className="mb-5 font-bold text-xl">Asset</div>

				<TokenSelect
					chainName={chainName}
					token={token}
					switchToSelect={() => setSelectAsset(true)}
					isSelect={isSelectAsset}
				/>
			</div>

			<div className="bg-card pt-12 px-4 pb-4 rounded-2xl">
				{isSelectAsset ? (
					<SelectAsset
						spaceId={spaceId ?? ""}
						selectedKey={key}
						onClose={() => setSelectAsset(false)}
					/>
				) : (
					<div className="text-center flex flex-col gap-10">
						<div>
							<div className="font-bold mb-2 text-[32px]">
								Receive {token}
							</div>
							<div>Send only {token} to the address below</div>
							<div>
								Make sure that the network is{" "}
								{capitalize(chainName)}
							</div>
						</div>

						<QRCode
							className="rounded-2xl p-4 bg-white"
							size={240}
							style={{
								height: "auto",
								maxWidth: "240px",
								width: "240px",
								margin: "0 auto",
							}}
							value={
								chainName && address?.addressValue
									? getQrValue(chainName, address.addressValue)
									: ""
							}
							viewBox={`0 0 240 240`}
						/>

						<div className="bg-fill-quaternary rounded-lg	w-full pt-4 px-4 pb-6 text-center flex flex-col items-center">
							<div className="text-label-secondary text-xs mb-2">
								Your {token}({capitalize(chainName)} network)
								address
							</div>
							<div>
								<Copy ref={copyRef} value={address?.addressValue} />
							</div>

							<button className="bg-pixel-pink cursor-pointer rounded px-5 h-10 flex items-center justify-center font-semibold text-black duration-300 hover:bg-fill-accent-hover mt-4" onClick={() => {
								copyRef.current?.click();
							}}>
								Copy Address
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
