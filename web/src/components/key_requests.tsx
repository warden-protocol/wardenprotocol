import { useQuery } from "@tanstack/react-query"
import { KeyRequest, KeyRequestStatus, KeyRequestStatusVal, keyRequests } from "../client/treasury"
import Address from "./address"
import { prettyKeyType } from "../utils/formatting"

export default function KeyRequests() {
  const pendingReqQuery = useQuery({ queryKey: ['key-requests', 'pending'], queryFn: () => keyRequests(KeyRequestStatusVal.PENDING) })
  const fulfilledReqQuery = useQuery({ queryKey: ['key-requests', 'fulfilled'], queryFn: () => keyRequests(KeyRequestStatusVal.FULFILLED) })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Key request: request a new key managed by MPC network</span>

      {pendingReqQuery.data?.key_requests.map((keyRequest) => (
        <KeyRequest key={keyRequest.id} keyRequest={keyRequest} />
      ))}

      {fulfilledReqQuery.data?.key_requests.map((keyRequest) => (
        <KeyRequest key={keyRequest.id} keyRequest={keyRequest} />
      ))}
    </div >
  )
}

function KeyRequest(props: { keyRequest: KeyRequest }) {
  switch (props.keyRequest.status) {
    case KeyRequestStatus.PENDING:
      return <PendingKeyRequest keyRequest={props.keyRequest} />
    case KeyRequestStatus.FULFILLED:
      return <FulfilledKeyRequest keyRequest={props.keyRequest} />
    default:
      return <pre>{JSON.stringify(props.keyRequest, null, 2)}</pre>
  }
}

function PendingKeyRequest(props: { keyRequest: KeyRequest }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.keyRequest.id}</span>
      <span>Creator: <Address address={props.keyRequest.creator} /></span>
      <span>Type: {prettyKeyType(props.keyRequest.key_type)}</span>
    </div>
  )
}

function FulfilledKeyRequest(props: { keyRequest: KeyRequest & { status: KeyRequestStatus.FULFILLED } }) {
  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.keyRequest.id}</span>
      <span>Creator: <Address address={props.keyRequest.creator} /></span>
      <span>Type: {prettyKeyType(props.keyRequest.key_type)}</span>
      <span className="font-semibold">👉 Key ID: {props.keyRequest.success_key_id}</span>
    </div>
  )
}

