import * as dependency_2 from "./../../commitment/v1/commitment";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.connection.v1 {
    enum State {
        STATE_UNINITIALIZED_UNSPECIFIED = 0,
        STATE_INIT = 1,
        STATE_TRYOPEN = 2,
        STATE_OPEN = 3
    }
    class ConnectionEnd extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            versions?: Version[];
            state?: State;
            counterparty?: Counterparty;
            delay_period?: number;
        });
        get client_id(): string;
        set client_id(value: string);
        get versions(): Version[];
        set versions(value: Version[]);
        get state(): State;
        set state(value: State);
        get counterparty(): Counterparty;
        set counterparty(value: Counterparty);
        get delay_period(): number;
        set delay_period(value: number);
        static fromObject(data: {
            client_id?: string;
            versions?: ReturnType<typeof Version.prototype.toObject>[];
            state?: State;
            counterparty?: ReturnType<typeof Counterparty.prototype.toObject>;
            delay_period?: number;
        }): ConnectionEnd;
        toObject(): {
            client_id?: string | undefined;
            versions?: {
                identifier?: string | undefined;
                features?: string[] | undefined;
            }[] | undefined;
            state?: State | undefined;
            counterparty?: {
                client_id?: string | undefined;
                connection_id?: string | undefined;
                prefix?: {
                    key_prefix?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            delay_period?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConnectionEnd;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConnectionEnd;
    }
    class IdentifiedConnection extends pb_1.Message {
        constructor(data?: any[] | {
            id?: string;
            client_id?: string;
            versions?: Version[];
            state?: State;
            counterparty?: Counterparty;
            delay_period?: number;
        });
        get id(): string;
        set id(value: string);
        get client_id(): string;
        set client_id(value: string);
        get versions(): Version[];
        set versions(value: Version[]);
        get state(): State;
        set state(value: State);
        get counterparty(): Counterparty;
        set counterparty(value: Counterparty);
        get delay_period(): number;
        set delay_period(value: number);
        static fromObject(data: {
            id?: string;
            client_id?: string;
            versions?: ReturnType<typeof Version.prototype.toObject>[];
            state?: State;
            counterparty?: ReturnType<typeof Counterparty.prototype.toObject>;
            delay_period?: number;
        }): IdentifiedConnection;
        toObject(): {
            id?: string | undefined;
            client_id?: string | undefined;
            versions?: {
                identifier?: string | undefined;
                features?: string[] | undefined;
            }[] | undefined;
            state?: State | undefined;
            counterparty?: {
                client_id?: string | undefined;
                connection_id?: string | undefined;
                prefix?: {
                    key_prefix?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            delay_period?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IdentifiedConnection;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IdentifiedConnection;
    }
    class Counterparty extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            connection_id?: string;
            prefix?: dependency_2.ibc.core.commitment.v1.MerklePrefix;
        });
        get client_id(): string;
        set client_id(value: string);
        get connection_id(): string;
        set connection_id(value: string);
        get prefix(): dependency_2.ibc.core.commitment.v1.MerklePrefix;
        set prefix(value: dependency_2.ibc.core.commitment.v1.MerklePrefix);
        static fromObject(data: {
            client_id?: string;
            connection_id?: string;
            prefix?: ReturnType<typeof dependency_2.ibc.core.commitment.v1.MerklePrefix.prototype.toObject>;
        }): Counterparty;
        toObject(): {
            client_id?: string | undefined;
            connection_id?: string | undefined;
            prefix?: {
                key_prefix?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Counterparty;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Counterparty;
    }
    class ClientPaths extends pb_1.Message {
        constructor(data?: any[] | {
            paths?: string[];
        });
        get paths(): string[];
        set paths(value: string[]);
        static fromObject(data: {
            paths?: string[];
        }): ClientPaths;
        toObject(): {
            paths?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClientPaths;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClientPaths;
    }
    class ConnectionPaths extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            paths?: string[];
        });
        get client_id(): string;
        set client_id(value: string);
        get paths(): string[];
        set paths(value: string[]);
        static fromObject(data: {
            client_id?: string;
            paths?: string[];
        }): ConnectionPaths;
        toObject(): {
            client_id?: string | undefined;
            paths?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConnectionPaths;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConnectionPaths;
    }
    class Version extends pb_1.Message {
        constructor(data?: any[] | {
            identifier?: string;
            features?: string[];
        });
        get identifier(): string;
        set identifier(value: string);
        get features(): string[];
        set features(value: string[]);
        static fromObject(data: {
            identifier?: string;
            features?: string[];
        }): Version;
        toObject(): {
            identifier?: string | undefined;
            features?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Version;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Version;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            max_expected_time_per_block?: number;
        });
        get max_expected_time_per_block(): number;
        set max_expected_time_per_block(value: number);
        static fromObject(data: {
            max_expected_time_per_block?: number;
        }): Params;
        toObject(): {
            max_expected_time_per_block?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=connection.d.ts.map