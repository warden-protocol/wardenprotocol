import { useCallback, useContext } from "react";
import { ModalContext } from "@/context/modalContext";
import type { SelectKeyParams } from "./types";
import { SelectAddressRow } from "../assets/SelectAddressRow";

type UnwrapArray<T> = T extends (infer U)[] ? U : never;

export default function SelectKeyModal({ addresses, next }: SelectKeyParams) {
	const { dispatch } = useContext(ModalContext);

	const onClick = useCallback(
		(item?: UnwrapArray<Required<SelectKeyParams>["addresses"]>) => {
			if (!next || !item) {
				return;
			}

			dispatch({
				type: "set",
				payload: {
					type: next,
					params: item,
				},
			});
		},
		[next, dispatch],
	);

	if (!addresses) {
		return null;
	}

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-6 leading-[56px]">
				Select the key
			</div>
			{next === "send" ? (
				<div>Which you want to send the assets from</div>
			) : next === "receive" ? (
				<div>Which you want to receive the assets to</div>
			) : null}

			<div className="mt-12 text-left">
				{addresses.map((item, key) => (
					<SelectAddressRow
						asset={item}
						onClick={onClick}
						key={key}
					/>
				))}
			</div>
		</div>
	);
}
