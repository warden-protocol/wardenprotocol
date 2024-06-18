import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import Key from "./Key";

const Keys = ({ spaceId }: { spaceId: string }) => {
	const { useKeysBySpaceId, isReady } = useQueryHooks();
	const query = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady,
		},
	});

	if (query.status === "loading") {
		return <div className="mb-1">Loading...</div>;
	}

	return (
		<div className="flex gap-2 justify-center">
			{query.data?.keys.map((item, key) => (
				<Key keyValue={item} key={key} />
			))}
		</div>
	);
};

export default Keys;
