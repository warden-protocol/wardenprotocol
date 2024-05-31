import clsx from "clsx";
import DetailsModal from "./DetailsModal";
import { useState } from "react";

interface ItemProps {
	name: string;
	status: string;
	votes: number;
	votingStart: Date;
	votingEnd: Date;
}

export default function GovernanceRow({
	item,
	place,
}: {
	item: ItemProps;
	place: number;
}) {
	const [isDetailsModal, setDetailsModal] = useState(false);

	return (
		<div className="grid grid-cols-[24px_1fr_125px_140px_140px_140px_90px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
			<div className="flex flex-col justify-center">
				<div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary-bg text-xs">
					{place}
				</div>
			</div>

			<div className="flex flex-col justify-center max-w-[216px]">
				<div className="truncate whitespace-nowrap text-ellipsis overflow-hidden block">
					{item.name}
				</div>
			</div>

			<div className="flex flex-col justify-center">
				<div
					className={clsx(
						"rounded-2xl py-1 px-2 text-xs w-fit",
						item.status.toLowerCase() == "passed"
							? "bg-positive-secondary text-positive"
							: item.status.toLowerCase() == "rejected"
								? "bg-orange-secondary text-orange"
								: item.status.toLowerCase() == "failed"
									? "bg-negative-secondary text-negative"
									: "bg-secondary-bg",
					)}
				>
					{item.status}
				</div>
			</div>

			<div className="flex flex-col justify-center">
				<div className="flex items-center gap-3">
					<div className="group relative">
						<img
							src="/images/graph-example.png"
							className="w-10 h-10 object-contain"
							alt=""
						/>
						<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
							<div className="flex gap-2 items-center">
								<div className="bg-positive w-[6px] h-[6px] rounded-full" />
								Yes, 66%
							</div>
							<div className="flex gap-2 items-center">
								<div className="bg-negative w-[6px] h-[6px] rounded-full" />
								No, 24%
							</div>
							<div className="flex gap-2 items-center">
								<div className="bg-pixel-pink w-[6px] h-[6px] rounded-full" />
								No with veto, 12%
							</div>
							<div className="flex gap-2 items-center">
								<div className="bg-fill-gray w-[6px] h-[6px] rounded-full" />
								Abstain, 8%
							</div>
						</div>
					</div>

					{item.votes}
				</div>
			</div>

			<div className="flex items-center">
				{item.votingStart.getDate()}{" "}
				{item.votingStart.toLocaleString("en-US", { month: "long" })},{" "}
				{item.votingStart.getFullYear().toString().slice(-2)}
			</div>

			<div className="flex flex-col justify-center">
				{item.votingEnd.getDate()}{" "}
				{item.votingEnd.toLocaleString("en-US", { month: "long" })},{" "}
				{item.votingEnd.getFullYear().toString().slice(-2)}
			</div>

			<div className="flex flex-col justify-center items-end">
				<button
					onClick={() => {
						setDetailsModal(true);
					}}
					className="cursor-pointer font-semibold bg-secondary-bg text-white py-[6px] px-4 rounded hover:bg-hover-bg ease-in duration-100 w-fit"
				>
					Open
				</button>
			</div>

			{isDetailsModal && (
				<DetailsModal onHide={() => setDetailsModal(false)} />
			)}
		</div>
	);
}
