import { useState } from "react";
import Portal from "./ui/portal";
import PersonSelect from "./person-select";
import { isSet } from "@/utils/validate";

interface Props {
	addresses: string[];
	users: string[];
	onClose: () => void;
	showAddPerson: () => void;
	onChange: (users: string[]) => void;
}
const ChangePersonModal = ({
	addresses,
	users,
	onClose,
	showAddPerson,
	onChange,
}: Props) => {
	const [selected, setSelected] = useState<boolean[]>(
		addresses.map((address) => users.includes(address)),
	);

	return (
		<Portal domId="intent-modal">
			<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={() => {
						onClose();
					}}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						Select the persons
					</div>
					<div>Who should approve the transactions</div>

					<div className="mt-12 flex justify-between items-center text-[rgba(229,238,255,0.60)] font-semibold">
						<button
							onClick={() => {
								onClose();
								showAddPerson();
							}}
							className="px-5 hover:text-white transition-all duration-200"
						>
							Add Person
						</button>
						<button className="px-5 hover:text-white transition-all duration-200">
							Select All
						</button>
					</div>
					<div className="flex flex-col text-left">
						{addresses
							// ?.slice(0, 4)
							.map((address, i) => (
								<PersonSelect
									address={address}
									key={i}
									selected={selected[i]}
									onChange={(value) => {
										setSelected((prev) => {
											const next = [...prev];
											next[i] = value;
											return next;
										});
									}}
								/>
							))}
					</div>

					<div className="mt-12 pt-6 border-[rgba(229,238,255,0.30)] border-t-[1px]">
						<button
							onClick={() => {
								const nextUsers = selected
									.map((value, i) =>
										value ? addresses[i] : undefined,
									)
									.filter(isSet);

								if (
									JSON.stringify(nextUsers) !==
									JSON.stringify(users)
								) {
									onChange(nextUsers);
								}

								onClose();
							}}
							className="bg-[#FFF] h-14 flex items-center justify-center w-full font-semibold text-[#000] hover:bg-[#FFAEEE] transition-all duration-200"
						>
							Done
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default ChangePersonModal;
