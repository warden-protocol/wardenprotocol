import Intent from "./intent";
import NewIntentButton from "./new-intent-button";
import useWardenIntent from "@/hooks/useWardenIntent";

function Intents() {
  const { QueryIntents } = useWardenIntent();
  const intentsQ = QueryIntents({}, {}, 10);

  const flattened = intentsQ.data?.pages.flatMap((p) => p.intents || []) || [];
  const count = flattened.length;

  return (
    <div className="flex flex-col">
      <div>
        <h3>TODO: Show which intents are assigned to the current space and give the option to change the intents from this screen</h3>
      </div>
      {count ? (
        <div className="mt-6 space-y-4">
          {flattened.map((intent) => (
            <Intent key={intent.intent!.id!} response={intent} />
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
