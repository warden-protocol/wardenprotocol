import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "@/components/AddressAvatar";
import { useAddressContext } from "@/hooks/useAddressContext";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { useSpaceId } from "@/hooks/useSpaceId";
import { monitorTx } from "@/hooks/keplr";
import { useClient } from "@/hooks/useClient";
import { useToast } from "@/components/ui/use-toast";
import cn from "clsx";
import { Plus } from "lucide-react";
import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import {
	MsgNewKeyRequestResponse,
	MsgNewSpaceResponse,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";
import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
// import { MsgNewSpace } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";

interface SpacesQueryResult {
	pageParam: number;
	pagination?:
		| { next_key?: string | undefined; total?: string | undefined }
		| undefined;
	spaces?:
		| {
				id?: string | undefined;
				creator?: string | undefined;
				owners?: string[] | undefined;
				admin_intent_id?: string | undefined;
				sign_intent_id?: string | undefined;
		  }[]
		| undefined;
}
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleCreateSpace(
	address: string,
	client: any,
	sendMsgNewSpace: any,
	toast: any,
) {
	try {
		const res = await monitorTx(
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

		if (!res) {
			throw new Error("failed to broadcast tx");
		}

		if (res.tx_response?.code !== 0 || !res.tx_response.data) {
			throw new Error(`tx failed: ${JSON.stringify(res)}`);
		}

		// // parse tx msg response
		// const bytes = Uint8Array.from(
		// 	res.tx_response.data
		// 		.match(/.{1,2}/g)
		// 		?.map((byte) => parseInt(byte, 16)) || [],
		// );
		// const msgData = TxMsgData.decode(bytes);
		// const actionCreated = MsgActionCreated.decode(
		// 	msgData.msgResponses[0].value,
		// );
		// const actionId = actionCreated.action?.id;

		// console.log(actionCreated);

		// // wait for action to be completed
		// // setState(KeyRequesterState.AWAITING_APPROVALS);
		// let spaceRequestId = null;
		// while (true) {
		// 	const res = await client.WardenIntent.query.queryActionById({
		// 		id: `${actionId}`,
		// 	});
		// 	if (
		// 		res.data.action?.status !== "ACTION_STATUS_PENDING" &&
		// 		res.data.action?.status !== "ACTION_STATUS_COMPLETED"
		// 	) {
		// 		throw new Error(
		// 			`action failed: ${JSON.stringify(res.data.action)}`,
		// 		);
		// 	}

		// 	spaceRequestId = (
		// 		res.data.action?.result as MsgNewSpaceResponse | null
		// 	)?.id;

		// 	if (spaceRequestId) {
		// 		break;
		// 	}

		// 	await sleep(1000);
		// }
	} catch (error) {
		console.error(error);
	}
}

export function SpaceSelector() {
	const { address } = useAddressContext();
	const { spaceId, setSpaceId } = useSpaceId();

	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSpace = client.WardenWardenV1Beta2.tx.sendMsgNewSpace;

	const { QuerySpacesByOwner } = useWardenWardenV1Beta2();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{ enabled: !!address },
		100,
	);
	const count =
		((spacesQuery as any)?.pages[0] as SpacesQueryResult | undefined)
			?.spaces?.length || 0;

	return count && count > 0 ? (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					asChild
					variant="outline"
					role="combobox"
					className="justify-between cursor-pointer w-full rounded-lg bg-background h-16 px-2 gap-1 min-w-0 hover:text-foreground hover:bg-background border-0"
				>
					{spaceId ? (
						<div>
							<div className="relative">
								<AddressAvatar seed={spaceId} disableTooltip />
							</div>
							<div className="md:flex flex-col text-left text-xs hidden px-1">
								<span className="block text-xs text-muted-foreground">
									Active Space
								</span>
								<span className="block text-sm">
									{"Space #" + spaceId}
								</span>
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden md:block" />
						</div>
					) : (
						<div>
							<span className="block text-xs text-muted-foreground">
								No Active Space
							</span>
						</div>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				side="right"
				sideOffset={20}
				className="w-80 bg-card border-0 p-6 mt-2 rounded-lg max-h-[calc(100vh-16px)] overflow-y-auto no-scrollbar"
			>
				<div className="grid gap-4">
					{count && count > 0 ? (
						<div className="flex flex-col gap-4 w-full">
							{(
								(spacesQuery as any)?.pages[0] as
									| SpacesQueryResult
									| undefined
							)?.spaces?.map((space) => (
								<div
									key={space.id}
									onClick={() => setSpaceId(space.id || null)}
									className="flex flex-row items-center space-x-4 cursor-pointer"
								>
									<div
										className={cn(
											"ring-foreground rounded-full hover:ring-2 w-12 h-12 flex items-center justify-center",
											spaceId === space.id
												? "ring-2 "
												: "",
										)}
									>
										<AddressAvatar
											seed={space.id || ""}
											disableTooltip
										/>
									</div>
									<div className="text-sm text-muted-foreground">
										{"Space #" + space.id}
									</div>
								</div>
							))}
						</div>
					) : null}
					<div>
						<button
							className="flex flex-row items-center justify-center"
							onClick={() =>
								handleCreateSpace(
									address,
									client,
									sendMsgNewSpace,
									toast,
								)
							}
						>
							<div className="ring-foreground rounded-full hover:ring-2 w-12 h-12 flex items-center justify-center">
								<div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
									<Plus className="h-6 w-6 text-background" />
								</div>
							</div>
							<span className="ml-4 text-muted-foreground text-sm">
								Create New Space
							</span>
						</button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	) : null;
}
