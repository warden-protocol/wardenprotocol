import { ToastActionElement } from "@/components/ui/toast";
import { toast, ToasterToast } from "@/components/ui/use-toast";
import { useSetChain } from "@web3-onboard/react";
import { isHex } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import type { useWriteContract } from "wagmi";

type WriteContractData = Awaited<
	ReturnType<ReturnType<typeof useWriteContract>["writeContractAsync"]>
>;

type Client = Parameters<typeof waitForTransactionReceipt>[0];

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
	const chainId = chains?.[0]?.id;

	if (!chainId) {
		return false;
	}

	try {
		console.log(connectedChain?.id, chainId);
		if (connectedChain?.id !== chainId) {
			if (
				!(await setChain({
					chainId,
				}))
			) {
				throw new Error("Failed to switch chain; if problem persists, visit chainlist to manually add network to your wallet", {
					cause: { chainId },
				});
			}
		}

		return true;
	} catch (e) {
		const chainId: `0x${string}` | undefined = (e as any)?.cause?.chainId;

		if (isHex(chainId)) {
			const id = parseInt(chainId.slice(2), 16);
			let toastResult: ReturnType<typeof toast>;

			toastResult = toast({
				title: "Error",
				description:
					(e as any)?.message ?? "An unexpected error has occurred",
				action: <a href={`https://chainlist.org/chain/${id}`} target="_blank" onClick={() => toastResult.dismiss()}>ChainList</a>,
				duration: 999999,
			});
		}
		console.error("error", e);
		throw e;
	}
}

export async function handleContractWrite(
	writeContract: () => Promise<WriteContractData>,
	client?: Client,
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

		const receipt = await waitForTransactionReceipt(client, {
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
				(e as any)?.message ?? "An unexpected error has occurred",
		});

		throw e;
	}
}
