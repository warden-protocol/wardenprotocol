import { useQuery } from "@tanstack/react-query";
import { KeyRequest as KeyRequestProto, KeyRequestStatus } from "../proto/fusionchain/treasury/key_pb";
import {
  KeyRequestStatusVal,
  keyRequests,
} from "../client/treasury";
import Address from "./address";
import { prettyKeyType } from "../utils/formatting";

export default function KeyRequests({ workspaceAddr }: { workspaceAddr: string }) {
  const pendingReqQuery = useQuery({
    queryKey: ["key-requests", "pending"],
    queryFn: () => keyRequests(workspaceAddr, KeyRequestStatusVal.PENDING),
  });

  if (!pendingReqQuery.data?.keyRequests) {
    return null;
  }

  return (
    <div className="p-4 space-y-3">
      {pendingReqQuery.data?.keyRequests.map((keyRequest) => (
        <KeyRequest key={keyRequest.id.toString()} keyRequest={keyRequest} />
      ))}
    </div>
  );
}

function KeyRequest(props: { keyRequest: KeyRequestProto }) {
  switch (props.keyRequest.status) {
    case KeyRequestStatus.PENDING:
      return <PendingKeyRequest keyRequest={props.keyRequest} />;
    case KeyRequestStatus.FULFILLED:
      return <FulfilledKeyRequest keyRequest={props.keyRequest} />;
    default:
      return <pre>{JSON.stringify(props.keyRequest, null, 2)}</pre>;
  }
}

function PendingKeyRequest(props: { keyRequest: KeyRequestProto }) {
  return (
    <div className="border-2 border-yellow-500 flex flex-col p-4 rounded">
      <span className="font-bold">Key request #{props.keyRequest.id.toString()} for Keyring #{props.keyRequest.keyringAddr}</span>
      <span>
        Creator: <Address address={props.keyRequest.creator} />
      </span>
      <span>Type: {prettyKeyType(props.keyRequest.keyType)}</span>
    </div>
  );
}

function FulfilledKeyRequest(props: { keyRequest: KeyRequestProto }) {
  return (
    <div className="border-2 border-green-600 bg-green-50 flex flex-col p-4 rounded">
      <span className="font-bold">Request #{props.keyRequest.id.toString()}</span>
      <span>
        Creator: <Address address={props.keyRequest.creator} />
      </span>
      <span>Type: {prettyKeyType(props.keyRequest.keyType)}</span>
      <span className="font-semibold">
        👉 Key ID: {props.keyRequest.id.toString()}
      </span>
    </div>
  );
}
