import { createMsgSend } from './msgSend';
import { MsgSend } from '../../proto/cosmos/bank/tx';
import { from, to, denom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Bank Module message generation', () => {
    it('correctly wraps MsgSend', () => {
        const amount = '10000000';
        const msg = createMsgSend(from, to, amount, denom);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            from_address: from,
            to_address: to,
            amount: [
                {
                    amount,
                    denom,
                },
            ],
        });
        expect(msg.path).toStrictEqual(MsgSend.typeName);
    });
});
//# sourceMappingURL=bank.spec.js.map