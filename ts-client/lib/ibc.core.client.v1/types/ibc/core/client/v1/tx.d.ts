import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";
import { Params } from "./client";
export declare const protobufPackage = "ibc.core.client.v1";
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClient {
    /** light client state */
    clientState: Any | undefined;
    /**
     * consensus state associated with the client that corresponds to a given
     * height.
     */
    consensusState: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponse {
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClient {
    /** client unique identifier */
    clientId: string;
    /** client message to update the light client */
    clientMessage: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponse {
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClient {
    /** client unique identifier */
    clientId: string;
    /** upgraded client state */
    clientState: Any | undefined;
    /**
     * upgraded consensus state, only contains enough information to serve as a
     * basis of trust in update logic
     */
    consensusState: Any | undefined;
    /** proof that old chain committed to new client */
    proofUpgradeClient: Uint8Array;
    /** proof that old chain committed to new consensus state */
    proofUpgradeConsensusState: Uint8Array;
    /** signer address */
    signer: string;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponse {
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 *
 * @deprecated
 */
export interface MsgSubmitMisbehaviour {
    /** client unique identifier */
    clientId: string;
    /** misbehaviour used for freezing the light client */
    misbehaviour: Any | undefined;
    /** signer address */
    signer: string;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponse {
}
/** MsgRecoverClient defines the message used to recover a frozen or expired client. */
export interface MsgRecoverClient {
    /** the client identifier for the client to be updated if the proposal passes */
    subjectClientId: string;
    /**
     * the substitute client identifier for the client which will replace the subject
     * client
     */
    substituteClientId: string;
    /** signer address */
    signer: string;
}
/** MsgRecoverClientResponse defines the Msg/RecoverClient response type. */
export interface MsgRecoverClientResponse {
}
/** MsgIBCSoftwareUpgrade defines the message used to schedule an upgrade of an IBC client using a v1 governance proposal */
export interface MsgIBCSoftwareUpgrade {
    plan: Plan | undefined;
    /**
     * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
     * This will make the chain commit to the correct upgraded (self) client state
     * before the upgrade occurs, so that connecting chains can verify that the
     * new upgraded client is valid by verifying a proof on the previous version
     * of the chain. This will allow IBC connections to persist smoothly across
     * planned chain upgrades. Correspondingly, the UpgradedClientState field has been
     * deprecated in the Cosmos SDK to allow for this logic to exist solely in
     * the 02-client module.
     */
    upgradedClientState: Any | undefined;
    /** signer address */
    signer: string;
}
/** MsgIBCSoftwareUpgradeResponse defines the Msg/IBCSoftwareUpgrade response type. */
export interface MsgIBCSoftwareUpgradeResponse {
}
/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the client parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
export declare const MsgCreateClient: {
    encode(message: MsgCreateClient, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClient;
    fromJSON(object: any): MsgCreateClient;
    toJSON(message: MsgCreateClient): unknown;
    create<I extends {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientState"], keyof Any>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["consensusState"], keyof Any>]: never; };
        signer?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgCreateClient>]: never; }>(base?: I): MsgCreateClient;
    fromPartial<I_1 extends {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["consensusState"], keyof Any>]: never; };
        signer?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgCreateClient>]: never; }>(object: I_1): MsgCreateClient;
};
export declare const MsgCreateClientResponse: {
    encode(_: MsgCreateClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClientResponse;
    fromJSON(_: any): MsgCreateClientResponse;
    toJSON(_: MsgCreateClientResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgCreateClientResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgCreateClientResponse;
};
export declare const MsgUpdateClient: {
    encode(message: MsgUpdateClient, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateClient;
    fromJSON(object: any): MsgUpdateClient;
    toJSON(message: MsgUpdateClient): unknown;
    create<I extends {
        clientId?: string;
        clientMessage?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientId?: string;
        clientMessage?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientMessage"], keyof Any>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateClient>]: never; }>(base?: I): MsgUpdateClient;
    fromPartial<I_1 extends {
        clientId?: string;
        clientMessage?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientId?: string;
        clientMessage?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["clientMessage"], keyof Any>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUpdateClient>]: never; }>(object: I_1): MsgUpdateClient;
};
export declare const MsgUpdateClientResponse: {
    encode(_: MsgUpdateClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateClientResponse;
    fromJSON(_: any): MsgUpdateClientResponse;
    toJSON(_: MsgUpdateClientResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateClientResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateClientResponse;
};
export declare const MsgUpgradeClient: {
    encode(message: MsgUpgradeClient, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpgradeClient;
    fromJSON(object: any): MsgUpgradeClient;
    toJSON(message: MsgUpgradeClient): unknown;
    create<I extends {
        clientId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proofUpgradeClient?: Uint8Array;
        proofUpgradeConsensusState?: Uint8Array;
        signer?: string;
    } & {
        clientId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientState"], keyof Any>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["consensusState"], keyof Any>]: never; };
        proofUpgradeClient?: Uint8Array;
        proofUpgradeConsensusState?: Uint8Array;
        signer?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgUpgradeClient>]: never; }>(base?: I): MsgUpgradeClient;
    fromPartial<I_1 extends {
        clientId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proofUpgradeClient?: Uint8Array;
        proofUpgradeConsensusState?: Uint8Array;
        signer?: string;
    } & {
        clientId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["consensusState"], keyof Any>]: never; };
        proofUpgradeClient?: Uint8Array;
        proofUpgradeConsensusState?: Uint8Array;
        signer?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgUpgradeClient>]: never; }>(object: I_1): MsgUpgradeClient;
};
export declare const MsgUpgradeClientResponse: {
    encode(_: MsgUpgradeClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpgradeClientResponse;
    fromJSON(_: any): MsgUpgradeClientResponse;
    toJSON(_: MsgUpgradeClientResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpgradeClientResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpgradeClientResponse;
};
export declare const MsgSubmitMisbehaviour: {
    encode(message: MsgSubmitMisbehaviour, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitMisbehaviour;
    fromJSON(object: any): MsgSubmitMisbehaviour;
    toJSON(message: MsgSubmitMisbehaviour): unknown;
    create<I extends {
        clientId?: string;
        misbehaviour?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientId?: string;
        misbehaviour?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["misbehaviour"], keyof Any>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgSubmitMisbehaviour>]: never; }>(base?: I): MsgSubmitMisbehaviour;
    fromPartial<I_1 extends {
        clientId?: string;
        misbehaviour?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        clientId?: string;
        misbehaviour?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["misbehaviour"], keyof Any>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgSubmitMisbehaviour>]: never; }>(object: I_1): MsgSubmitMisbehaviour;
};
export declare const MsgSubmitMisbehaviourResponse: {
    encode(_: MsgSubmitMisbehaviourResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitMisbehaviourResponse;
    fromJSON(_: any): MsgSubmitMisbehaviourResponse;
    toJSON(_: MsgSubmitMisbehaviourResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgSubmitMisbehaviourResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgSubmitMisbehaviourResponse;
};
export declare const MsgRecoverClient: {
    encode(message: MsgRecoverClient, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecoverClient;
    fromJSON(object: any): MsgRecoverClient;
    toJSON(message: MsgRecoverClient): unknown;
    create<I extends {
        subjectClientId?: string;
        substituteClientId?: string;
        signer?: string;
    } & {
        subjectClientId?: string;
        substituteClientId?: string;
        signer?: string;
    } & { [K in Exclude<keyof I, keyof MsgRecoverClient>]: never; }>(base?: I): MsgRecoverClient;
    fromPartial<I_1 extends {
        subjectClientId?: string;
        substituteClientId?: string;
        signer?: string;
    } & {
        subjectClientId?: string;
        substituteClientId?: string;
        signer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRecoverClient>]: never; }>(object: I_1): MsgRecoverClient;
};
export declare const MsgRecoverClientResponse: {
    encode(_: MsgRecoverClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecoverClientResponse;
    fromJSON(_: any): MsgRecoverClientResponse;
    toJSON(_: MsgRecoverClientResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgRecoverClientResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgRecoverClientResponse;
};
export declare const MsgIBCSoftwareUpgrade: {
    encode(message: MsgIBCSoftwareUpgrade, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIBCSoftwareUpgrade;
    fromJSON(object: any): MsgIBCSoftwareUpgrade;
    toJSON(message: MsgIBCSoftwareUpgrade): unknown;
    create<I extends {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["plan"], keyof Plan>]: never; };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["upgradedClientState"], keyof Any>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgIBCSoftwareUpgrade>]: never; }>(base?: I): MsgIBCSoftwareUpgrade;
    fromPartial<I_1 extends {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        signer?: string;
    } & {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_5 in Exclude<keyof I_1["plan"], keyof Plan>]: never; };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_6 in Exclude<keyof I_1["upgradedClientState"], keyof Any>]: never; };
        signer?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgIBCSoftwareUpgrade>]: never; }>(object: I_1): MsgIBCSoftwareUpgrade;
};
export declare const MsgIBCSoftwareUpgradeResponse: {
    encode(_: MsgIBCSoftwareUpgradeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIBCSoftwareUpgradeResponse;
    fromJSON(_: any): MsgIBCSoftwareUpgradeResponse;
    toJSON(_: MsgIBCSoftwareUpgradeResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgIBCSoftwareUpgradeResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgIBCSoftwareUpgradeResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        signer?: string;
        params?: {
            allowedClients?: string[];
        };
    } & {
        signer?: string;
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K in Exclude<keyof I["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], "allowedClients">]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        signer?: string;
        params?: {
            allowedClients?: string[];
        };
    } & {
        signer?: string;
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K_3 in Exclude<keyof I_1["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["params"], "allowedClients">]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
/** Msg defines the ibc/client Msg service. */
export interface Msg {
    /** CreateClient defines a rpc handler method for MsgCreateClient. */
    CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
    /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
    UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
    /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
    UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
    /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
    SubmitMisbehaviour(request: MsgSubmitMisbehaviour): Promise<MsgSubmitMisbehaviourResponse>;
    /** RecoverClient defines a rpc handler method for MsgRecoverClient. */
    RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse>;
    /** IBCSoftwareUpgrade defines a rpc handler method for MsgIBCSoftwareUpgrade. */
    IBCSoftwareUpgrade(request: MsgIBCSoftwareUpgrade): Promise<MsgIBCSoftwareUpgradeResponse>;
    /** UpdateClientParams defines a rpc handler method for MsgUpdateParams. */
    UpdateClientParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.core.client.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
    UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
    UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
    SubmitMisbehaviour(request: MsgSubmitMisbehaviour): Promise<MsgSubmitMisbehaviourResponse>;
    RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse>;
    IBCSoftwareUpgrade(request: MsgIBCSoftwareUpgrade): Promise<MsgIBCSoftwareUpgradeResponse>;
    UpdateClientParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
