import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { Link } from "react-router-dom";
import { useClient } from "./useClient";

export async function monitorTx(txResPromise: Promise<DeliverTxResponse>, toast: any) {
  const { update } = toast({
    title: "Broadcasting transaction",
    description: "Your transaction is being broadcasted",
    duration: 5000,
  });

  const client = useClient();
  const serviceGetTx = client.CosmosTxV1Beta1.query.serviceGetTx;

  try {
    const txRes = await txResPromise;

    const hash = txRes.transactionHash;
    const timeout = new Date().getTime() + 1000 * 30;

    while (new Date().getTime() < timeout) {
      const res = await serviceGetTx(hash);

      if (res.status >= 400 || !res.data.tx_response) {
        await sleep(1000);
        continue;
      }

      if (res.data.tx_response?.code === 0) {
        update({
          title: "Success!",
          description: "Your transaction was executed successfully",
          duration: 5000,
          action: (
            <ToastAction altText="View transaction">
              <Button asChild variant="secondary">
                <Link to={`/explorer/tx_by_hash/${hash}`}>
                  Details
                </Link>
              </Button>
            </ToastAction>
          ),
        });
        return res.data;
      }

      if (res.data.tx_response?.code !== 0) {
        update({
          title: "Error!",
          description: "Your transaction can't be executed",
          duration: 5000,
          action: (
            <ToastAction altText="View transaction">
              <Button asChild variant="secondary">
                <Link to={`/explorer/tx_by_hash/${hash}`}>
                  Details
                </Link>
              </Button>
            </ToastAction>
          ),
        });
        return res.data;
      }
    }

    throw new Error("Transaction timeout");
  } catch (e) {
    if (`${e}`.endsWith("Send some tokens there before trying to query sequence.")) {
      update({
        title: "Error!",
        description: "You don't have enough tokens to execute this transaction",
        duration: 5000,
      });
      return;
    }
    console.error(e);
    update({
      title: "Error!",
      description: "There was an error broadcasting your transaction",
      duration: 5000,
    });
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
