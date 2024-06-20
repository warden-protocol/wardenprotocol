import clsx from "clsx";
import Portal from "@/components/ui/portal";
import { useState } from "react";
import { Icons } from "@/components/ui/icons-assets";

const AssetTransactionModal = ({
	onHide,
	onHideAll,
	type,
}: {
	onHide: () => void;
	onHideAll: () => void;
	type: string;
}) => {
	const [amount, setAmount] = useState("");
	const [destinationNetwork, setDestinationNetwork] = useState("");
	const [destinationAddress, setDestinationAddress] = useState("");

	const [depositAsset, setDepositAsset] = useState("ETH");
	const [depositNetwork, setDepositNetwork] = useState("ETH");

	const [assetDropdown, setAssetDropdown] = useState(false);
	const [destinationDropdown, setDestinationDropdown] = useState(false);
	const [depositAssetDropdown, setdepositAssetDropdown] = useState(false);
	const [depositNetworkDropdown, setDepositNetworkDropdown] = useState(false);

	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/goback.svg" alt="" />
				</button>
				<button
					onClick={onHideAll}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

			</div>
		</Portal>
	);
};

export default AssetTransactionModal;
