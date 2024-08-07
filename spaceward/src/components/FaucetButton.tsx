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
			className="bg-fill-primary h-[56px] px-8 font-semibold rounded-lg"
			size={"sm"}
			asChild
		>
			<a href={u.toString()} target="_blank">
				{/* <PlusCircleIcon strokeWidth={1} className="h-6 w-6" /> */}
				Get WARD
			</a>
		</Button>
	);
}

export default FaucetButton;
