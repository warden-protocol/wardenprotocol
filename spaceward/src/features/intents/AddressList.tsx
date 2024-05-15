import AddressUnit from "@/components/AddressUnit";
import { Icons } from "@/components/ui/icons";
import { isValidEth } from "@/utils/validate";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { queryEthAddress } from "./util/query";

interface AddressListProps {
	addresses: string[];
	onAdd: () => void;
	onChange: (addresses: string[]) => void;
	warning?: boolean;
	text?: string;
}

const AddressWithAvatar = ({
	address,
	onRemove,
}: {
	address: string;
	onRemove: () => void;
}) => {
	const info = useQuery({
		enabled: isValidEth(address),
		...queryEthAddress(address as `0x${string}`),
	});

	return (
		<AddressUnit
			address={address}
			onRemove={onRemove}
			logo={info.data?.logo}
			tooltip={info.data?.name}
		/>
	);
};

export default function AddressList({
	addresses,
	onAdd,
	onChange,
	warning,
	text,
}: AddressListProps) {
	return (
		<div className="mt-8 flex items-center gap-[8px] flex-wrap">
			{addresses?.map((user, i) => {
				return (
					<AddressWithAvatar
						address={user}
						key={`${user}:${i}`}
						onRemove={() =>
							onChange([...addresses.filter((u) => u !== user)])
						}
					/>
				);
			})}
			<button
				onClick={onAdd}
				className={clsx(
					"text-sm flex w-fit items-center gap-[10px] h-12",
					warning ? "text-[#E54545]" : "text-[#FFAEEE]",
				)}
			>
				{warning ? <Icons.alertTriangle /> : <Icons.plus />}
				{text ?? "Add approver"}
			</button>
		</div>
	);
}
