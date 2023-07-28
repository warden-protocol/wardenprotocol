import * as pb_1 from "google-protobuf";
export declare namespace ethermint.types.v1 {
    class ExtensionOptionsWeb3Tx extends pb_1.Message {
        constructor(data?: any[] | {
            typed_data_chain_id?: number;
            fee_payer?: string;
            fee_payer_sig?: Uint8Array;
        });
        get typed_data_chain_id(): number;
        set typed_data_chain_id(value: number);
        get fee_payer(): string;
        set fee_payer(value: string);
        get fee_payer_sig(): Uint8Array;
        set fee_payer_sig(value: Uint8Array);
        static fromObject(data: {
            typed_data_chain_id?: number;
            fee_payer?: string;
            fee_payer_sig?: Uint8Array;
        }): ExtensionOptionsWeb3Tx;
        toObject(): {
            typed_data_chain_id?: number | undefined;
            fee_payer?: string | undefined;
            fee_payer_sig?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExtensionOptionsWeb3Tx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExtensionOptionsWeb3Tx;
    }
}
//# sourceMappingURL=web3.d.ts.map