import { PaginatedResponse, path, query } from "./common";

export interface Workspace {
  address: string;
  creator: string;
  owners: string[];
}

export type WorkspacesResponse = PaginatedResponse & {
  workspaces: Workspace[];
};

export function workspaces(): Promise<WorkspacesResponse> {
  return query(path(["fusionchain", "identity", "workspaces"]));
}

export function workspacesByOwner(owner: string): Promise<WorkspacesResponse> {
  return query(path(["fusionchain", "identity", "workspaces_by_owner"], { owner }));
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
