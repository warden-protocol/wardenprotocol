import { useQuery } from "@tanstack/react-query"
import { KeyRequest, KeyRequestStatus, KeyRequestStatusVal, keyRequests } from "../client/treasury"
import Address from "./address"
import { prettyKeyType } from "../utils/formatting"

export default function KeyRequests() {
  const pendingReqQuery = useQuery({ queryKey: ['wallet-requests', 'pending'], queryFn: () => keyRequests(KeyRequestStatusVal.PENDING) })
  const fulfilledReqQuery = useQuery({ queryKey: ['wallet-requests', 'fulfilled'], queryFn: () => keyRequests(KeyRequestStatusVal.FULFILLED) })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Key request: request a new key managed by MPC network</span>

      {pendingReqQuery.data?.wallet_requests.map((walletRequest) => (
        <KeyRequest key={walletRequest.id} walletRequest={walletRequest} />
      ))}

      {fulfilledReqQuery.data?.wallet_requests.map((walletRequest) => (
        <KeyRequest key={walletRequest.id} walletRequest={walletRequest} />
      ))}
    </div >
  )
}

function KeyRequest(props: { walletRequest: KeyRequest }) {
  switch (props.walletRequest.status) {
    case KeyRequestStatus.PENDING:
      return <PendingKeyRequest walletRequest={props.walletRequest} />
    case KeyRequestStatus.FULFILLED:
      return <FulfilledKeyRequest walletRequest={props.walletRequest} />
    default:
      return <pre>{JSON.stringify(props.walletRequest, null, 2)}</pre>
  }
}

function PendingKeyRequest(props: { walletRequest: KeyRequest }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.walletRequest.id}</span>
      <span>Creator: <Address address={props.walletRequest.creator} /></span>
      <span>Type: {prettyKeyType(props.walletRequest.wallet_type)}</span>
    </div>
  )
}

function FulfilledKeyRequest(props: { walletRequest: KeyRequest & { status: KeyRequestStatus.FULFILLED } }) {
  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.walletRequest.id}</span>
      <span>Creator: <Address address={props.walletRequest.creator} /></span>
      <span>Type: {prettyKeyType(props.walletRequest.wallet_type)}</span>
      <span className="font-semibold">👉 Key ID: {props.walletRequest.success_wallet_id}</span>
    </div>
  )
}

