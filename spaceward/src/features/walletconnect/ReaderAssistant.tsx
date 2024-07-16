import { Icons } from "@/components/ui/icons-assets";
import clsx from "clsx";

const ReaderAssistant = ({
	enabled,
	showQR,
}: {
	enabled: boolean;
	showQR: () => void;
}) => {
	return (
		<div className="pt-[96px] px-6 pb-6 relative flex flex-col min-h-[100vh]">
			<Icons.logoShorten className="absolute top-3 left-4" />
			<div>
				<div className="text-[32px] mb-2 font-bold tracking-[0.16px]">
					How to connect dApp
				</div>
				<div className="text-muted-foreground mb-6">
					The instructions are shown using Osmosis dApp as an example.
				</div>

				<div className="flex items-center gap-3 py-1 mb-6">
					<div className="bg-fill-quaternary w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs">
						1
					</div>
					Visit the desktop dapp
				</div>

				<div className="rounded overflow-hidden mb-6">
					<img
						src="/images/ma1.jpg"
						alt=""
						className="w-full h-full object-cover object-center"
					/>
				</div>

				<div className="flex items-center gap-3 py-1 mb-6">
					<div className="bg-fill-quaternary w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs">
						2
					</div>
					Click "Connect Wallet" and choose Mobile Wallet, e.g. “Keplr
					Mobile”
				</div>

				<div className="rounded overflow-hidden mb-6">
					<img
						src="/images/ma2.jpg"
						alt=""
						className="w-full h-full object-cover object-center"
					/>
				</div>

				<div className="flex items-center gap-3 py-1 mb-9">
					<div className="bg-fill-quaternary w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs">
						3
					</div>
					Open the access to the camera on your mobile and scan QR
					code
				</div>
			</div>

			<button
				disabled={!enabled}
				onClick={showQR}
				className={clsx(
					"mt-auto w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-foreground text-background font-semibold shrink-0",
					{ "pointer-events-none bg-gray-500": !enabled },
				)}
			>
				Scan QR
			</button>
		</div>
	);
};

export default ReaderAssistant;
