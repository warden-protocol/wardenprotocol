import { isLocalSnap } from "@/lib/metamask";
import { Button } from "../../components/ui/button";
import { env } from "@/env";
import { useMetaMaskRequestSnap } from "@/hooks/useMetaMaskRequestSnap";

interface InstallMetamaskProps {
	isReady: boolean;
	isReconnect: boolean;
}

export function InstallMetaMaskSnapButton({ isReady, isReconnect }: InstallMetamaskProps) {
	const requestSnap = useMetaMaskRequestSnap();

	return (
		<Button
			size="sm"
			variant="outline"
			onClick={() => {
				if (isReady) {
					return requestSnap();
				}

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
			}}
			className="!mt-0 flex gap-2 g-10 items-center bg-fill-primary rounded font-semibold font-sans text-label-invert focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0"
		>
			<img
				src="/logos/metamask.svg"
				className="object-fill w-6 h-6 aspect-square"
			/>
			{isReconnect ? "Update snap" : "Install snap"}
		</Button>
	);
}
