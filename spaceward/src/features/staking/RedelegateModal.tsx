import clsx from "clsx";
import { useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import type { ModalProps } from "./types";
import type {
	DelegationResponse,
	Validator,
} from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import { bigintToFixed } from "@/lib/math";
import { useStakingTx } from "./hooks";
import { numRestrict, strToBigint } from "./util";
import { VALIDATOR_LOGOS } from "./assets";

export default function RedelegateModal(
	props: ModalProps & {
		delegation: DelegationResponse;
		validators: Validator[];
	},
) {
	const { submitRedelegateTx } = useStakingTx(props.dispatch);
	const maxAmount = BigInt(props.delegation.balance.amount);
	const [validator, setValidator] = useState<Validator>(props.validators[0]);
	const [isDropdown, setIsDropdown] = useState(false);

	const [amountValue, setAmountValue] = useState(
		bigintToFixed(maxAmount, { decimals: 18 }),
	);

	const amount = strToBigint(amountValue);
	const isInputError = amount > maxAmount;

	async function submitTransaction() {
		if (
			amount <= 0 ||
			isInputError ||
			validator.operatorAddress ===
				props.delegation.delegation.validatorAddress
		) {
			return;
		}

		await submitRedelegateTx(
			amount,
			props.delegation.delegation.validatorAddress,
			validator.operatorAddress,
		);

		props.dispatch({ type: "modal", payload: undefined });
	}


	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="max-w-[520px] w-[520px] tracking-wide pb-5"
		>
			<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
				Redelegate
			</div>

			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div
					onClick={() => setIsDropdown(!isDropdown)}
					className="relative z-50 cursor-pointer bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2"
				>
					{/* fixme image */}
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
						value={validator.description.moniker}
					/>
					<Icons.chevronDown
						className={clsx("w-6 h-6", isDropdown && "rotate-180")}
					/>

					{isDropdown && (
						<div className="rounded-lg overflow-auto bg-black backdrop-blur-[20px] absolute right-0 bottom-[-4px] w-full translate-y-full max-h-80 z-20">
							{props.validators.map((v) => (
								<div
									onClick={() => {
										setIsDropdown(false);
										setValidator(v);
									}}
									className="bg-secondary-bg cursor-pointer h-12 flex items-center px-[10px] gap-3 hover:bg-card -text transition-all duration-300"
								>
									{/* fixme image */}
									{v.description?.website &&
									VALIDATOR_LOGOS[
										v.description?.website ?? ""
									] !== undefined ? (
										<img
											src={
												VALIDATOR_LOGOS[
													v.description?.website ?? ""
												]
											}
											className="w-6 h-6 object-contain"
											alt=""
										/>
									) : (
										<div className="bg-card w-6 h-6 rounded-full flex items-center justify-center">
											<div className="text-xs">
												{v.description.moniker
													.slice(0, 1)
													.toUpperCase()}
											</div>
										</div>
									)}

									<div className="text-sm whitespace-nowrap">
										{v.description.moniker}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div
					className={clsx(
						"relative z-10 mt-8 bg-secondary-bg rounded-lg pl-5 pr-3 flex items-center justify-between gap-2",
						{ "border-negative border-[1px]": isInputError },
					)}
				>
					<Icons.logoPink />

					<input
						className={clsx(
							"block w-full h-[60px] bg-transparent outline-none foces:outline-none",
						)}
						id="address"
						onChange={(e) =>
							setAmountValue(numRestrict(e.target.value))
						}
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
						You can redelegate not more than{" "}
						{bigintToFixed(maxAmount, { decimals: 18 })} WARD
					</div>
				)}

				<div className="mt-8 text-sm bg-secondary-bg rounded-lg p-4 flex items-center gap-2">
					<Icons.info />
					The validators will be switched after the unbonding period
					is 21 days
				</div>
			</form>

			<button
				onClick={submitTransaction}
				className={clsx(
					"rounded-lg mt-12 bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-300",
					(!amountValue || isInputError) &&
						"opacity-30 pointer-events-none",
				)}
			>
				Redelegate
			</button>
		</div>
	);
}
