import { createMsgSend } from '../messages/bank/msgSend';
import { createBody, createFee, createSignerInfo, createAuthInfo, createSigDoc, createTransaction, SIGN_DIRECT, } from './transaction';
import { JSONOptions } from '../proto/tests/common';
describe('transaction tests', () => {
    it('createBody test', () => {
        const msgSend = createMsgSend('evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89', 'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q', '69420', 'aphoton');
        const res = createBody(msgSend, 'this is a test');
        expect(res.toJson(JSONOptions)).toStrictEqual({
            messages: [
                {
                    '@type': '/cosmos.bank.v1beta1.MsgSend',
                    amount: [
                        {
                            amount: '69420',
                            denom: 'aphoton',
                        },
                    ],
                    from_address: 'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
                    to_address: 'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
                },
            ],
            memo: 'this is a test',
            extension_options: [],
            non_critical_extension_options: [],
            timeout_height: '0',
        });
    });
    it('createFee test', () => {
        const value = '20';
        const denom = 'aphoton';
        const gas = 20000;
        const fee = createFee(value, denom, gas);
        expect(fee.toJson(JSONOptions)).toStrictEqual({
            amount: [
                {
                    amount: value,
                    denom,
                },
            ],
            gas_limit: gas.toString(),
            granter: '',
            payer: '',
        });
    });
    it('createSignerInfo test', () => {
        const pubkey = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
            105, 23,
        ]);
        const sequence = 0;
        const info = createSignerInfo('ethsecp256', pubkey, sequence, SIGN_DIRECT);
        expect(info.toJson(JSONOptions)).toStrictEqual({
            public_key: {
                '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
                key: Buffer.from(pubkey).toString('base64'),
            },
            mode_info: { single: { mode: 1 } },
            sequence: '0',
        });
    });
    it('createAuthInfo test', () => {
        const pubkey = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
            105, 23,
        ]);
        const sequence = 10;
        const info = createSignerInfo('ethsecp256', pubkey, sequence, SIGN_DIRECT);
        const value = '20';
        const denom = 'aphoton';
        const gas = 20000;
        const fee = createFee(value, denom, gas);
        const msg = createAuthInfo(info, fee);
        expect(msg.toJson(JSONOptions)).toStrictEqual({
            signer_infos: [
                {
                    public_key: {
                        '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
                        key: Buffer.from(pubkey).toString('base64'),
                    },
                    mode_info: { single: { mode: 1 } },
                    sequence: '10',
                },
            ],
            fee: {
                amount: [
                    {
                        amount: value,
                        denom,
                    },
                ],
                gas_limit: gas.toString(),
                granter: '',
                payer: '',
            },
        });
    });
    it('createSigDoc test', () => {
        const msgSend = createMsgSend('evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89', 'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q', '69420', 'aphoton');
        const body = createBody(msgSend, 'this is a test');
        const pubkey = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
            105, 23,
        ]);
        const sequence = 0;
        const info = createSignerInfo('ethsecp256', pubkey, sequence, 1);
        const value = '20';
        const denom = 'aphoton';
        const gas = 20000;
        const fee = createFee(value, denom, gas);
        const authInfo = createAuthInfo(info, fee);
        const chainId = 'evmos_9000-1';
        const accountNumber = 0;
        const res = createSigDoc(body.toBinary(), authInfo.toBinary(), chainId, accountNumber);
        expect(res.toJson(JSONOptions)).toStrictEqual({
            body_bytes: 'Co4BChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEm4KLGV2bW9zMThsdzcwNHpleWc1enMwOThscTd4NnlwZmtmanFsenpsbjVxaDg5Eixldm1vczFuZGZhZ2dnZGtndjl2Yzd3aGE1Z2oyenpybnlxZDNyNzA0bHI0cRoQCgdhcGhvdG9uEgU2OTQyMBIOdGhpcyBpcyBhIHRlc3Q=',
            auth_info_bytes: 'ClkKUQooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIlCiMKIQKIsfUxuHhx28A3KVGHJVyuS6DEvDfKcmEFshQK/Q5pFxIECgIIARITCg0KB2FwaG90b24SAjIwEKCcAQ==',
            chain_id: chainId,
            account_number: accountNumber.toString(),
        });
    });
});
describe('transaction eip712', () => {
    it('valid eip712', () => {
        const msg = createMsgSend('ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm', 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm', '1', 'aphoton');
        const tx = createTransaction(msg, '', '20', 'aphoton', 200000, 'ethsecp256', 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ', 1, 9, '');
        expect(Buffer.from(tx.legacyAmino.body.toBinary()).toString('base64')).toBe('CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aDAoHYXBob3RvbhIBMQ==');
        expect(Buffer.from(tx.legacyAmino.authInfo.toBinary()).toString('base64')).toBe('ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCH8YARITCg0KB2FwaG90b24SAjIwEMCaDA==');
        expect(Buffer.from(tx.signDirect.body.toBinary()).toString('base64')).toBe('CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aDAoHYXBob3RvbhIBMQ==');
        expect(Buffer.from(tx.signDirect.authInfo.toBinary()).toString('base64')).toBe('ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCAEYARITCg0KB2FwaG90b24SAjIwEMCaDA==');
    });
});
//# sourceMappingURL=transaction.spec.js.map