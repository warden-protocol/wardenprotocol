import { PubKey } from '../types/cosmos/crypto/keys/ed25519';
export function createED25519PubKey(key) {
    return {
        path: PubKey.typeName,
        message: new PubKey({
            key,
        }),
    };
}
//# sourceMappingURL=keys.js.map