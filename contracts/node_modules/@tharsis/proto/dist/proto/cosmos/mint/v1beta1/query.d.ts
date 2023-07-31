import * as dependency_3 from "./mint";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.mint.v1beta1 {
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
            params?: dependency_3.cosmos.mint.v1beta1.Params;
        });
        get params(): dependency_3.cosmos.mint.v1beta1.Params;
        set params(value: dependency_3.cosmos.mint.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.cosmos.mint.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                mint_denom?: string | undefined;
                inflation_rate_change?: string | undefined;
                inflation_max?: string | undefined;
                inflation_min?: string | undefined;
                goal_bonded?: string | undefined;
                blocks_per_year?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryInflationRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryInflationRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryInflationRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryInflationRequest;
    }
    class QueryInflationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            inflation?: Uint8Array;
        });
        get inflation(): Uint8Array;
        set inflation(value: Uint8Array);
        static fromObject(data: {
            inflation?: Uint8Array;
        }): QueryInflationResponse;
        toObject(): {
            inflation?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryInflationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryInflationResponse;
    }
    class QueryAnnualProvisionsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryAnnualProvisionsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAnnualProvisionsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAnnualProvisionsRequest;
    }
    class QueryAnnualProvisionsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            annual_provisions?: Uint8Array;
        });
        get annual_provisions(): Uint8Array;
        set annual_provisions(value: Uint8Array);
        static fromObject(data: {
            annual_provisions?: Uint8Array;
        }): QueryAnnualProvisionsResponse;
        toObject(): {
            annual_provisions?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAnnualProvisionsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAnnualProvisionsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map