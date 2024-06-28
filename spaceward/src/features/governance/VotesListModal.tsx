import clsx from "clsx";
import { useMemo, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import { ProposalParsed } from "./types";
import {
	Vote,
	VoteOption,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import AddressAvatar from "@/components/AddressAvatar";

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
	proposal,
	votes,
}: {
	proposal: ProposalParsed;
	votes: Vote[];
}) => {
	const [searchValue, setSearchValue] = useState("");

	const items = useMemo(() => {
		return votes.filter((item) =>
			item.voter.includes(searchValue.toLowerCase()),
		);
	}, [votes, searchValue]);

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
			<div className="font-bold text-5xl mb-6 leading-[56px]">
				{votes.length} voters
			</div>

			<div className="mb-12">
				#{proposal.id} {proposal.name}
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

			<div className="bg-secondary-bg rounded-lg flex flex-col gap-4 p-6 mt-8 max-h-[374px] overflow-y-scroll">
				{items.map((item, key) => (
					<div
						key={key}
						className="flex items-center justify-between py-1"
					>
						<div className="flex items-center gap-3">
							<AddressAvatar seed={item.voter} />
							...{item.voter.slice(-6)}
							{true && (
								<div className="-ml-2 rounded-[32px] py-1 px-2 text-xs bg-secondary-bg">
									Validator
								</div>
							)}
						</div>

						{item.options.map(({ option }, key) => (
							<span key={`${key}:${option}`}>
								{option === VoteOption.VOTE_OPTION_ABSTAIN
									? "Abstain"
									: option === VoteOption.VOTE_OPTION_NO
										? "No"
										: option ===
											  VoteOption.VOTE_OPTION_NO_WITH_VETO
											? "No with veto"
											: option ===
												  VoteOption.VOTE_OPTION_YES
												? "Yes"
												: VoteOption[option]}
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default VotesListModal;
