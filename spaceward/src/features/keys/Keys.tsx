import { Params } from "react-router-dom";
import { prettyKeyType } from "../../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AddressAvatar from "@/components/AddressAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Key as KeyModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { Copy } from "@/components/ui/copy";
import { ReceiveAssetButton } from "../assets/ReceiveAssetButton";
import { MoveUpRight, KeyIcon } from "lucide-react";
import { NewKeyButton } from "./NewKeyButton";
import AddToMetaMaskButton from "../metamask/AddToMetaMaskButton";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";

export function Keys({ spaceId }: { spaceId: string }) {
	const { QueryKeysBySpaceId } = useWardenWardenV1Beta2();
	const query = QueryKeysBySpaceId(
		{ space_id: spaceId, derive_wallets: WalletType.WALLET_TYPE_ETH },
		{ enabled: !!spaceId },
		10,
	);

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	if (query.data?.pages[0].keys?.length === 0) {
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
				{query.data?.pages.flatMap((page) =>
					page.keys?.map((key) => (
						<Key
							key={key.key!.id!.toString()}
							keyData={key.key! as Required<KeyModel>}
							wallets={key.wallets!}
						/>
					)),
				)}
			</Accordion>
		</div>
	);
}

function Key({
	keyData,
	wallets,
}: {
	keyData: Required<KeyModel>;
	wallets: any[];
}) {
	return (
		<AccordionItem
			value={`item-${keyData.id.toString()}`}
			className="border rounded-lg bg-card"
		>
			<AccordionTrigger className="p-4 font-sans font-normal hover:no-underline overflow-scroll">
				<div className="flex flex-row justify-between w-full mr-4 min-w-[600px]">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={keyData.public_key} />
						<div className="flex flex-col text-left">
							<span className="text-xs text-muted-foreground">
								Key Material
							</span>
							<span className="text-sm">
								<Copy value={keyData.public_key} split />
							</span>
						</div>
					</div>
					<div className="flex flex-col text-left">
						<span className="text-xs text-muted-foreground">
							Keychain
						</span>
						<span className="text-sm">{keyData.keychain_id}</span>
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
						<Avatar className="bg-white p-2 border h-10">
							<AvatarImage
								src="/logos/ethereum.svg "
								alt="Ethereum"
							/>
						</Avatar>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="border-t overflow-scroll">
				{wallets?.map((wallet) => {
					if (wallet.type === "WALLET_TYPE_ETH") {
						return (
							<div
								key={wallet.type}
								className="flex flex-row justify-between w-full mr-4 px-4 pt-4 min-w-[600px]"
							>
								<div className="flex flex-row items-center gap-4">
									<AddressAvatar seed={wallet.address} />
									<div className="flex flex-col text-left">
										<span className="text-xs text-muted-foreground">
											Wallet Address
										</span>
										<span className="text-sm">
											<Copy
												value={wallet.address}
												split
											/>
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-4">
									<AddToMetaMaskButton
										keyId={keyData.id}
										address={wallet.address}
									/>
									<ReceiveAssetButton
										address={wallet.address}
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
