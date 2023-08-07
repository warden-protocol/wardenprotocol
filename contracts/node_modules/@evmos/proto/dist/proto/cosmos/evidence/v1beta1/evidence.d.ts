import * as dependency_2 from "./../../../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.evidence.v1beta1 {
    class Equivocation extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            time?: dependency_2.google.protobuf.Timestamp;
            power?: number;
            consensus_address?: string;
        });
        get height(): number;
        set height(value: number);
        get time(): dependency_2.google.protobuf.Timestamp;
        set time(value: dependency_2.google.protobuf.Timestamp);
        get power(): number;
        set power(value: number);
        get consensus_address(): string;
        set consensus_address(value: string);
        static fromObject(data: {
            height?: number;
            time?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
            power?: number;
            consensus_address?: string;
        }): Equivocation;
        toObject(): {
            height?: number | undefined;
            time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            power?: number | undefined;
            consensus_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Equivocation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Equivocation;
    }
}
//# sourceMappingURL=evidence.d.ts.map