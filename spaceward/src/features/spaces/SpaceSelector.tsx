import Long from "long";
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
import { useTx } from "@/hooks/useClient";
import { useToast } from "@/components/ui/use-toast";
import cn from "clsx";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { warden } from "@wardenprotocol/wardenjs";

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

export function SpaceSelector() {
	const { address } = useAddressContext();
	const { spaceId, setSpaceId } = useSpaceId();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { tx } = useTx();

	async function sendMsgNewSpace() {
		const { newSpace } = warden.warden.v1beta2.MessageComposer.withTypeUrl;
		return await tx(
			[
				newSpace({
					creator: address,
					signIntentId: Long.fromNumber(0),
					adminIntentId: Long.fromNumber(0),
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
					additionalOwners: undefined,
				}),
			],
			{},
		);
	}

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
							<div className="flex flex-col text-left text-xs px-1">
								<span className="block text-xs text-muted-foreground">
									Active Space
								</span>
								<span className="block text-sm">
									{"Space #" + spaceId}
								</span>
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
				side={isDesktop ? "left" : "bottom"}
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
							onClick={() => sendMsgNewSpace()}
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
