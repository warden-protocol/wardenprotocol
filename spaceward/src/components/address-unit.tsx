import AddressAvatar from "./address-avatar";

const AddressUnit = ({
	intent,
}: {
	intent: { name: string; address: string };
}) => {
	return (
		<div className="bg-[rgba(229,238,255,0.15)] rounded-3xl px-1 py-1 flex items-center gap-3">
			<div className="h-10 w-10 rounded-full bg-[rgba(255,174,238,0.15)] items-center justify-center flex text-[#FFAEEE] text-xl	">
				{/* {intent.name.toLowerCase()} */}
				<AddressAvatar seed={intent.address} />
			</div>

			<div className="text-sm">
				{/* {intent.address.slice(0, 4)}...{intent.address.slice(-4)} */}
				{"..." + intent.address.slice(-8)}
			</div>

			<button className="px-1">
				<img src="/images/x.svg" alt="" />
			</button>
		</div>
	);
};
export default AddressUnit;
