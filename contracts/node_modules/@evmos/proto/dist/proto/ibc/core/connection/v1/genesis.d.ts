import * as dependency_2 from "./connection";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.connection.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            connections?: dependency_2.ibc.core.connection.v1.IdentifiedConnection[];
            client_connection_paths?: dependency_2.ibc.core.connection.v1.ConnectionPaths[];
            next_connection_sequence?: number;
            params?: dependency_2.ibc.core.connection.v1.Params;
        });
        get connections(): dependency_2.ibc.core.connection.v1.IdentifiedConnection[];
        set connections(value: dependency_2.ibc.core.connection.v1.IdentifiedConnection[]);
        get client_connection_paths(): dependency_2.ibc.core.connection.v1.ConnectionPaths[];
        set client_connection_paths(value: dependency_2.ibc.core.connection.v1.ConnectionPaths[]);
        get next_connection_sequence(): number;
        set next_connection_sequence(value: number);
        get params(): dependency_2.ibc.core.connection.v1.Params;
        set params(value: dependency_2.ibc.core.connection.v1.Params);
        static fromObject(data: {
            connections?: ReturnType<typeof dependency_2.ibc.core.connection.v1.IdentifiedConnection.prototype.toObject>[];
            client_connection_paths?: ReturnType<typeof dependency_2.ibc.core.connection.v1.ConnectionPaths.prototype.toObject>[];
            next_connection_sequence?: number;
            params?: ReturnType<typeof dependency_2.ibc.core.connection.v1.Params.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            connections?: {
                id?: string | undefined;
                client_id?: string | undefined;
                versions?: {
                    identifier?: string | undefined;
                    features?: string[] | undefined;
                }[] | undefined;
                state?: dependency_2.ibc.core.connection.v1.State | undefined;
                counterparty?: {
                    client_id?: string | undefined;
                    connection_id?: string | undefined;
                    prefix?: {
                        key_prefix?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                delay_period?: number | undefined;
            }[] | undefined;
            client_connection_paths?: {
                client_id?: string | undefined;
                paths?: string[] | undefined;
            }[] | undefined;
            next_connection_sequence?: number | undefined;
            params?: {
                max_expected_time_per_block?: number | undefined;
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