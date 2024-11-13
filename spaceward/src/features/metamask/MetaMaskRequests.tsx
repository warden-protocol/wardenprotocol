import { useEffect, useMemo, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InstallMetaMaskSnapButton } from "@/features/metamask";
import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import { useMetaMask } from "@/hooks/useMetaMask";
import { isLocalSnap, shouldDisplayReconnectButton } from "@/lib/metamask";
import { querySnapRequests } from "./queries";
import KeySelector from "../modals/KeySelector";
import { toast } from "@/components/ui/use-toast";
import { useModalState } from "../modals/state";
import { KeyModel } from "@/hooks/query/types";
import { AddressType } from "@/hooks/query/warden";

export function MetaMaskRequests() {
	const { setData: setModal, data: modal } = useModalState();
	const { isFlask, snapsDetected, installedSnap } = useMetaMask();
	const [currentKey, setCurrentKey] = useState<KeyModel>();

	const isMetaMaskReady = isLocalSnap(env.snapOrigin)
		? isFlask
		: snapsDetected;

	const isReconnect = Boolean(shouldDisplayReconnectButton(installedSnap));

	const keyringSnapClient = useMemo(() => new KeyringSnapRpcClient(
		env.snapOrigin,
		window.ethereum,
	), []);

	const requestsQ = useQuery(
		querySnapRequests(keyringSnapClient, !!installedSnap)
	);

	const reqCount = requestsQ.data?.length;
	const prevRC = useRef(reqCount);

	if (
		reqCount &&
		!prevRC.current &&
		modal?.type !== "approve-snap"
	) {
		setModal({ type: "approve-snap", params: {} });
	}

	const [open, setOpen] = useState(false);

	useEffect(() => {
		prevRC.current = reqCount;
	}, [reqCount]);

	return (
		<Popover.Root
			modal={true}
			open={open}
			onOpenChange={() => {
				if (!reqCount) {
					setOpen(!open)
				} else {
					setModal({ type: "approve-snap", params: {} })
				}
			}}
		>
			<Popover.Trigger asChild>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Update dimensions"
					className={cn(
						"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
						{ "animate-pulse": reqCount }
					)}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-3 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<img
							src="/logos/metamask.svg"
							className="object-fill w-10 h-10 aspect-square"
						/>
					</div>
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					side="left"
					sideOffset={8}
					className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
				>
					<div
						className="inset-0  absolute"
						onClick={() => setOpen(false)}
					></div>
					<div className="p-3 md:p-6 pt-0 flex flex-col border-[1px] border-border-edge w-[340px] max-w-full bg-card fixed top-[96px]  rounded-xl right-0">
						{!isMetaMaskReady ? <>
							<p className="text-xl font-sans pb-2 font-bold">
								Install Metamask Snap
							</p>
							<p className="text-label-secondary mb-6">
								To open access for SpaceWard to dApps
							</p>
						</> : <>
							<p className="text-xl font-sans pb-2 font-bold">
								Select key
							</p>
							<p className="text-label-secondary mb-6">
								To add account in Metamask Snap
							</p>

							<KeySelector
								onKeyChange={k => {
									setCurrentKey(k);
								}}
								className="mb-2 relative select-none"
								dropdownClassName="bottom-2"
								currentKey={currentKey}
							/>

							<Button
								className="my-4 flex gap-2 g-10 items-center bg-fill-primary rounded font-semibold font-sans text-label-invert focus-visible:!ring-0 focus-visible:!ring-offset-0 !ring-0 border-0 outline-0"
								size="sm"
								variant="outline"
								onClick={async () => {
									if (currentKey) {
										const address = currentKey.addresses.find(a => a.addressType === AddressType.Ethereum)?.addressValue;

										const { update, id } = toast({
											title: "Confirm account creation in MetaMask...",
											duration: 0,
										});

										try {
											if (!address) {
												throw new Error("No Ethereum address found");
											}

											await keyringSnapClient.createAccount({
												origin: window.location.origin,
												keyId: currentKey.key.id.toString(),
												address
											});

											update({
												id,
												title: "Added to MetaMask",
												duration: 5000,
											});
										} catch (error) {
											console.error("error adding account to MetaMask", error);
											update({
												id,
												title: "Error",
												description: (error as Error)?.message ?? "An error occurred while adding to MetaMask",
												duration: 5000,
											});
										}
									}
								}}
							>
								Select key
							</Button>
						</>}

						<InstallMetaMaskSnapButton isReady={isMetaMaskReady} isReconnect={isReconnect} />
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root >
	);
}
