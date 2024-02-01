import { QueryKeychainByAddressResponse, QueryKeychainsResponse, QuerySpaceByAddressResponse, QuerySpacesResponse } from "../proto/wardenprotocol/identity/query_pb";
import { PaginatedResponse, path, query } from "./common";

export async function spaces() {
  const data = await query(path(["wardenprotocol", "identity", "spaces"]));
  return QuerySpacesResponse.fromJson(data);
}

export async function spacesByOwner(owner: string) {
  const data = await query(path(["wardenprotocol", "identity", "spaces_by_owner"], { owner }));
  return QuerySpacesResponse.fromJson(data);
}

export async function spaceByAddress(address: string) {
  const data = await query(path(["wardenprotocol", "identity", "space_by_address"], { address }));
  return QuerySpaceByAddressResponse.fromJson(data);
}

export async function keychains() {
  const data = await query(path(["wardenprotocol", "identity", "keychains"]));
  return QueryKeychainsResponse.fromJson(data);
}

export async function keychainByAddress(address: string) {
  const data = await query(path(["wardenprotocol", "identity", "keychain_by_address"], { address }));
  return QueryKeychainByAddressResponse.fromJson(data);
}

export type Msg =
  | {
      "@type": "/wardenprotocol.identity.MsgAddSpaceOwner";
      creator: string;
      space_id: string;
      new_owner: string;
    }
  | {
      "@type": "/wardenprotocol.identity.MsgRemoveSpaceOwner";
      creator: string;
      space_id: string;
      owner: string;
    };

export type Action = {
  id: string;
  approvers: string[];
  completed: boolean;
  msg: Msg;
};

export type ActionsResponse = PaginatedResponse & {
  actions: Action[];
};

export function actions(): Promise<ActionsResponse> {
  return query(path(["wardenprotocol", "identity", "actions"]));
}
