import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import {
	NetworkIconsTransparent,
	TokenIcons,
} from "@/components/ui/icons-crypto";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { AssetPlaceholder } from "@/features/assets/AssetRow";
import { useModalState } from "@/features/modals/state";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAssetQueries } from "@/features/assets/hooks";
import { FIAT_FORMAT } from "@/hooks/useFiatConversion";
import { useMemo } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import { useKeyData } from "../keys/Keys";

function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str.charAt(0).toUpperCase() +
		str.slice(1).toLowerCase()) as Capitalize<T>;
}

type Currency = keyof typeof FIAT_FORMAT;

const AssetTableRow = ({
	item,
	keyResponse,
}: {
	item: {
		address: string;
		balance: bigint;
		chainId: string;
		chainName: string;
		decimals: number;
		erc20Token?: `0x${string}` | undefined;
		price: bigint;
		priceDecimals: number;
		type: "eip155:native" | "eip155:erc20" | "osmosis";
		token: string;
		title: string;
	};
	keyResponse?: QueryKeyResponse;
}) => {
	const { setData: setModal } = useModalState();
	const Network = NetworkIconsTransparent[item.chainName] ?? AssetPlaceholder;
	const Token = TokenIcons[item.token] ?? AssetPlaceholder;
	const { spaceId } = useSpaceId();
	const { queryPrices } = useAssetQueries(spaceId);
	const curr = useCurrency();
	const currency = curr.currency as Currency;
	const formatter = FIAT_FORMAT[currency];

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

	const { name } = useKeyData({
		key: keyResponse?.key!,
	});

	return (
		<div
			className="grid grid-cols-[1fr_100px_100px_280px] h-[72px]"
			key={`${item.token}:${item.chainName}:${item.address}`}
		>
			<div className="flex items-center gap-3">
				<div className="relative">
					<Token className="w-10 h-10 object-contain" />
					<Network className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]" />
				</div>
				<div>
					<div>{item.token}</div>
					<div className="text-xs text-muted-foreground">
						{item.title} ({capitalize(item.chainName)})
					</div>
				</div>
			</div>

			<div className="text-right flex flex-col justify-center">
				<div>
					...
					{item.address.slice(-8)}
				</div>
				<div className="text-xs text-muted-foreground max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
					{name}
				</div>
			</div>

			<div className="text-right flex flex-col justify-center">
				<div>
					{bigintToFixed(item.balance, {
						decimals: item.decimals,

						display: 4,
						format: true,
					})}
				</div>
				<div className="text-xs text-muted-foreground">
					{formatter.format(
						bigintToFloat(
							fiatConversion
								? (item.balance *
										item.price *
										BigInt(10) **
											BigInt(fiatConversion.decimals)) /
										fiatConversion.value
								: BigInt(0),
							item.decimals + item.priceDecimals,
						),
					)}
				</div>
			</div>

			<div className="flex items-center justify-end gap-2">
				<button
					className=" bg-fill-quaternary h-8 rounded justify-center font-medium py-1 px-4"
					onClick={setModal.bind(null, {
						type: "receive",
						params: {
							address: item.address,
							chainName: item.chainName,
							token: item.token,
							type: item.type.startsWith("eip155:")
								? AddressType.ADDRESS_TYPE_ETHEREUM
								: AddressType.ADDRESS_TYPE_OSMOSIS,
							keyResponse: keyResponse,
						},
					})}
				>
					Receive
				</button>
				<button
					className=" bg-fill-quaternary h-8 rounded justify-center font-medium py-1 px-4"
					onClick={setModal.bind(null, {
						type: "send",
						params: {
							address: item.address,
							chainName: item.chainName,
							token: item.token,
							type: item.type.startsWith("eip155:")
								? AddressType.ADDRESS_TYPE_ETHEREUM
								: AddressType.ADDRESS_TYPE_OSMOSIS,
							keyResponse: keyResponse,
						},
					})}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default AssetTableRow;
