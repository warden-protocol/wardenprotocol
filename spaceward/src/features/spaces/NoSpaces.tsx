import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { useAsset } from "@/hooks/useAsset";
import FaucetButton from "@/components/FaucetButton";

export function NoSpaces() {
	const { address } = useAddressContext();
	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWardenV1Beta2.tx.sendMsgNewSpace;
	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;
	return (
		<div className="w-full min-h-[calc(100vh-96px)] flex flex-col gap-4 items-center place-content-center text-center">
			{ward > 0 ? (
				<>
					<h1 className="text-6xl font-display">
						Create your first space
					</h1>
					<p className="">
						A space functions as a management hub for a collection
						of keys, assets and intents.
					</p>
					<Button
						onClick={() => {
							monitorTx(
								sendMsgNewSpace({
									value: {
										creator: address,
										signIntentId: 0,
										adminIntentId: 0,
										additionalOwners: [],
									},
								}),
								toast,
							);
						}}
					>
						Create a new space
					</Button>
				</>
			) : (
				<>
					<h1 className="text-6xl font-display">Get WARD Token</h1>
					<p className="">
						To use SpaceWard you need some WARD tokens. You can get
						using the faucet below.
					</p>
					<div>
						<FaucetButton />
					</div>
				</>
			)}
		</div>
	);
}
