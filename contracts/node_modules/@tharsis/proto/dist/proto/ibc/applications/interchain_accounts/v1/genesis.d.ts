import * as dependency_2 from "./../controller/v1/controller";
import * as dependency_3 from "./../host/v1/host";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            controller_genesis_state?: ControllerGenesisState;
            host_genesis_state?: HostGenesisState;
        });
        get controller_genesis_state(): ControllerGenesisState;
        set controller_genesis_state(value: ControllerGenesisState);
        get host_genesis_state(): HostGenesisState;
        set host_genesis_state(value: HostGenesisState);
        static fromObject(data: {
            controller_genesis_state?: ReturnType<typeof ControllerGenesisState.prototype.toObject>;
            host_genesis_state?: ReturnType<typeof HostGenesisState.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            controller_genesis_state?: {
                active_channels?: {
                    connection_id?: string | undefined;
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                }[] | undefined;
                interchain_accounts?: {
                    connection_id?: string | undefined;
                    port_id?: string | undefined;
                    account_address?: string | undefined;
                }[] | undefined;
                ports?: string[] | undefined;
                params?: {
                    controller_enabled?: boolean | undefined;
                } | undefined;
            } | undefined;
            host_genesis_state?: {
                active_channels?: {
                    connection_id?: string | undefined;
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                }[] | undefined;
                interchain_accounts?: {
                    connection_id?: string | undefined;
                    port_id?: string | undefined;
                    account_address?: string | undefined;
                }[] | undefined;
                port?: string | undefined;
                params?: {
                    host_enabled?: boolean | undefined;
                    allow_messages?: string[] | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class ControllerGenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            active_channels?: ActiveChannel[];
            interchain_accounts?: RegisteredInterchainAccount[];
            ports?: string[];
            params?: dependency_2.ibc.applications.interchain_accounts.controller.v1.Params;
        });
        get active_channels(): ActiveChannel[];
        set active_channels(value: ActiveChannel[]);
        get interchain_accounts(): RegisteredInterchainAccount[];
        set interchain_accounts(value: RegisteredInterchainAccount[]);
        get ports(): string[];
        set ports(value: string[]);
        get params(): dependency_2.ibc.applications.interchain_accounts.controller.v1.Params;
        set params(value: dependency_2.ibc.applications.interchain_accounts.controller.v1.Params);
        static fromObject(data: {
            active_channels?: ReturnType<typeof ActiveChannel.prototype.toObject>[];
            interchain_accounts?: ReturnType<typeof RegisteredInterchainAccount.prototype.toObject>[];
            ports?: string[];
            params?: ReturnType<typeof dependency_2.ibc.applications.interchain_accounts.controller.v1.Params.prototype.toObject>;
        }): ControllerGenesisState;
        toObject(): {
            active_channels?: {
                connection_id?: string | undefined;
                port_id?: string | undefined;
                channel_id?: string | undefined;
            }[] | undefined;
            interchain_accounts?: {
                connection_id?: string | undefined;
                port_id?: string | undefined;
                account_address?: string | undefined;
            }[] | undefined;
            ports?: string[] | undefined;
            params?: {
                controller_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ControllerGenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ControllerGenesisState;
    }
    class HostGenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            active_channels?: ActiveChannel[];
            interchain_accounts?: RegisteredInterchainAccount[];
            port?: string;
            params?: dependency_3.ibc.applications.interchain_accounts.host.v1.Params;
        });
        get active_channels(): ActiveChannel[];
        set active_channels(value: ActiveChannel[]);
        get interchain_accounts(): RegisteredInterchainAccount[];
        set interchain_accounts(value: RegisteredInterchainAccount[]);
        get port(): string;
        set port(value: string);
        get params(): dependency_3.ibc.applications.interchain_accounts.host.v1.Params;
        set params(value: dependency_3.ibc.applications.interchain_accounts.host.v1.Params);
        static fromObject(data: {
            active_channels?: ReturnType<typeof ActiveChannel.prototype.toObject>[];
            interchain_accounts?: ReturnType<typeof RegisteredInterchainAccount.prototype.toObject>[];
            port?: string;
            params?: ReturnType<typeof dependency_3.ibc.applications.interchain_accounts.host.v1.Params.prototype.toObject>;
        }): HostGenesisState;
        toObject(): {
            active_channels?: {
                connection_id?: string | undefined;
                port_id?: string | undefined;
                channel_id?: string | undefined;
            }[] | undefined;
            interchain_accounts?: {
                connection_id?: string | undefined;
                port_id?: string | undefined;
                account_address?: string | undefined;
            }[] | undefined;
            port?: string | undefined;
            params?: {
                host_enabled?: boolean | undefined;
                allow_messages?: string[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HostGenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): HostGenesisState;
    }
    class ActiveChannel extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
            port_id?: string;
            channel_id?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        static fromObject(data: {
            connection_id?: string;
            port_id?: string;
            channel_id?: string;
        }): ActiveChannel;
        toObject(): {
            connection_id?: string | undefined;
            port_id?: string | undefined;
            channel_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ActiveChannel;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ActiveChannel;
    }
    class RegisteredInterchainAccount extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
            port_id?: string;
            account_address?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        get port_id(): string;
        set port_id(value: string);
        get account_address(): string;
        set account_address(value: string);
        static fromObject(data: {
            connection_id?: string;
            port_id?: string;
            account_address?: string;
        }): RegisteredInterchainAccount;
        toObject(): {
            connection_id?: string | undefined;
            port_id?: string | undefined;
            account_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RegisteredInterchainAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RegisteredInterchainAccount;
    }
}
//# sourceMappingURL=genesis.d.ts.map