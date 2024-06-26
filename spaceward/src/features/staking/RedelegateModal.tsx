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
		bigintToFixed(maxAmount, { decimals: 6 }),
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

	const VALIDATOR_LOGOS: Record<string, string | undefined> = {
		"https://oumlaut.net": "https://oumlaut.net/oumlaut.png",
		"https://www.frens.army":
			"https://assets-global.website-files.com/646756fb1c34ab5602aa30f5/646b3f8aa8104a6ae9bfaf4e_footer-logo.svg",
		"https://github.com/frankfris":
			"https://avatars.githubusercontent.com/u/92796260?v=4",
		"https://x.com/wisnubagol1":
			"https://pbs.twimg.com/profile_images/1656119792825421824/XuhyXcU-_400x400.jpg",
		"https://twitter.com/dinntanshu73189":
			"https://pbs.twimg.com/profile_images/1743550930283569152/TLHa6lCi_400x400.jpg",
		"https://services.takeshi.team/":
			"https://services.takeshi.team/~gitbook/image?url=https%3A%2F%2F83374241-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FqlDFZrRDIxbPE9DnYipn%252Ficon%252FSMqdu0125zjTRReTKPoV%252FTAKESHI_LOGO.jpg%3Falt%3Dmedia%26token%3D8b6623dc-27b1-4a76-812d-645e17196efc&width=32&dpr=2&quality=100&sign=1f522cdb&sv=1",
		"https://x.com/YuvarajSatya":
			"https://pbs.twimg.com/profile_images/1720163004036399104/gFSUT3WY_400x400.jpg",
		"https://x.com/ysrcilgin":
			"https://pbs.twimg.com/profile_images/1137058879886516226/l8x-ZqvP_400x400.jpg",
		"https://vinnodes.com":
			"https://bafybeibh7xgr6ce3acofodxtgpady6crpdyu7i4pqdjwe7gqjlbd3tqn3u.ipfs.w3s.link/photo_2023-02-12_12-36-55.jpg",
		"https://x.com/KriptoNgapak":
			"https://pbs.twimg.com/profile_images/1728775537911644160/ff7v9_yu_400x400.jpg",
	};

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
					<Icons.logoWhite />

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
						{bigintToFixed(maxAmount, { decimals: 6 })} WARD
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
