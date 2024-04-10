import { useClient } from "./useClient";
import { useDispatchWalletContext } from "../context/walletContext";

export default function () {
    const client = useClient();
    const walletStore = useDispatchWalletContext();

    const connectToCosmostation = async (
        onSuccessCb: () => void,
        onErrorCb: () => void
    ) => {
        try {
            walletStore.connectWithCosmostation();
            onSuccessCb();
        } catch (e) {
            console.error(e);
            onErrorCb();
        }
    };

    const signOut = () => {
        walletStore.signOut();
    };

    const isCosmostationAvailable = !!window.cosmostation;

    const getOfflineSigner = (chainId: string) =>
        window.cosmostation.getOfflineSigner(chainId);

    const getCosmostationAccParams = async (chainId: string) =>
        await window.cosmostation.getKey(chainId);

    const listenToAccChange = (cb: EventListener) => {
        client.on("signer-changed", cb);
    };

    return {
        connectToCosmostation,
        signOut,
        isCosmostationAvailable,
        getOfflineSigner,
        getCosmostationAccParams,
        listenToAccChange,
    };
}
