import Intent from "./";
import useWardenIntent from "@/hooks/useWardenIntent";
import SpaceIntentCard from "../../components/space-intent-card";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";

export function Intents() {
    const { spaceId } = useSpaceId();
    const { QuerySpaceById } = useWardenWardenV1Beta2();
    const wsQuery = QuerySpaceById({ id: spaceId }, {});
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
                        <Intent key={intent.id!} intent={intent} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
