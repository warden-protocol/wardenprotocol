import { useState } from "react";

const PersonSelect = ({ name, address }: { name: string; address: string }) => {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<div
			className="flex items-center gap-3 py-4 px-5 cursor-pointer hover:bg-[rgba(229,238,255,0.15)] transition-all duration-200"
			onClick={() => {
				setIsSelected(!isSelected);
			}}
		>
			<div className="rounded-full w-10 h-10 flex items-center justify-center bg-[rgba(255,174,238,0.15)] text-[#FFAEEE] text-xl">
				{name}
			</div>
			<div className="">
				{address.slice(0, 4)}...{address.slice(-4)}
			</div>
			<div className="ml-auto">
				{isSelected ? (
					<img src="/images/checkbox.svg" alt="" />
				) : (
					<div className="w-6 h-6 rounded-full border-[1px] border-[#E5EEFF] opacity-[0.6]"></div>
				)}
			</div>
		</div>
	);
};

export default PersonSelect;
