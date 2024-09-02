import { KNOWN_ADDRESSES, compareAddress, getProvider } from "@/lib/eth";

const { provider } = getProvider("mainnet");

const resolveEns = async (address: `0x${string}`) => {
	try {
		const ens = await provider.lookupAddress(address);

		if (!ens) {
			return null;
		}

		const resolver = await provider.getResolver(ens);

		if (!resolver) {
			return null;
		}

		const name = resolver.name;
		const logo = await resolver.getAvatar();

		return { name, logo };
	} catch {
		return null;
	}
};

interface EthAddressResult {
	known: boolean;
	ok: boolean;
	name?: string;
	logo?: string;
}
export const queryEthAddress = (address?: `0x${string}`) =>
	address
		? {
				queryKey: ["lookup-address", address],
				queryFn: async (): Promise<EthAddressResult> => {
					const knownAddress = KNOWN_ADDRESSES.find((v) =>
						compareAddress(address, v.address),
					);

					if (!knownAddress) {
						const data = await resolveEns(address);

						if (!data) {
							return {
								ok: false,
								known: false,
							};
						}

						return {
							ok: true,
							known: false,
							name: data.name,
							logo: data.logo!,
						};
					} else {
						const { logo, name } = knownAddress;

						return {
							ok: true,
							known: true,
							logo,
							name,
						};
					}
				},
			}
		: undefined;
