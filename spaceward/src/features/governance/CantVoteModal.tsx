import { Icons } from "@/components/ui/icons-assets";
import Portal from "@/components/ui/portal";

const CantVoteModal = ({ onHide }: { onHide: () => void }) => {
	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-wide">
					<Icons.alertModal className="mb-[72px] mx-auto" />

					<div className="font-bold text-5xl mb-6 leading-[56px]">
						You can&apos;t vote
					</div>
					<div>
						You are not allowed to vote for this proposal because
						your WARD tokens are staked for validator
					</div>

					<button
						onClick={onHide}
						className="mt-12 rounded-lg	mx-auto max-w-[240px] bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200"
					>
						Close
					</button>
				</div>
			</div>
		</Portal>
	);
};

export default CantVoteModal;
