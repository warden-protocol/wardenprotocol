import { useMemo, useState } from "react";
import clsx from "clsx";
import { ModalType } from "./types";
import { LoaderCircle, XIcon } from "lucide-react";
import AddressAvatar from "@/components/AddressAvatar";
import { useQuery } from "@tanstack/react-query";
import { isValidBech32, isValidEth } from "@/utils/validate";
import { queryEthAddress } from "./util/query";

type AddressType = "bech32" | "eth";

const VALIDATORS: Record<AddressType, (address: string) => boolean> = {
	bech32: isValidBech32,
	eth: isValidEth,
};

interface ValidateResult {
	ok: boolean;
	type?: AddressType;
	value?: string;
}

export const validateAddress = (
	address: string,
	types: AddressType[],
): ValidateResult => {
	for (const type of types) {
		if (VALIDATORS[type](address)) {
			return { ok: true, type, value: address };
		}
	}

	return { ok: false };
};

const AddAddressModal = ({
	onPrevModal,
	onDone,
	type,
}: {
	onPrevModal: () => void;
	onDone?: (address: string) => void;
	type: Exclude<ModalType, "hidden">;
}) => {
	const [addPersonValue, setAddPersonValue] = useState<string>("");
	const validation = useMemo(
		() =>
			validateAddress(
				addPersonValue,
				type === "person" ? ["eth"] : ["eth", "bech32"],
			),
		[addPersonValue],
	);

	const enabled = validation.ok && validation.type === "eth";

	const info = useQuery({
		enabled,
		...queryEthAddress(validation.value! as `0x${string}`),
	});

	function pasteFromClipboard(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (!navigator?.clipboard) {
			console.error("Clipboard API not available");
			return;
		}

		navigator.clipboard
			.readText()
			.then((text) => {
				setAddPersonValue(text);
			})
			.catch((err) => {
				console.error("Failed to read clipboard contents: ", err);
			});
	}

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="text-5xl mb-6 leading-[56px] font-bold">
				Add {type === "person" ? "an approver" : "a whitelist address"}
			</div>

			<div>Enter an address</div>

			<form
				action=""
				className={clsx(
					`rounded-lg mt-12 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] px-4 h-[60px]`,
					!validation.ok && addPersonValue
						? "border-[#E54545]"
						: "border-white",
				)}
				onSubmit={(e) => e.preventDefault()}
			>
				{info.data?.ok ? (
					<AddressAvatar
						seed={addPersonValue}
						logo={info.data.logo!}
						customTooltip={info.data.name}
					/>
				) : null}
				<div className="w-full">
					<label
						className="text-label-secondary text-xs"
						htmlFor="address"
					>
						Address
					</label>
					<input
						className="rounded-lg block w-full bg-transparent outline-none foces:outline-none"
						id="address"
						onChange={(e) => setAddPersonValue(e.target.value)}
						value={addPersonValue}
					/>
				</div>
				{!validation.ok ? (
					<button
						className="font-medium text-label-secondary px-2 hover:text-white transition-all duration-200"
						onClick={pasteFromClipboard}
					>
						Paste
					</button>
				) : (
					<XIcon
						className="cursor-pointer"
						onClick={() => setAddPersonValue("")}
					/>
				)}
			</form>

			{!validation.ok && addPersonValue ? (
				<div className="text-[#E54545] text-xs text-left mt-2">
					Enter correct address
				</div>
			) : type === "whitelist" && !info.data?.known && addPersonValue ? (
				<div className="text-xs text-left mt-2">
					This address is unidentified and can’t be verified for risk.
				</div>
			) : (
				<div className="text-xs text-left mt-2">&nbsp;</div>
			)}

			<div className="mt-12 pt-6">
				<button
					onClick={() => {
						if (
							validation.ok &&
							// fixme
							(enabled ? !info.isLoading : true)
						) {
							onDone?.(addPersonValue);
							setTimeout(() => onPrevModal());
						}
					}}
					disabled={
						!validation.ok ||
						// fixme
						(enabled ? info.isLoading : false)
					}
					className={clsx(
						`rounded-lg bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
						!addPersonValue ||
							!validation.ok ||
							// fixme
							(enabled ? info.isLoading : false)
							? `opacity-30 pointer-events-none`
							: undefined,
					)}
				>
					{validation.ok &&
					validation.type === "eth" &&
					info.isLoading ? (
						<LoaderCircle className="animate-spin mr-2" />
					) : (
						<div className="w-[24px] h-[24px] mr-2" />
					)}
					Add {type === "person" ? "Approver" : "Whitelist Address"}
					<div className="w-[24px] h-[24px] mr-2" />
				</button>
			</div>
		</div>
	);
};

export default AddAddressModal;
