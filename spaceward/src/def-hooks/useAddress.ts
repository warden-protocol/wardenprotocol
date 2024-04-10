import { useState } from "react";
import { useClient } from "../hooks/useClient";

export const useAddress = () => {
	const client = useClient();
	const [address, setAddress] = useState({
		address: "",
		shortAddress: "",
	});
	const getAddress = async () => {
		if (client.signer) {
			const accounts = await client.signer.getAccounts();
			const rawAddress = accounts[0].address;
			return {
				address: rawAddress,
				shortAddress:
					rawAddress.substring(0, 10) + "..." + rawAddress.slice(-4),
			};
		} else {
			return {
				address: "",
				shortAddress: "",
			};
		}
	};
	client.on("signer-changed", async () => {
		const newAddress = await getAddress();
		setAddress((oldAddress) => {
			return oldAddress.address != newAddress.address
				? newAddress
				: oldAddress;
		});
	});
	window.addEventListener("keplr_keystorechange", async () => {
		const newAddress = await getAddress();
		setAddress((oldAddress) => {
			return oldAddress.address != newAddress.address
				? newAddress
				: oldAddress;
		});
	});

	(async () => {
		const newAddress = await getAddress();
		if (address.address != newAddress.address) {
			setAddress((oldAddress) => {
				return oldAddress.address != newAddress.address
					? newAddress
					: oldAddress;
			});
		}
	})();

	return address;
};
