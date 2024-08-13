import { PlusIcon } from "lucide-react";
import { useModalState } from "../modals/state";
import clsx from "clsx";

export default function NewKeyButton({ className }: { className?: string }) {
	const { setData: setModal } = useModalState();

	return (
		<div
			className={clsx(
				"flex items-center bg-fill-primary px-5 h-10 justify-center cursor-pointer",
				className,
			)}
			onClick={setModal.bind(null, {
				type: "create-key",
				params: {},
			})}
		>
			Create Key
		</div>
	);
}
