export const MSG_CREATE_VALIDATOR_TYPES = {
    TypeDescription: [
        { name: 'moniker', type: 'string' },
        { name: 'identity', type: 'string' },
        { name: 'website', type: 'string' },
        { name: 'security_contact', type: 'string' },
        { name: 'details', type: 'string' },
    ],
    TypeCommission: [
        { name: 'rate', type: 'string' },
        { name: 'max_rate', type: 'string' },
        { name: 'max_change_rate', type: 'string' },
    ],
    TypePubkey: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'string' },
    ],
    MsgValue: [
        { name: 'description', type: 'TypeDescription' },
        { name: 'commission', type: 'TypeCommission' },
        { name: 'min_self_delegation', type: 'string' },
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
        { name: 'pubkey', type: 'TypePubkey' },
        { name: 'value', type: 'TypeValue' },
    ],
    TypeValue: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgCreateValidator(validatorDescription, validatorCommission, minSelfDelegation, delegatorAddress, validatorAddress, amount, denom, pubkey) {
    return {
        type: 'cosmos-sdk/MsgCreateValidator',
        value: {
            commission: {
                max_change_rate: validatorCommission.maxChangeRate,
                max_rate: validatorCommission.maxRate,
                rate: validatorCommission.rate,
            },
            delegator_address: delegatorAddress,
            description: {
                details: validatorDescription.details,
                identity: validatorDescription.identity,
                moniker: validatorDescription.moniker,
                security_contact: validatorDescription.securityContact,
                website: validatorDescription.website,
            },
            min_self_delegation: minSelfDelegation,
            pubkey: {
                type: 'tendermint/PubKeyEd25519',
                value: pubkey,
            },
            validator_address: validatorAddress,
            value: {
                amount,
                denom,
            },
        },
    };
}
//# sourceMappingURL=createValidator.js.map