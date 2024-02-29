import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, MoveDownLeft } from "lucide-react";
import QRCode from "react-qr-code";

export default function ReceiveAssetButton(address: string) {
	if (!address.address) {
		return <div>Address is undefined</div>;
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					className="font-sans text-sm font-normal border-2 hover:bg-foreground hover:text-background w-28 border-foreground gap-2"
				>
					<MoveDownLeft className="h-4 w-4" />
					Receive
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						Receive Assets
					</DialogTitle>
					<DialogDescription>
						Deposit funds by scanning the QR code or copying the
						address below. Only send Sepolia Ether to this address.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-8">
					<div>
						<Alert>
							{/* <AlertCircle className="h-4 w-4" /> */}
							<AlertTitle>WIP</AlertTitle>
							<AlertDescription>
								This page is a work in progress and is not
								functional yet.
							</AlertDescription>
						</Alert>
					</div>
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
								value={address.address}
								viewBox={`0 0 512 512`}
							/>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<span>{address.address}</span>
						<Copy className="h-4 w-4 cursor-pointer" />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
