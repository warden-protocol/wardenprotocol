import { Link } from "react-router-dom";
import {
	Key as KeyModel,
	AddressType,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";

import type {
	AddressResponse,
	QueryKeyResponse,
	QueryKeysResponse,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";

import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import AddressAvatar from "@/components/AddressAvatar";
import { Copy } from "@/components/ui/copy";
import { ReceiveAssetButton } from "@/features/assets";
import {
	MoveUpRight,
	KeyIcon,
	PlusIcon,
	InfoIcon,
	Edit2Icon,
	ArrowDown,
	Send,
} from "lucide-react";
import { AddToMetaMaskButton } from "@/features/metamask";
import { useQueryHooks } from "@/hooks/useClient";
import { prettyKeyType } from "@/utils/formatting";
import clsx from "clsx";
import { KEY_THEMES } from "./assets";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useKeySettingsState } from "./state";
import { useMemo, useState } from "react";
import "./animate.css";
import { useModalState } from "../modals/state";
import useRequestKey, { KeyRequesterState } from "@/hooks/useRequestKey";
import KeyRequestStatusbar from "./KeyRequestStatus";
import { Icons } from "@/components/ui/icons-assets";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

const ListView = ({ data }: { data?: QueryKeysResponse }) => {
	return (
		<div className="bg-tertiary rounded-xl py-6 px-8">
			<div className="grid grid-cols-[1fr_0.75fr_0.8fr_0.85fr_0.6fr_0.5fr] border-b-[1px] border-b-border-quaternary border-b-solid pb-[10px]">
				<div className="text-sm	text-label-secondary">Key</div>
				<div className="text-sm	text-label-secondary">Address</div>
				<div className="text-sm	text-label-secondary">Keychain</div>
				<div className="text-sm	text-label-secondary">Key Type</div>
				<div className="text-sm	text-label-secondary">Balance</div>
			</div>
			<Accordion type="multiple" className="space-y-3">
				{data?.keys.map((key) => (
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

const KeyCard = ({ data: { addresses, key } }: { data: QueryKeyResponse }) => {
	const { setData: setModal } = useModalState();
	const [edit, setEdit] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const { data, setData: setSettings } = useKeySettingsState();
	const settings = data?.settings[key.id.toString()];
	const name = settings?.name ?? `Key #${key.id.toString()}`;
	const [nameInput, setNameInput] = useState("");
	const seed = Buffer.from(key.publicKey).toString("base64");
	const themeIndex = (settings?.themeIndex ?? 0) % KEY_THEMES.length;

	const bg = useMemo(() => {
		const theme = KEY_THEMES[themeIndex].map((color) => color.slice(1));

		return createAvatar(shapes, {
			seed,
			backgroundColor: [theme[0]],
			shape1Color: [theme[1]],
			shape2Color: [theme[2]],
			shape3Color: [theme[3]],
		}).toDataUriSync();
	}, [themeIndex, seed]);

	function editName() {
		setEdit(true);
		setNameInput(name);
	}

	function saveName() {
		setSettings({
			settings: {
				...data?.settings,
				[key.id.toString()]: {
					name: nameInput,
					themeIndex,
				},
			},
		});

		setEdit(false);
		setFlipped(false);
	}

	return (
		<div className="flex basis-2/6 flex-grow-0 flex-shrink-0 p-3">
			<div className="keycard-container rounded-xl h-52 w-full items-center justify-center relative flex">
				<div
					className={clsx(
						"absolute keycard-frontface h-full rounded-xl w-full transition-transform overflow-hidden ",
						{
							flipped,
						},
					)}
				>
					<img className="absolute z-0" src={bg} alt="" />

					<div className="relative z-10 w-full h-full bg-overlay-secondary flex flex-col">
						<div className="flex flex-col p-4">
							<div className="flex items-center">
								<p className="font-bold font-sans text-lg">
									{name}
								</p>
								<InfoIcon
									className="ml-auto cursor-pointer"
									onClick={setFlipped.bind(null, true)}
								/>
							</div>
						</div>

						<div className="mt-auto h-px bg-fill-quaternary mx-4"></div>
						<div className="flex m-4">
							<div>#1,223.4</div>
							<div className="ml-auto flex">
								<div
									className="cursor-pointer"
									onClick={() => {
										setModal({
											type: "select-key",
											params: {
												addresses: addresses.map(
													(a) => ({
														...a,
														keyId: key.id,
													}),
												),
												next: "receive",
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
											type: "select-key",
											params: {
												addresses: addresses.map(
													(a) => ({
														...a,
														keyId: key.id,
													}),
												),
												next: "send",
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
						"absolute keycard-backface h-full w-full bg-tertiary transition-transform border-border-primary border-[1px] border-solid rounded-xl",
						{ flipped: !flipped },
					)}
				>
					<div className="relative flex flex-col z-10 p-4">
						<div className="flex items-center">
							{!edit ? (
								<div className="flex gap-2 items-center">
									<p className="font-display text-xl font-bold tracking-[0.1px]">
										{name}
									</p>
									<button
										className="cursor-pointer rounded-full w-5 h-5 flex items-center duration-200 hover:bg-fill-accent-secondary bg-fill-quaternary justify-center"
										onClick={editName}
									>
										<Edit2Icon className="h-3 w-3" />
									</button>
								</div>
							) : (
								<div className="flex justify-between items-center w-full">
									<input
										className="font-display text-xl font-bold tracking-[0.1px] focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0"
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
							{addresses.map((addr, i) => (
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
							))}
							<div className="flex items-center justify-between my-1">
								<div>Keychain</div>
								<div>OCP KMS</div>
							</div>
							<div className="flex items-center justify-between my-1">
								<div>Type</div>
								<div className="text-xs px-2 flex items-center justify-center w-fit h-6 bg-fill-quaternary rounded-2xl	">
									ESDA (secp256k1)
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CardView = ({ data }: { data?: QueryKeysResponse }) => {
	const { setData: setModal } = useModalState();

	return (
		<div className="flex flex-row flex-wrap -mx-3 -mt-4">
			{data?.keys.map((k, i) => (
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
						<PlusIcon className="stroke-label-tertiary" />
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
	const { useKeysBySpaceId, isReady } = useQueryHooks();
	const { state } = useRequestKey();

	const query = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
		},
		options: {
			enabled: isReady,
		},
	});

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	const Component = view === "list" ? ListView : CardView;

	return (
		<>
			{state === KeyRequesterState.IDLE ? null : (
				<KeyRequestStatusbar className="p-6 h-20" />
			)}
			{query.data?.keys?.length === 0 ? (
				<div className="flex h-60 flex-col space-y-1 items-center place-content-center">
					<KeyIcon className="h-10 w-10" />
					<span className="pt-4">No keys found in this space</span>
					<span className="text-muted-foreground text-sm pb-4">
						Add a key to start receiving assets
					</span>
				</div>
			) : (
				<Component data={query.data} />
			)}
		</>
	);
}

function Key({
	keyData,
	addresses,
}: {
	keyData: KeyModel;
	addresses: AddressResponse[];
}) {
	console.log(keyData);

	const seedStr = String(keyData.publicKey);

	const { data } = useKeySettingsState();
	const settings = data?.settings[keyData.id.toString()];
	const name = settings?.name ?? `Key #${keyData.id.toString()}`;
	const { setData: setModal } = useModalState();

	const avatar = useMemo(() => {
		return createAvatar(shapes, {
			size: 512,
			seed: seedStr,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
	}, [seedStr]);

	return (
		<AccordionItem value={`item-${keyData.id.toString()}`}>
			<div className="grid grid-cols-[1fr_0.75fr_0.8fr_0.85fr_0.6fr_0.5fr] min-h-[84px] w-full font-sans font-normal hover:no-underline overflow-scroll">
				<div className="flex flex-row items-center gap-4">
					<div className="cursor-pointer min-h-8 h-8 relative shrink-0 p-1 min-w-12 border-[1px] border-border-secondary rounded overflow-hidden isolate">
						<Avatar className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2] rounded-none">
							<AvatarImage
								src={avatar}
								className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2]"
							/>
						</Avatar>

						<div className="z-[-1] absolute left-0 top-0 w-full h-full bg-overlay-secondary" />

						<div className="text-[10px] text-right text-white absolute right-1 bottom-1">
							...{base64FromBytes(keyData.publicKey).slice(-4)}
						</div>
					</div>

					<div>{name}</div>
				</div>

				<div className="flex items-center">
					<span className="text-sm">
						...{base64FromBytes(keyData.publicKey).slice(-8)}
					</span>
				</div>

				<div className="flex items-center">
					{keyData.keychainId.toString()}
				</div>

				<div className="flex items-center">
					{prettyKeyType(keyData.type)}
				</div>

				<div className="flex items-center">balance</div>

				<div className="flex items-center justify-end gap-2">
					<div
						className="cursor-pointer p-1"
						onClick={() => {
							setModal({
								type: "select-key",
								params: {
									addresses: addresses.map((a) => ({
										...a,
										keyId: keyData.id,
									})),
									next: "receive",
								},
							});
						}}
					>
						<Icons.receive />
					</div>
					<div
						className="ml-4 cursor-pointer p-1"
						onClick={() => {
							setModal({
								type: "select-key",
								params: {
									addresses: addresses.map((a) => ({
										...a,
										keyId: keyData.id,
									})),
									next: "send",
								},
							});
						}}
					>
						<Icons.sendPlane />
					</div>
				</div>
			</div>
			<AccordionContent className="overflow-scroll px-4">
				{addresses?.map((addr) => {
					if (addr.type === AddressType.ADDRESS_TYPE_ETHEREUM) {
						return (
							<div
								key={addr.type}
								className="flex flex-row bg-background justify-between w-full mr-4  px-4 py-4 rounded-lg min-w-[600px]"
							>
								<div className="flex flex-row items-center gap-4">
									<AddressAvatar seed={addr.address} />
									<div className="flex flex-col text-left">
										<span className="text-xs text-muted-foreground">
											Wallet Address
										</span>
										<span className="text-sm">
											<Copy value={addr.address} split />
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-4">
									<AddToMetaMaskButton
										keyId={keyData.id}
										address={addr.address}
									/>
									<ReceiveAssetButton
										address={addr.address}
									/>
									<Link
										to={`/new-transaction?key=${keyData.id}`}
									>
										<Button
											size="sm"
											variant="ghost"
											className="gap-2 w-[110px] text-sm hover:bg-foreground hover:text-background"
										>
											<MoveUpRight className="h-4 w-4" />
											Send
										</Button>
									</Link>
								</div>
							</div>
						);
					}
				})}
			</AccordionContent>
		</AccordionItem>
	);
}
