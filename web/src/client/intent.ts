import { QueryActionsByAddressResponse, QueryIntentsResponse, QueryIntentByIdResponse } from "@/proto/wardenprotocol/intent/query_pb";
import { path, query } from "./common";
import { registry } from "@/proto";
import { ActionStatus } from "@/proto/wardenprotocol/intent/action_pb";

export async function intentById(id: string) {
  if (id === "0") {
    return null;
  }

  const p = path(["wardenprotocol", "intent", "intent_by_id"], { id });
  const data = await query(p);
  return QueryIntentByIdResponse.fromJson(data, { typeRegistry: registry });
}

export async function intents() {
  const p = path(["wardenprotocol", "intent", "intents"]);
  const data = await query(p);
  return QueryIntentsResponse.fromJson(data, { typeRegistry: registry });
}

export async function actionsByAddress(address: string, status: ActionStatus = ActionStatus.UNSPECIFIED) {
  const p = path(["wardenprotocol", "intent", "actions_by_address"], { address, status });
  const data = await query(p);
  return QueryActionsByAddressResponse.fromJson(data, { typeRegistry: registry });
}
