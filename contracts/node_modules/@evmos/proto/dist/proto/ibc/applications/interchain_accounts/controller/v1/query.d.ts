import * as dependency_1 from "./controller";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.controller.v1 {
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_1.ibc.applications.interchain_accounts.controller.v1.Params;
        });
        get params(): dependency_1.ibc.applications.interchain_accounts.controller.v1.Params;
        set params(value: dependency_1.ibc.applications.interchain_accounts.controller.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_1.ibc.applications.interchain_accounts.controller.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                controller_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map