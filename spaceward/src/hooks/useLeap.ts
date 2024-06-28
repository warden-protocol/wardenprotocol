import { useClient } from "./useClient";
import { useDispatchWalletContext } from "../context/walletContext";

export default function () {
    const client = useClient();
    const walletStore = useDispatchWalletContext();

    const connectToLeap = async (
        onSuccessCb: () => void,
        onErrorCb: () => void
    ) => {
        try {
            walletStore.connectWithLeap();
            onSuccessCb();
        } catch (e) {
            console.error(e);
            onErrorCb();
        }
    };

    const signOut = () => {
        walletStore.signOut();
    };

    const isLeapAvailable = !!window.leap;

    const getOfflineSigner = (chainId: string) =>
        window.leap.getOfflineSigner(chainId);

    const getLeapAccParams = async (chainId: string) =>
        await window.leap.getKey(chainId);

    const listenToAccChange = (cb: EventListener) => {
        client.on("signer-changed", cb);
    };

    return {
        connectToLeap,
        signOut,
        isLeapAvailable,
        getOfflineSigner,
        getLeapAccParams,
        listenToAccChange,
    };
}
