import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.controller.v1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            controller_enabled?: boolean;
        });
        get controller_enabled(): boolean;
        set controller_enabled(value: boolean);
        static fromObject(data: {
            controller_enabled?: boolean;
        }): Params;
        toObject(): {
            controller_enabled?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=controller.d.ts.map