import { PaginatedResponse, path, query } from "./common";

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

export type KeyRequest = {
  id: string,
  creator: string,
  workspace_id: string,
  key_type: KeyType,
  status: KeyRequestStatus.PENDING,
} | {
  id: string,
  creator: string,
  workspace_id: string,
  key_type: KeyType,
  status: KeyRequestStatus.FULFILLED,
  success_key_id: string,
}

export enum KeyType {
  ECDSA = "KEY_TYPE_ECDSA",
}

export type KeyRequestsResponse = PaginatedResponse & {
  key_requests: KeyRequest[],
}

export function keyRequests(status?: KeyRequestStatusVal): Promise<KeyRequestsResponse> {
  const p = path("qrdochain", "fusionchain", "treasury", "key_requests")
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
  keys: Key[],
}

export function keys(): Promise<KeysResponse> {
  return query(path("qrdochain", "fusionchain", "treasury", "keys"))
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
  key_id: string,
  data_for_signing: string,
  status: SignatureRequestStatus.PENDING,
} | {
  id: string,
  creator: string,
  key_id: string,
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
