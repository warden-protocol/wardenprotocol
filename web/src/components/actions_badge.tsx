import { useQuery } from "@tanstack/react-query";
import { useKeplrAddress } from "../keplr";
import { actionsByAddress } from "@/client/intent";
import { ActionStatus } from "@/proto/wardenprotocol/intent/action_pb";
import { Badge } from "@/components/ui/badge";

function ActionsBadge() {
  const addr = useKeplrAddress();
  const q = useQuery({
    queryKey: ["actions", "pending", addr],
    queryFn: () => actionsByAddress(addr, ActionStatus.PENDING)
  });

  if (!q.data) {
    return null;
  }

  if (!q.data.actions.length) {
    return null;
  }

  return <Badge variant="destructive">{q.data.actions.length}</Badge>;
}

export default ActionsBadge;
