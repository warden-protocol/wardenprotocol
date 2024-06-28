import { env } from "@/env";
import { useAddressContext } from "@/hooks/useAddressContext";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

function FaucetButton() {
	const { address } = useAddressContext();
	const u = new URL(env.faucetURL);
	u.searchParams.set("addr", address);

	return (
		<Button
			className="w-full h-12 gap-2"
			size={"sm"}
			asChild
		>
			<a href={u.toString()} target="_blank">
				<PlusCircleIcon strokeWidth={1} className="h-6 w-6" />
				Get WARD
			</a>
		</Button>
	);
}

export default FaucetButton;
