import * as dependency_1 from "./transfer";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.transfer.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            denom_traces?: dependency_1.ibc.applications.transfer.v1.DenomTrace[];
            params?: dependency_1.ibc.applications.transfer.v1.Params;
        });
        get port_id(): string;
        set port_id(value: string);
        get denom_traces(): dependency_1.ibc.applications.transfer.v1.DenomTrace[];
        set denom_traces(value: dependency_1.ibc.applications.transfer.v1.DenomTrace[]);
        get params(): dependency_1.ibc.applications.transfer.v1.Params;
        set params(value: dependency_1.ibc.applications.transfer.v1.Params);
        static fromObject(data: {
            port_id?: string;
            denom_traces?: ReturnType<typeof dependency_1.ibc.applications.transfer.v1.DenomTrace.prototype.toObject>[];
            params?: ReturnType<typeof dependency_1.ibc.applications.transfer.v1.Params.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            port_id?: string | undefined;
            denom_traces?: {
                path?: string | undefined;
                base_denom?: string | undefined;
            }[] | undefined;
            params?: {
                send_enabled?: boolean | undefined;
                receive_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map