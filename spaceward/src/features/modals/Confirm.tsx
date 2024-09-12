import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmParams, ModalParams } from "./types";
import { useModalState } from "./state";
import clsx from "clsx";

export default function ConfirmModal({ hidden, ...rest }: ModalParams<ConfirmParams>) {
	const { setData: setModal } = useModalState();
	const [loading, setLoading] = useState(false);

	return (
		<div className={clsx("max-w-[520px] w-[520px] pb-5", { hidden })}>
			<div className="flex flex-col gap-12">
				{rest.content}

				<div className="flex flex-col gap-2">
					<Button
						disabled={loading}
						onClick={async () => {
							setLoading(true);

							try {
								await rest.onConfirm?.();

								setModal({
									type: undefined,
									params: undefined,
								});
							} catch (e) {
								console.error(e);
							}

							setLoading(false);
						}}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
					>
						{loading ? "Loading..." : "OK"}
					</Button>

					<Button
						disabled={loading}
						onClick={async () => {
							setLoading(true);

							try {
								await rest.onCancel?.();

								setModal({
									type: undefined,
									params: undefined,
								});
							} catch (e) {
								console.error(e);
							}

							setLoading(false);
						}}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-fill-quaternary text-display font-semibold shrink-0 "
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}
