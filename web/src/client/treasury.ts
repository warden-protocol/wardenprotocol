import { PaginatedResponse, path, query } from "./common";

export enum KeyRequestStatus {
  PENDING = "WALLET_REQUEST_STATUS_PENDING",
  FULFILLED = "WALLET_REQUEST_STATUS_FULFILLED",
  REJECTED = "WALLET_REQUEST_STATUS_REJECTED",
}

export enum KeyRequestStatusVal {
  PENDING = "1",
  FULFILLED = "2",
  REJECTED = "3",
}

export type KeyRequest = {
  id: string,
  creator: string,
  workspace_id: string,
  wallet_type: KeyType,
  status: KeyRequestStatus.PENDING,
} | {
  id: string,
  creator: string,
  workspace_id: string,
  wallet_type: KeyType,
  status: KeyRequestStatus.FULFILLED,
  success_wallet_id: string,
}

export enum KeyType {
  ECDSA = "WALLET_TYPE_ECDSA",
}

export type KeyRequestsResponse = PaginatedResponse & {
  wallet_requests: KeyRequest[],
}

export function keyRequests(status?: KeyRequestStatusVal): Promise<KeyRequestsResponse> {
  const p = path("qrdochain", "fusionchain", "treasury", "wallet_requests")
  if (status) {
    p.searchParams.set("status", status)
  }
  return query(p)
}

export interface Key {
  id: string,
  workspace_id: string,
  type: KeyType,
  public_key: string,
}

export type KeysResponse = PaginatedResponse & {
  wallets: Key[],
}

export function keys(): Promise<KeysResponse> {
  return query(path("qrdochain", "fusionchain", "treasury", "wallets"))
}

export enum SignatureRequestStatus {
  PENDING = "SIGN_REQUEST_STATUS_PENDING",
  FULFILLED = "SIGN_REQUEST_STATUS_FULFILLED",
  REJECTED = "SIGN_REQUEST_STATUS_REJECTED",
}

export enum SignatureRequestStatusVal {
  PENDING = "1",
  FULFILLED = "2",
  REJECTED = "3",
}

export type SignatureRequest = {
  id: string,
  creator: string,
  wallet_id: string,
  data_for_signing: string,
  status: SignatureRequestStatus.PENDING,
} | {
  id: string,
  creator: string,
  wallet_id: string,
  data_for_signing: string,
  status: SignatureRequestStatus.FULFILLED,
  signed_data: string,
}

export type SignatureRequestsResponse = PaginatedResponse & {
  sign_requests: SignatureRequest[],
}

export function signatureRequests(status?: SignatureRequestStatusVal): Promise<SignatureRequestsResponse> {
  const p = path("fusionchain", "treasury", "get_signature_requests")
  if (status) {
    p.searchParams.set("status", status)
  }
  return query(p)
}
