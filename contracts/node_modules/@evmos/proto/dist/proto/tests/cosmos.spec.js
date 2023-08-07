import { genTestGrantAuthorization, genTestMsgSend, genTestMsgDelegate, genTestMsgVote, genTestMsgWithdrawDelegatorReward, genTestMsgIBCTransfer, } from './cosmos-utils';
import { testMessageEncodeDecode } from './utils';
describe('test Protobuf encode/decode', () => {
    it('handles authz types', () => {
        const [msg, expBase64] = genTestGrantAuthorization();
        testMessageEncodeDecode(msg, expBase64);
    });
    it('handles bank types', () => {
        const [msg, expBase64] = genTestMsgSend();
        testMessageEncodeDecode(msg, expBase64);
    });
    it('handles distribution types', () => {
        const [msg, expBase64] = genTestMsgWithdrawDelegatorReward();
        testMessageEncodeDecode(msg, expBase64);
    });
    it('handles gov types', () => {
        const [msg, expBase64] = genTestMsgVote();
        testMessageEncodeDecode(msg, expBase64);
    });
    it('handles stake types', () => {
        const [msg, expBase64] = genTestMsgDelegate();
        testMessageEncodeDecode(msg, expBase64);
    });
    it('handles ibc types', () => {
        const [msg, expBase64] = genTestMsgIBCTransfer();
        testMessageEncodeDecode(msg, expBase64);
    });
});
//# sourceMappingURL=cosmos.spec.js.map