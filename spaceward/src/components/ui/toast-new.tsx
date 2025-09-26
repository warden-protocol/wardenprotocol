import Portal from "@/components/ui/portal";
import { Icons } from "./icons-assets";
import clsx from "clsx";

const CONTENT = {
	icon: <Icons.txRefresh />,
	message: "Transaction confirmation in progress",
};

const NewToast = () => {
	const isSuccess = false;
	const isFailed = false;

	return (
		<Portal domId="toast">
			<div className="absolute top-3 right-[84px] p-4 flex items-center gap-4 backdrop-blur-[20px] bg-fill-elevated rounded-xl max-w-[360px] min-w-[360px] border-[1px] border-solid border-border-edge">
				<div
					className={clsx(
						"w-10 h-10 shrink-0 rounded flex items-center justify-center",
						isSuccess
							? "bg-positive-secondary"
							: isFailed
								? "bg-negative-secondary"
								: "bg-fill-quaternary",
					)}
				>
					{isSuccess ? (
						<Icons.txSuccess />
					) : isFailed ? (
						<Icons.alert />
					) : (
						CONTENT.icon
					)}
				</div>

				<div>
					{isSuccess
						? "Transaction completed"
						: isFailed
							? "Transaction failed"
							: CONTENT.message}
				</div>
			</div>
		</Portal>
	);
};

export default NewToast;
