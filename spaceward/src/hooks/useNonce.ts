import { useSpaceId } from "./useSpaceId";
import { useQueryHooks } from "./useClient";

export function useNonce() {
	const spaceId = BigInt(useSpaceId().spaceId ?? 0);
	const { isReady, useSpaceById } = useQueryHooks();
	const { data: space } = useSpaceById({
		request: { id: spaceId },
		options: { enabled: isReady && Boolean(spaceId) },
	});

	return BigInt(space?.space?.nonce ?? 0);
}
