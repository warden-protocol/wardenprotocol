import { useQuery } from "@tanstack/react-query";
import { actionsByAddress } from "@/client/policy";
import { ActionStatus } from "@/proto/fusionchain/policy/action_pb";
import { useKeplrAddress } from "@/keplr";
import Action from "./action";

export default function Actions() {
  const addr = useKeplrAddress();
  const q = useQuery(["actions", "pending", addr], () => actionsByAddress(addr, ActionStatus.PENDING));
  if (!q.data) {
    return (
      <p>Loading...</p>
    );
  }
  const count = q.data.pagination?.total.toString();

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="ml-2">
          {count}{" "}
          {count === "1" ? "action" : "actions"}
        </span>
      </div>

      <div className="mt-6">
        {q.data.actions.map((action) => (
          <Action key={action.id.toString()} action={action} />
        ))}
      </div>
    </div>
  );
}

