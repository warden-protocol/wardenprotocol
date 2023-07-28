import * as dependency_1 from "./feegrant";
import * as dependency_2 from "./../../base/query/v1beta1/pagination";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.feegrant.v1beta1 {
    class QueryAllowanceRequest extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
        }): QueryAllowanceRequest;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllowanceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllowanceRequest;
    }
    class QueryAllowanceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            allowance?: dependency_1.cosmos.feegrant.v1beta1.Grant;
        });
        get allowance(): dependency_1.cosmos.feegrant.v1beta1.Grant;
        set allowance(value: dependency_1.cosmos.feegrant.v1beta1.Grant);
        static fromObject(data: {
            allowance?: ReturnType<typeof dependency_1.cosmos.feegrant.v1beta1.Grant.prototype.toObject>;
        }): QueryAllowanceResponse;
        toObject(): {
            allowance?: {
                granter?: string | undefined;
                grantee?: string | undefined;
                allowance?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllowanceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllowanceResponse;
    }
    class QueryAllowancesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            grantee?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get grantee(): string;
        set grantee(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            grantee?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryAllowancesRequest;
        toObject(): {
            grantee?: string | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllowancesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllowancesRequest;
    }
    class QueryAllowancesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            allowances?: dependency_1.cosmos.feegrant.v1beta1.Grant[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        });
        get allowances(): dependency_1.cosmos.feegrant.v1beta1.Grant[];
        set allowances(value: dependency_1.cosmos.feegrant.v1beta1.Grant[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            allowances?: ReturnType<typeof dependency_1.cosmos.feegrant.v1beta1.Grant.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryAllowancesResponse;
        toObject(): {
            allowances?: {
                granter?: string | undefined;
                grantee?: string | undefined;
                allowance?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllowancesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllowancesResponse;
    }
}
//# sourceMappingURL=query.d.ts.map