import { useClient } from "./useClient";
import { useDispatchWalletContext } from "../context/walletContext";

export default function () {
    const client = useClient();
    const walletStore = useDispatchWalletContext();

    const connectToKeplr = async (
        onSuccessCb: () => void,
        onErrorCb: () => void
    ) => {
        try {
            walletStore.connectWithKeplr();
            onSuccessCb();
        } catch (e) {
            console.error(e);
            onErrorCb();
        }
    };

    const signOut = () => {
        walletStore.signOut();
    };

    const isKeplrAvailable = !!window.keplr;

    const getOfflineSigner = (chainId: string) =>
        window.keplr.getOfflineSigner(chainId);

    const getKeplrAccParams = async (chainId: string) =>
        await window.keplr.getKey(chainId);

    const listenToAccChange = (cb: EventListener) => {
        client.on("signer-changed", cb);
    };

    return {
        connectToKeplr,
        signOut,
        isKeplrAvailable,
        getOfflineSigner,
        getKeplrAccParams,
        listenToAccChange,
    };
}
