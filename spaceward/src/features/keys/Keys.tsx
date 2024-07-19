import { prettyKeyType } from "@/utils/formatting";
import { Link } from "react-router-dom";
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
import { MoveUpRight, KeyIcon } from "lucide-react";
import { NewKeyButton } from "@/features/keys";
import { AddToMetaMaskButton } from "@/features/metamask";
import { useQueryHooks } from "@/hooks/useClient";
import {
	Key as KeyModel,
	AddressType,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";

export function Keys({ spaceId }: { spaceId: string }) {
	const { useKeysBySpaceId, isReady } = useQueryHooks();
	const query = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady,
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
