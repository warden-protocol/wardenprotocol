import { PubKey } from '../../proto/cosmos/crypto/ed25519/keys.js';
export function createED25519PubKey(key) {
    return {
        path: PubKey.typeName,
        message: new PubKey({
            key,
        }),
    };
}
//# sourceMappingURL=keys.js.map