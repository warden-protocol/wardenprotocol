import { createWeb3Extension } from './web3Extension';
import { ExtensionOptionsWeb3Tx } from '../../proto/ethermint/types/web3';
import { from } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Web3Extension message generation', () => {
    it('correctly wraps web3Extension', () => {
        const chainId = 9001;
        const feePayer = from;
        const bytes = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 10,
            36, 22, 16, 17, 24, 39, 154, 190, 123, 269, 192, 95, 45, 82, 155, 57, 12,
            124, 25, 130, 96, 88, 5, 2, 114, 17, 25, 128, 90, 70, 233, 23,
        ]);
        expect(bytes).toHaveLength(65);
        const ext = createWeb3Extension(chainId, feePayer, bytes);
        expect(ext.message.toJson(JSONOptions)).toStrictEqual({
            typed_data_chain_id: chainId.toString(),
            fee_payer: feePayer,
            fee_payer_sig: Buffer.from(bytes).toString('base64'),
        });
        expect(ext.path).toStrictEqual(ExtensionOptionsWeb3Tx.typeName);
    });
});
//# sourceMappingURL=web3Extension.spec.js.map