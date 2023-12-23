import { useQuery } from "@tanstack/react-query";
import { actionsByAddress } from "@/client/policy";
import { ActionStatus } from "@/proto/fusionchain/policy/action_pb";
import { useKeplrAddress } from "@/keplr";
import Action from "./action";

export default function Actions() {
  const addr = useKeplrAddress();
  const q = useQuery({
    queryKey: ["actions", "pending", addr],
    queryFn: () => actionsByAddress(addr, ActionStatus.PENDING),
  });
  if (!q.data) {
    return (
      <p>Loading...</p>
    );
  }
  const count = q.data.pagination?.total.toString();

  // return (
  //   <div>
  //     <div className="flex items-center justify-between">
  //       <span className="ml-2">
  //         {count}{" "}
  //         {count === "1" ? "action" : "actions"}
  //       </span>
  //     </div>

  //     <div className="mt-6">
  //       {q.data.actions.map((action) => (
  //         <Action key={action.id.toString()} action={action} />
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex items-center content-center h-[50vh] place-content-center">
      {count && count !== "0" ? (
        <div className="mt-6">
          {q.data.actions.map((action) => (
            <Action key={action.id.toString()} action={action} />
          ))}
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h3 className="mt-2 text-3xl text-gray-900">No Pending Actions</h3>
            {/* <p className="mt-1 text-gray-500">Get started by creating a new workspace.</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

