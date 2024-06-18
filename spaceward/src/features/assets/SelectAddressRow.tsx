import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { Copy } from "@/components/ui/copy";
import AddressAvatar from "@/components/AddressAvatar";
import { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";

export function SelectAddressRow({
	asset,
	showTransactionModal,
}: {
	asset: AddressResponse;
	showTransactionModal?: (type: string) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					onClick={() => {
						if (showTransactionModal) {
							showTransactionModal("deposit");
						}
					}}
					className="tracking-normal flex items-center gap-3 h-[72px] px-4 cursor-pointer"
				>
					<AddressAvatar seed={asset?.address} />

					<div>
						{asset?.type == 1 ? "Ethereum Key" : "Osmosis Key"}
					</div>
					{/* <div className="ml-auto">...{asset?.address.slice(-4)}</div> */}
					<div className="ml-auto">
						{asset?.address.slice(0, 12)}...
						{asset?.address.slice(-12)}
					</div>
				</div>
			</DialogTrigger>
			{showTransactionModal ? (
				<div></div>
			) : (
				<DialogContent className="max-w-full md:max-w-xl flex flex-col">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Receive Assets
						</DialogTitle>
						<DialogDescription>
							Deposit funds by scanning the QR code or copying the
							address below.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-8">
						<div className="border p-2 rounded-lg max-w-56 mx-auto">
							<div
								style={{
									height: "auto",
									margin: "0 auto",
									width: "100%",
								}}
							>
								<QRCode
									size={512}
									style={{
										height: "auto",
										maxWidth: "100%",
										width: "100%",
									}}
									value={asset?.address}
									viewBox={`0 0 512 512`}
								/>
							</div>
						</div>
						<div className="flex items-center space-x-2 text-center place-content-center">
							<Copy value={asset?.address} />
							<Copy variant={"icon"} value={asset?.address} />
						</div>
					</div>
				</DialogContent>
			)}
		</Dialog>
	);
}
