import { createIBCMsgTransfer } from './ibcMsgTransfer';
import { MsgTransfer } from '../../proto/cosmos-ibc/ibc/applications/tx';
import { from, to, denom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test IBC Module message generation', () => {
    it('correctly wraps MsgTransfer', () => {
        const params = {
            sourcePort: 'transfer',
            sourceChannel: 'channel-0',
            amount: '1000000',
            denom,
            sender: from,
            receiver: to,
            revisionNumber: 10,
            revisionHeight: 60,
            timeoutTimestamp: '999',
        };
        const msg = createIBCMsgTransfer(params.sourcePort, params.sourceChannel, params.amount, params.denom, params.sender, params.receiver, params.revisionNumber, params.revisionHeight, params.timeoutTimestamp);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            source_port: params.sourcePort,
            source_channel: params.sourceChannel,
            token: {
                amount: params.amount,
                denom: params.denom,
            },
            sender: params.sender,
            receiver: params.receiver,
            timeout_height: {
                revision_number: params.revisionNumber.toString(),
                revision_height: params.revisionHeight.toString(),
            },
            timeout_timestamp: params.timeoutTimestamp.toString(),
            memo: '',
        });
        expect(msg.path).toStrictEqual(MsgTransfer.typeName);
    });
});
//# sourceMappingURL=ibc.spec.js.map