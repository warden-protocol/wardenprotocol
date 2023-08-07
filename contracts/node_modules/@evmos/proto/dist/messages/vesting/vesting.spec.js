import { createMsgClawback } from './msgClawback';
import { createMsgCreateClawbackVestingAccount } from './msgCreateClawbackVestingAccount';
import { MsgCreateClawbackVestingAccount, MsgClawback, } from '../../proto/evmos/vesting/tx';
import { from, to, to2, denom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Vesting Module message generation', () => {
    it('correctly wraps msgClawback', () => {
        const msg = createMsgClawback(from, to, to2);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            funder_address: from,
            account_address: to,
            dest_address: to2,
        });
        expect(msg.path).toStrictEqual(MsgClawback.typeName);
    });
    it('correctly wraps msgClawback without dest address', () => {
        const msg = createMsgClawback(from, to);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            funder_address: from,
            account_address: to,
            dest_address: '',
        });
        expect(msg.path).toStrictEqual(MsgClawback.typeName);
    });
    it('correctly wraps msgCreateClawbackVestingAccount', () => {
        const vestingPeriods = new Array(10).fill(undefined).map((_, i) => ({
            length: i * 100,
            amount: [
                {
                    denom,
                    amount: i.toString(),
                },
            ],
        }));
        const lockupPeriods = vestingPeriods.map((period) => ({
            length: period.length + 50,
            amount: period.amount,
        }));
        const params = {
            from,
            to,
            startTime: 1000,
            timestamp: '1970-01-01T00:16:40Z',
            lockupPeriods,
            vestingPeriods,
            merge: true,
        };
        const msg = createMsgCreateClawbackVestingAccount(params.from, params.to, params.startTime, params.lockupPeriods, params.vestingPeriods, params.merge);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            from_address: params.from,
            to_address: params.to,
            start_time: params.timestamp,
            lockup_periods: params.lockupPeriods.map((period) => ({
                length: period.length.toString(),
                amount: period.amount,
            })),
            vesting_periods: params.vestingPeriods.map((period) => ({
                length: period.length.toString(),
                amount: period.amount,
            })),
            merge: params.merge,
        });
        expect(msg.path).toStrictEqual(MsgCreateClawbackVestingAccount.typeName);
    });
});
//# sourceMappingURL=vesting.spec.js.map