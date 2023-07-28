import { createED25519PubKey } from './keys';
import { PubKey } from '../../proto/cosmos/crypto/ed25519/keys';
import { JSONOptions } from '../../proto/tests/common';
describe('test Crypto Module message generation', () => {
    it('correctly wraps ED25519PubKey', () => {
        const bytes = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253,
        ]);
        expect(bytes).toHaveLength(32);
        const pubkey = createED25519PubKey(bytes);
        expect(pubkey.message.toJson(JSONOptions)).toStrictEqual({
            key: Buffer.from(bytes).toString('base64'),
        });
        expect(pubkey.path).toStrictEqual(PubKey.typeName);
    });
});
//# sourceMappingURL=crypto.spec.js.map