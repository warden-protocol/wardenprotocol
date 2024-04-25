import AddressUnit from "@/components/AddressUnit";
import { Expression } from "@/types/shield";
import { shieldStringify } from "@/utils/shield";
import clsx from "clsx";
import { ReactNode, useMemo, useState } from "react";

interface Result {
	code: string;
	isUpdated: boolean;
}

export default function AdvancedMode({
	children,
	expression,
	addresses: _addresses,
	toggleChangeAddresses,
}: {
	children?: (v: Result) => ReactNode;
	expression: Expression;
	addresses?: string[];
	toggleChangeAddresses: (
		addresses: string[],
		visible: boolean,
		onChange?: (addresses: string[]) => void,
	) => void;
}) {
	const _code = useMemo(() => shieldStringify(expression), [expression]);
	const [code, setCode] = useState(_code);
	const [addresses, setAddresses] = useState(_addresses ?? []);
	const isUpdated = code !== _code;

	function onCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setCode(value);
	}

	return (
		<div>
			<div className="mt-8 flex items-center gap-[8px] flex-wrap">
				{addresses?.map((user, i) => {
					return (
						<AddressUnit
							address={user}
							key={`${user}:${i}`}
							onRemove={() => {
								setAddresses([
									...addresses.filter((u) => u !== user),
								]);
							}}
						/>
					);
				})}
				<button
					onClick={() => {
						toggleChangeAddresses(addresses, true, setAddresses);
					}}
					className={clsx(
						`text-sm flex w-fit items-center gap-[10px] h-12`,
					)}
				>
					<img src="/images/plus.svg" alt="" />
					Add approver
				</button>
			</div>
			<form
				action=""
				className={clsx(
					`mt-12 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] border-white px-4 h-[60px]`,
				)}
			>
				<div className="w-full">
					<label
						className="text-[rgba(229,238,255,0.60)] text-xs"
						htmlFor="address"
					>
						f(x)
					</label>
					<input
						className="block w-full bg-transparent outline-none foces:outline-none"
						id="code"
						onChange={onCodeChange}
						value={code}
					/>
				</div>
			</form>

			{children?.({ code, isUpdated })}
		</div>
	);
}
