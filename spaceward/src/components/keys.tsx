import Long from "long";
import { Params } from "react-router-dom";
import { prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AddressAvatar from "./address-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Copy } from "./ui/copy";
import ReceiveAssetButton from "./receive-asset-button";
import { MoveUpRight, KeyIcon } from "lucide-react";
import NewKeyButton from "./new-key-button";
import AddToMetaMaskButton from "./add-to-metamask-button";
import { useQueryHooks } from "@/hooks/useClient";
import { Key as KeyModel, AddressType } from "@wardenprotocol/wardjs/dist/codegen/warden/warden/v1beta2/key";
import { PageRequest } from "@wardenprotocol/wardjs/dist/codegen/cosmos/base/query/v1beta1/pagination";
import { AddressResponse } from "@wardenprotocol/wardjs/dist/codegen/warden/warden/v1beta2/query";
import { base64FromBytes } from "@wardenprotocol/wardjs/dist/codegen/helpers";

export default function Keys({ spaceId }: { spaceId: string }) {
	const { useKeysBySpaceId } = useQueryHooks();
	const query = useKeysBySpaceId({
		request: {
			spaceId: Long.fromString(spaceId),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
			pagination: PageRequest.fromPartial({
				limit: Long.fromInt(10),
			}),
		},
	});

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	if (query.data?.keys?.length === 0) {
		return (
			<div className="flex h-60 flex-col space-y-1 items-center place-content-center">
				<KeyIcon className="h-10 w-10" />
				<span className="pt-4">No keys found in this space</span>
				<span className="text-muted-foreground text-sm pb-4">
					Add a key to start receiving assets
				</span>
				<NewKeyButton />
			</div>
		);
	}

	return (
		<div className="">
			<Accordion type="multiple" className="space-y-3">
				{query.data?.keys.map((key) => (
					<Key
						key={key.key.id.toString()}
						keyData={key.key}
						addresses={key.addresses}
					/>
				))}
			</Accordion>
		</div>
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
			className="border rounded-lg bg-card"
		>
			<AccordionTrigger className="p-4 font-sans font-normal hover:no-underline overflow-scroll">
				<div className="flex flex-row justify-between w-full mr-4 min-w-[600px]">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={keyData.publicKey} />
						<div className="flex flex-col text-left">
							<span className="text-xs text-muted-foreground">
								Key Material
							</span>
							<span className="text-sm">
								<Copy value={base64FromBytes(keyData.publicKey)} split />
							</span>
						</div>
					</div>
					<div className="flex flex-col text-left">
						<span className="text-xs text-muted-foreground">
							Keychain
						</span>
						<span className="text-sm">{keyData.keychainId.toString()}</span>
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
						<Avatar className="bg-white p-2 border">
							<AvatarImage
								src="/logos/ethereum.svg "
								alt="Ethereum"
							/>
						</Avatar>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="border-t overflow-scroll">
				{addresses?.map((addr) => {
					if (addr.type === AddressType.ADDRESS_TYPE_ETHEREUM) {
						return (
							<div
								key={addr.type}
								className="flex flex-row justify-between w-full mr-4 px-4 pt-4 min-w-[600px]"
							>
								<div className="flex flex-row items-center gap-4">
									<AddressAvatar seed={addr.address} />
									<div className="flex flex-col text-left">
										<span className="text-xs text-muted-foreground">
											Wallet Address
										</span>
										<span className="text-sm">
											<Copy
												value={addr.address}
												split
											/>
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
											variant="default"
											className="gap-2 w-[110px] text-sm"
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

export async function loader({ params }: { params: Params<string> }) {
	if (!params.spaceId) {
		throw new Error("No space address provided");
	}
	return {
		spaceId: params.spaceId,
	};
}
