import { Any, Message, AnyMessage } from '@bufbuild/protobuf';
export interface MessageGenerated<T extends Message<T> = AnyMessage> {
    message: Message<T>;
    path: string;
}
export declare function createAnyMessage(msg: MessageGenerated): Any;
//# sourceMappingURL=common.d.ts.map