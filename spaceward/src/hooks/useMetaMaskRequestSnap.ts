import { env } from "@/env";
import { useMetaMaskRequest } from "./useMetaMaskRequest";
import { Snap } from "@/lib/metamask";
import useMetaMaskContext from "./useMetaMaskContext";

/**
 * Utility hook to wrap the `wallet_requestSnaps` method.
 *
 * @param snapId - The requested Snap ID. Defaults to the snap ID specified in the
 * config.
 * @param version - The requested version.
 * @returns The `wallet_requestSnaps` wrapper.
 */
export const useMetaMaskRequestSnap = (
	snapId = env.snapOrigin,
	version = env.snapVersion,
) => {
	const request = useMetaMaskRequest();
	const { setInstalledSnap } = useMetaMaskContext();

	/**
	 * Request the Snap.
	 */
	const requestSnap = async () => {
		const snaps = (await request({
			method: "wallet_requestSnaps",
			params: {
				[snapId]: { version },
			},
		})) as Record<string, Snap>;

		// Updates the `installedSnap` context variable since we just installed the Snap.
		setInstalledSnap(snaps[snapId] ?? null);
	};

	return requestSnap;
};
