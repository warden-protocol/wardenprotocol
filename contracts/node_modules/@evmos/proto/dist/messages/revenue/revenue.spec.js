import { createMsgRegisterRevenue } from './msgRegisterRevenue';
import { createMsgCancelRevenue } from './msgCancelRevenue';
import { createMsgUpdateRevenue } from './msgUpdateRevenue';
import { MsgRegisterRevenue, MsgCancelRevenue, MsgUpdateRevenue, } from '../../proto/evmos/revenue/tx';
import { from, hex, to } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Revenue Module message generation', () => {
    it('correctly wraps MsgRegisterRevenue', () => {
        const nonces = [10, 15];
        const msg = createMsgRegisterRevenue(hex, from, to, nonces);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            contract_address: hex,
            deployer_address: from,
            withdrawer_address: to,
            nonces: nonces.map((n) => n.toString()),
        });
        expect(msg.path).toStrictEqual(MsgRegisterRevenue.typeName);
    });
    it('correctly wraps MsgCancelRevenue', () => {
        const msg = createMsgCancelRevenue(hex, from);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            contract_address: hex,
            deployer_address: from,
        });
        expect(msg.path).toStrictEqual(MsgCancelRevenue.typeName);
    });
    it('correctly wraps MsgUpdateRevenue', () => {
        const msg = createMsgUpdateRevenue(hex, from, to);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            contract_address: hex,
            deployer_address: from,
            withdrawer_address: to,
        });
        expect(msg.path).toStrictEqual(MsgUpdateRevenue.typeName);
    });
});
//# sourceMappingURL=revenue.spec.js.map