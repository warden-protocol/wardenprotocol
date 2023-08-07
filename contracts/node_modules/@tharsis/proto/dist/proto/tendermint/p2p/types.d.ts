import * as pb_1 from "google-protobuf";
export declare namespace tendermint.p2p {
    class NetAddress extends pb_1.Message {
        constructor(data?: any[] | {
            id?: string;
            ip?: string;
            port?: number;
        });
        get id(): string;
        set id(value: string);
        get ip(): string;
        set ip(value: string);
        get port(): number;
        set port(value: number);
        static fromObject(data: {
            id?: string;
            ip?: string;
            port?: number;
        }): NetAddress;
        toObject(): {
            id?: string | undefined;
            ip?: string | undefined;
            port?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NetAddress;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NetAddress;
    }
    class ProtocolVersion extends pb_1.Message {
        constructor(data?: any[] | {
            p2p?: number;
            block?: number;
            app?: number;
        });
        get p2p(): number;
        set p2p(value: number);
        get block(): number;
        set block(value: number);
        get app(): number;
        set app(value: number);
        static fromObject(data: {
            p2p?: number;
            block?: number;
            app?: number;
        }): ProtocolVersion;
        toObject(): {
            p2p?: number | undefined;
            block?: number | undefined;
            app?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProtocolVersion;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProtocolVersion;
    }
    class DefaultNodeInfo extends pb_1.Message {
        constructor(data?: any[] | {
            protocol_version?: ProtocolVersion;
            default_node_id?: string;
            listen_addr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: DefaultNodeInfoOther;
        });
        get protocol_version(): ProtocolVersion;
        set protocol_version(value: ProtocolVersion);
        get default_node_id(): string;
        set default_node_id(value: string);
        get listen_addr(): string;
        set listen_addr(value: string);
        get network(): string;
        set network(value: string);
        get version(): string;
        set version(value: string);
        get channels(): Uint8Array;
        set channels(value: Uint8Array);
        get moniker(): string;
        set moniker(value: string);
        get other(): DefaultNodeInfoOther;
        set other(value: DefaultNodeInfoOther);
        static fromObject(data: {
            protocol_version?: ReturnType<typeof ProtocolVersion.prototype.toObject>;
            default_node_id?: string;
            listen_addr?: string;
            network?: string;
            version?: string;
            channels?: Uint8Array;
            moniker?: string;
            other?: ReturnType<typeof DefaultNodeInfoOther.prototype.toObject>;
        }): DefaultNodeInfo;
        toObject(): {
            protocol_version?: {
                p2p?: number | undefined;
                block?: number | undefined;
                app?: number | undefined;
            } | undefined;
            default_node_id?: string | undefined;
            listen_addr?: string | undefined;
            network?: string | undefined;
            version?: string | undefined;
            channels?: Uint8Array | undefined;
            moniker?: string | undefined;
            other?: {
                tx_index?: string | undefined;
                rpc_address?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DefaultNodeInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DefaultNodeInfo;
    }
    class DefaultNodeInfoOther extends pb_1.Message {
        constructor(data?: any[] | {
            tx_index?: string;
            rpc_address?: string;
        });
        get tx_index(): string;
        set tx_index(value: string);
        get rpc_address(): string;
        set rpc_address(value: string);
        static fromObject(data: {
            tx_index?: string;
            rpc_address?: string;
        }): DefaultNodeInfoOther;
        toObject(): {
            tx_index?: string | undefined;
            rpc_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DefaultNodeInfoOther;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DefaultNodeInfoOther;
    }
}
//# sourceMappingURL=types.d.ts.map