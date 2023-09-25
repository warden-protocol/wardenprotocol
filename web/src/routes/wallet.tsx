import web3, { ETH_DATA_FORMAT } from "web3";
import RLP from "rlp";
import { Transaction } from "web3-eth-accounts";
import { protoInt64 } from "@bufbuild/protobuf";
import { MsgNewSignTransactionRequest } from "../proto/fusionchain/treasury/tx_pb";
import { Link, Params, useLoaderData } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import { useQuery } from "@tanstack/react-query";
import { walletById } from "../client/treasury";
import SignTransactionRequests from "../components/sign_transactions_requests";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useBroadcaster } from "@/hooks/keplr";

const url = "https://sepolia.infura.io/v3/6484e0cc3e0447e386fb42ce19ea7155";
const web3Instance = new web3(url);

async function getEthBalance(address: string) {
  const balance = await web3Instance.eth.getBalance(address);
  return balance;
}

async function buildEthTransaction(from: string, to: string, amount: string, gasPriceStr: string) {
  const gasPrice = web3.utils.numberToHex(gasPriceStr);
  const value = web3.utils.numberToHex(web3.utils.toWei(amount, "ether"));
  const gasLimit = await web3Instance.eth.estimateGas({ from, to, value }, "latest", ETH_DATA_FORMAT);
  const nonce = await web3Instance.eth.getTransactionCount(from);
  const tx = new Transaction({ to, value, nonce, gasLimit, gasPrice });
  const msgs = tx.getMessageToSign(false);
  return RLP.encode(msgs)
}


function Wallet() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const { walletId } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const walletQ = useQuery(["wallet", walletId], () => walletById(walletId), {
    refetchInterval: 10000,
  });
  const ethAddr = walletQ.data?.wallet?.address || "";
  const balQ = useQuery(["eth-balance", ethAddr], () => getEthBalance(ethAddr), {
    refetchInterval: 10000,
  });

  if (walletQ.isLoading || balQ.isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const gasPrice = formData.get("gasPrice") as string;
    const amount = formData.get("amount") as string;
    const toAddr = formData.get("toAddr") as string;

    const unsignedTx = await buildEthTransaction(ethAddr, toAddr, amount, gasPrice);
    await broadcast([
      new MsgNewSignTransactionRequest({
        creator: addr,
        walletId: protoInt64.parse(walletId),
        unsignedTransaction: unsignedTx,
      }),
    ]);
  };

  return (
    <div className="px-6 mt-6">
      <div className="mt-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Wallet</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col mt-6">
        <div>
          <h1 className="font-bold text-lg">Your Sepolia wallet</h1>
          <span className="text-gray-800 italic">
            <Link target="_blank" to={`https://sepolia.etherscan.io/address/${ethAddr}`}><span className="font-mono">{ethAddr}</span></Link>
            {" "}<button className="italic hover:underline" onClick={() => navigator.clipboard.writeText(ethAddr)}>(click to copy)</button>
            <br />
            <span>Balance: {web3.utils.fromWei(balQ.data || 0, "ether")} ETH</span>
          </span>
        </div>

        <h2 className="font-bold text-lg mt-6">Send transaction request</h2>
        <form className="p-4 flex flex-col gap-4" onSubmit={onSubmit}>
          <input type="text" name="amount" placeholder="Amount (in ETH)" className="border border-slate-200 rounded-lg px-4 py-2" />
          <input type="text" name="gasPrice" placeholder="Gas price (in WEI)" defaultValue="20000000000" className="border border-slate-200 rounded-lg px-4 py-2" />
          <input type="text" name="toAddr" placeholder="To address (0x9b7E335088762aD8061C04D08C37902ABC8ACb87)" className="border border-slate-200 rounded-lg px-4 py-2" />
          <button type="submit" className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg block">
            Send transaction request
          </button>
        </form>

        <SignTransactionRequests walletId={walletId} />
      </div>
    </div>
  );
}

export function loader({ params }: { params: Params<string> }) {
  if (!params.walletId) {
    throw new Error("No wallet ID provided");
  }

  return { walletId: params.walletId };
}

export default Wallet;
