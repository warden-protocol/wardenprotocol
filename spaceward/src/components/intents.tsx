import Intent from "./intent";
import useWardenIntent from "@/hooks/useWardenIntent";
import SpaceIntentCard from "./space-intent-card";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import useWardenWarden from "@/hooks/useWardenWarden";

function Intents() {
	const { spaceId } = useSpaceId();
	const { QuerySpaceByAddress } = useWardenWarden();
	const wsQuery = QuerySpaceByAddress({ address: spaceId }, {});
	const space = wsQuery.data?.space as Required<SpaceModel>;
	const { QueryIntents } = useWardenIntent();
	const intentsQ = QueryIntents({}, {}, 10);

	const flattened =
		intentsQ.data?.pages.flatMap((p) => p.intents || []) || [];
	const count = flattened.length;

	return (
		<div className="flex flex-col">
			<div>{space && <SpaceIntentCard space={space} />}</div>
			{count ? (
				<div className="mt-6 space-y-4">
					{flattened.map((intent) => (
						<Intent key={intent.intent!.id!} response={intent} />
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Intents;
