import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { Accordion } from "@/components/ui/accordion";
import {
	KeyIcon,
	PlusIcon,
	InfoIcon,
	Edit2Icon,
	ArrowDown,
	Send,
	XIcon,
} from "lucide-react";
import { prettyKeyType } from "@/utils/formatting";
import clsx from "clsx";
import { KEY_THEMES } from "./assets";
import { useKeySettingsState } from "./state";
import { useCallback, useMemo, useState } from "react";
import { useModalState } from "../modals/state";
import { Icons } from "@/components/ui/icons-assets";
import useFiatConversion from "@/hooks/useFiatConversion";
import { bigintToFloat } from "@/lib/math";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import "@/assets/animate.css";
import { useAssetQueries } from "../assets/hooks";
import { AddToMetaMaskButton } from "@/features/metamask/AddToMetaMaskButton";
import { AddressType, useKeychainById, useKeysBySpaceId } from "@/hooks/query/warden";
import { KeyModel } from "@/hooks/query/types";
import { toBytes } from "viem";

export const useKeyData = ({ key }: Pick<KeyModel, "key">) => {
	const { data, setData: setSettings } = useKeySettingsState();
	const settings = data?.settings[key.id.toString()];
	const name = settings?.name ?? `Key #${key.id.toString()}`;
	const seed = Buffer.from(key.publicKey).toString("base64");
	const themeIndex = (settings?.themeIndex ?? 0) % KEY_THEMES.length;
	const spaceId = key.spaceId;

	const queryKeychain = useKeychainById({
		request: { id: key.keychainId },
	});

	const { queryBalances } = useAssetQueries(spaceId.toString());
	const { formatter, fiatConversion } = useFiatConversion();
	const targetDecimals = 2;

	const total = queryBalances
		.filter(({ data }) => {
			return data?.key.key.id === key.id;
		})
		.reduce((total, item) => {
			if (!item.data) {
				return total;
			}

			const usd = item.data.results.reduce((subtotal, entry) => {
				const decimals = entry.decimals + entry.priceDecimals;

				const usd =
					(entry.balance * entry.price) /
					BigInt(10) ** BigInt(decimals - targetDecimals);

				return subtotal + usd;
			}, BigInt(0));

			const value = fiatConversion
				? (usd * BigInt(10) ** BigInt(fiatConversion.decimals)) /
				fiatConversion.value
				: BigInt(0);

			return total + value;
		}, BigInt(0));

	const avatar = useMemo(() => {
		const theme = KEY_THEMES[themeIndex].map((color) => color.slice(1));

		return createAvatar(shapes, {
			seed,
			backgroundColor: [theme[0]],
			shape1Color: [theme[1]],
			shape2Color: [theme[2]],
			shape3Color: [theme[3]],
		}).toDataUriSync();
	}, [themeIndex, seed]);

	const save = useCallback(
		(name: string) => {
			setSettings({
				settings: {
					...data?.settings,
					[key.id.toString()]: {
						name,
						themeIndex,
					},
				},
			});
		},
		[data?.settings, themeIndex],
	);

	return {
		name,
		avatar,
		save,
		formatter,
		total,
		targetDecimals,
		keychain: queryKeychain.data,
	};
};

function Key({
	keyData: key,
	addresses,
}: {
	keyData: KeyModel["key"];
	addresses: KeyModel["addresses"];
}) {
	const { avatar, name, targetDecimals, total, formatter, keychain } =
		useKeyData({
			key,
		});

	const { setData: setModal } = useModalState();

	return (
		<div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.85fr_0.6fr_0.5fr] gap-2 min-h-[84px]  border-b-[1px] border-border-quaternary last:border-b-0 w-full font-sans font-normal hover:no-underline overflow-scroll">
			<div className="flex flex-row items-center gap-4">
				<div className="cursor-pointer min-h-8 h-8 relative shrink-0 p-1 min-w-12 rounded overflow-hidden isolate">
					<Avatar className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2] rounded-none">
						<AvatarImage
							src={avatar}
							className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2]"
						/>
					</Avatar>

					<div className="z-[-1] absolute left-0 top-0 w-full h-full bg-overlay-secondary" />

					<div className="text-[10px] text-right text-white absolute right-1 bottom-1">
						...{base64FromBytes(toBytes(key.publicKey)).slice(-4)}
					</div>
				</div>

				<div className="max-w-[142px] overflow-hidden text-ellipsis whitespace-nowrap">
					{name}
				</div>
			</div>

			<div className="flex justify-center flex-col">
				{addresses.map((addr) => (
					<p className="text-sm" key={addr.addressValue}>
						{addr.addressValue.slice(0, 8)}..
						{addr.addressValue.slice(-8)}
					</p>
				))}
			</div>

			<div className="flex items-center">
				<div className="max-w-[166px] overflow-hidden text-ellipsis whitespace-nowrap">
					{keychain?.description}
				</div>
			</div>

			<div className="flex items-center">
				<div className="max-w-[176px] overflow-hidden text-ellipsis whitespace-nowrap">
					{prettyKeyType(key.keyType)}
				</div>
			</div>

			<div className="flex items-center">
				{formatter.format(bigintToFloat(total, targetDecimals))}
			</div>

			<div className="flex items-center justify-end gap-2">
				<div
					className="cursor-pointer p-1 invert dark:invert-0"
					onClick={() => {
						setModal({
							type: "receive",
							params: {
								keyResponse: { key, addresses },
							},
						});
					}}
				>
					<Icons.receive />
				</div>
				<div
					className="ml-4 cursor-pointer p-1 invert dark:invert-0"
					onClick={() => {
						setModal({
							type: "send",
							params: {
								address: addresses[0].addressValue,
								keyResponse: { key, addresses },
							},
						});
					}}
				>
					<Icons.sendPlane />
				</div>
			</div>
		</div>
	);
}

const KeyCard = ({ data: { addresses, key } }: { data: KeyModel }) => {
	const { setData: setModal } = useModalState();
	const [edit, setEdit] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const [nameInput, setNameInput] = useState("");
	const { name, avatar, save, formatter, total, targetDecimals, keychain } =
		useKeyData({ key });

	function editName() {
		setEdit(true);
		setNameInput(name);
	}

	function saveName() {
		save(nameInput);
		setEdit(false);
		setFlipped(false);
	}

	return (
		<div className="flex basis-full md:basis-1/2 lg:basis-2/6 flex-grow-0 flex-shrink-0 p-3">
			<div className="flipper-container rounded-xl h-52 w-full items-center justify-center relative flex">
				<div
					className={clsx(
						"absolute flipper-frontface h-full rounded-xl w-full transition-transform overflow-hidden ",
						{
							flipped,
						},
					)}
				>
					<img className="absolute z-0" src={avatar} alt="" />

					<div className="relative z-10 w-full h-full text-white bg-overlay-secondary flex flex-col">
						<div className="flex flex-col justify-between w-full h-full">
							<div className="flex flex-col p-4">
								<div className="flex items-center">
									<p className="font-bold font-sans text-lg max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
										{name}
									</p>
									<InfoIcon
										className="ml-auto cursor-pointer"
										onClick={setFlipped.bind(null, true)}
									/>
								</div>
							</div>
							<div className="w-full flex justify-end mb-2 pr-1">
								<AddToMetaMaskButton
									keyId={key.id}
									address={addresses[0].addressValue}
								/>
							</div>
						</div>

						<div className="mt-auto h-px bg-fill-quaternary mx-4"></div>
						<div className="flex m-4">
							<div>
								{formatter.format(
									bigintToFloat(total, targetDecimals),
								)}
							</div>
							<div className="ml-auto flex">
								<div
									className="cursor-pointer"
									onClick={() => {
										setModal({
											type: "receive",
											params: {
												keyResponse: { key, addresses },
											},
										});
									}}
								>
									<ArrowDown />
								</div>
								<div
									className="ml-4 cursor-pointer"
									onClick={() => {
										setModal({
											type: "send",
											params: {
												address: addresses[0].addressValue,
												keyResponse: { key, addresses },
											},
										});
									}}
								>
									<Send />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={clsx(
						"absolute flipper-backface h-full w-full bg-card transition-transform border-border-primary border-[1px] border-solid rounded-xl",
						{ flipped: !flipped },
					)}
				>
					<div className="relative flex flex-col z-10 p-4">
						<div className="flex items-center">
							{!edit ? (
								<div className="flex gap-2 items-center w-full">
									<p className="font-display text-xl font-bold tracking-[0.1px]">
										{name}
									</p>
									<button
										className="cursor-pointer rounded-full w-5 h-5 flex items-center duration-200 hover:bg-fill-accent-secondary bg-fill-quaternary justify-center"
										onClick={editName}
									>
										<Edit2Icon className="h-3 w-3" />
									</button>
									<button
										className="ml-auto cursor-pointer rounded-full w-5 h-5 flex items-center duration-200 hover:bg-fill-accent-secondary bg-fill-quaternary justify-center"
										onClick={setFlipped.bind(null, false)}
									>
										<XIcon className="h-3 w-3" />
									</button>
								</div>
							) : (
								<div className="flex justify-between items-center w-full">
									<input
										className="font-display text-xl font-bold tracking-[0.1px] focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0 max-w-[80%]"
										value={nameInput}
										onChange={(e) =>
											setNameInput(e.target.value)
										}
									/>
									<button
										className="focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0"
										onClick={saveName}
									>
										<Icons.checkCircle className="cursor-pointer h-6 w-6 ml-auto" />
									</button>
								</div>
							)}
						</div>
						<div className="h-px bg-border-quaternary mt-2 mb-3 -mx-4"></div>
						<div className="flex flex-col gap-[1px]">
							{/* {addresses.map((addr, i) => (
								<div
									className="flex items-center my-1"
									key={addr.address}
								>
									{i ? null : <p>Addresses</p>}
									<p className="ml-auto flex items-center gap-1">
										...{addr.address.slice(-12)}
										<Copy
											value={addr.address}
											variant={"icon"}
										/>
									</p>
								</div>
							))} */}
							<div className="flex items-center justify-between my-1">
								<div>Keychain</div>
								<div>{keychain?.description}</div>
							</div>
							<div className="flex items-center justify-between my-1">
								<div>Type</div>
								<div className="text-xs px-2 flex items-center justify-center w-fit h-6 bg-fill-quaternary rounded-2xl	">
									{prettyKeyType(key.keyType)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ListView = ({ data }: { data?: KeyModel[] }) => {
	return (
		<div className="bg-card rounded-xl py-6 px-8">
			<div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.85fr_0.6fr_0.5fr] gap-2 border-b-[1px] border-b-border-quaternary border-b-solid pb-[10px]">
				<div className="text-sm	text-label-secondary">Key</div>
				<div className="text-sm	text-label-secondary">Addresses</div>
				<div className="text-sm	text-label-secondary">Keychain</div>
				<div className="text-sm	text-label-secondary">Key Type</div>
				<div className="text-sm	text-label-secondary">Balance</div>
			</div>
			<Accordion type="multiple" className="space-y-3">
				{data?.map((key) => (
					<Key
						key={key.key.id.toString()}
						keyData={key.key}
						addresses={key.addresses}
					/>
				))}
			</Accordion>
		</div>
	);
};

const CardView = ({ data }: { data?: KeyModel[] }) => {
	const { setData: setModal } = useModalState();

	return (
		<div className="flex flex-row flex-wrap -mx-3 -mt-4">
			{data?.map((k, i) => (
				<KeyCard data={k} key={k.key.id.toString()} />
			))}

			<div className="flex basis-2/6 flex-grow-0 flex-shrink-0 p-4">
				<div
					className="rounded-xl border-dashed border-2 border-label-tertiary h-52 w-full items-center justify-center cursor-pointer flex"
					onClick={setModal.bind(null, {
						type: "create-key",
						params: {},
					})}
				>
					<div className="flex items-center justify-center h-10 w-10 rounded-full bg-fill-quaternary">
						<PlusIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export function Keys({
	spaceId,
	view,
}: {
	spaceId: string;
	view: "list" | "card";
}) {
	const query = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId),
			deriveAddresses: [AddressType.Ethereum, AddressType.Osmosis],
		},
	});

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	const Component = view === "list" ? ListView : CardView;
	const keys = query.data?.[0] as KeyModel[] | undefined;

	return (
		<>
			{keys?.length === 0 ? (
				<div className="flex h-60 flex-col space-y-1 items-center place-content-center">
					<KeyIcon className="h-10 w-10" />
					<span className="pt-4">No keys found in this space</span>
					<span className="text-muted-foreground text-sm pb-4">
						Add a key to start receiving assets
					</span>
				</div>
			) : (
				<Component data={keys} />
			)}
		</>
	);
}
