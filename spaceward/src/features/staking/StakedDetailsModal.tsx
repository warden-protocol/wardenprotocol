import Portal from "@/components/ui/portal";
import { useState } from "react";
import SignTranactionModal from "../assets/SignTransactionModal";
import RedelegateModal from "./RedelegateModal";

const StakedModal = ({ onHide }: { onHide: () => void }) => {
	const [isSign, setIsSign] = useState(false);
	const [isRedelegateModal, setIsRedelegate] = useState(false);

	if (isSign) return <SignTranactionModal onHide={() => setIsSign(false)} />;

    if (isRedelegateModal) {
      return <RedelegateModal
                onHide={() => setIsRedelegate(false)}
                onHideAll={onHide}
            />
    }
	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] tracking-widepb-5">
					<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
						Staked details
					</div>

					<div className="bg-secondary-bg rounded-lg py-4 px-6">
						<div className="font-bold text-xl mb-4">
							100 WARD staked
						</div>

						<div className="flex justify-between items-center mb-5 py-1">
							<div>
								<div className="text-xs text-tertiary-text">
									Validator
								</div>
								<div>Chorus One</div>
							</div>
							<button
								onClick={() => setIsRedelegate(true)}
								className="rounded bg-secondary-bg font-semibold py-[6px] px-4 hover:bg-hover-bg transition-all duration-300"
							>
								Redelegate
							</button>
						</div>

						<div className="flex justify-between items-center py-1">
							<div>
								<div className="text-xs text-tertiary-text">
									Rewards
								</div>
								<div>10 WARD</div>
							</div>
							<button
								onClick={() => setIsSign(true)}
								className="rounded bg-secondary-bg font-semibold py-[6px] px-4 hover:bg-hover-bg transition-all duration-300"
							>
								Claim
							</button>
						</div>
					</div>

					<button className="rounded-lg mt-12 bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-300">
						Stake More
					</button>

					<button
						onClick={() => setIsSign(true)}
						className="rounded-lg mt-4 bg-secondary-bg h-14 flex items-center justify-center w-full font-semibold  hover:bg-hover-bg transition-all duration-300 text-white"
					>
						Unstake
					</button>

					<div className="mt-2 text-center text-xs text-secondary-text">
						Unbonding period is 21 days
					</div>
				</div>
			</div>


		</Portal>
	);
};

export default StakedModal;
