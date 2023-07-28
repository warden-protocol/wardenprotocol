import * as pb_1 from "google-protobuf";
export declare namespace ethermint.types.v1 {
    class TxResult extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            tx_index?: number;
            msg_index?: number;
            eth_tx_index?: number;
            failed?: boolean;
            gas_used?: number;
            cumulative_gas_used?: number;
        });
        get height(): number;
        set height(value: number);
        get tx_index(): number;
        set tx_index(value: number);
        get msg_index(): number;
        set msg_index(value: number);
        get eth_tx_index(): number;
        set eth_tx_index(value: number);
        get failed(): boolean;
        set failed(value: boolean);
        get gas_used(): number;
        set gas_used(value: number);
        get cumulative_gas_used(): number;
        set cumulative_gas_used(value: number);
        static fromObject(data: {
            height?: number;
            tx_index?: number;
            msg_index?: number;
            eth_tx_index?: number;
            failed?: boolean;
            gas_used?: number;
            cumulative_gas_used?: number;
        }): TxResult;
        toObject(): {
            height?: number | undefined;
            tx_index?: number | undefined;
            msg_index?: number | undefined;
            eth_tx_index?: number | undefined;
            failed?: boolean | undefined;
            gas_used?: number | undefined;
            cumulative_gas_used?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxResult;
    }
}
//# sourceMappingURL=indexer.d.ts.map