import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddressAvatar from "@/components/AddressAvatar";
import { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";

export function SelectAddressRow({
	asset,
	onClick,
}: {
	asset: AddressResponse & { keyId: bigint };
	onClick: (item: AddressResponse & { keyId: bigint }) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					onClick={onClick.bind(null, asset)}
					className="tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
				>
					<AddressAvatar seed={asset?.address} />

					<div>
						Key #{asset.keyId.toString()} ({asset?.type == AddressType.ADDRESS_TYPE_ETHEREUM
							? "Ethereum"
							: "Osmosis"})
					</div>
					{/* <div className="ml-auto">...{asset?.address.slice(-4)}</div> */}
					<div className="ml-auto">
						{asset?.address.slice(0, 12)}...
						{asset?.address.slice(-12)}
					</div>
				</div>
			</DialogTrigger>
		</Dialog>
	);
}
