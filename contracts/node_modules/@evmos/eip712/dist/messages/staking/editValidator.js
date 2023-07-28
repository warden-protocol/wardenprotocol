const NOT_MODIFY = '[do-not-modify]';
export const MSG_EDIT_VALIDATOR_TYPES = {
    TypeDescription: [
        { name: 'moniker', type: 'string' },
        { name: 'identity', type: 'string' },
        { name: 'website', type: 'string' },
        { name: 'security_contact', type: 'string' },
        { name: 'details', type: 'string' },
    ],
    MsgValue: [
        { name: 'description', type: 'TypeDescription' },
        { name: 'validator_address', type: 'string' },
        { name: 'commission_rate', type: 'string' },
        { name: 'min_self_delegation', type: 'string' },
    ],
};
export function createMsgEditValidator(moniker, identity, website, securityContact, details, validatorAddress, commissionRate, minSelfDelegation) {
    return {
        type: 'cosmos-sdk/MsgEditValidator',
        value: {
            description: {
                moniker: moniker || NOT_MODIFY,
                identity: identity || NOT_MODIFY,
                website: website || NOT_MODIFY,
                security_contact: securityContact || NOT_MODIFY,
                details: details || NOT_MODIFY,
            },
            validator_address: validatorAddress,
            commission_rate: commissionRate || '<nil>',
            min_self_delegation: minSelfDelegation || '<nil>',
        },
    };
}
//# sourceMappingURL=editValidator.js.map