import Portal from "@/components/ui/portal";

const SignTranactionModal = ({ onHide }: { onHide: () => void }) => {
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
						Sign transaction
					</div>
					<div>Open the browser extension if it didn't.</div>
				</div>
			</div>
		</Portal>
	);
};

export default SignTranactionModal;
