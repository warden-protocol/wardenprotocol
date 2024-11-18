import clsx from "clsx";
import { useState, useMemo, useRef } from "react";
import { shapes } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons-assets";
import AddressAvatar from "@/components/AddressAvatar";
import { useAssetQueries } from "@/features/assets/hooks";
import { useSpaceId } from "@/hooks/useSpaceId";
import { bigintToFloat } from "@/lib/math";
import { useKeySettingsState } from "../keys/state";
import { KEY_THEMES } from "../keys/assets";
import { isOsmosis } from "@/features/assets/util";
import { useClickOutside } from "@/hooks/useClickOutside";
import { KeyModel } from "@/hooks/query/types";
import { AddressType } from "@/hooks/query/warden";

const KeySelector = ({
	className,
	currentKey: _currentKey,
	dropdownClassName,
	token,
	onKeyChange
}: {
	className?: string;
	currentKey?: KeyModel;
	dropdownClassName?: string;
	token?: string;
	onKeyChange?: (key: KeyModel) => void;
}) => {
	const { spaceId } = useSpaceId();
	const { queryBalances, queryKeys } = useAssetQueries(spaceId?.toString());
	const keys = queryKeys.data?.[0];
	const refIsReady = useRef(false);
	const currentKey = _currentKey ?? keys?.[0];

	if (!refIsReady.current) {
		if (currentKey && !_currentKey) {
			onKeyChange?.(currentKey);
		}

		refIsReady.current = true;
	}

	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, () => setKeyDropdown(false));
	const { data: ks } = useKeySettingsState();
	// fixme undefined type not resolved
	const addresses = currentKey?.addresses;
	const key = currentKey?.key;
	const settings = ks?.settings[key?.id.toString() ?? ""];
	const [keyDropdown, setKeyDropdown] = useState(false);
	const seed = Buffer.from(key?.publicKey ?? []).toString("base64");

	const balances = queryBalances
		.flatMap(({ data }) =>
			(data?.results ?? []).map((result) => ({
				...result,
				keyId: data?.key.key.id,
			})),
		)
		.filter((result) => token && result.keyId && result.token === token);

	const addressType = isOsmosis(balances[0]?.type)
		? AddressType.Osmosis
		: AddressType.Ethereum;

	const address = addresses?.find((a) => a.addressType === addressType);

	const avatar = useMemo(() => {
		const themeIndex = settings?.themeIndex ?? 0;
		const theme = KEY_THEMES[themeIndex].map((hex) => hex.slice(1));

		return createAvatar(shapes, {
			size: 512,
			seed,
			backgroundColor: [theme[0]],
			shape1Color: [theme[1]],
			shape2Color: [theme[2]],
			shape3Color: [theme[3]],
		}).toDataUriSync();
	}, [seed, settings]);

	return (
		<div className={className} ref={ref}>
			<div
				onClick={() => {
					setKeyDropdown(v => !v);
				}}
				className={clsx(
					"rounded-lg z-20 py-3 px-4 flex text-left items-center gap-4 h-[72px] bg-fill-elevated border-[1px] border-solid border-border-quaternary w-full",
					keyDropdown && "opacity-30",
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
						...{address?.addressValue.toString().slice(-4)}
					</div>
				</div>

				<div>
					<div className="text-xs text-label-secondary text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[232px]">
						{settings?.name ?? `Key #${key?.id.toString()}`}
					</div>

					<div className="">
						{address?.addressValue.toString().slice(0, 8)}...
						{address?.addressValue.toString().slice(-8)}
					</div>
				</div>

				<Icons.chevronDown
					className={clsx(
						"ml-auto duration-200 invert dark:invert-0 shrink-0 w-6 h-6",
						keyDropdown && "rotate-180",
					)}
				/>
			</div>

			{keyDropdown && (
				<div className={clsx(dropdownClassName, "absolute no-scrollbar overflow-scroll max-h-[200px] z-30 left-0 -bottom-2 translate-y-full w-full rounded-lg bg-card border-[1px] border-solid border-border-quaternary py-2")}>
					{keys?.map((item) => {
						const keySettings =
							ks?.settings[item.key.id.toString()];

						const name =
							keySettings?.name ??
							`Key #${item.key.id.toString()}`;

						const themeIndex = keySettings?.themeIndex ?? 0;

						const theme = KEY_THEMES[themeIndex].map((hex) =>
							hex.slice(1),
						);

						const themeDicebar = {
							backgroundColor: theme[0],
							shape1Color: theme[1],
							shape2Color: theme[2],
							shape3Color: theme[3],
						};

						const address = item.addresses.find(
							(a) => a.addressType === addressType,
						);

						const total = balances.reduce(
							(acc, result) =>
								result.keyId === item.key.id
									? acc +
									bigintToFloat(
										result.balance,
										result.decimals,
									)
									: acc,
							0,
						);

						return (
							<div
								className="flex items-center gap-4 py-4 px-5 cursor-pointer hover:bg-fill-quaternary duration-200"
								key={item.key.id.toString()}
								onClick={() => {
									onKeyChange?.(item);
									/*
									setModal({
										params: {
											...data?.params,
											keyResponse: item,
										},
									});
									*/

									setKeyDropdown(false);
								}}
							>
								<AddressAvatar
									seed={item.key.publicKey}
									{...themeDicebar}
								/>
								<div className="flex flex-col">
									<div className="text-xs text-label-secondary overflow-hidden text-ellipsis whitespace-nowrap text-left">
										{`${name.slice(0, 20)}${name.length > 20 ? "..." : ""}`}
									</div>

									<div className="">
										{address?.addressValue.toString().slice(0, 8)}
										...
										{address?.addressValue.toString().slice(-8)}
									</div>
								</div>

								<div className="text-label-secondary ml-auto text-right">
									{total.toFixed(2)} {token}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default KeySelector;
