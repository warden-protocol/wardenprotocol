import * as pb_1 from "google-protobuf";
export declare namespace tendermint.version {
    class App extends pb_1.Message {
        constructor(data?: any[] | {
            protocol?: number;
            software?: string;
        });
        get protocol(): number;
        set protocol(value: number);
        get software(): string;
        set software(value: string);
        static fromObject(data: {
            protocol?: number;
            software?: string;
        }): App;
        toObject(): {
            protocol?: number | undefined;
            software?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): App;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): App;
    }
    class Consensus extends pb_1.Message {
        constructor(data?: any[] | {
            block?: number;
            app?: number;
        });
        get block(): number;
        set block(value: number);
        get app(): number;
        set app(value: number);
        static fromObject(data: {
            block?: number;
            app?: number;
        }): Consensus;
        toObject(): {
            block?: number | undefined;
            app?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Consensus;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Consensus;
    }
}
//# sourceMappingURL=types.d.ts.map