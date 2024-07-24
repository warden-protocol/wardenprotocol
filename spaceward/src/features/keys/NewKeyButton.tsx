import { PlusIcon } from "lucide-react";
import { useModalState } from "../modals/state";
import clsx from "clsx";

export default function NewKeyButton({ className }: { className?: string }) {
	const { setData: setModal } = useModalState();

	return (
		<div
			className={clsx(
				"flex items-center text-muted-foreground text-sm rounded-sm bg-fill-quaternary p-2 mr-4 cursor-pointer",
				className,
			)}
			onClick={setModal.bind(null, {
				type: "create-key",
				params: {},
			})}
		>
			<PlusIcon className="h-4 w-4 mr-2" />
			New key
		</div>
	);
}
