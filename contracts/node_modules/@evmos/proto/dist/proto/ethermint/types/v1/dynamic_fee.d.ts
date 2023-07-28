import * as pb_1 from "google-protobuf";
export declare namespace ethermint.types.v1 {
    class ExtensionOptionDynamicFeeTx extends pb_1.Message {
        constructor(data?: any[] | {
            max_priority_price?: string;
        });
        get max_priority_price(): string;
        set max_priority_price(value: string);
        static fromObject(data: {
            max_priority_price?: string;
        }): ExtensionOptionDynamicFeeTx;
        toObject(): {
            max_priority_price?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExtensionOptionDynamicFeeTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExtensionOptionDynamicFeeTx;
    }
}
//# sourceMappingURL=dynamic_fee.d.ts.map