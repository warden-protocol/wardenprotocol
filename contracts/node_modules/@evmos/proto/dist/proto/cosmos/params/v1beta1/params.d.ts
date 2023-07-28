import * as pb_1 from "google-protobuf";
export declare namespace cosmos.params.v1beta1 {
    class ParameterChangeProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            changes?: ParamChange[];
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get changes(): ParamChange[];
        set changes(value: ParamChange[]);
        static fromObject(data: {
            title?: string;
            description?: string;
            changes?: ReturnType<typeof ParamChange.prototype.toObject>[];
        }): ParameterChangeProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            changes?: {
                subspace?: string | undefined;
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ParameterChangeProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ParameterChangeProposal;
    }
    class ParamChange extends pb_1.Message {
        constructor(data?: any[] | {
            subspace?: string;
            key?: string;
            value?: string;
        });
        get subspace(): string;
        set subspace(value: string);
        get key(): string;
        set key(value: string);
        get value(): string;
        set value(value: string);
        static fromObject(data: {
            subspace?: string;
            key?: string;
            value?: string;
        }): ParamChange;
        toObject(): {
            subspace?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ParamChange;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ParamChange;
    }
}
//# sourceMappingURL=params.d.ts.map