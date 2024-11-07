import { useBalance, useWalletClient, useWriteContract } from "wagmi"
import { Button } from "@/components/ui/button";
import FaucetButton from "@/components/FaucetButton";
import { Icons } from "@/components/ui/icons";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { env } from "@/env";
import { assertChain, handleContractWrite } from "@/utils/contract";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import { useState } from "react";
import clsx from "clsx";

export function NoSpaces() {
	const [isLoading, setIsLoading] = useState(false);
	const [{ wallet }] = useConnectWallet();
	const { writeContractAsync } = useWriteContract();
	const [{ chains, connectedChain }, setChain] = useSetChain();
	const client = useWalletClient();

	const balance = useBalance({
		address: wallet?.accounts?.[0]?.address,
		chainId: env.evmChainId
	})

	return (
		<div className="relative w-full min-h-[calc(100vh-20px)] dark:bg-transparent  rounded-xl -mt-[48px] flex flex-col gap-4 items-center place-content-center text-center no-space">
			<Icons.corner className="absolute top-0 left-0" />
			<Icons.corner className="absolute top-0 right-0 rotate-90" />
			<Icons.corner className="absolute bottom-0 right-0 rotate-180" />
			<Icons.corner className="absolute bottom-0 left-0 -rotate-90" />
			{balance.data?.value && balance.data.value > BigInt(0) ? (
				<>
					<h1 className="text-5xl font-bold tracking-[0.24px] leading-[120%]">
						Create your first space
					</h1>
					<p className="mb-8">
						A space functions as a management hub for a collection
						of keys, assets and rules.
					</p>
					<Button
						className={clsx(
							"bg-fill-accent-primary hover:bg-fill-accent-hover h-[56px] px-8 rounded-xl font-semibold text-label-on-light", {
							"opacity-50": isLoading,
						})}

						onClick={async () => {
							if (isLoading) {
								return;
							}

							setIsLoading(true);
							await assertChain(chains, connectedChain, setChain);

							try {
								const res = await handleContractWrite(() => writeContractAsync({
									address: PRECOMPILE_WARDEN_ADDRESS,
									abi: wardenPrecompileAbi,
									functionName: "newSpace",
									chainId: env.evmChainId,
									args: [
										BigInt(0),
										BigInt(0),
										BigInt(0),
										BigInt(0),
										[],
									],
								}), client.data);

								console.log("res", res);
							} catch (e) {
								console.log("error", e);
							}

							setIsLoading(false);
						}}
					>
						Create Space
					</Button>
				</>
			) : (
				<>
					<h1 className="text-5xl font-bold tracking-[0.24px] leading-[120%]">
						Get WARD Token
					</h1>
					<p className="mb-8">
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
