import { Coin } from '../../proto/cosmos/base/coin.js';
import { MsgEditValidator, MsgCreateValidator, } from '../../proto/cosmos/staking/tx.js';
import { Description, CommissionRates, } from '../../proto/cosmos/staking/staking.js';
import { createAnyMessage } from '../common.js';
import { createED25519PubKey } from '../crypto/keys.js';
const NOT_MODIFY = '[do-not-modify]';
export function createMsgEditValidator(moniker, identity, website, securityContact, details, validatorAddress, commissionRate, minSelfDelegation) {
    const message = new MsgEditValidator({
        description: new Description({
            moniker: moniker || NOT_MODIFY,
            identity: identity || NOT_MODIFY,
            website: website || NOT_MODIFY,
            securityContact: securityContact || NOT_MODIFY,
            details: details || NOT_MODIFY,
        }),
        validatorAddress,
        commissionRate,
        minSelfDelegation,
    });
    return {
        message,
        path: MsgEditValidator.typeName,
    };
}
export function createMsgCreateValidator(validatorDescription, validatorCommission, minSelfDelegation, delegatorAddress, validatorAddress, amount, denom, pubkey) {
    const pubkeyEncoded = new Uint8Array(Buffer.from(pubkey, 'base64'));
    const commission = new CommissionRates({
        rate: validatorCommission.rate,
        maxRate: validatorCommission.maxRate,
        maxChangeRate: validatorCommission.maxChangeRate,
    });
    const description = new Description({
        moniker: validatorDescription.moniker,
        identity: validatorDescription.identity,
        website: validatorDescription.website,
        securityContact: validatorDescription.securityContact,
        details: validatorDescription.details,
    });
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgCreateValidator({
        minSelfDelegation,
        delegatorAddress,
        validatorAddress,
        value,
        pubkey: createAnyMessage(createED25519PubKey(pubkeyEncoded)),
        description,
        commission,
    });
    return {
        message,
        path: MsgCreateValidator.typeName,
    };
}
//# sourceMappingURL=validator.js.map