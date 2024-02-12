import { WalletType } from "@/proto/wardenprotocol/treasury/wallet_pb";
import { QueryKeyRequestByIdResponse, QueryKeyRequestsResponse, QueryKeysResponse, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdResponse, QuerySignatureRequestsResponse } from "../proto/wardenprotocol/treasury/query_pb";
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
  const p = path(["wardenprotocol", "treasury", "key_request_by_id"], { id: keyRequestId });
  const data = await query(p);
  return QueryKeyRequestByIdResponse.fromJson(data);
}

export async function keyRequests(
  spaceAddr: string,
  status?: KeyRequestStatusVal,
): Promise<QueryKeyRequestsResponse> {
  const p = path(["wardenprotocol", "treasury", "key_requests"], { space_addr: spaceAddr });
  if (status) {
    p.searchParams.set("status", status);
  }
  const data = await query(p);
  return QueryKeyRequestsResponse.fromJson(data);
}

export async function keys({
  spaceAddr,
  walletType,
  keyId,
}: {
  spaceAddr?: string,
  walletType?: WalletType,
  keyId?: number,
}): Promise<QueryKeysResponse> {
  const data = await query(path(["wardenprotocol", "treasury", "keys"], {
    space_addr: spaceAddr,
    type: walletType,
    keyId: keyId,
  }));
  return QueryKeysResponse.fromJson(data);
}

export async function signatureRequests(status: number): Promise<QuerySignatureRequestsResponse> {
  const p = path(["wardenprotocol", "treasury", "get_signature_requests"], { status });
  const data = await query(p);
  return QuerySignatureRequestsResponse.fromJson(data);
}

export async function signatureRequestByID(id: number | bigint): Promise<QuerySignatureRequestByIdResponse> {
  const p = path(["wardenprotocol", "treasury", "signature_pb_request_by_id"], { id });
  const data = await query(p);
  return QuerySignatureRequestByIdResponse.fromJson(data);
}

export async function signTransactionRequests(walletId: number | bigint | string, status: number) {
  const p = path(["wardenprotocol", "treasury", "sign_transaction_requests"], { status, walletId });
  const data = await query(p);
  return QuerySignTransactionRequestsResponse.fromJson(data);
}

export async function wallets( walletType: number, spaceAddr: string, keyId: string): Promise<QueryKeysResponse> {
  const p = path(["wardenprotocol","treasury","keys"], {walletType, spaceAddr, key_id: keyId });
  const data = await query(p);
  return QueryKeysResponse.fromJson(data)
}
