import { QueryKeyringByAddressResponse, QueryKeyringsResponse, QueryWorkspaceByAddressResponse, QueryWorkspacesResponse } from "../proto/fusionchain/identity/query_pb";
import { PaginatedResponse, path, query } from "./common";

export async function workspaces() {
  const data = await query(path(["fusionchain", "identity", "workspaces"]));
  return QueryWorkspacesResponse.fromJson(data);
}

export async function workspacesByOwner(owner: string) {
  const data = await query(path(["fusionchain", "identity", "workspaces_by_owner"], { owner }));
  return QueryWorkspacesResponse.fromJson(data);
}

export async function workspaceByAddress(address: string) {
  const data = await query(path(["fusionchain", "identity", "workspace_by_address"], { address }));
  return QueryWorkspaceByAddressResponse.fromJson(data);
}

export async function keyrings() {
  const data = await query(path(["fusionchain", "identity", "keyrings"]));
  return QueryKeyringsResponse.fromJson(data);
}

export async function keyringByAddress(address: string) {
  const data = await query(path(["fusionchain", "identity", "keyring_by_address"], { address }));
  return QueryKeyringByAddressResponse.fromJson(data);
}

export type Msg =
  | {
      "@type": "/fusionchain.identity.MsgAddWorkspaceOwner";
      creator: string;
      workspace_id: string;
      new_owner: string;
    }
  | {
      "@type": "/fusionchain.identity.MsgRemoveWorkspaceOwner";
      creator: string;
      workspace_id: string;
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
  return query(path(["fusionchain", "identity", "actions"]));
}
