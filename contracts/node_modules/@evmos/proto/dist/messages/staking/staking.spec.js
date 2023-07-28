import { createMsgDelegate, createMsgBeginRedelegate, createMsgUndelegate, } from './staking';
import { createMsgCreateValidator, createMsgEditValidator } from './validator';
import { MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgEditValidator, MsgCreateValidator, } from '../../proto/cosmos/staking/tx';
import { PubKey } from '../../proto/cosmos/crypto/ed25519/keys';
import { from, val, val2, denom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Staking Module message generation', () => {
    it('correctly wraps MsgDelegate', () => {
        const amount = '10000';
        const msg = createMsgDelegate(from, val, amount, denom);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            delegator_address: from,
            validator_address: val,
            amount: {
                amount,
                denom,
            },
        });
        expect(msg.path).toStrictEqual(MsgDelegate.typeName);
    });
    it('correctly wraps MsgBeginRedelegate', () => {
        const amount = '8500';
        const msg = createMsgBeginRedelegate(from, val, val2, amount, denom);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            delegator_address: from,
            validator_src_address: val,
            validator_dst_address: val2,
            amount: {
                amount,
                denom,
            },
        });
        expect(msg.path).toStrictEqual(MsgBeginRedelegate.typeName);
    });
    it('correctly wraps MsgUndelegate', () => {
        const amount = '99999';
        const msg = createMsgUndelegate(from, val, amount, denom);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            delegator_address: from,
            validator_address: val,
            amount: {
                amount,
                denom,
            },
        });
        expect(msg.path).toStrictEqual(MsgUndelegate.typeName);
    });
});
describe('test Staking Module Validator message generation', () => {
    it('correctly wraps MsgCreateValidator', () => {
        const description = {
            moniker: 'validator moniker',
            identity: 'validator identity',
            website: 'validator website',
            securityContact: 'validator contact',
            details: 'validator details',
        };
        const commission = {
            rate: '0.1',
            maxRate: '0.2',
            maxChangeRate: '0.05',
        };
        const amount = '10000000000';
        const minSelfDelegation = '1';
        const pubKeyBytes = new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253,
        ]);
        const msg = createMsgCreateValidator(description, commission, minSelfDelegation, from, val, amount, denom, Buffer.from(pubKeyBytes).toString('base64'));
        expect(msg.message.toJson(Object.assign(Object.assign({}, JSONOptions), { useProtoFieldName: false }))).toStrictEqual({
            description,
            commission,
            minSelfDelegation,
            delegatorAddress: from,
            validatorAddress: val,
            pubkey: {
                '@type': `/${PubKey.typeName}`,
                key: Buffer.from(pubKeyBytes).toString('base64'),
            },
            value: {
                amount,
                denom,
            },
        });
        expect(msg.path).toStrictEqual(MsgCreateValidator.typeName);
    });
    it('correctly wraps MsgEditValidator', () => {
        const newMoniker = 'new-moniker';
        const newIdentity = 'new-identity';
        const newWebsite = 'new-website';
        const newSecurityContact = 'new-security-contact';
        const newDetails = 'new-details';
        const newValAddr = val;
        const newCommissionRate = '0.5';
        const newMinSelfDelegation = '10';
        const msg = createMsgEditValidator(newMoniker, newIdentity, newWebsite, newSecurityContact, newDetails, newValAddr, newCommissionRate, newMinSelfDelegation);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            description: {
                moniker: newMoniker,
                identity: newIdentity,
                website: newWebsite,
                security_contact: newSecurityContact,
                details: newDetails,
            },
            validator_address: newValAddr,
            commission_rate: newCommissionRate,
            min_self_delegation: newMinSelfDelegation,
        });
        expect(msg.path).toStrictEqual(MsgEditValidator.typeName);
    });
    it('correctly wraps MsgEditValidator with missing fields', () => {
        const newMoniker = 'new-moniker';
        const newIdentity = 'new-identity';
        const newWebsite = 'new-website';
        const doNotModify = '[do-not-modify]';
        const msg = createMsgEditValidator(newMoniker, newIdentity, newWebsite, undefined, undefined, undefined, undefined, undefined);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            description: {
                moniker: newMoniker,
                identity: newIdentity,
                website: newWebsite,
                security_contact: doNotModify,
                details: doNotModify,
            },
            validator_address: '',
            commission_rate: '',
            min_self_delegation: '',
        });
        expect(msg.path).toStrictEqual(MsgEditValidator.typeName);
    });
});
//# sourceMappingURL=staking.spec.js.map