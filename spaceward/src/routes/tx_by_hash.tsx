import TxDetails from "@/components/tx-details";
import useCosmosTxV1Beta1 from "@/hooks/useCosmosTxV1Beta1";
import { Params, useLoaderData } from "react-router-dom";

function TxByHashPage() {
  const { hash } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { ServiceGetTx } = useCosmosTxV1Beta1();
  const q = ServiceGetTx(hash, { refetchInterval: Infinity });

  if (q.status === "loading") {
    return <div>Loading...</div>;
  }

  const tx = q.data;

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transaction details</h2>
        </div>
      </div>
      {tx?.tx_response ? (
        <>
          <TxDetails
            code={tx.tx_response.code}
            gasWanted={tx.tx_response.gas_wanted}
            gasUsed={tx.tx_response.gas_used}
            tx={tx.tx}
            blockHeight={tx.tx_response.height}
            log={tx.tx_response.raw_log}
          />
        </>
      ) : (
        <div>Transaction not found</div>
      )}
    </div>
  );
}

export function loader({ params }: { params: Params<string> }) {
  if (!params.hash) {
    throw new Error("No hash provided");
  }

  return { hash: params.hash };
}

export default TxByHashPage;
