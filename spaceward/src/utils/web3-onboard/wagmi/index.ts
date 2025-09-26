import type {
	Config,
	ConnectReturnType,
	Connector,
	CreateConnectorFn,
} from "@wagmi/core";
import type { WagmiInitOptions, WagmiModuleAPI } from "./types";
import { createConfig, createConnector, getConnectors } from "@wagmi/core";
import { createWagmiChains, createWalletId } from "./utils";
import { connect as wagmiConnect } from "@wagmi/core";
import { validateWagmiInit } from "./validation";
import EventEmitter from "eventemitter3";
import {
	type Chain as ViemChain,
	type Transport,
	toHex,
	fromHex,
	RpcError,
	UserRejectedRequestError,
	ResourceUnavailableRpcError,
} from "viem";
import {
	ProviderRpcErrorCode,
	type Chain,
	type EIP1193Provider,
} from "@web3-onboard/common";
export * from "@wagmi/core";

export type {
	Config,
	ConnectReturnType,
	Connector,
	CreateConnectorFn,
	WagmiInitOptions,
	WagmiModuleAPI,
};

const wagmiConnectorFn: Record<string, CreateConnectorFn> = {};
const transports: Record<ViemChain["id"], Transport> = {};
let chainsList: Chain[] | undefined;
let wagmiConfig: Config | undefined;
let providerMethods: WagmiInitOptions | undefined;

function wagmiInit(initOptions: WagmiInitOptions): WagmiModuleAPI {
	if (initOptions) {
		const error = validateWagmiInit(initOptions);

		if (error) {
			throw error;
		}
	}
	providerMethods = initOptions;

	return {
		buildWagmiConfig,
		createWagmiConnector,
		connectWalletToWagmi,
		wagmiConnect,
		wagmiDisconnectWallet,
		getWagmiConnector,
	};
}

async function buildWagmiConfig(
	chains?: Chain[],
	wallet?: {
		label: string;
		provider: EIP1193Provider;
	},
): Promise<Config | undefined> {
	if (wallet && (!wallet.provider || !wallet.label)) {
		throw new Error(
			"Provider and wallet label are required to initialize WAGMI with a new connector",
		);
	}
	chainsList = chains ?? chainsList;
	try {
		if (wallet) {
			const { label, provider } = wallet;
			const latestWallet = await createWagmiConnector(label, provider);
			if (latestWallet) {
				wagmiConnectorFn[createWalletId(label)] = latestWallet;
			} else {
				console.error(
					`Failed to initialize Web3-Onboard WAGMI instance because of error from creating wallet connector - Label: ${label}`,
				);
				return undefined;
			}
		}

		const connectors: CreateConnectorFn[] = [
			...Object.values(wagmiConnectorFn),
		];
		const viemChains = await createWagmiChains(
			chainsList || [],
			transports,
		);

		wagmiConfig = createConfig({
			chains: [...viemChains],
			transports,
			multiInjectedProviderDiscovery: false,
			connectors,
		});
		return wagmiConfig;
	} catch (e) {
		console.error(
			`Failed to initialize Web3-Onboard WAGMI instance - Error: ${e}`,
		);
		return undefined;
	}
}

async function createWagmiConnector(
	label: string,
	provider: EIP1193Provider,
): Promise<CreateConnectorFn | undefined> {
	try {
		if (!providerMethods) {
			throw new Error("WAGMI config not initialized");
		}
		return createConnector(() =>
			convertW3OToWagmiWallet(label, provider, providerMethods!),
		);
	} catch (e) {
		console.error("Error creating wagmi connector", e);
		return undefined;
	}
}

async function connectWalletToWagmi(
	label: string,
	provider: EIP1193Provider,
): Promise<ConnectReturnType<Config> | undefined> {
	try {
		if (!wagmiConfig || !providerMethods) {
			throw new Error(
				"WAGMI connectWalletToWagmi could not be completed",
			);
		}
		return await wagmiConnect(wagmiConfig, {
			connector: convertW3OToWagmiWallet(
				label,
				provider,
				providerMethods,
			),
		});
	} catch (e) {
		console.error("Error connecting wallet to wagmi", e);
		return undefined;
	}
}

async function wagmiDisconnectWallet(
	label: string,
): Promise<Config | undefined> {
	try {
		delete wagmiConnectorFn[createWalletId(label)];
		wagmiConfig = await buildWagmiConfig();
		return wagmiConfig;
	} catch (e) {
		console.error("error disconnecting wallet from wagmi", e);
	}
}

function getWagmiConnector(label: string): Connector | undefined {
	try {
		if (!wagmiConfig) {
			throw new Error("WAGMI config not initialized");
		}
		const wagmiConnectors = getConnectors(wagmiConfig);
		if (!wagmiConnectors?.length) return undefined;
		return wagmiConnectors.find((connector) => connector.name === label);
	} catch (e) {
		console.error("error disconnecting wallet from wagmi", e);
	}
}

const convertW3OToWagmiWallet = (
	label: string,
	provider: EIP1193Provider,
	coreProviderMethods: WagmiInitOptions,
): Connector => {
	if (!coreProviderMethods || typeof coreProviderMethods === undefined) {
		console.error(
			"Required provider methods not defined for Wagmi Module API",
		);
		return {} as Connector;
	} else {
		return {
			name: label,
			id: createWalletId(label),
			connect: ({ chainId }: { chainId: number }) => {
				try {
					return Promise.resolve(
						coreProviderMethods
							.requestAccounts(provider)
							.then((accounts: string[]) => {
								const acc = accounts as `0x${string}`[];
								if (chainId) {
									return {
										chainId,
										accounts: acc,
									};
								}

								return coreProviderMethods
									.getChainId(provider)
									.then((id: string) => {
										return {
											chainId: fromHex(
												id as `0x${string}`,
												"number",
											),
											accounts: acc,
										};
									});
							}),
					);
				} catch (err) {
					const error = err as RpcError;
					if (error.code === UserRejectedRequestError.code)
						throw new UserRejectedRequestError(error);
					if (error.code === ResourceUnavailableRpcError.code)
						throw new ResourceUnavailableRpcError(error);
					throw error;
				}
			},
			disconnect: () => {
				wagmiDisconnectWallet(label);
				coreProviderMethods.disconnect({ label });
			},
			getAccounts: () =>
				coreProviderMethods
					.requestAccounts(provider)
					.then((acc: string[]) => {
						return acc;
					}),
			getChainId: () =>
				coreProviderMethods
					.getChainId(provider)
					.then((chainId: string) => {
						return fromHex(chainId as `0x${string}`, "number");
					}),
			getProvider: () => Promise.resolve(provider),
			isAuthorized: () =>
				coreProviderMethods
					.requestAccounts(provider)
					.then((accounts: string[]) => {
						return !!accounts.length;
					}),
			switchChain: ({ chainId }: { chainId: number }) => {
				const hexChainId = toHex(chainId);
				try {
					coreProviderMethods
						.switchChain(provider, hexChainId)
						.then(() => {
							return chainId;
						});
				} catch (error) {
					const { code } = error as { code: number };
					if (
						code === ProviderRpcErrorCode.CHAIN_NOT_ADDED ||
						code === ProviderRpcErrorCode.UNRECOGNIZED_CHAIN_ID
					) {
						if (!chainsList)
							throw new Error("Chains list not defined");
						// chain has not been added to wallet
						const targetChain = chainsList.find(
							({ id }) => id === hexChainId,
						);
						if (!targetChain)
							throw new Error("Chain not found in chains list");
						coreProviderMethods.updateChain(targetChain);

						// add chain to wallet
						coreProviderMethods
							.addOrSwitchChain(provider, targetChain)
							.then(
								// @ts-expect-error
								(id: string) => {
									return fromHex(
										id as `0x${string}`,
										"number",
									);
								},
							);
					}
				}
			},

			onAccountsChanged: (accounts: string[]) => {
				// Disconnect if there are no accounts
				if (accounts.length === 0)
					coreProviderMethods.disconnect({ label });
			},
			onChainChanged: (chainId: number) => {
				coreProviderMethods.switchChain(provider, toHex(chainId));
			},
			onDisconnect: () => {
				wagmiDisconnectWallet(label);
				coreProviderMethods.disconnect({ label });
			},
			emitter: new EventEmitter(),
		} as unknown as Connector;
	}
};

export default wagmiInit;
