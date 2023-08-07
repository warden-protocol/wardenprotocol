import { Message } from 'google-protobuf';
import * as google from '../proto/google/protobuf/any';
export interface MessageGenerated {
    message: Message;
    path: string;
}
export declare function createAnyMessage(msg: MessageGenerated): google.google.protobuf.Any;
//# sourceMappingURL=utils.d.ts.map