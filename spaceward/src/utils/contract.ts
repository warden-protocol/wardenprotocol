import { toast, ToasterToast } from "@/components/ui/use-toast";
import { useSetChain } from "@web3-onboard/react";
import type { PublicClient } from "viem";
import type { useWriteContract } from "wagmi";

type WriteContractData = Awaited<
	ReturnType<ReturnType<typeof useWriteContract>["writeContractAsync"]>
>;

enum TxStatus {
	Failed = "Transaction Failed",
	Successful = "Transaction Successful",
	Signing = "Signature Requested",
	Broadcasting = "Transaction confirmation in progress",
}

type SetChainReturnType = ReturnType<typeof useSetChain>;

export async function assertChain(
	chains: SetChainReturnType[0]["chains"],
	connectedChain: SetChainReturnType[0]["connectedChain"],
	setChain: SetChainReturnType[1],
) {
	if (!chains?.[0]?.id) {
		return false;
	}

	try {
		if (connectedChain?.id !== chains[0].id) {
			if (
				!(await setChain({
					chainId: chains[0].id,
				}))
			) {
				throw new Error("Failed to switch chain");
			}
		}

		return true;
	} catch (e) {
		console.error("error", e);
		throw e;
	}
}

export async function handleContractWrite(
	writeContract: () => Promise<WriteContractData>,
	client?: PublicClient,
	options?: {
		toast?: Partial<ToasterToast>;
	},
) {
	const { id, update } = toast({
		title: TxStatus.Signing,
		description: "Waiting for transaction to be signed",
		duration: 999999,
	});

	try {
		if (!client) {
			throw new Error("No client provided");
		}

		const hash = await writeContract();

		update({
			id,
			title: TxStatus.Broadcasting,
			description: "Waiting for transaction to be included in the block",
		});

		const receipt = await client.waitForTransactionReceipt({
			hash,
		});

		if (receipt.status === "success") {
			update({
				id,
				title: TxStatus.Successful,
				description:
					options?.toast?.description ?? "Transaction successful",
			});

			return receipt;
		} else {
			console.warn({ receipt });
			throw new Error("Transaction failed", {
				cause: { receipt /* todo */ },
			});
		}
	} catch (e) {
		console.error("error", e);

		update({
			id,
			title: TxStatus.Failed,
			description:
				(e as any)?.message ?? "An unexpected error has occured",
		});

		throw e;
	}
}
