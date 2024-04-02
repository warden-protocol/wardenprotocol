// import Intents from "@/components/intents";
import NewIntentButton from "@/components/new-intent-button";
import { useState } from "react";
import CreateIntent from "../components/create-intent";
import Portal from "../components/ui/portal";


function IntentsPage() {
	const [isCreating, setIsCreating] = useState(false);
	const [isSelectModal, setIsSelectModal] = useState(false);

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-4xl">Intents</h2>
					<p className="text-muted-foreground hidden xl:block">
						Rules that define who can operate or use its keys to
						generate and sign transactions.
					</p>
				</div>
				<div>
					<NewIntentButton onClick={() => setIsSelectModal(true)} />
				</div>
			</div>

			{isSelectModal && (
				<Portal domId="intent-modal">
					<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[480px]">
						<button
							onClick={() => {
								setIsSelectModal(false);
							}}
							className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
						>
							<img src="/images/button-close.svg" alt="" />
						</button>

						<div className="max-w-[520px] text-center tracking-wide px-5 pb-5">
							<div className="font-bold text-5xl mb-6 leading-[56px]">
								Select an approval condition
							</div>
							<div>
								How will transactions be approved in the Space
							</div>

							<div className="mt-12 flex flex-col gap-2 text-left">
								<div
									onClick={() => {
										setIsCreating(true);
										setIsSelectModal(false);
									}}
									className="flex items-center gap-3 py-5 cursor-pointer"
								>
									<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
										<img
											src="/images/user-group.svg"
											alt=""
										/>
									</div>
									<div>
										<p className="font-semibold">
											Joint approval
										</p>
										<p className="text-[rgba(229,238,255,0.60)] text-xs">
											Each person must approve the
											transaction
										</p>
									</div>
									<div className="ml-auto">
										<img
											src="/images/chevron-right.svg"
											alt=""
										/>
									</div>
								</div>

								<div className="flex items-center gap-3 py-5 cursor-pointer">
									<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
										<img src="/images/users-2.svg" alt="" />
									</div>
									<div>
										<p className="font-semibold">
											Approval by certain amount
										</p>
										<p className="text-[rgba(229,238,255,0.60)] text-xs">
											Set amount of persons should approve
											the transaction
										</p>
									</div>
									<div className="ml-auto">
										<img
											src="/images/chevron-right.svg"
											alt=""
										/>
									</div>
								</div>

								<div className="flex items-center gap-3 py-5 cursor-pointer">
									<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
										<img
											src="/images/user-check-2.svg"
											alt=""
										/>
									</div>
									<div>
										<p className="font-semibold">
											Approval by anyone
										</p>
										<p className="text-[rgba(229,238,255,0.60)] text-xs">
											Any person can approve the
											transaction
										</p>
									</div>
									<div className="ml-auto">
										<img
											src="/images/chevron-right.svg"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Portal>
			)}

			{isCreating ? (
				<CreateIntent />
			) : (
				<div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							1
						</div>
						<p className="flex items-center gap-2">
							Create an Intent by pressing &#39;Create&#39; button
							<svg
								width="12"
								height="11"
								viewBox="0 0 12 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.60227 11L5.72727 10.1364L9.32955 6.53409H0V5.28409H9.32955L5.72727 1.69318L6.60227 0.818182L11.6932 5.90909L6.60227 11Z"
									fill="white"
								/>
							</svg>
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							2
						</div>
						<p className="flex items-center gap-2">
							Select an approval condition
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							3
						</div>
						<p className="flex items-center gap-2">Have fun</p>
					</div>
				</div>
			)}

			{/* <Intents /> */}
		</div>
	);
}

export default IntentsPage;
