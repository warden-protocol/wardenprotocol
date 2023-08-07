export declare const PROTO_MSG_TYPES: {
    MSG_SEND: string;
    MSG_VOTE: string;
    MSG_DELEGATE: string;
};
export declare function decodeProtobufSignDoc(bytes: Uint8Array): {
    types: object;
    primaryType: string;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
        salt: string;
    };
    message: object;
};
//# sourceMappingURL=decodeProtobuf.d.ts.map