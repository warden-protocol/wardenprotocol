import { Message, AnyMessage } from '@bufbuild/protobuf';
export declare type TestMessage = [AnyMessage, string];
export declare const testMessageEncodeDecode: <T extends Message<T> = AnyMessage>(msg: T, expBase64: string) => void;
export declare const from = "evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr";
export declare const to = "evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz";
export declare const val = "evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm";
export declare const denom = "aevmos";
export declare const hex = "0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71";
//# sourceMappingURL=utils.d.ts.map