import { isLocalSnap } from "@/lib/metamask";
import { Button } from "@/components/ui/button";
import { useMetaMask } from "@/hooks/useMetaMask";
import { env } from "@/env";
import { useMetaMaskRequestSnap } from "@/hooks/useMetaMaskRequestSnap";
import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import { toast } from "@/components/ui/use-toast";
import { PlusCircleIcon } from "lucide-react";

export function AddToMetaMaskButton({
	keyId,
	address,
}: {
	keyId: bigint;
	address: string;
}) {
	const { isFlask, snapsDetected, installedSnap } = useMetaMask();
	const requestSnap = useMetaMaskRequestSnap();
	const isMetaMaskReady = isLocalSnap(env.snapOrigin)
		? isFlask
		: snapsDetected;
	const keyringSnapClient = new KeyringSnapRpcClient(
		env.snapOrigin,
		window.ethereum,
	);

	const handleClick = async () => {
		if (!isMetaMaskReady) {
			console.log("MetaMask not installed, opening Chrome Web Store");
			if (isLocalSnap(env.snapOrigin)) {
				window.open(
					"https://chromewebstore.google.com/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk",
					"_blank",
				);
			} else {
				window.open(
					"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
					"_blank",
				);
			}
			return;
		}

		if (isMetaMaskReady && !installedSnap) {
			console.log("Snap not installed, requesting");
			await requestSnap();
			return;
		}

		const { update, id } = toast({
			title: "Confirm account creation in MetaMask...",
			duration: 0,
		});

		try {
			await keyringSnapClient.createAccount({
				origin: window.location.origin,
				keyId: keyId.toString(),
				address,
			});

			update({
				id,
				title: "Added to MetaMask",
				duration: 5000,
			});
		} catch (error) {
			console.error("error adding account to MetaMask", error);
			update({
				id,
				title: "Error",
				description: "An error occurred while adding to MetaMask",
				duration: 5000,
			});
		}
	};

	return (
		<Button
			size="sm"
			variant="ghost"
			className="hidden md:flex border-0 gap-2 border-foreground hover:bg-transparent hover:opacity-80"
			onClick={handleClick}
		>
			Add to MetaMask
			<PlusCircleIcon className="h-6 w-6" />
		</Button>
	);
}
