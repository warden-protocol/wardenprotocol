import { useEffect, useState } from "react";
import AddressAvatar from "@/components/AddressAvatar";
import { useQuery } from "@tanstack/react-query";
import { isValidEth } from "@/utils/validate";
import { queryEthAddress } from "./util/query";
import { Icons } from "@/components/ui/icons";

const PersonSelect = ({
	address,
	onChange,
	selected,
}: {
	selected: boolean;
	address: string;
	onChange: (val: boolean) => void;
}) => {
	const [isSelected, setIsSelected] = useState(selected);

	const info = useQuery({
		enabled: isValidEth(address),
		...queryEthAddress(address as `0x${string}`),
	});

	useEffect(() => {
		onChange(isSelected);
	}, [isSelected, onChange]);

	return (
		<div
			className="flex items-center gap-3 py-4 px-5 cursor-pointer hover:bg-[rgba(229,238,255,0.15)] transition-all duration-200 rounded-lg"
			onClick={() => {
				setIsSelected(!isSelected);
			}}
		>
			<div className="rounded-full w-10 h-10 flex items-center justify-center bg-[rgba(255,174,238,0.15)] text-[#FFAEEE] text-xl">
				<AddressAvatar
					seed={address}
					logo={info.data?.logo}
					customTooltip={info.data?.name}
				/>
			</div>
			<div className="">{"..." + address.slice(-8)}</div>
			<div className="ml-auto">
				{isSelected ? (
					<Icons.checkbox />
				) : (
					<div className="w-5 h-5 rounded border-[1px] border-[#E5EEFF] opacity-[0.6]"></div>
				)}
			</div>
		</div>
	);
};

export default PersonSelect;
