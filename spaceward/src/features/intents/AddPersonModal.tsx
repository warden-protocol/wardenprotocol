import { useMemo, useState } from "react";
import Portal from "@/components/ui/portal";
import clsx from "clsx";
import { fromBech32 } from "@cosmjs/encoding";

const AddPersonModal = ({
	onClose,
	onPrevModal,
	onDone,
}: {
	onClose: () => void;
	onPrevModal: () => void;
	onDone: (address: string) => void;
}) => {
	const [addPersonValue, setAddPersonValue] = useState<string>("");

	const isValid = useMemo(() => {
		try {
			return Boolean(fromBech32(addPersonValue));
		} catch {
			return false;
		}
	}, [addPersonValue]);

	return (
		<Portal domId="intent-modal">
			<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={() => {
						onPrevModal();
						onClose();
					}}
					className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/goback.svg" alt="" />
				</button>
				<button
					onClick={() => {
						onClose();
					}}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-display text-5xl mb-6 leading-[56px]">
						Add an approver
					</div>

					<div>Enter an address</div>

					<form
						action=""
						className={clsx(
							`mt-12 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] border-white px-4 h-[60px]`,
							!isValid &&
								addPersonValue &&
								`
						border-[#E54545] border-[1px]`,
						)}
					>
						<div className="w-full">
							<label
								className="text-[rgba(229,238,255,0.60)] text-xs"
								htmlFor="address"
							>
								Address
							</label>
							<input
								className="block w-full bg-transparent outline-none foces:outline-none"
								id="address"
								onChange={(e) =>
									setAddPersonValue(e.target.value)
								}
								value={addPersonValue}
							/>
						</div>
						<button className="font-medium text-[rgba(229,238,255,0.60)] px-2 hover:text-white transition-all duratioin-200">
							Paste
						</button>
					</form>

					{!isValid && addPersonValue && (
						<div className="text-[#E54545] text-xs text-left mt-1">
							Enter correct address
						</div>
					)}

					<div className="mt-12 pt-6">
						<button
							onClick={() => {
								// todo add validation
								onDone(addPersonValue);
								onPrevModal();
							}}
							className={clsx(
								`bg-[#FFF] h-14 flex items-center justify-center w-full font-semibold text-[#000] hover:bg-[#FFAEEE] transition-all duration-200`,
								!addPersonValue &&
									`opacity-[0.3] pointer-events-none`,
							)}
						>
							Add Approver
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default AddPersonModal;
