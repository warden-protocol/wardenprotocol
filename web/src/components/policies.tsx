import { policies } from "@/client/policy";
import { useQuery } from "@tanstack/react-query";
import Policy from "./policy";
import NewPolicyButton from "./new_policy_button";

function Policies() {
  const policiesQ = useQuery({ queryKey: ["policies"], queryFn: () => policies() });
  const count = policiesQ.data?.policies.length;

  // return (
  //   <div>
  //     <div className="flex items-center justify-between">
  //       <span className="ml-2">
  //         {count}{" "}
  //         {count === 1 ? "policy" : "policies"}
  //       </span>
  //       <NewPolicyButton />
  //     </div>

  //     <div className="mt-6">
  //       {policiesQ.data?.policies.map((p) => (
  //         <Policy key={p.policy!.id.toString()} response={p} />
  //       ))}
  //     </div>
  //   </div>
  // )

  return (
    <div className="flex items-center content-center h-[50vh] place-content-center">
      {count ? (
        <div className="mt-6">
          {policiesQ.data?.policies.map((p) => (
            <Policy key={p.policy!.id.toString()} response={p} />
          ))}
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h3 className="mt-2 text-3xl text-gray-900">No policies</h3>
            <p className="mt-1 text-gray-500">Get started by creating a new policy.</p>
            <div className="mt-6">
              <NewPolicyButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );

}



export default Policies;
