import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { Copy } from "@/components/ui/copy";
import { TransferParams } from "./types";
import { useContext } from "react";
import { ModalContext } from "@/context/modalContext";

export default function ReceiveAssetsModal(props: TransferParams) {
	const { dispatch } = useContext(ModalContext);

	return (
		<Dialog
			open
			onOpenChange={(v) => {
				if (!v) {
					dispatch({ type: "type", payload: undefined });
				}
			}}
		>
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
								value={props?.address ?? ""}
								viewBox={`0 0 512 512`}
							/>
						</div>
					</div>
					<div className="flex items-center space-x-2 text-center place-content-center">
						<Copy value={props?.address} />
						<Copy variant={"icon"} value={props?.address} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
