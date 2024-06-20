import { ModalContext, type ModalState } from "@/context/modalContext";
import { useContext } from "react";
import SelectKeyModal from "./SelectKeys";
import { SelectKeyParams, TransferParams } from "./types";
import ReceiveAssetsModal from "./ReceiveAssets";
import SendAssetsModal from "./SendAssets";

export default function ModalRoot(props: ModalState) {
	const { dispatch } = useContext(ModalContext);

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
			) : (
				<>not implemented</>
			)}
		</div>
	);
}
