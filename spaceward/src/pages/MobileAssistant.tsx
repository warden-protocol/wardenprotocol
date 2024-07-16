import { Icons } from "@/components/ui/icons";
import MobileReader from "@/features/walletconnect/MobileReader";
import ReaderAssistant from "@/features/walletconnect/ReaderAssistant";
import { useState } from "react";

const MobileAssistant = ({
	base64MultiAddress,
	topic,
}: {
	base64MultiAddress: string;
	topic: string;
}) => {
	const [isReader, setIsReader] = useState(false);

	return (
		<div>
			{isReader ? (
				<div className="w-full h-svh flex flex-col gap-2 items-center place-content-center px-8">
					<Icons.logo className="h-12 w-auto mt-10" />

					<MobileReader
						hideQRScaner={() => setIsReader(false)}
						base64MultiAddress={base64MultiAddress}
						topic={topic}
					/>
				</div>
			) : (
				<ReaderAssistant
					showQR={() => {
						setIsReader(true);
					}}
				/>
			)}
		</div>
	);
};

export default MobileAssistant;
