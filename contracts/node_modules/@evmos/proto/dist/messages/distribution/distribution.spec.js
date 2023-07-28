import { createMsgWithdrawDelegatorReward, createMsgWithdrawValidatorCommission, createMsgSetWithdrawAddress, } from './distribution';
import { MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgSetWithdrawAddress, } from '../../proto/cosmos/distribution/tx';
import { from, to, val } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Distribution Module message generation', () => {
    it('correctly wraps msgWithdrawDelegatorReward', () => {
        const msg = createMsgWithdrawDelegatorReward(from, val);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            delegator_address: from,
            validator_address: val,
        });
        expect(msg.path).toStrictEqual(MsgWithdrawDelegatorReward.typeName);
    });
    it('correctly wraps msgWithdrawValidatorCommission', () => {
        const msg = createMsgWithdrawValidatorCommission(val);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            validator_address: val,
        });
        expect(msg.path).toStrictEqual(MsgWithdrawValidatorCommission.typeName);
    });
    it('correctly wraps msgSetWithdrawAddress', () => {
        const msg = createMsgSetWithdrawAddress(from, to);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            delegator_address: from,
            withdraw_address: to,
        });
        expect(msg.path).toStrictEqual(MsgSetWithdrawAddress.typeName);
    });
});
//# sourceMappingURL=distribution.spec.js.map