export declare const MSG_TYPES: {
    MSG_SEND: string;
    MSG_VOTE: string;
    MSG_DELEGATE: string;
};
export declare function getFeePayerFromMsg(msg: any): any;
export declare function eip712MessageType(msg: any): {
    EIP712Domain: {
        name: string;
        type: string;
    }[];
    Tx: {
        name: string;
        type: string;
    }[];
    Fee: {
        name: string;
        type: string;
    }[];
    Coin: {
        name: string;
        type: string;
    }[];
    Msg: {
        name: string;
        type: string;
    }[];
};
export declare function decodeAminoSignDoc(bytes: Uint8Array): {
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
//# sourceMappingURL=decodeAmino.d.ts.map