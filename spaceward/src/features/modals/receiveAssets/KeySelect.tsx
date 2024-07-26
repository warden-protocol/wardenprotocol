import clsx from "clsx";
import { useState, useMemo } from "react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { shapes } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Icons } from "@/components/ui/icons-assets";
import AddressAvatar from "@/components/AddressAvatar";
import { useAssetQueries } from "@/features/assets/hooks";
import { useSpaceId } from "@/hooks/useSpaceId";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { BalanceEntry } from "@/features/assets/types";
import { useModalState } from "../state";
import { bigintToFixed } from "@/lib/math";

export interface Key {
	keyId: bigint;
	address: string;
	type: AddressType;
}

const KeySelect = ({
	currentKey,
	setKey,
	balancesByCoin,
	token,
}: {
	currentKey?: Key;
	setKey: (key: Key) => void;
	balancesByCoin: BalanceEntry[];
	token?: string;
}) => {
	const { setData: setModal, data } = useModalState();
	const [keyDropdown, setKeyDropdown] = useState(false);

	const { spaceId } = useSpaceId();
	const { queryKeys } = useAssetQueries(spaceId?.toString());

	const addresses = useMemo(
		() =>
			queryKeys.data?.keys.flatMap(({ addresses, key }) =>
				addresses.map((x) => ({ ...x, keyId: key.id })),
			),
		[queryKeys.data?.keys],
	);

	const seedStr = String(currentKey?.keyId);

	const avatar = useMemo(() => {
		return createAvatar(shapes, {
			size: 512,
			seed: seedStr,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
	}, [seedStr]);

	function countBalance(address: string) {
		const byAddress = balancesByCoin.filter(
			(item) => item.address === address,
		);
		const sum = byAddress.reduce(
			(acc, item) => acc + item.balance,
			BigInt(0),
		);
		const decimals = byAddress[0]?.decimals ?? 0;

		return bigintToFixed(sum, {
			decimals: decimals,
			display: 1,
			format: true,
		});
	}

	return (
		<div className="relative flex z-20 items-center mb-8">
			<div
				onClick={() => {
					setKeyDropdown(true);
				}}
				className={clsx(
					"rounded-lg z-20 py-3 px-4 flex items-center gap-4 h-[72px] bg-fill-elevated border-[1px] border-solid border-border-quaternary w-full",
					keyDropdown && "pointer-events-none opacity-30",
				)}
			>
				<div className="relative cursor-pointer min-w-12 h-8 max-h-8 border-[1px] border-border-secondary rounded overflow-hidden isolate">
					<Avatar className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2] rounded-none">
						<AvatarImage
							src={avatar}
							className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2]"
						/>
					</Avatar>

					<div className="z-[-1] absolute left-0 top-0 w-full h-full bg-overlay-secondary" />

					<div className="text-[10px] text-right text-white absolute right-1 bottom-1">
						...{currentKey?.address.toString().slice(-4)}
					</div>
				</div>

				<div>
					<div className="text-xs text-label-secondary">KeyName</div>

					<div className="">
						{currentKey?.address.toString().slice(0, 8)}...
						{currentKey?.address.toString().slice(-8)}
					</div>
				</div>

				<Icons.chevronDown
					className={clsx(
						"ml-auto duration-200",
						keyDropdown && "rotate-180",
					)}
				/>
			</div>

			{keyDropdown && (
				<div className="absolute no-scrollbar overflow-scroll max-h-[200px] z-30 left-0 -bottom-2 translate-y-full w-full rounded-lg bg-bg-elevated border-[1px] border-solid border-border-quaternary py-2">
					{addresses?.map((item, key) => (
						<div
							className="flex items-center gap-4 py-4 px-5 cursor-pointer hover:bg-fill-quaternary duration-200"
							key={key}
							onClick={() => {
								setModal({
									params: {
										...data?.params,
										address: item?.address,
									},
								});
								setKey(item);
								setKeyDropdown(false);
							}}
						>
							<AddressAvatar seed={item?.address} />
							<div>
								<div className="text-xs text-label-secondary">
									KeyName
								</div>

								<div className="">
									{item?.address.toString().slice(0, 8)}
									...
									{item?.address.toString().slice(-8)}
								</div>
							</div>

							<div className="text-label-secondary ml-auto text-right">
								{countBalance(item?.address)} {token}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default KeySelect;
