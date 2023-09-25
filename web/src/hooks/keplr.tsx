import { txByHash } from "@/client/chain";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TxResponse, keplrBuildAndBroadcast } from "@/newclient";
import { Message } from "@bufbuild/protobuf";
import { ToastAction } from "@radix-ui/react-toast";
import { Link } from "react-router-dom";

export function useBroadcaster() {
  const { toast } = useToast();

  const broadcast = async (msgs: Message<any>[]) => {
    let id: string | null = null;
    let update: ((props: any) => void) | null = null;
    try {
      const res = await keplrBuildAndBroadcast(msgs);

      const { id: toastId, update: updateFn } = toast({
        title: "Broadcasting transaction",
        description: "Please wait while we broadcast your transaction",
        duration: Infinity,
      });
      id = toastId;
      update = updateFn;
      monitorTx(res, (args) => updateFn({ id, ...args }));
    } catch (err) {
      if (update) {
        update({
          id,
          title: "Error!",
          description: "There was an error broadcasting your transaction",
          status: "error",
          duration: 5000,
        });
        update = null;
      }
    }
  };

  return { broadcast };
}

async function monitorTx(txRes: TxResponse, updateFn: (props: any) => void) {
  const hash = txRes.txhash;
  const timeout = new Date().getTime() + 1000 * 30;

  while (new Date().getTime() < timeout) {
    const res = await txByHash(hash);

    if (res.error?.code) {
      await sleep(1000);
      continue;
    }

    if (res.result?.tx_result.code !== 0) {
      updateFn({
        title: "Error!",
        description: "There was an error executing your transaction",
        duration: 5000,
        status: "error",
      });
      return;
    }

    if (res.result?.tx_result.code === 0) {
      updateFn({
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
      return;
    }

    if (res.result?.tx_result.code !== 0) {
      updateFn({
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
      return;
    }
  }

  updateFn({
    title: "Error!",
    description: "There was an error broadcasting your transaction",
    duration: 5000,
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
