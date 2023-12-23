import { txByHash } from "@/client/chain";
import TxDetails from "@/components/tx_details";
import { useQuery } from "@tanstack/react-query";
import { Params, useLoaderData } from "react-router-dom";

function TxByHashPage() {
  const { hash } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const q = useQuery({
    queryKey: ["tx_by_hash", hash],
    queryFn: () => txByHash(hash),
    refetchInterval: Infinity,
  });

if (!q.data) {
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
    {tx.result ? (
      <>
        <TxDetails
          code={tx.result.tx_result.code}
          gasWanted={tx.result.tx_result.gas_wanted}
          gasUsed={tx.result.tx_result.gas_used}
          index={tx.result.index}
          tx={tx.result?.tx}
          blockHeight={tx.result.height}
          log={tx.result.tx_result.log}
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
