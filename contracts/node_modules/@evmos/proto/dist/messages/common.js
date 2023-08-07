import { Any } from '@bufbuild/protobuf';
export function createAnyMessage(msg) {
    return new Any({
        typeUrl: `/${msg.path}`,
        value: msg.message.toBinary(),
    });
}
//# sourceMappingURL=common.js.map