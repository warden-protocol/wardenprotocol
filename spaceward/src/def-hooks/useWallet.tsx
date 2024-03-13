import { useClient } from "../hooks/useClient";
import { useDispatchWalletContext } from "../def-hooks/walletContext";
import { useWalletClient } from "@cosmos-kit/react";

export default function () {
	const client = useClient();
	const walletStore = useDispatchWalletContext();
	const walletClient = useWalletClient();

	const connectToWallet = async (
		onSuccessCb: () => void,
		onErrorCb: () => void
	) => {
		try {
			walletStore.connectWallet();
			onSuccessCb();
		} catch (e) {
			console.error(e);
			onErrorCb();
		}
	};

	const signOut = () => {
		walletStore.signOut();
	};

	// const isLeapAvailable = !!window.leap;

	const getOfflineSigner = (chainId: string) =>
		walletClient.client?.getOfflineSigner(chainId);

	// const getLeapAccParams = async (chainId: string) =>
	// 	await window.leap.getKey(chainId);

	const listenToAccChange = (cb: EventListener) => {
		client.on("signer-changed", cb);
	};

	return {
		connectToWallet,
		signOut,
		// isLeapAvailable,
		getOfflineSigner,
		// getLeapAccParams,
		listenToAccChange,
	};
}
