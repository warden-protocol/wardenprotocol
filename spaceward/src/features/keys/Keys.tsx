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
	AccordionTrigger,
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
	CheckIcon,
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

const ListView = ({ data }: { data?: QueryKeysResponse }) => {
	return (
		<div className="">
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
		<div className="flex basis-2/6 flex-grow-0 flex-shrink-0 p-4">
			<div className="keycard-container rounded-xl h-52 w-full items-center justify-center relative overflow-hidden flex">
				<div
					className={clsx(
						"absolute keycard-frontface h-full w-full transition-transform",
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
							<div
								className="ml-auto cursor-pointer"
								onClick={() => {
									setModal({
										type: "select-key",
										params: {
											addresses: addresses.map((a) => ({
												...a,
												keyId: key.id,
											})),
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
											addresses: addresses.map((a) => ({
												...a,
												keyId: key.id,
											})),
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
				<div
					className={clsx(
						"absolute keycard-backface h-full w-full bg-secondary-bg transition-transform",
						{ flipped: !flipped },
					)}
				>
					<div className="relative flex flex-col z-10 p-4">
						<div className="flex items-center">
							{!edit ? (
								<>
									<p className="font-display">{name}</p>
									<Edit2Icon
										className="cursor-pointer h-8 w-8 p-2"
										onClick={editName}
									/>
								</>
							) : (
								<>
									<input
										className="font-display"
										value={nameInput}
										onChange={(e) =>
											setNameInput(e.target.value)
										}
									/>
									<CheckIcon
										className="cursor-pointer p-2 h-8 w-8 ml-auto"
										onClick={saveName}
									/>
								</>
							)}
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
		<div className="flex flex-row flex-wrap">
			{data?.keys.map((k, i) => (
				<KeyCard data={k} key={k.key.id.toString()} />
			))}

			<div className="flex basis-2/6 flex-grow-0 flex-shrink-0 p-4">
				<div
					className="rounded-xl border-dashed border-2 border-tertiary h-52 w-full items-center justify-center cursor-pointer flex"
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
	return (
		<AccordionItem
			value={`item-${keyData.id.toString()}`}
			className="rounded-xl bg-card"
		>
			<AccordionTrigger className="p-6 font-sans font-normal hover:no-underline overflow-scroll">
				<div className="flex flex-row justify-between w-full mr-4 min-w-[600px]">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={keyData.publicKey} />
						<div className="flex flex-col text-left">
							<span className="text-xs text-muted-foreground">
								Key Material
							</span>
							<span className="text-sm">
								<Copy
									value={base64FromBytes(keyData.publicKey)}
									split
								/>
							</span>
						</div>
					</div>
					<div className="flex flex-col text-left">
						<span className="text-xs text-muted-foreground">
							Keychain
						</span>
						<span className="text-sm">
							{keyData.keychainId.toString()}
						</span>
					</div>
					<div className="flex flex-col text-left">
						<span className="text-xs text-muted-foreground">
							Key Type
						</span>
						<span className="text-sm">
							{prettyKeyType(keyData.type)}
						</span>
					</div>
					<div className="flex flex-row">
						{/* <Avatar className="bg-white p-2 border">
							<AvatarImage
								src="/logos/ethereum.svg"
								alt="Ethereum"
							/>
						</Avatar> */}
					</div>
				</div>
			</AccordionTrigger>
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
