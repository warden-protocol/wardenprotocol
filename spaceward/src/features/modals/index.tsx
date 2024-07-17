import { ModalState, useModalContext } from "@/context/modalContext";
import SelectKeyModal from "./SelectKeys";
import { SelectAssetParams, SelectKeyParams, TransferParams } from "./types";
import ReceiveAssetsModal from "./ReceiveAssets";
import SelectAssetModal from "./SelectAsset";
import SendAssetsModal from "./SendAssets";
import WalletConnectModal from "./WalletConnect";

export default function ModalRoot(props: ModalState) {
	const { dispatch } = useModalContext();

	if (!props.type) {
		return null;
	}

	return (
		<div className=" absolute left-0 top-0 w-full h-full flex items-center justify-center min-h-[600px] isolate">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] -z-10"></div>
			<button
				onClick={() => dispatch({ type: "type", payload: undefined })}
				className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
			>
				<img src="/images/button-close.svg" alt="" />
			</button>

			{props.type === "walletconnect" ? (
				<WalletConnectModal />
			) : !props.params ? (
				<>params not set</>
			) : props.type === "select-key" ? (
				<SelectKeyModal {...(props.params as SelectKeyParams)} />
			) : props.type === "receive" ? (
				<ReceiveAssetsModal {...(props.params as TransferParams)} />
			) : props.type === "send" ? (
				<SendAssetsModal {...(props.params as TransferParams)} />
			) : props.type === "select-asset" ? (
				<SelectAssetModal {...(props.params as SelectAssetParams)} />
			) : (
				<>not implemented</>
			)}
		</div>
	);
}
