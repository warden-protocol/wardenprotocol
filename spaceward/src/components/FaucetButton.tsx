import { useState } from "react";
import { env } from "@/env";
import { useAddressContext } from "@/hooks/useAddressContext";
import { Button } from "@/components/ui/button";
import Plausible from "plausible-tracker";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

async function getFaucetTokens(addr: string) {
	const res = await fetch(env.faucetURL, {
		method: "POST",
		body: JSON.stringify({ address: addr }),
	});
	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}
}

function FaucetButton() {
	const [loading, setLoading] = useState(false);
	const { address } = useAddressContext();
	const { toast } = useToast();

	const { trackEvent } = Plausible();

	const getTokens = async () => {
		setLoading(true);
		const { id, update } = toast({
			title: "Requesting tokens",
			duration: 5000,
		});
		try {
			await getFaucetTokens(address);
			update({
				id,
				title: "Tokens requested",
				description:
					"Please wait a few seconds for the tokens to arrive.",
				duration: 5000,
			});
		} catch (err) {
			update({
				id,
				title: "Error getting tokens",
				description:
					"If you already requested tokens recently, please wait a few hours before trying again.",
				duration: 5000,
			});
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
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
			className="w-full h-12 gap-2"
			size={"sm"}
		>
			{loading ? (
				<>
					<RefreshCwIcon
						strokeWidth={1}
						className="h-6 w-6 animate-spin"
					/>
					Please wait
				</>
			) : (
				<>
					<PlusCircleIcon strokeWidth={1} className="h-6 w-6" />
					Get WARD
				</>
			)}
		</Button>
	);
}

export default FaucetButton;
