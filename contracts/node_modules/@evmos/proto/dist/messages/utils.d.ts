import { Message } from 'google-protobuf';
import * as google from '../proto/google/protobuf/any';
import * as pubkey from '../proto/cosmos/crypto/ed25519/keys';
export interface MessageGenerated {
    message: Message;
    path: string;
}
export declare function createAnyMessage(msg: MessageGenerated): google.google.protobuf.Any;
export declare function createed25519pubkey(key: Uint8Array): {
    path: string;
    message: pubkey.cosmos.crypto.ed25519.PubKey;
};
//# sourceMappingURL=utils.d.ts.map