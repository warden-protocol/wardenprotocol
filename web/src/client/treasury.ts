import { WalletType } from "@/proto/fusionchain/treasury/wallet_pb";
import { QueryKeyRequestsResponse, QueryKeysResponse, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdResponse, QuerySignatureRequestsResponse, QueryWalletByIdResponse, QueryWalletsResponse } from "../proto/fusionchain/treasury/query_pb";
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

export async function keys(workspaceAddr: string, walletType?: WalletType): Promise<QueryKeysResponse> {
  const data = await query(path(["fusionchain", "treasury", "keys"], {
    workspace_addr: workspaceAddr,
    type: walletType,
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

export async function wallets(keyId: number | bigint) {
  const p = path(["fusionchain", "treasury", "wallets"], { key_id: keyId.toString() });
  const data = await query(p);
  return QueryWalletsResponse.fromJson(data);
}

export async function walletById(walletId: number | bigint | string) {
  const p = path(["fusionchain", "treasury", "wallet_by_id"], { id: walletId });
  const data = await query(p);
  return QueryWalletByIdResponse.fromJson(data);
}
