import { genTestEmptyMsg } from './cosmos-utils';
describe('test Protobuf default value behavior', () => {
    it('omits default values', () => {
        const emptyMsg = genTestEmptyMsg();
        expect(emptyMsg.toBinary()).toStrictEqual(new Uint8Array([]));
    });
});
//# sourceMappingURL=proto.spec.js.map