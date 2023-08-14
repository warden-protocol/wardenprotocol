import { useQuery } from "@tanstack/react-query";
import { SignRequest, SignRequestStatus } from "../proto/fusionchain/treasury/mpcsign_pb";
import { signatureRequests } from "../client/treasury";
import Address from "./address";
import { prettyBytes } from "../utils/formatting";

export default function SignatureRequests({ keyId }: { keyId: bigint | number }) {
  const pendingReqQuery = useQuery({
    queryKey: ["signature-requests", "pending", keyId.toString()],
    queryFn: () => signatureRequests(SignRequestStatus.PENDING),
  });
  const fulfilledReqQuery = useQuery({
    queryKey: ["signature-requests", "fulfilled", keyId.toString()],
    queryFn: () => signatureRequests(SignRequestStatus.FULFILLED),
  });
  const rejectedReqQuery = useQuery({
    queryKey: ["signature-requests", "rejected", keyId.toString()],
    queryFn: () => signatureRequests(SignRequestStatus.REJECTED),
  });

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">
        Signature request: request for the MPC network to use one of its key to
        sign an arbitrary payload
      </span>

      {pendingReqQuery.data?.signRequests.map((signatureRequest) => (
        <SignatureRequest
          key={signatureRequest.id.toString()}
          signatureRequest={signatureRequest}
        />
      ))}

      {fulfilledReqQuery.data?.signRequests.map((signatureRequest) => (
        <SignatureRequest
          key={signatureRequest.id.toString()}
          signatureRequest={signatureRequest}
        />
      ))}

      {rejectedReqQuery.data?.signRequests.map((signatureRequest) => (
        <SignatureRequest
          key={signatureRequest.id.toString()}
          signatureRequest={signatureRequest}
        />
      ))}
    </div>
  );
}

function SignatureRequest(props: { signatureRequest: SignRequest }) {
  switch (props.signatureRequest.status) {
    case SignRequestStatus.PENDING:
      return (
        <PendingSignatureRequest signatureRequest={props.signatureRequest} />
      );
    case SignRequestStatus.FULFILLED:
      return (
        <FulfilledSignatureRequest signatureRequest={props.signatureRequest} />
      );
    case SignRequestStatus.REJECTED:
      return (
        <RejectedSignatureRequest signatureRequest={props.signatureRequest} />
      );
    default:
      return <pre>{JSON.stringify(props.signatureRequest, null, 2)}</pre>;
  }
}

function PendingSignatureRequest(props: { signatureRequest: SignRequest; }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.signatureRequest.id.toString()}</span>
      <span>
        Creator: <Address address={props.signatureRequest.creator} />
      </span>
      <span>Key ID: {props.signatureRequest.keyId.toString()}</span>
      <span>Unsigned payload: {prettyBytes(props.signatureRequest.dataForSigning)}</span>
    </div>
  );
}

function FulfilledSignatureRequest(props: { signatureRequest: SignRequest }) {
  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.signatureRequest.id.toString()}</span>
      <span>
        Creator: <Address address={props.signatureRequest.creator} />
      </span>
      <span>Key ID: {props.signatureRequest.keyId.toString()}</span>
      <span>Unsigned payload: {prettyBytes(props.signatureRequest.dataForSigning)}</span>
      <span className="font-semibold">
        👉 Signature: {prettyBytes(props.signatureRequest.result.value as Uint8Array)}
      </span>
    </div>
  );
}

function RejectedSignatureRequest(props: { signatureRequest: SignRequest }) {
  return (
    <div className="border-2 border-red-600 bg-red-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.signatureRequest.id.toString()}</span>
      <span>
        Creator: <Address address={props.signatureRequest.creator} />
      </span>
      <span>Key ID: {props.signatureRequest.keyId.toString()}</span>
      <span>Unsigned payload: {prettyBytes(props.signatureRequest.dataForSigning)}</span>
      <span className="font-semibold">
        Error: {props.signatureRequest.result.value as string}
      </span>
    </div>
  );
}
