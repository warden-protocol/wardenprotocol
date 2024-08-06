import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { useAsset } from "@/hooks/useAsset";
import FaucetButton from "@/components/FaucetButton";
import { Action } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";

export function UpdateSpaces({ actions }: { actions: Action[] }) {
	const { address } = useAddressContext();
	const { toast } = useToast();
	const client = useClient();
	const { msgApproveAction } = client.WardenIntent.tx;
	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;

	async function updateSpaces() {
		const defaultFee = {
			amount: [],
			gas: (200000 * actions.length).toString(),
		};

		const msgs = actions.map((action) =>
			msgApproveAction({
				value: {
					creator: address,
					actionType: action.msg?.["@type"]!,
					actionId: Number(action.id ?? 0),
				},
			}),
		);

		const tx = client.signAndBroadcast(msgs, defaultFee, "");
		monitorTx(tx, toast);
	}

	return (
		<div className="w-full min-h-[calc(100vh-20px)] rounded-xl border-2 border-accent -mt-[20px] flex flex-col gap-4 items-center place-content-center text-center no-space">
			{ward > 0 ? (
				<>
					<h1 className="text-6xl font-display">
						Approve {actions.length} Action
						{actions.length > 1 ? "s" : ""}
					</h1>
					<p className="max-w-[800px]">
						To continue using SpaceWard with our latest updates,
						please take a moment to approve some pending actions for
						each of your spaces. You can get started below
					</p>
					<Button onClick={updateSpaces}>Approve all</Button>
				</>
			) : (
				<>
					<h1 className="text-6xl font-display">Get WARD Token</h1>
					<p className="">
						To use SpaceWard you need some WARD tokens. You can get
						this using the faucet below.
					</p>
					<div>
						<FaucetButton />
					</div>
				</>
			)}
		</div>
	);
}
