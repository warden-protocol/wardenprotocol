export declare const MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeLockupPeriods: {
        name: string;
        type: string;
    }[];
    TypeVestingPeriods: {
        name: string;
        type: string;
    }[];
    TypeLockupPeriodsAmount: {
        name: string;
        type: string;
    }[];
    TypeVestingPeriodsAmount: {
        name: string;
        type: string;
    }[];
};
type Coin = {
    denom: string;
    amount: string;
};
type Period = {
    length: number;
    amount: Coin[];
};
export declare function createMsgCreateClawbackVestingAccount(from_address: string, to_address: string, start_time: number, lockup_periods: Period[], vesting_periods: Period[], merge: boolean): {
    type: string;
    value: {
        from_address: string;
        to_address: string;
        start_time: string;
        lockup_periods: Period[];
        vesting_periods: Period[];
        merge: boolean;
    };
};
export {};
//# sourceMappingURL=createClawbackVestingAccount.d.ts.map