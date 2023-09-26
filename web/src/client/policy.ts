import { QueryActionsByAddressResponse, QueryPoliciesResponse, QueryPolicyByIdResponse } from "@/proto/fusionchain/policy/query_pb";
import { path, query } from "./common";
import { registry } from "@/proto";
import { ActionStatus } from "@/proto/fusionchain/policy/action_pb";

export async function policyById(id: string) {
  if (id === "0") {
    return null;
  }

  const p = path(["fusionchain", "policy", "policy_by_id"], { id });
  const data = await query(p);
  return QueryPolicyByIdResponse.fromJson(data, { typeRegistry: registry });
}

export async function policies() {
  const p = path(["fusionchain", "policy", "policies"]);
  const data = await query(p);
  return QueryPoliciesResponse.fromJson(data, { typeRegistry: registry });
}

export async function actionsByAddress(address: string, status: ActionStatus = ActionStatus.UNSPECIFIED) {
  const p = path(["fusionchain", "policy", "actions_by_address"], { address, status });
  const data = await query(p);
  return QueryActionsByAddressResponse.fromJson(data, { typeRegistry: registry });
}
