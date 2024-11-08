import clsx from "clsx";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { useConnectWallet } from "@web3-onboard/react";

function FaucetButton({ className }: { className?: string }) {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;
	const u = new URL(env.faucetURL);

	if (address) {
		u.searchParams.set("addr", address);
	}

	return (
		<Button
			className={clsx("bg-fill-accent-primary hover:bg-fill-accent-hover h-[56px] px-8 font-semibold rounded-lg", className)}
			size={"sm"}
			asChild
		>
			<a
				href={u.toString()}
				target="_blank"
				className="!text-label-on-light "
			>
				Get&nbsp;WARD
			</a>
		</Button>
	);
}

export default FaucetButton;
