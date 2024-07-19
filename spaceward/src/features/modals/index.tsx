import SelectKeyModal from "./SelectKeys";
import { SelectAssetParams, SelectKeyParams, TransferParams } from "./types";
import ReceiveAssetsModal from "./ReceiveAssets";
import SelectAssetModal from "./SelectAsset";
import SendAssetsModal from "./SendAssets";
import WalletConnectModal from "./WalletConnect";
import { useModalState } from "./state";

export default function ModalRoot() {
	const { data, setData } = useModalState();

	if (!data?.type) {
		return null;
	}

	return (
		<div className=" absolute left-0 top-0 w-full h-full flex items-center justify-center min-h-[600px] isolate">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] -z-10"></div>
			<button
				onClick={() => setData({ type: undefined, params: undefined })}
				className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
			>
				<img src="/images/button-close.svg" alt="" />
			</button>

			{data.type === "walletconnect" ? (
				<WalletConnectModal />
			) : !data.params ? (
				<>params not set</>
			) : data.type === "select-key" ? (
				<SelectKeyModal {...(data.params as SelectKeyParams)} />
			) : data.type === "receive" ? (
				<ReceiveAssetsModal {...(data.params as TransferParams)} />
			) : data.type === "send" ? (
				<SendAssetsModal {...(data.params as TransferParams)} />
			) : data.type === "select-asset" ? (
				<SelectAssetModal {...(data.params as SelectAssetParams)} />
			) : (
				<>not implemented</>
			)}
		</div>
	);
}
