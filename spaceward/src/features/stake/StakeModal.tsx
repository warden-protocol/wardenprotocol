import clsx from "clsx";
import Portal from "@/components/ui/portal";
import { Fragment, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";

const StakeModal = ({ onHide }: { onHide: () => void }) => {
	const [amount, setAmount] = useState("");
	const [allDetails, setAllDetails] = useState(false);

	const [isInactive, setIsInactive] = useState(false);

	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-bold text-5xl mb-12 leading-[56px]">
						Stake WARD
					</div>

					{isInactive && (
						<div className="mb-12 bg-bg-negative rounded-lg	py-4 px-4 flex items-center gap-3">
							<Icons.alert />
							Validator is inactive. Staking are not possible at
							this time
						</div>
					)}

					<form
						action=""
						className={clsx(
							isInactive && "opacity-30 pointer-events-none",
						)}
					>
						<div className="relative z-50 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2">
							<Icons.logoWhite />
							<input
								className={clsx(
									"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
								)}
								id="address"
								onChange={(e) => setAmount(e.target.value)}
								value={amount}
								placeholder="Amount WARD"
							/>
							<button className="text-secondary-text font-semibold py-[6px] px-3">
								Max
							</button>
						</div>

						<div className="mt-8 relative z-20 bg-secondary-bg rounded-lg flex-col flex gap-4 py-5 px-6">
							<div className="flex h-8 justify-between items-center w-full">
								<div className="text-xl font-bold">Details</div>
								<div
									onClick={() => setAllDetails(!allDetails)}
									className="text-xl font-semibold text-secondary-text cursor-pointer"
								>
									{allDetails ? "Hide" : "All"}
								</div>
							</div>

							<div className="flex h-8 justify-between items-center w-full">
								<div>Validator</div>
								<div className="flex items-center gap-[6px] cursor-pointer">
									<img
										src="/images/chorus.png"
										className="w-6 h-6 object-contain"
										alt=""
									/>

									<span className="decoration-solid underline">
										Chorus One
									</span>
								</div>
							</div>

							<div className="flex h-8 justify-between items-center w-full">
								<div>Commision</div>
								<div>5.1%</div>
							</div>

							{allDetails && (
								<Fragment>
									<div className="flex h-8 justify-between items-center w-full">
										<div>Voting power</div>
										<div>0.1%</div>
									</div>

									<div className="flex h-8 justify-between items-center w-full">
										<div>Expected APR</div>
										<div>16.1%</div>
									</div>

									<div className="flex h-8 justify-between items-center w-full">
										<div className="flex items-center gap-1">
											Unbonding period
											<div className="group relative z-10">
												<Icons.info />
												<div
													className={clsx(
														`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
													)}
												>
													Cooldown period during which
													the tokens are frozen before
													being unstaked and usable
													again
												</div>
											</div>
										</div>
										<div>21 days</div>
									</div>
								</Fragment>
							)}
						</div>

						<div className="mt-12">
							<button
								onClick={() => {}}
								className={clsx(
									`bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
								)}
							>
								Stake
							</button>
						</div>
					</form>
				</div>
			</div>
		</Portal>
	);
};

export default StakeModal;
