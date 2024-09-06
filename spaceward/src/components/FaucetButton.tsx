import { env } from "@/env";
import { useAddressContext } from "@/hooks/useAddressContext";
import { Button } from "@/components/ui/button";

function FaucetButton() {
	const { address } = useAddressContext();
	const u = new URL(env.faucetURL);
	u.searchParams.set("addr", address);

	return (
		<Button
			className="bg-fill-accent-primary hover:bg-fill-accent-hover h-[56px] px-8 font-semibold rounded-lg"
			size={"sm"}
			asChild
		>
			<a
				href={u.toString()}
				target="_blank"
				className="!text-label-on-light "
			>
				Get WARD
			</a>
		</Button>
	);
}

export default FaucetButton;
