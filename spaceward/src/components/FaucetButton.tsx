import { useState } from "react";
import { env } from "@/env";
import { useAddressContext } from "@/hooks/useAddressContext";
import { Button } from "@/components/ui/button";
import Plausible from "plausible-tracker";

async function getFaucetTokens(addr: string) {
	await fetch(env.faucetURL, {
		method: "POST",
		body: JSON.stringify({ address: addr }),
	});
}

function FaucetButton() {
	const [loading, setLoading] = useState(false);
	const { address } = useAddressContext();

	const { trackEvent } = Plausible();

	const getTokens = async () => {
		setLoading(true);
		await getFaucetTokens(address);
		setLoading(false);
	};

	return (
		<Button
			disabled={loading}
			onClick={() => {
				getTokens(),
					trackEvent("Get WARD", {
						callback: () => console.log("Plausible event"),
						props: {
							variation: "button A",
						},
					});
			}}
			className="w-full h-12"
			size={"sm"}
		>
			Get WARD
		</Button>
	);
}

export default FaucetButton;
