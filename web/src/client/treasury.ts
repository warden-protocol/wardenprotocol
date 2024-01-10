import { WalletType } from "@/proto/fusionchain/treasury/wallet_pb";
import { QueryKeyRequestByIdResponse, QueryKeyRequestsResponse, QueryKeysResponse, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdResponse, QuerySignatureRequestsResponse } from "../proto/fusionchain/treasury/query_pb";
import { path, query } from "./common";

export enum KeyRequestStatus {
  PENDING = "KEY_REQUEST_STATUS_PENDING",
  FULFILLED = "KEY_REQUEST_STATUS_FULFILLED",
  REJECTED = "KEY_REQUEST_STATUS_REJECTED",
}

export enum KeyRequestStatusVal {
  PENDING = "1",
  FULFILLED = "2",
  REJECTED = "3",
}

export enum KeyType {
  ECDSA = "KEY_TYPE_ECDSA",
}

export async function keyRequestById(
  keyRequestId: number | bigint,
): Promise<QueryKeyRequestByIdResponse> {
  const p = path(["fusionchain", "treasury", "key_request_by_id"], { id: keyRequestId });
  const data = await query(p);
  return QueryKeyRequestByIdResponse.fromJson(data);
}

export async function keyRequests(
  workspaceAddr: string,
  status?: KeyRequestStatusVal,
): Promise<QueryKeyRequestsResponse> {
  const p = path(["fusionchain", "treasury", "key_requests"], { workspace_addr: workspaceAddr });
  if (status) {
    p.searchParams.set("status", status);
  }
  const data = await query(p);
  return QueryKeyRequestsResponse.fromJson(data);
}

export async function keys({
  workspaceAddr,
  walletType,
  keyId,
}: {
  workspaceAddr?: string,
  walletType?: WalletType,
  keyId?: number,
}): Promise<QueryKeysResponse> {
  const data = await query(path(["fusionchain", "treasury", "keys"], {
    workspace_addr: workspaceAddr,
    type: walletType,
    keyId: keyId,
  }));
  return QueryKeysResponse.fromJson(data);
}

export async function signatureRequests(status: number): Promise<QuerySignatureRequestsResponse> {
  const p = path(["fusionchain", "treasury", "get_signature_requests"], { status });
  const data = await query(p);
  return QuerySignatureRequestsResponse.fromJson(data);
}

export async function signatureRequestByID(id: number | bigint): Promise<QuerySignatureRequestByIdResponse> {
  const p = path(["fusionchain", "treasury", "signature_request_by_id"], { id });
  const data = await query(p);
  return QuerySignatureRequestByIdResponse.fromJson(data);
}

export async function signTransactionRequests(walletId: number | bigint | string, status: number) {
  const p = path(["fusionchain", "treasury", "sign_transaction_requests"], { status, walletId });
  const data = await query(p);
  return QuerySignTransactionRequestsResponse.fromJson(data);
}

export async function wallets( walletType: number, workspaceAddr: string, keyId: string): Promise<QueryKeysResponse> {
  const p = path(["fusionchain","treasury","keys"], {walletType, workspaceAddr, key_id: keyId });
  const data = await query(p);
  return QueryKeysResponse.fromJson(data)
}
