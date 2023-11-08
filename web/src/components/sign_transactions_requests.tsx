import { useQuery } from "@tanstack/react-query";
import { SignRequestStatus } from "../proto/fusionchain/treasury/mpcsign_pb";
import { signTransactionRequests } from "../client/treasury";
import Address from "./address";
import { SignTransactionRequestResponse } from "../proto/fusionchain/treasury/query_pb";
import { Transaction } from "web3-eth-accounts";
import RLP from "rlp";
import Web3 from "web3";
import { Link } from "react-router-dom";

export default function SignTransactionRequests({ walletType }: { walletType: bigint | number | string }) {
  const pendingReqQuery = useQuery({
    queryKey: ["sign-transaction-requests", "pending", walletType.toString()],
    queryFn: () => signTransactionRequests(walletType, SignRequestStatus.PENDING),
  });
  const fulfilledReqQuery = useQuery({
    queryKey: ["sign-transaction-requests", "fulfilled", walletType.toString()],
    queryFn: () => signTransactionRequests(walletType, SignRequestStatus.FULFILLED),
  });
  const rejectedReqQuery = useQuery({
    queryKey: ["sign-transaction-requests", "rejected", walletType.toString()],
    queryFn: () => signTransactionRequests(walletType, SignRequestStatus.REJECTED),
  });

  return (
    <div className="p-4 space-y-3">
      {pendingReqQuery.data?.signTransactionRequests.map((req) => (
        <SignatureRequest
          key={req.signTransactionRequest?.id.toString()}
          request={req}
        />
      ))}

      {fulfilledReqQuery.data?.signTransactionRequests.map((req) => (
        <SignatureRequest
          key={req.signTransactionRequest?.id.toString()}
          request={req}
        />
      ))}

      {rejectedReqQuery.data?.signTransactionRequests.map((req) => (
        <SignatureRequest
          key={req.signTransactionRequest?.id.toString()}
          request={req}
        />
      ))}
    </div>
  );
}

function SignatureRequest(props: { request: SignTransactionRequestResponse }) {
  switch (props.request.signRequest?.status) {
    case SignRequestStatus.PENDING:
      return (
        <PendingSignatureRequest request={props.request} />
      );
    case SignRequestStatus.FULFILLED:
      return (
        <FulfilledSignatureRequest request={props.request} />
      );
    case SignRequestStatus.REJECTED:
      return (
        <RejectedSignatureRequest request={props.request} />
      );
    default:
      return <pre>{JSON.stringify(props.request, null, 2)}</pre>;
  }
}

function PendingSignatureRequest(props: { request: SignTransactionRequestResponse }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.request.signTransactionRequest?.id.toString()}</span>
      <span>
        Creator: <Address address={props.request.signTransactionRequest?.creator!} />
      </span>
    </div>
  );
}

function FulfilledSignatureRequest(props: { request: SignTransactionRequestResponse }) {
  // parse unsigned tx as RLP encoded data
  const vals = RLP.decode(props.request.signTransactionRequest?.unsignedTransaction!);
  const [nonce, gasPrice, gasLimit, to, value, data,] = vals as Uint8Array[];

  // parse signature as EIP155
  const signature = props.request.signRequest?.result.value! as Uint8Array;
  const r = signature.slice(0, 32);
  const s = signature.slice(32, 64);
  const sepoliaChainID = 11155111;
  const v = signature[64];
  const eip155V = v + 35 + sepoliaChainID * 2;
  const vBytes = Web3.utils.hexToBytes(Web3.utils.numberToHex(eip155V, true));

  // rebuild signed tx
  const tx = Transaction.fromValuesArray([nonce, gasPrice, gasLimit, to, value, data, vBytes, r, s]);

  const hash = Web3.utils.bytesToHex(tx.hash());

  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.request.signTransactionRequest?.id.toString()}</span>
      <span>
        Request by: <Address address={props.request.signTransactionRequest?.creator!} />
      </span>
      <span>
        From: <Address address={tx.getSenderAddress().toString()} />
      </span>
      <span>
        To: <Address address={tx.to!.toString()} />
      </span>
      <span>
        Amount: {Web3.utils.fromWei(tx.value, "ether")} ETH
      </span>
      <span>
        Tx hash:{" "}
        <Link target="_blank" to={`https://sepolia.etherscan.io/tx/${hash}`} className="underline">
          <span className="font-mono">
            {hash}
          </span>
        </Link>
      </span>
    </div>
  );
}

function RejectedSignatureRequest(props: { request: SignTransactionRequestResponse }) {
  return (
    <div className="border-2 border-red-600 bg-red-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.request.signTransactionRequest?.id.toString()}</span>
      <span>
        Creator: <Address address={props.request.signTransactionRequest?.creator!} />
      </span>
    </div>
  );
}
