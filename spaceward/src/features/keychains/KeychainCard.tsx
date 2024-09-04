import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Icons } from "@/features/keychains/icons";
import { useModalState } from "../modals/state";

interface KeychainProps {
	id: bigint;
	name: string;
	link: string;
	description: ReactNode;
	lastSeen: string;
	verified?: boolean;
}

const KeychainCard = (props: KeychainProps) => {
	const [isDescription, setIsDescription] = useState(false);
	const { setData: setModal } = useModalState();

	return (
		<div className="flex flex-col bg-fill-quaternary border-border-edge border-solid border-[1px] rounded-xl px-6 pt-6 pb-4">
			<div className="flex items-center gap-[8px]">
				<div className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-[calc(100%_-_68px)]">
					{props.name}
				</div>
				{props.verified ? <Icons.verified /> : null}
				{/* <a href={props.link} target="_blank" className="ml-auto">
					<Icons.externalLink className="invert dark:invert-0" />
				</a> */}
			</div>

			<div className="relative">
				<span
					className={clsx(
						"text-label-secondary text-xs mt-2 pr-8",
						isDescription ? "inline-block" : "line-clamp-2",
					)}
				>
					{props.description}
				</span>
				<button
					onClick={() => {
						setIsDescription(!isDescription);
					}}
					className="text-xs cursor-pointer leading-[16px] absolute right-0 bottom-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0"
				>
					{isDescription ? "Less" : "More"}
				</button>
			</div>

			{/* <div className="flex items-cent gap-1  mt-4">
				<div className="bg-fill-quaternary rounded-lg	p-3">
					<div className="flex gap-1 items-center font-semibold">
						<span>
							Keys · <span className="text-label-accent">X.XK</span>
						</span>
						<Icons.key />
					</div>

					<div className="mt-1 text-label-secondary text-xs">
						X.XM transactions
					</div>
				</div>

				<div className="bg-fill-quaternary rounded-lg	p-3">
					<div className="flex gap-1 items-center font-semibold">
						<span>
							Sign price ·{" "}
							<span className="text-label-accent">$X.XX</span>
						</span>
					</div>

					<div className="mt-1 text-label-secondary text-xs">
						~X sec request time
					</div>
				</div>

				<div className="p-3">
					<div className="font-semibold">$XX.X</div>

					<div className="mt-1 text-label-secondary text-xs">TVL</div>
				</div>
			</div> */}

			{/* <div className="flex my-4 items-center gap-2 text-xs text-label-secondary">
				<Icons.clock className="invert dark:invert-0" />
				Last seen {props.lastSeen}
			</div> */}

			<div className="bg-border-quaternary h-[1px] mb-2 mt-4" />

			<button
				className="focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0 flex items-center justify-center gap-2 h-14 font-semibold duration-300 text-label-accent hover:text-foreground w-full"
				onClick={setModal.bind(null, {
					type: "create-key",
					params: { keychainId: props.id },
				})}
			>
				<Icons.plus />
				Create Key
			</button>
		</div>
	);
};

export default KeychainCard;
