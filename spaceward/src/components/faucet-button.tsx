import { useState } from "react";
import { useAddressContext } from "@/def-hooks/addressContext";
import { Button } from "@/components/ui/button";

const FAUCET_URL = import.meta.env.VITE_FAUCET_URL || "/api/faucet";

async function getFaucetTokens(addr: string) {
	await fetch(FAUCET_URL, {
		method: "POST",
		body: JSON.stringify({ address: addr }),
	});
}

function FaucetButton() {
	const [loading, setLoading] = useState(false);
	const { address } = useAddressContext();

	console.log("FaucetButton", address);

	const getTokens = async () => {
		setLoading(true);
		await getFaucetTokens(address);
		setLoading(false);
	};

	return (
		<Button
			disabled={loading}
			onClick={() => getTokens()}
			className="w-full"
		>
			GET WARD
		</Button>
	);
}

export default FaucetButton;
