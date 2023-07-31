import * as dependency_2 from "./../../base/query/v1beta1/pagination";
import * as dependency_3 from "./authz";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.authz.v1beta1 {
    class QueryGrantsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        get msg_type_url(): string;
        set msg_type_url(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryGrantsRequest;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
            msg_type_url?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGrantsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGrantsRequest;
    }
    class QueryGrantsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            grants?: dependency_3.cosmos.authz.v1beta1.Grant[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        });
        get grants(): dependency_3.cosmos.authz.v1beta1.Grant[];
        set grants(value: dependency_3.cosmos.authz.v1beta1.Grant[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            grants?: ReturnType<typeof dependency_3.cosmos.authz.v1beta1.Grant.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryGrantsResponse;
        toObject(): {
            grants?: {
                authorization?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGrantsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGrantsResponse;
    }
    class QueryGranterGrantsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get granter(): string;
        set granter(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            granter?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryGranterGrantsRequest;
        toObject(): {
            granter?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGranterGrantsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGranterGrantsRequest;
    }
    class QueryGranterGrantsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            grants?: dependency_3.cosmos.authz.v1beta1.GrantAuthorization[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        });
        get grants(): dependency_3.cosmos.authz.v1beta1.GrantAuthorization[];
        set grants(value: dependency_3.cosmos.authz.v1beta1.GrantAuthorization[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            grants?: ReturnType<typeof dependency_3.cosmos.authz.v1beta1.GrantAuthorization.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryGranterGrantsResponse;
        toObject(): {
            grants?: {
                granter?: string | undefined;
                grantee?: string | undefined;
                authorization?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGranterGrantsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGranterGrantsResponse;
    }
    class QueryGranteeGrantsRequest extends pb_1.Message {
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
        }): QueryGranteeGrantsRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGranteeGrantsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGranteeGrantsRequest;
    }
    class QueryGranteeGrantsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            grants?: dependency_3.cosmos.authz.v1beta1.GrantAuthorization[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        });
        get grants(): dependency_3.cosmos.authz.v1beta1.GrantAuthorization[];
        set grants(value: dependency_3.cosmos.authz.v1beta1.GrantAuthorization[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            grants?: ReturnType<typeof dependency_3.cosmos.authz.v1beta1.GrantAuthorization.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryGranteeGrantsResponse;
        toObject(): {
            grants?: {
                granter?: string | undefined;
                grantee?: string | undefined;
                authorization?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGranteeGrantsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGranteeGrantsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map