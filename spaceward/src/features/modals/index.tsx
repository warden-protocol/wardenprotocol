import { ModalState, useModalContext } from "@/context/modalContext";
import SelectKeyModal from "./SelectKeys";
import { SelectKeyParams, TransferParams } from "./types";
import ReceiveAssetsModal from "./ReceiveAssets";
import SendAssetsModal from "./SendAssets";
import SelectAssetModal from "./SelectAsset";

export default function ModalRoot(props: ModalState) {
	const { dispatch } = useModalContext();

	if (!props.type) {
		return null;
	}

	return (
		<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
			<button
				onClick={() => dispatch({ type: "type", payload: undefined })}
				className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
			>
				<img src="/images/button-close.svg" alt="" />
			</button>

			{!props.params ? (
				<>params not set</>
			) : props.type === "select-key" ? (
				<SelectKeyModal {...(props.params as SelectKeyParams)} />
			) : props.type === "receive" ? (
				<ReceiveAssetsModal {...(props.params as TransferParams)} />
			) : props.type === "send" ? (
				<SendAssetsModal {...(props.params as TransferParams)} />
			) : props.type === "select-asset" ? (
				<SelectAssetModal />
			) : (
				<>not implemented</>
			)}
		</div>
	);
}
