import * as pb_1 from "google-protobuf";
export declare namespace tendermint.crypto {
    class PublicKey extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            ed25519?: Uint8Array;
            secp256k1?: never;
        } | {
            ed25519?: never;
            secp256k1?: Uint8Array;
        }))));
        get ed25519(): Uint8Array;
        set ed25519(value: Uint8Array);
        get secp256k1(): Uint8Array;
        set secp256k1(value: Uint8Array);
        get sum(): "secp256k1" | "none" | "ed25519";
        static fromObject(data: {
            ed25519?: Uint8Array;
            secp256k1?: Uint8Array;
        }): PublicKey;
        toObject(): {
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PublicKey;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PublicKey;
    }
}
//# sourceMappingURL=keys.d.ts.map