import { useModalState } from "../modals/state";
import clsx from "clsx";

export default function NewKeyButton({ className }: { className?: string }) {
	const { setData: setModal } = useModalState();

	return (
		<div
			className={clsx(
				"flex items-center text-label-invert rounded-lg h-[56px] bg-fill-primary py-4 px-8 mr-4 cursor-pointer",
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
