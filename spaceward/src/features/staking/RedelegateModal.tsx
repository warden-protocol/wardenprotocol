import Portal from "@/components/ui/portal";
import { useState } from "react";
import SignTranactionModal from "../assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import clsx from "clsx";

const RedelegateModal = ({
	onHide,
	onHideAll,
}: {
	onHide: () => void;
	onHideAll: () => void;
}) => {
	const [isSign, setIsSign] = useState(false);
	const [isInputError, setIsInputError] = useState(true);
	const [isDropdown, setIsDropdown] = useState(false);
	const [amountValue, setAmountValue] = useState("100 WARD");

	if (isSign) return <SignTranactionModal onHide={() => setIsSign(false)} />;

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

				<div className="max-w-[520px] w-[520px] tracking-widepb-5">
					<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
						Redelegate
					</div>

					<form action="" onSubmit={(e) => e.preventDefault()}>
						<div
							onClick={() => setIsDropdown(!isDropdown)}
							className="relative z-50 cursor-pointer bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2"
						>
							<img
								src="/images/dsrv.png"
								className="w-6 h-6 object-contain"
								alt=""
							/>
							<input
								className={clsx(
									"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
								)}
								id="address"
								value={"DSRV"}
							/>
							<Icons.chevronDown
								className={clsx(
									"w-6 h-6",
									isDropdown && "rotate-180",
								)}
							/>

							{isDropdown && (
								<div className="rounded-lg overflow-hidden	bg-secondary-bg backdrop-blur-[20px] absolute right-0 bottom-[-4px] w-full translate-y-full">
									<div
										onClick={() => setIsDropdown(false)}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-3 hover:bg-tertiary-text transition-all duration-300"
									>
										<img
											src="/images/dsrv.png"
											className="w-6 h-6 object-contain"
											alt=""
										/>
										<div className="text-sm whitespace-nowrap">
											DSRV
										</div>
									</div>
									<div
										onClick={() => setIsDropdown(false)}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-3 hover:bg-tertiary-text transition-all duration-300"
									>
										<img
											src="/images/dsrv.png"
											className="w-6 h-6 object-contain"
											alt=""
										/>

										<div className="text-sm whitespace-nowrap">
											DSRV
										</div>
									</div>
								</div>
							)}
						</div>

						<div
							className={clsx(
								"relative z-10 mt-8 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2",
								isInputError && "border-negative border-[1px]",
							)}
						>
							<Icons.logoWhite />

							<input
								className={clsx(
									"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
								)}
								id="address"
								onChange={(e) => setAmountValue(e.target.value)}
								value={amountValue}
								placeholder="Amount"
							/>
							{isInputError && <Icons.alert />}
							{amountValue && (
								<button onClick={() => setAmountValue("")}>
									<Icons.clearInput />
								</button>
							)}
						</div>
						{isInputError && (
							<div className="mt-[2px] text-negative text-xs">
								You can redelegate not more than X WARD
							</div>
						)}

						<div className="mt-8 text-sm bg-secondary-bg rounded-lg p-4 flex items-center gap-2">
							<Icons.info />
							The validators will be switched after the unbonding
							period is 21 days
						</div>
					</form>

					<button
						className={clsx(
							"rounded-lg mt-12 bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-300",
							(!amountValue || isInputError) &&
								"opacity-30 pointer-events-none",
						)}
					>
						Redelegate
					</button>
				</div>
			</div>
		</Portal>
	);
};

export default RedelegateModal;
