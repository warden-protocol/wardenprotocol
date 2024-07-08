import { useDispatchWalletContext } from "../context/walletContext";
import { useWalletClient } from "@cosmos-kit/react";

export default function useWallet() {
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

    const getOfflineSigner = (chainId: string) => {
		if (!walletClient.client || !walletClient.client.getOfflineSigner) {
			return null;
		}
		return walletClient.client.getOfflineSigner(chainId);
	}

    const listenToAccChange = (cb: EventListener) => {
        if (walletClient.client && walletClient.client.on) {
            walletClient.client.on("signer-changed", cb);
        }
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
