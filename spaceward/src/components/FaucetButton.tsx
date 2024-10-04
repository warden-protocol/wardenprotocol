import clsx from "clsx";
import { env } from "@/env";
import { useAddressContext } from "@/hooks/useAddressContext";
import { Button } from "@/components/ui/button";

function FaucetButton({ className }: { className?: string }) {
	const { address } = useAddressContext();
	const u = new URL(env.faucetURL);
	u.searchParams.set("addr", address);

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
