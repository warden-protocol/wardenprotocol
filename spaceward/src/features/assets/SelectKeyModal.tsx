import Portal from "@/components/ui/portal";

const SelectKeyModal = ({
	onHide,
	showTransactionModal,
}: {
	onHide: () => void;
	showTransactionModal: (type: string) => void;
}) => {
	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						Select the key
					</div>
					<div>Which key you want to send the assets from</div>

					<div className="mt-12 text-left">
						<div
							onClick={() => {
								showTransactionModal("deposit");
							}}
							className="tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full">
								<img src="/images/somewallet.png" alt="" />
							</div>
							<div>Key #1,234</div>
							<div className="ml-auto">...xsd1</div>
						</div>
						<div
							onClick={() => {
								showTransactionModal("deposit");
							}}
							className="border-t-[1px] border-secondary-bg tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full">
								<img src="/images/somewallet.png" alt="" />
							</div>
							<div>Key #1,234</div>
							<div className="ml-auto">...xsd1</div>
						</div>
						<div
							onClick={() => {
								showTransactionModal("send");
							}}
							className="border-t-[1px] border-secondary-bg tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full">
								<img src="/images/somewallet.png" alt="" />
							</div>
							<div>Key #1,234</div>
							<div className="ml-auto">...xsd1</div>
						</div>

						<div
							onClick={() => {
								showTransactionModal("send");
							}}
							className="border-t-[1px] border-secondary-bg tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full">
								<img src="/images/somewallet.png" alt="" />
							</div>
							<div>Key #1,234</div>
							<div className="ml-auto">...xsd1</div>
						</div>
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default SelectKeyModal;
