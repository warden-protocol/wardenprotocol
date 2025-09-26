import { GetSnapsResponse } from "@/lib/metamask";
import useMetaMaskContext from "./useMetaMaskContext";
import { useMetaMaskRequest } from "./useMetaMaskRequest";
import { useEffect, useState } from "react";
import { env } from "@/env";

/**
 * A Hook to retrieve useful data from MetaMask.
 * @returns The informations.
 */
export const useMetaMask = () => {
    const { provider, setInstalledSnap, installedSnap } = useMetaMaskContext();
    const request = useMetaMaskRequest();

    const [isFlask, setIsFlask] = useState(false);

    const snapsDetected = provider !== null;

    /**
     * Detect if the version of MetaMask is Flask.
     */
    const detectFlask = async () => {
        const clientVersion = await request({
            method: "web3_clientVersion",
        });

        const isFlaskDetected = (clientVersion as string[])?.includes("flask");

        setIsFlask(isFlaskDetected);
    };

    /**
     * Get the Snap informations from MetaMask.
     */
    const getSnap = async () => {
        const snaps = (await request({
            method: "wallet_getSnaps",
        })) as GetSnapsResponse;

        setInstalledSnap(snaps[env.snapOrigin] ?? null);
    };

    useEffect(() => {
        const detect = async () => {
            if (provider) {
                await detectFlask();
                await getSnap();
            }
        };

        detect().catch(console.error);
    }, [provider]);

    return { isFlask, snapsDetected, installedSnap, getSnap };
};
