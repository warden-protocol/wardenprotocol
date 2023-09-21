import { QueryPoliciesResponse } from "@/proto/fusionchain/policy/query_pb";
import { path, query } from "./common";
import { registry } from "@/proto";

export async function policies() {
  const p = path(["fusionchain", "policy", "policies"]);
  const data = await query(p);
  return QueryPoliciesResponse.fromJson(data, { typeRegistry: registry });
}
