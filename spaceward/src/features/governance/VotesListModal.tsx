import clsx from "clsx";
import Portal from "@/components/ui/portal";
import { Fragment, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";

const VOTESARRAY = [
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "Yes",
		isValidator: false,
	},
	{
		icon: "/images/chorus.png",
		address: "Chorus One",
		vote: "No",
		isValidator: true,
	},
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "No with veto",
		isValidator: false,
	},
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "Abstain",
		isValidator: false,
	},
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "Yes",
		isValidator: false,
	},
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "Abstain",
		isValidator: false,
	},
	{
		icon: "/images/somewallet.png",
		address: "...1n90vlx7",
		vote: "No with veto",
		isValidator: false,
	},
];

const VotesListModal = ({
	onHide,
	onHideAll,
}: {
	onHide: () => void;
	onHideAll: () => void;
}) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/goback.svg" alt="" />
				</button>
				<button
					onClick={onHideAll}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						2,456 votes
					</div>

					<div className="mb-12">
						#1 Signaling Proposal: Creation of a Conflict Resolution
						Council
					</div>

					<form action="" onSubmit={(e) => e.preventDefault()}>
						<div className="relative z-50 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2">
							<Icons.search />
							<input
								className={clsx(
									"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
								)}
								id="address"
								onChange={(e) => setSearchValue(e.target.value)}
								value={searchValue}
								placeholder="Search address"
							/>
						</div>
					</form>

					<div className="bg-secondary-bg rounded-lg flex flex-col gap-4 p-6 mt-8 max-h-[374px] overflow-scroll">
						{VOTESARRAY.map((item, key) => (
							<div
								key={key}
								className="flex items-center justify-between py-1"
							>
								<div className="flex items-center gap-3">
									<img
										src={item.icon}
										alt=""
										className="w-10 h-10 object-contain"
									/>
									{item.address}
									{item.isValidator && (
										<div className="-ml-2 rounded-[32px] py-1 px-2 text-xs bg-secondary-bg">
											Validator
										</div>
									)}
								</div>

								{item.vote}
							</div>
						))}
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default VotesListModal;
