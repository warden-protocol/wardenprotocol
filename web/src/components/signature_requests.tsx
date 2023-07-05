import { useQuery } from "@tanstack/react-query"
import { SignatureRequest, SignatureRequestStatus, SignatureRequestStatusVal, keyRequests, signatureRequests } from "../client/treasury"
import Address from "./address"

export default function SignatureRequests() {
  const pendingReqQuery = useQuery({ queryKey: ['signature-requests', 'pending'], queryFn: () => signatureRequests(SignatureRequestStatusVal.PENDING) })
  const fulfilledReqQuery = useQuery({ queryKey: ['signature-requests', 'fulfilled'], queryFn: () => signatureRequests(SignatureRequestStatusVal.FULFILLED) })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Signature request: request for the MPC network to use one of its key to sign an arbitrary payload</span>

      {pendingReqQuery.data?.sign_requests.map((signatureRequest) => (
        <SignatureRequest key={signatureRequest.id} signatureRequest={signatureRequest} />
      ))}

      {fulfilledReqQuery.data?.sign_requests.map((signatureRequest) => (
        <SignatureRequest key={signatureRequest.id} signatureRequest={signatureRequest} />
      ))}
    </div >
  )
}

function SignatureRequest(props: { signatureRequest: SignatureRequest }) {
  switch (props.signatureRequest.status) {
    case SignatureRequestStatus.PENDING:
      return <PendingSignatureRequest signatureRequest={props.signatureRequest} />
    case SignatureRequestStatus.FULFILLED:
      return <FulfilledSignatureRequest signatureRequest={props.signatureRequest} />
    default:
      return <pre>{JSON.stringify(props.signatureRequest, null, 2)}</pre>
  }
}

function PendingSignatureRequest(props: { signatureRequest: SignatureRequest }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.signatureRequest.id}</span>
      <span>Creator: <Address address={props.signatureRequest.creator} /></span>
      <span>Key ID: {props.signatureRequest.key_id}</span>
      <span>Unsigned payload: {props.signatureRequest.data_for_signing}</span>
    </div>
  )
}

function FulfilledSignatureRequest(props: { signatureRequest: SignatureRequest & { status: SignatureRequestStatus.FULFILLED } }) {
  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.signatureRequest.id}</span>
      <span>Creator: <Address address={props.signatureRequest.creator} /></span>
      <span>Key ID: {props.signatureRequest.key_id}</span>
      <span>Unsigned payload: {props.signatureRequest.data_for_signing}</span>
      <span className="font-semibold">👉 Signature: {props.signatureRequest.signed_data}</span>
    </div>
  )
}

