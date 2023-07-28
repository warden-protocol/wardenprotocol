export const MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES = {
    MsgValue: [
        { name: 'from_address', type: 'string' },
        { name: 'to_address', type: 'string' },
        { name: 'start_time', type: 'string' },
        { name: 'lockup_periods', type: 'TypeLockupPeriods[]' },
        { name: 'vesting_periods', type: 'TypeVestingPeriods[]' },
        { name: 'merge', type: 'bool' },
    ],
    TypeLockupPeriods: [
        { name: 'length', type: 'int64' },
        { name: 'amount', type: 'TypeLockupPeriodsAmount[]' },
    ],
    TypeVestingPeriods: [
        { name: 'length', type: 'int64' },
        { name: 'amount', type: 'TypeVestingPeriodsAmount[]' },
    ],
    TypeLockupPeriodsAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
    TypeVestingPeriodsAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgCreateClawbackVestingAccount(from_address, to_address, start_time, lockup_periods, vesting_periods, merge) {
    const date = new Date();
    date.setTime(start_time * 1000);
    let startTime = date.toISOString();
    startTime = startTime.replace('.000Z', 'Z');
    return {
        type: 'evmos/MsgCreateClawbackVestingAccount',
        value: {
            from_address,
            to_address,
            start_time: startTime,
            lockup_periods,
            vesting_periods,
            merge,
        },
    };
}
//# sourceMappingURL=createClawbackVestingAccount.js.map