import { intents } from "@/client/intent";
import { useQuery } from "@tanstack/react-query";
import Intent from "./intent";
import NewIntentButton from "./new-intent-button";

function Intents() {
  const intentsQ = useQuery({ queryKey: ["intents"], queryFn: () => intents() });
  const count = intentsQ.data?.intents.length;

  // return (
  //   <div>
  //     <div className="flex items-center justify-between">
  //       <span className="ml-2">
  //         {count}{" "}
  //         {count === 1 ? "intent" : "intents"}
  //       </span>
  //       <NewIntentButton />
  //     </div>

  //     <div className="mt-6">
  //       {intentsQ.data?.intents.map((p) => (
  //         <Intent key={p.intent!.id.toString()} response={p} />
  //       ))}
  //     </div>
  //   </div>
  // )

  return (
    <div className="flex flex-col">
      <div>
        <h3>TODO: Show which intents are assigned to the current space and give the option to change the intents from this screen</h3>
      </div>
      {count ? (
        <div className="mt-6 space-y-4">
          {intentsQ.data?.intents.map((p) => (
            <Intent key={p.intent!.id.toString()} response={p} />
          ))}
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h3 className="mt-2 text-3xl text-gray-900">No intents</h3>
            <p className="mt-1 text-gray-500">Get started by creating a new intent.</p>
            <div className="mt-6">
              <NewIntentButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );

}



export default Intents;
