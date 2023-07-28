import * as pb_1 from "google-protobuf";
export declare namespace cosmos.genutil.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            gen_txs?: Uint8Array[];
        });
        get gen_txs(): Uint8Array[];
        set gen_txs(value: Uint8Array[]);
        static fromObject(data: {
            gen_txs?: Uint8Array[];
        }): GenesisState;
        toObject(): {
            gen_txs?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map