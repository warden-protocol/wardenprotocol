import { XIcon } from "lucide-react";
import AddressAvatar from "./AddressAvatar";
import { Copy } from "./ui/copy";

const AddressUnit = ({
	address,
	onRemove,
}: {
	address: string;
	onRemove: () => void;
}) => {
	return (
		<div className="bg-[rgba(229,238,255,0.15)] rounded-3xl px-1 py-1 flex items-center gap-3">
			<div className="h-10 w-10 rounded-full bg-[rgba(255,174,238,0.15)] items-center justify-center flex text-[#FFAEEE] text-xl">
				<AddressAvatar seed={address} />
			</div>

			<div className="text-sm">
				{/* {intent.address.slice(0, 4)}...{intent.address.slice(-4)} */}
				<Copy value={address} split />
			</div>

			<button className="px-1" onClick={onRemove}>
				<XIcon strokeWidth={1} className="h-6 w-6" />
			</button>
		</div>
	);
};
export default AddressUnit;
