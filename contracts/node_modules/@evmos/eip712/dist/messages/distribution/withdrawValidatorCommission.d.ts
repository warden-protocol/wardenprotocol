export declare const MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export interface MsgWithdrawValidatorCommissionInterface {
    type: string;
    value: {
        validator_address: string;
    };
}
export declare function createMsgWithdrawValidatorCommission(validatorAddress: string): {
    type: string;
    value: {
        validator_address: string;
    };
};
//# sourceMappingURL=withdrawValidatorCommission.d.ts.map