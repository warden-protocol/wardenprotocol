import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "@/components/AddressAvatar";
import { useSpaceId } from "@/hooks/useSpaceId";
import cn from "clsx";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { usePublicClient, useWriteContract } from "wagmi";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { assertChain, handleContractWrite } from "@/utils/contract";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import { useSpacesByOwner } from "@/hooks/query/warden";
import { useQueryClient } from "@tanstack/react-query";

export function SpaceSelector() {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;
	const { spaceId, setSpaceId } = useSpaceId();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { writeContractAsync } = useWriteContract();
	const [{ chains, connectedChain }, setChain] = useSetChain();
	const client = usePublicClient();
	const queryClient = useQueryClient();

	async function sendMsgNewSpace() {
		await assertChain(chains, connectedChain, setChain);

		try {
			await handleContractWrite(
				() => writeContractAsync({
					address: PRECOMPILE_WARDEN_ADDRESS,
					abi: wardenPrecompileAbi,
					functionName: "newSpace",
					args: [BigInt(0), BigInt(0), BigInt(0), BigInt(0), []],
					account: address,
					connector: wallet?.wagmiConnector,
				}),
				client,
			);

			queryClient.invalidateQueries({ queryKey: spacesQuery.queryKey });
		} catch (e) {
			console.error("error", e);
		}
	}

	const spacesQuery = useSpacesByOwner({
		request: {
			owner: address,
		}
	});

	const count = spacesQuery.data?.[0].length ?? 0;

	const currentSpaceIncluded = useMemo(
		() =>
			spacesQuery.data?.[0].some(
				(space) => space.id.toString() === spaceId,
			),
		[spaceId, spacesQuery.data],
	);

	const nextSpace = spacesQuery.data?.[0][0]?.id;
	const ready = spacesQuery.status === "success";

	useEffect(() => {
		if (!currentSpaceIncluded && nextSpace && ready) {
			setSpaceId(nextSpace.toString());
		}
	}, [currentSpaceIncluded, nextSpace, ready, setSpaceId]);

	return count && count > 0 ? (
		<Popover>
			<PopoverTrigger asChild>
				<div className="mb-5 text-white">
					<Button
						asChild
						variant="outline"
						role="combobox"
						className="relative rounded-lg cursor-pointer w-full bg-background h-[60px] px-4 gap-1 min-w-0 hover:text-foreground hover:bg-background border-0"
					>
						{spaceId ? (
							<div>
								<div className="absolute -z-0 -top-8 -left-4 -right-4 h-[220px] blur-[20px] mask-space fix-avatar -translate-y-1/2">
									<AddressAvatar
										seed={spaceId}
										disableTooltip
										className=" w-[512px] h-[512px] object-center"
									/>
								</div>

								<div className="absolute rounded-lg fix-avatar overflow-hidden z-0 top-0 left-0 w-full h-full">
									<AddressAvatar
										seed={spaceId}
										disableTooltip
										className=" w-[250px] h-[250px] -translate-y-[10px]"
									/>
									<div className="absolute top-0 left-0 w-full h-full bg-[#302730] opacity-30 dark:bg-[#000] dark:opacity-40"></div>
								</div>
								<div className="flex relative z-10 flex-col mr-auto text-left">
									<span className="block text-xs">
										Active Space
									</span>
									<span className="block font-semibold">
										{"#" + spaceId}
									</span>
								</div>
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</div>
						) : (
							<div>
								<span className="block text-xs">
									No Active Space
								</span>
							</div>
						)}
					</Button>
				</div>
			</PopoverTrigger>

			<PopoverContent
				side={isDesktop ? "left" : "bottom"}
				sideOffset={20}
				className="w-80 bg-card border-0 p-6 mt-2 scroll-visible rounded-lg max-h-[calc(100vh-16px)] overflow-y-auto"
			>
				<div className=" max-h-[324px] scroll-visible">
					{count && count > 0 ? (
						<div className="flex flex-col gap-4 w-full">
							{spacesQuery.data?.[0].map((space) => (
								<div
									key={space.id.toString()}
									onClick={() =>
										setSpaceId(space.id.toString())
									}
									className="flex flex-row items-center space-x-4 cursor-pointer"
								>
									<div
										className={cn(
											"ring-foreground rounded-full hover:ring-2 w-12 h-12 flex items-center justify-center",
											spaceId === space.id.toString()
												? "ring-2 "
												: "",
										)}
									>
										<AddressAvatar
											seed={space.id.toString()}
											disableTooltip
										/>
									</div>
									<div className="text-sm text-muted-foreground">
										{"Space #" + space.id.toString()}
									</div>
								</div>
							))}
						</div>
					) : null}
					<div>
						<button
							className="flex flex-row items-center justify-center mt-4 pb-2 outline-none"
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
