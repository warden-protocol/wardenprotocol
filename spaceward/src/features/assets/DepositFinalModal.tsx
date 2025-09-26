import Portal from "@/components/ui/portal";

const DepositFinalModal = ({ onHide }: { onHide: () => void }) => {
	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						Deposit ETH
					</div>
					<div>
						Deposit funds by scanning the QR code or copying the
						address
					</div>

					<div className="my-12 flex justify-center items-center">
						<img
							src="/images/qr.png"
							className="w-[218px] h-[218px] object-contain"
							alt=""
						/>
					</div>

					<button className="rounded-[32px] gap-2 w-fit h-12 px-5 cursor-pointer bg-secondary-bg flex justify-between items-center mx-auto">
						0x0c1C1dC8960aA65247033C6f7360E014F02a72Ab
						<img
							src="/images/copy.png"
							className="w-6 h-6 object-contain"
							alt=""
						/>
					</button>
				</div>
			</div>
		</Portal>
	);
};

export default DepositFinalModal;
