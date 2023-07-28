export declare const MSG_CREATE_VALIDATOR_TYPES: {
    TypeDescription: {
        name: string;
        type: string;
    }[];
    TypeCommission: {
        name: string;
        type: string;
    }[];
    TypePubkey: {
        name: string;
        type: string;
    }[];
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgCreateValidator(validatorDescription: {
    moniker: string;
    identity: string;
    website: string;
    securityContact: string;
    details: string;
}, validatorCommission: {
    rate: string;
    maxRate: string;
    maxChangeRate: string;
}, minSelfDelegation: string, delegatorAddress: string, validatorAddress: string, amount: string, denom: string, pubkey: string): {
    type: string;
    value: {
        commission: {
            max_change_rate: string;
            max_rate: string;
            rate: string;
        };
        delegator_address: string;
        description: {
            details: string;
            identity: string;
            moniker: string;
            security_contact: string;
            website: string;
        };
        min_self_delegation: string;
        pubkey: {
            type: string;
            value: string;
        };
        validator_address: string;
        value: {
            amount: string;
            denom: string;
        };
    };
};
//# sourceMappingURL=createValidator.d.ts.map