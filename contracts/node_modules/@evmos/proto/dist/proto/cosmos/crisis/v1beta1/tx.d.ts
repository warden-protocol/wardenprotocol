import * as pb_1 from "google-protobuf";
export declare namespace cosmos.crisis.v1beta1 {
    class MsgVerifyInvariant extends pb_1.Message {
        constructor(data?: any[] | {
            sender?: string;
            invariant_module_name?: string;
            invariant_route?: string;
        });
        get sender(): string;
        set sender(value: string);
        get invariant_module_name(): string;
        set invariant_module_name(value: string);
        get invariant_route(): string;
        set invariant_route(value: string);
        static fromObject(data: {
            sender?: string;
            invariant_module_name?: string;
            invariant_route?: string;
        }): MsgVerifyInvariant;
        toObject(): {
            sender?: string | undefined;
            invariant_module_name?: string | undefined;
            invariant_route?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVerifyInvariant;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVerifyInvariant;
    }
    class MsgVerifyInvariantResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgVerifyInvariantResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVerifyInvariantResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVerifyInvariantResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map