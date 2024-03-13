import { EIP6963AnnounceProviderEvent, MetaMaskInpageProvider } from "@metamask/providers";

export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
	permissionName: string;
	id: string;
	version: string;
	initialPermissions: Record<string, unknown>;
};

/**
 * Check if the current provider supports snaps by calling `wallet_getSnaps`.
 *
 * @param provider - The provider to use to check for snaps support. Defaults to
 * `window.ethereum`.
 * @returns True if the provider supports snaps, false otherwise.
 */
export async function hasSnapsSupport(
	provider: MetaMaskInpageProvider = window.ethereum,
) {
	try {
		await provider.request({
			method: 'wallet_getSnaps',
		});

		return true;
	} catch {
		return false;
	}
}

/**
 * Get a MetaMask provider using EIP6963. This will return the first provider
 * reporting as MetaMask. If no provider is found after 500ms, this will
 * return null instead.
 *
 * @returns A MetaMask provider if found, otherwise null.
 */
export async function getMetaMaskEIP6963Provider() {
	return new Promise<MetaMaskInpageProvider | null>((rawResolve) => {
		// Timeout looking for providers after 500ms
		const timeout = setTimeout(() => {
			resolve(null);
		}, 500);

		/**
		 * Resolve the promise with a MetaMask provider and clean up.
		 *
		 * @param provider - A MetaMask provider if found, otherwise null.
		 */
		function resolve(provider: MetaMaskInpageProvider | null) {
			window.removeEventListener(
				'eip6963:announceProvider',
				onAnnounceProvider,
			);
			clearTimeout(timeout);
			rawResolve(provider);
		}

		/**
		 * Listener for the EIP6963 announceProvider event.
		 *
		 * Resolves the promise if a MetaMask provider is found.
		 *
		 * @param event - The EIP6963 announceProvider event.
		 * @param event.detail - The details of the EIP6963 announceProvider event.
		 */
		function onAnnounceProvider({ detail }: EIP6963AnnounceProviderEvent) {
			const { info, provider } = detail;

			if (info.rdns.includes('io.metamask')) {
				resolve(provider);
			}
		}

		window.addEventListener('eip6963:announceProvider', onAnnounceProvider);

		window.dispatchEvent(new Event('eip6963:requestProvider'));
	});
}

/**
 * Get a provider that supports snaps. This will loop through all the detected
 * providers and return the first one that supports snaps.
 *
 * @returns The provider, or `null` if no provider supports snaps.
 */
export async function getSnapsProvider() {
	if (typeof window === 'undefined') {
		return null;
	}

	if (await hasSnapsSupport()) {
		return window.ethereum;
	}

	if (window.ethereum?.detected) {
		for (const provider of window.ethereum.detected) {
			if (await hasSnapsSupport(provider)) {
				return provider;
			}
		}
	}

	if (window.ethereum?.providers) {
		for (const provider of window.ethereum.providers) {
			if (await hasSnapsSupport(provider)) {
				return provider;
			}
		}
	}

	const eip6963Provider = await getMetaMaskEIP6963Provider();

	if (eip6963Provider && (await hasSnapsSupport(eip6963Provider))) {
		return eip6963Provider;
	}

	return null;
}

/**
 * Check if a snap ID is a local snap ID.
 *
 * @param snapId - The snap ID.
 * @returns True if it's a local Snap, or false otherwise.
 */
export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

export const shouldDisplayReconnectButton = (installedSnap: Snap | null) =>
	installedSnap && isLocalSnap(installedSnap?.id);
