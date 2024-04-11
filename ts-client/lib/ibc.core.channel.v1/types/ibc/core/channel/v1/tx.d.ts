import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
import { Channel, Packet, Params, State } from "./channel";
import { ErrorReceipt, Upgrade, UpgradeFields } from "./upgrade";
export declare const protobufPackage = "ibc.core.channel.v1";
/** ResponseResultType defines the possible outcomes of the execution of a message */
export declare enum ResponseResultType {
    /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
    RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
    /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
    RESPONSE_RESULT_TYPE_NOOP = 1,
    /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
    RESPONSE_RESULT_TYPE_SUCCESS = 2,
    /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
    RESPONSE_RESULT_TYPE_FAILURE = 3,
    UNRECOGNIZED = -1
}
export declare function responseResultTypeFromJSON(object: any): ResponseResultType;
export declare function responseResultTypeToJSON(object: ResponseResultType): string;
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export interface MsgChannelOpenInit {
    portId: string;
    channel: Channel | undefined;
    signer: string;
}
/** MsgChannelOpenInitResponse defines the Msg/ChannelOpenInit response type. */
export interface MsgChannelOpenInitResponse {
    channelId: string;
    version: string;
}
/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B. The version field within the Channel field has been deprecated. Its
 * value will be ignored by core IBC.
 */
export interface MsgChannelOpenTry {
    portId: string;
    /**
     * Deprecated: this field is unused. Crossing hello's are no longer supported in core IBC.
     *
     * @deprecated
     */
    previousChannelId: string;
    /** NOTE: the version field within the channel has been deprecated. Its value will be ignored by core IBC. */
    channel: Channel | undefined;
    counterpartyVersion: string;
    proofInit: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelOpenTryResponse defines the Msg/ChannelOpenTry response type. */
export interface MsgChannelOpenTryResponse {
    version: string;
    channelId: string;
}
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 * WARNING: a channel upgrade MUST NOT initialize an upgrade for this channel
 * in the same block as executing this message otherwise the counterparty will
 * be incapable of opening.
 */
export interface MsgChannelOpenAck {
    portId: string;
    channelId: string;
    counterpartyChannelId: string;
    counterpartyVersion: string;
    proofTry: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelOpenAckResponse defines the Msg/ChannelOpenAck response type. */
export interface MsgChannelOpenAckResponse {
}
/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export interface MsgChannelOpenConfirm {
    portId: string;
    channelId: string;
    proofAck: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/**
 * MsgChannelOpenConfirmResponse defines the Msg/ChannelOpenConfirm response
 * type.
 */
export interface MsgChannelOpenConfirmResponse {
}
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export interface MsgChannelCloseInit {
    portId: string;
    channelId: string;
    signer: string;
}
/** MsgChannelCloseInitResponse defines the Msg/ChannelCloseInit response type. */
export interface MsgChannelCloseInitResponse {
}
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B
 * to acknowledge the change of channel state to CLOSED on Chain A.
 */
export interface MsgChannelCloseConfirm {
    portId: string;
    channelId: string;
    proofInit: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
    counterpartyUpgradeSequence: number;
}
/**
 * MsgChannelCloseConfirmResponse defines the Msg/ChannelCloseConfirm response
 * type.
 */
export interface MsgChannelCloseConfirmResponse {
}
/** MsgRecvPacket receives incoming IBC packet */
export interface MsgRecvPacket {
    packet: Packet | undefined;
    proofCommitment: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponse {
    result: ResponseResultType;
}
/** MsgTimeout receives timed-out packet */
export interface MsgTimeout {
    packet: Packet | undefined;
    proofUnreceived: Uint8Array;
    proofHeight: Height | undefined;
    nextSequenceRecv: number;
    signer: string;
}
/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponse {
    result: ResponseResultType;
}
/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export interface MsgTimeoutOnClose {
    packet: Packet | undefined;
    proofUnreceived: Uint8Array;
    proofClose: Uint8Array;
    proofHeight: Height | undefined;
    nextSequenceRecv: number;
    signer: string;
    counterpartyUpgradeSequence: number;
}
/** MsgTimeoutOnCloseResponse defines the Msg/TimeoutOnClose response type. */
export interface MsgTimeoutOnCloseResponse {
    result: ResponseResultType;
}
/** MsgAcknowledgement receives incoming IBC acknowledgement */
export interface MsgAcknowledgement {
    packet: Packet | undefined;
    acknowledgement: Uint8Array;
    proofAcked: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponse {
    result: ResponseResultType;
}
/**
 * MsgChannelUpgradeInit defines the request type for the ChannelUpgradeInit rpc
 * WARNING: Initializing a channel upgrade in the same block as opening the channel
 * may result in the counterparty being incapable of opening.
 */
export interface MsgChannelUpgradeInit {
    portId: string;
    channelId: string;
    fields: UpgradeFields | undefined;
    signer: string;
}
/** MsgChannelUpgradeInitResponse defines the MsgChannelUpgradeInit response type */
export interface MsgChannelUpgradeInitResponse {
    upgrade: Upgrade | undefined;
    upgradeSequence: number;
}
/** MsgChannelUpgradeTry defines the request type for the ChannelUpgradeTry rpc */
export interface MsgChannelUpgradeTry {
    portId: string;
    channelId: string;
    proposedUpgradeConnectionHops: string[];
    counterpartyUpgradeFields: UpgradeFields | undefined;
    counterpartyUpgradeSequence: number;
    proofChannel: Uint8Array;
    proofUpgrade: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeTryResponse defines the MsgChannelUpgradeTry response type */
export interface MsgChannelUpgradeTryResponse {
    upgrade: Upgrade | undefined;
    upgradeSequence: number;
    result: ResponseResultType;
}
/** MsgChannelUpgradeAck defines the request type for the ChannelUpgradeAck rpc */
export interface MsgChannelUpgradeAck {
    portId: string;
    channelId: string;
    counterpartyUpgrade: Upgrade | undefined;
    proofChannel: Uint8Array;
    proofUpgrade: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeAckResponse defines MsgChannelUpgradeAck response type */
export interface MsgChannelUpgradeAckResponse {
    result: ResponseResultType;
}
/** MsgChannelUpgradeConfirm defines the request type for the ChannelUpgradeConfirm rpc */
export interface MsgChannelUpgradeConfirm {
    portId: string;
    channelId: string;
    counterpartyChannelState: State;
    counterpartyUpgrade: Upgrade | undefined;
    proofChannel: Uint8Array;
    proofUpgrade: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeConfirmResponse defines MsgChannelUpgradeConfirm response type */
export interface MsgChannelUpgradeConfirmResponse {
    result: ResponseResultType;
}
/** MsgChannelUpgradeOpen defines the request type for the ChannelUpgradeOpen rpc */
export interface MsgChannelUpgradeOpen {
    portId: string;
    channelId: string;
    counterpartyChannelState: State;
    counterpartyUpgradeSequence: number;
    proofChannel: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeOpenResponse defines the MsgChannelUpgradeOpen response type */
export interface MsgChannelUpgradeOpenResponse {
}
/** MsgChannelUpgradeTimeout defines the request type for the ChannelUpgradeTimeout rpc */
export interface MsgChannelUpgradeTimeout {
    portId: string;
    channelId: string;
    counterpartyChannel: Channel | undefined;
    proofChannel: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeTimeoutRepsonse defines the MsgChannelUpgradeTimeout response type */
export interface MsgChannelUpgradeTimeoutResponse {
}
/** MsgChannelUpgradeCancel defines the request type for the ChannelUpgradeCancel rpc */
export interface MsgChannelUpgradeCancel {
    portId: string;
    channelId: string;
    errorReceipt: ErrorReceipt | undefined;
    proofErrorReceipt: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/** MsgChannelUpgradeCancelResponse defines the MsgChannelUpgradeCancel response type */
export interface MsgChannelUpgradeCancelResponse {
}
/** MsgUpdateParams is the MsgUpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the channel parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
/** MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgements {
    portId: string;
    channelId: string;
    limit: number;
    signer: string;
}
/** MsgPruneAcknowledgementsResponse defines the response type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsResponse {
    /** Number of sequences pruned (includes both packet acknowledgements and packet receipts where appropriate). */
    totalPrunedSequences: number;
    /** Number of sequences left after pruning. */
    totalRemainingSequences: number;
}
export declare const MsgChannelOpenInit: {
    encode(message: MsgChannelOpenInit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInit;
    fromJSON(object: any): MsgChannelOpenInit;
    toJSON(message: MsgChannelOpenInit): unknown;
    create<I extends {
        portId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channel"], keyof Channel>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgChannelOpenInit>]: never; }>(base?: I): MsgChannelOpenInit;
    fromPartial<I_1 extends {
        portId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_4 in Exclude<keyof I_1["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_5 in Exclude<keyof I_1["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_6 in Exclude<keyof I_1["channel"], keyof Channel>]: never; };
        signer?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgChannelOpenInit>]: never; }>(object: I_1): MsgChannelOpenInit;
};
export declare const MsgChannelOpenInitResponse: {
    encode(message: MsgChannelOpenInitResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInitResponse;
    fromJSON(object: any): MsgChannelOpenInitResponse;
    toJSON(message: MsgChannelOpenInitResponse): unknown;
    create<I extends {
        channelId?: string;
        version?: string;
    } & {
        channelId?: string;
        version?: string;
    } & { [K in Exclude<keyof I, keyof MsgChannelOpenInitResponse>]: never; }>(base?: I): MsgChannelOpenInitResponse;
    fromPartial<I_1 extends {
        channelId?: string;
        version?: string;
    } & {
        channelId?: string;
        version?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgChannelOpenInitResponse>]: never; }>(object: I_1): MsgChannelOpenInitResponse;
};
export declare const MsgChannelOpenTry: {
    encode(message: MsgChannelOpenTry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTry;
    fromJSON(object: any): MsgChannelOpenTry;
    toJSON(message: MsgChannelOpenTry): unknown;
    create<I extends {
        portId?: string;
        previousChannelId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        counterpartyVersion?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        previousChannelId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channel"], keyof Channel>]: never; };
        counterpartyVersion?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_4 in Exclude<keyof I, keyof MsgChannelOpenTry>]: never; }>(base?: I): MsgChannelOpenTry;
    fromPartial<I_1 extends {
        portId?: string;
        previousChannelId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        counterpartyVersion?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        previousChannelId?: string;
        channel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_5 in Exclude<keyof I_1["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_7 in Exclude<keyof I_1["channel"], keyof Channel>]: never; };
        counterpartyVersion?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof MsgChannelOpenTry>]: never; }>(object: I_1): MsgChannelOpenTry;
};
export declare const MsgChannelOpenTryResponse: {
    encode(message: MsgChannelOpenTryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTryResponse;
    fromJSON(object: any): MsgChannelOpenTryResponse;
    toJSON(message: MsgChannelOpenTryResponse): unknown;
    create<I extends {
        version?: string;
        channelId?: string;
    } & {
        version?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof MsgChannelOpenTryResponse>]: never; }>(base?: I): MsgChannelOpenTryResponse;
    fromPartial<I_1 extends {
        version?: string;
        channelId?: string;
    } & {
        version?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgChannelOpenTryResponse>]: never; }>(object: I_1): MsgChannelOpenTryResponse;
};
export declare const MsgChannelOpenAck: {
    encode(message: MsgChannelOpenAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAck;
    fromJSON(object: any): MsgChannelOpenAck;
    toJSON(message: MsgChannelOpenAck): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelId?: string;
        counterpartyVersion?: string;
        proofTry?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelId?: string;
        counterpartyVersion?: string;
        proofTry?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgChannelOpenAck>]: never; }>(base?: I): MsgChannelOpenAck;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelId?: string;
        counterpartyVersion?: string;
        proofTry?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelId?: string;
        counterpartyVersion?: string;
        proofTry?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgChannelOpenAck>]: never; }>(object: I_1): MsgChannelOpenAck;
};
export declare const MsgChannelOpenAckResponse: {
    encode(_: MsgChannelOpenAckResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAckResponse;
    fromJSON(_: any): MsgChannelOpenAckResponse;
    toJSON(_: MsgChannelOpenAckResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelOpenAckResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelOpenAckResponse;
};
export declare const MsgChannelOpenConfirm: {
    encode(message: MsgChannelOpenConfirm, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirm;
    fromJSON(object: any): MsgChannelOpenConfirm;
    toJSON(message: MsgChannelOpenConfirm): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgChannelOpenConfirm>]: never; }>(base?: I): MsgChannelOpenConfirm;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgChannelOpenConfirm>]: never; }>(object: I_1): MsgChannelOpenConfirm;
};
export declare const MsgChannelOpenConfirmResponse: {
    encode(_: MsgChannelOpenConfirmResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirmResponse;
    fromJSON(_: any): MsgChannelOpenConfirmResponse;
    toJSON(_: MsgChannelOpenConfirmResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelOpenConfirmResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelOpenConfirmResponse;
};
export declare const MsgChannelCloseInit: {
    encode(message: MsgChannelCloseInit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInit;
    fromJSON(object: any): MsgChannelCloseInit;
    toJSON(message: MsgChannelCloseInit): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        signer?: string;
    } & { [K in Exclude<keyof I, keyof MsgChannelCloseInit>]: never; }>(base?: I): MsgChannelCloseInit;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        signer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgChannelCloseInit>]: never; }>(object: I_1): MsgChannelCloseInit;
};
export declare const MsgChannelCloseInitResponse: {
    encode(_: MsgChannelCloseInitResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInitResponse;
    fromJSON(_: any): MsgChannelCloseInitResponse;
    toJSON(_: MsgChannelCloseInitResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelCloseInitResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelCloseInitResponse;
};
export declare const MsgChannelCloseConfirm: {
    encode(message: MsgChannelCloseConfirm, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirm;
    fromJSON(object: any): MsgChannelCloseConfirm;
    toJSON(message: MsgChannelCloseConfirm): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & { [K_1 in Exclude<keyof I, keyof MsgChannelCloseConfirm>]: never; }>(base?: I): MsgChannelCloseConfirm;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        proofInit?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgChannelCloseConfirm>]: never; }>(object: I_1): MsgChannelCloseConfirm;
};
export declare const MsgChannelCloseConfirmResponse: {
    encode(_: MsgChannelCloseConfirmResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirmResponse;
    fromJSON(_: any): MsgChannelCloseConfirmResponse;
    toJSON(_: MsgChannelCloseConfirmResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelCloseConfirmResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelCloseConfirmResponse;
};
export declare const MsgRecvPacket: {
    encode(message: MsgRecvPacket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacket;
    fromJSON(object: any): MsgRecvPacket;
    toJSON(message: MsgRecvPacket): unknown;
    create<I extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofCommitment?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K in Exclude<keyof I["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_1 in Exclude<keyof I["packet"], keyof Packet>]: never; };
        proofCommitment?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgRecvPacket>]: never; }>(base?: I): MsgRecvPacket;
    fromPartial<I_1 extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofCommitment?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_4 in Exclude<keyof I_1["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_5 in Exclude<keyof I_1["packet"], keyof Packet>]: never; };
        proofCommitment?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgRecvPacket>]: never; }>(object: I_1): MsgRecvPacket;
};
export declare const MsgRecvPacketResponse: {
    encode(message: MsgRecvPacketResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacketResponse;
    fromJSON(object: any): MsgRecvPacketResponse;
    toJSON(message: MsgRecvPacketResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgRecvPacketResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgRecvPacketResponse;
};
export declare const MsgTimeout: {
    encode(message: MsgTimeout, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeout;
    fromJSON(object: any): MsgTimeout;
    toJSON(message: MsgTimeout): unknown;
    create<I extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofUnreceived?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        nextSequenceRecv?: number;
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K in Exclude<keyof I["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_1 in Exclude<keyof I["packet"], keyof Packet>]: never; };
        proofUnreceived?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        nextSequenceRecv?: number;
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgTimeout>]: never; }>(base?: I): MsgTimeout;
    fromPartial<I_1 extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofUnreceived?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        nextSequenceRecv?: number;
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_4 in Exclude<keyof I_1["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_5 in Exclude<keyof I_1["packet"], keyof Packet>]: never; };
        proofUnreceived?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        nextSequenceRecv?: number;
        signer?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgTimeout>]: never; }>(object: I_1): MsgTimeout;
};
export declare const MsgTimeoutResponse: {
    encode(message: MsgTimeoutResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutResponse;
    fromJSON(object: any): MsgTimeoutResponse;
    toJSON(message: MsgTimeoutResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgTimeoutResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgTimeoutResponse;
};
export declare const MsgTimeoutOnClose: {
    encode(message: MsgTimeoutOnClose, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnClose;
    fromJSON(object: any): MsgTimeoutOnClose;
    toJSON(message: MsgTimeoutOnClose): unknown;
    create<I extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofUnreceived?: Uint8Array;
        proofClose?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        nextSequenceRecv?: number;
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K in Exclude<keyof I["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_1 in Exclude<keyof I["packet"], keyof Packet>]: never; };
        proofUnreceived?: Uint8Array;
        proofClose?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        nextSequenceRecv?: number;
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & { [K_3 in Exclude<keyof I, keyof MsgTimeoutOnClose>]: never; }>(base?: I): MsgTimeoutOnClose;
    fromPartial<I_1 extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        proofUnreceived?: Uint8Array;
        proofClose?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        nextSequenceRecv?: number;
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_4 in Exclude<keyof I_1["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_5 in Exclude<keyof I_1["packet"], keyof Packet>]: never; };
        proofUnreceived?: Uint8Array;
        proofClose?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        nextSequenceRecv?: number;
        signer?: string;
        counterpartyUpgradeSequence?: number;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgTimeoutOnClose>]: never; }>(object: I_1): MsgTimeoutOnClose;
};
export declare const MsgTimeoutOnCloseResponse: {
    encode(message: MsgTimeoutOnCloseResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnCloseResponse;
    fromJSON(object: any): MsgTimeoutOnCloseResponse;
    toJSON(message: MsgTimeoutOnCloseResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgTimeoutOnCloseResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgTimeoutOnCloseResponse;
};
export declare const MsgAcknowledgement: {
    encode(message: MsgAcknowledgement, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgement;
    fromJSON(object: any): MsgAcknowledgement;
    toJSON(message: MsgAcknowledgement): unknown;
    create<I extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        acknowledgement?: Uint8Array;
        proofAcked?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K in Exclude<keyof I["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_1 in Exclude<keyof I["packet"], keyof Packet>]: never; };
        acknowledgement?: Uint8Array;
        proofAcked?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgAcknowledgement>]: never; }>(base?: I): MsgAcknowledgement;
    fromPartial<I_1 extends {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        };
        acknowledgement?: Uint8Array;
        proofAcked?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        packet?: {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timeoutTimestamp?: number;
        } & {
            sequence?: number;
            sourcePort?: string;
            sourceChannel?: string;
            destinationPort?: string;
            destinationChannel?: string;
            data?: Uint8Array;
            timeoutHeight?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_4 in Exclude<keyof I_1["packet"]["timeoutHeight"], keyof Height>]: never; };
            timeoutTimestamp?: number;
        } & { [K_5 in Exclude<keyof I_1["packet"], keyof Packet>]: never; };
        acknowledgement?: Uint8Array;
        proofAcked?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgAcknowledgement>]: never; }>(object: I_1): MsgAcknowledgement;
};
export declare const MsgAcknowledgementResponse: {
    encode(message: MsgAcknowledgementResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgementResponse;
    fromJSON(object: any): MsgAcknowledgementResponse;
    toJSON(message: MsgAcknowledgementResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgAcknowledgementResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgAcknowledgementResponse;
};
export declare const MsgChannelUpgradeInit: {
    encode(message: MsgChannelUpgradeInit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInit;
    fromJSON(object: any): MsgChannelUpgradeInit;
    toJSON(message: MsgChannelUpgradeInit): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        fields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        fields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: import("./channel").Order;
            connectionHops?: string[] & string[] & { [K in Exclude<keyof I["fields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_1 in Exclude<keyof I["fields"], keyof UpgradeFields>]: never; };
        signer?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgChannelUpgradeInit>]: never; }>(base?: I): MsgChannelUpgradeInit;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        fields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        fields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: import("./channel").Order;
            connectionHops?: string[] & string[] & { [K_3 in Exclude<keyof I_1["fields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_4 in Exclude<keyof I_1["fields"], keyof UpgradeFields>]: never; };
        signer?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgChannelUpgradeInit>]: never; }>(object: I_1): MsgChannelUpgradeInit;
};
export declare const MsgChannelUpgradeInitResponse: {
    encode(message: MsgChannelUpgradeInitResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInitResponse;
    fromJSON(object: any): MsgChannelUpgradeInitResponse;
    toJSON(message: MsgChannelUpgradeInitResponse): unknown;
    create<I extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        upgradeSequence?: number;
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K in Exclude<keyof I["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_1 in Exclude<keyof I["upgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_2 in Exclude<keyof I["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_3 in Exclude<keyof I["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_4 in Exclude<keyof I["upgrade"], keyof Upgrade>]: never; };
        upgradeSequence?: number;
    } & { [K_5 in Exclude<keyof I, keyof MsgChannelUpgradeInitResponse>]: never; }>(base?: I): MsgChannelUpgradeInitResponse;
    fromPartial<I_1 extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        upgradeSequence?: number;
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_7 in Exclude<keyof I_1["upgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_8 in Exclude<keyof I_1["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_9 in Exclude<keyof I_1["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_10 in Exclude<keyof I_1["upgrade"], keyof Upgrade>]: never; };
        upgradeSequence?: number;
    } & { [K_11 in Exclude<keyof I_1, keyof MsgChannelUpgradeInitResponse>]: never; }>(object: I_1): MsgChannelUpgradeInitResponse;
};
export declare const MsgChannelUpgradeTry: {
    encode(message: MsgChannelUpgradeTry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTry;
    fromJSON(object: any): MsgChannelUpgradeTry;
    toJSON(message: MsgChannelUpgradeTry): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        proposedUpgradeConnectionHops?: string[];
        counterpartyUpgradeFields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        };
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        proposedUpgradeConnectionHops?: string[] & string[] & { [K in Exclude<keyof I["proposedUpgradeConnectionHops"], keyof string[]>]: never; };
        counterpartyUpgradeFields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: import("./channel").Order;
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["counterpartyUpgradeFields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_2 in Exclude<keyof I["counterpartyUpgradeFields"], keyof UpgradeFields>]: never; };
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_4 in Exclude<keyof I, keyof MsgChannelUpgradeTry>]: never; }>(base?: I): MsgChannelUpgradeTry;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        proposedUpgradeConnectionHops?: string[];
        counterpartyUpgradeFields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        };
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        proposedUpgradeConnectionHops?: string[] & string[] & { [K_5 in Exclude<keyof I_1["proposedUpgradeConnectionHops"], keyof string[]>]: never; };
        counterpartyUpgradeFields?: {
            ordering?: import("./channel").Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: import("./channel").Order;
            connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["counterpartyUpgradeFields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_7 in Exclude<keyof I_1["counterpartyUpgradeFields"], keyof UpgradeFields>]: never; };
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof MsgChannelUpgradeTry>]: never; }>(object: I_1): MsgChannelUpgradeTry;
};
export declare const MsgChannelUpgradeTryResponse: {
    encode(message: MsgChannelUpgradeTryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTryResponse;
    fromJSON(object: any): MsgChannelUpgradeTryResponse;
    toJSON(message: MsgChannelUpgradeTryResponse): unknown;
    create<I extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        upgradeSequence?: number;
        result?: ResponseResultType;
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K in Exclude<keyof I["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_1 in Exclude<keyof I["upgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_2 in Exclude<keyof I["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_3 in Exclude<keyof I["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_4 in Exclude<keyof I["upgrade"], keyof Upgrade>]: never; };
        upgradeSequence?: number;
        result?: ResponseResultType;
    } & { [K_5 in Exclude<keyof I, keyof MsgChannelUpgradeTryResponse>]: never; }>(base?: I): MsgChannelUpgradeTryResponse;
    fromPartial<I_1 extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        upgradeSequence?: number;
        result?: ResponseResultType;
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_7 in Exclude<keyof I_1["upgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_8 in Exclude<keyof I_1["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_9 in Exclude<keyof I_1["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_10 in Exclude<keyof I_1["upgrade"], keyof Upgrade>]: never; };
        upgradeSequence?: number;
        result?: ResponseResultType;
    } & { [K_11 in Exclude<keyof I_1, keyof MsgChannelUpgradeTryResponse>]: never; }>(object: I_1): MsgChannelUpgradeTryResponse;
};
export declare const MsgChannelUpgradeAck: {
    encode(message: MsgChannelUpgradeAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAck;
    fromJSON(object: any): MsgChannelUpgradeAck;
    toJSON(message: MsgChannelUpgradeAck): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K in Exclude<keyof I["counterpartyUpgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_1 in Exclude<keyof I["counterpartyUpgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_2 in Exclude<keyof I["counterpartyUpgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_3 in Exclude<keyof I["counterpartyUpgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_4 in Exclude<keyof I["counterpartyUpgrade"], keyof Upgrade>]: never; };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_5 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_6 in Exclude<keyof I, keyof MsgChannelUpgradeAck>]: never; }>(base?: I): MsgChannelUpgradeAck;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K_7 in Exclude<keyof I_1["counterpartyUpgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_8 in Exclude<keyof I_1["counterpartyUpgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_9 in Exclude<keyof I_1["counterpartyUpgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_10 in Exclude<keyof I_1["counterpartyUpgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_11 in Exclude<keyof I_1["counterpartyUpgrade"], keyof Upgrade>]: never; };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_13 in Exclude<keyof I_1, keyof MsgChannelUpgradeAck>]: never; }>(object: I_1): MsgChannelUpgradeAck;
};
export declare const MsgChannelUpgradeAckResponse: {
    encode(message: MsgChannelUpgradeAckResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAckResponse;
    fromJSON(object: any): MsgChannelUpgradeAckResponse;
    toJSON(message: MsgChannelUpgradeAckResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgChannelUpgradeAckResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgChannelUpgradeAckResponse;
};
export declare const MsgChannelUpgradeConfirm: {
    encode(message: MsgChannelUpgradeConfirm, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirm;
    fromJSON(object: any): MsgChannelUpgradeConfirm;
    toJSON(message: MsgChannelUpgradeConfirm): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K in Exclude<keyof I["counterpartyUpgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_1 in Exclude<keyof I["counterpartyUpgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_2 in Exclude<keyof I["counterpartyUpgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_3 in Exclude<keyof I["counterpartyUpgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_4 in Exclude<keyof I["counterpartyUpgrade"], keyof Upgrade>]: never; };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_5 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_6 in Exclude<keyof I, keyof MsgChannelUpgradeConfirm>]: never; }>(base?: I): MsgChannelUpgradeConfirm;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
            nextSequenceSend?: number;
        } & {
            fields?: {
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K_7 in Exclude<keyof I_1["counterpartyUpgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_8 in Exclude<keyof I_1["counterpartyUpgrade"]["fields"], keyof UpgradeFields>]: never; };
            timeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_9 in Exclude<keyof I_1["counterpartyUpgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_10 in Exclude<keyof I_1["counterpartyUpgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_11 in Exclude<keyof I_1["counterpartyUpgrade"], keyof Upgrade>]: never; };
        proofChannel?: Uint8Array;
        proofUpgrade?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_13 in Exclude<keyof I_1, keyof MsgChannelUpgradeConfirm>]: never; }>(object: I_1): MsgChannelUpgradeConfirm;
};
export declare const MsgChannelUpgradeConfirmResponse: {
    encode(message: MsgChannelUpgradeConfirmResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirmResponse;
    fromJSON(object: any): MsgChannelUpgradeConfirmResponse;
    toJSON(message: MsgChannelUpgradeConfirmResponse): unknown;
    create<I extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgChannelUpgradeConfirmResponse;
    fromPartial<I_1 extends {
        result?: ResponseResultType;
    } & {
        result?: ResponseResultType;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgChannelUpgradeConfirmResponse;
};
export declare const MsgChannelUpgradeOpen: {
    encode(message: MsgChannelUpgradeOpen, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpen;
    fromJSON(object: any): MsgChannelUpgradeOpen;
    toJSON(message: MsgChannelUpgradeOpen): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgChannelUpgradeOpen>]: never; }>(base?: I): MsgChannelUpgradeOpen;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannelState?: State;
        counterpartyUpgradeSequence?: number;
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgChannelUpgradeOpen>]: never; }>(object: I_1): MsgChannelUpgradeOpen;
};
export declare const MsgChannelUpgradeOpenResponse: {
    encode(_: MsgChannelUpgradeOpenResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpenResponse;
    fromJSON(_: any): MsgChannelUpgradeOpenResponse;
    toJSON(_: MsgChannelUpgradeOpenResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelUpgradeOpenResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelUpgradeOpenResponse;
};
export declare const MsgChannelUpgradeTimeout: {
    encode(message: MsgChannelUpgradeTimeout, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeout;
    fromJSON(object: any): MsgChannelUpgradeTimeout;
    toJSON(message: MsgChannelUpgradeTimeout): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        counterpartyChannel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["counterpartyChannel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["counterpartyChannel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["counterpartyChannel"], keyof Channel>]: never; };
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_4 in Exclude<keyof I, keyof MsgChannelUpgradeTimeout>]: never; }>(base?: I): MsgChannelUpgradeTimeout;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        counterpartyChannel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        counterpartyChannel?: {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_5 in Exclude<keyof I_1["counterpartyChannel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["counterpartyChannel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_7 in Exclude<keyof I_1["counterpartyChannel"], keyof Channel>]: never; };
        proofChannel?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof MsgChannelUpgradeTimeout>]: never; }>(object: I_1): MsgChannelUpgradeTimeout;
};
export declare const MsgChannelUpgradeTimeoutResponse: {
    encode(_: MsgChannelUpgradeTimeoutResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeoutResponse;
    fromJSON(_: any): MsgChannelUpgradeTimeoutResponse;
    toJSON(_: MsgChannelUpgradeTimeoutResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelUpgradeTimeoutResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelUpgradeTimeoutResponse;
};
export declare const MsgChannelUpgradeCancel: {
    encode(message: MsgChannelUpgradeCancel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancel;
    fromJSON(object: any): MsgChannelUpgradeCancel;
    toJSON(message: MsgChannelUpgradeCancel): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        errorReceipt?: {
            sequence?: number;
            message?: string;
        };
        proofErrorReceipt?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        errorReceipt?: {
            sequence?: number;
            message?: string;
        } & {
            sequence?: number;
            message?: string;
        } & { [K in Exclude<keyof I["errorReceipt"], keyof ErrorReceipt>]: never; };
        proofErrorReceipt?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgChannelUpgradeCancel>]: never; }>(base?: I): MsgChannelUpgradeCancel;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        errorReceipt?: {
            sequence?: number;
            message?: string;
        };
        proofErrorReceipt?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        errorReceipt?: {
            sequence?: number;
            message?: string;
        } & {
            sequence?: number;
            message?: string;
        } & { [K_3 in Exclude<keyof I_1["errorReceipt"], keyof ErrorReceipt>]: never; };
        proofErrorReceipt?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgChannelUpgradeCancel>]: never; }>(object: I_1): MsgChannelUpgradeCancel;
};
export declare const MsgChannelUpgradeCancelResponse: {
    encode(_: MsgChannelUpgradeCancelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancelResponse;
    fromJSON(_: any): MsgChannelUpgradeCancelResponse;
    toJSON(_: MsgChannelUpgradeCancelResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgChannelUpgradeCancelResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgChannelUpgradeCancelResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        authority?: string;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K in Exclude<keyof I["params"]["upgradeTimeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_1 in Exclude<keyof I["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_2 in Exclude<keyof I["params"], "upgradeTimeout">]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        authority?: string;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_4 in Exclude<keyof I_1["params"]["upgradeTimeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_5 in Exclude<keyof I_1["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_6 in Exclude<keyof I_1["params"], "upgradeTimeout">]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
export declare const MsgPruneAcknowledgements: {
    encode(message: MsgPruneAcknowledgements, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgements;
    fromJSON(object: any): MsgPruneAcknowledgements;
    toJSON(message: MsgPruneAcknowledgements): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        limit?: number;
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        limit?: number;
        signer?: string;
    } & { [K in Exclude<keyof I, keyof MsgPruneAcknowledgements>]: never; }>(base?: I): MsgPruneAcknowledgements;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        limit?: number;
        signer?: string;
    } & {
        portId?: string;
        channelId?: string;
        limit?: number;
        signer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgPruneAcknowledgements>]: never; }>(object: I_1): MsgPruneAcknowledgements;
};
export declare const MsgPruneAcknowledgementsResponse: {
    encode(message: MsgPruneAcknowledgementsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgementsResponse;
    fromJSON(object: any): MsgPruneAcknowledgementsResponse;
    toJSON(message: MsgPruneAcknowledgementsResponse): unknown;
    create<I extends {
        totalPrunedSequences?: number;
        totalRemainingSequences?: number;
    } & {
        totalPrunedSequences?: number;
        totalRemainingSequences?: number;
    } & { [K in Exclude<keyof I, keyof MsgPruneAcknowledgementsResponse>]: never; }>(base?: I): MsgPruneAcknowledgementsResponse;
    fromPartial<I_1 extends {
        totalPrunedSequences?: number;
        totalRemainingSequences?: number;
    } & {
        totalPrunedSequences?: number;
        totalRemainingSequences?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgPruneAcknowledgementsResponse>]: never; }>(object: I_1): MsgPruneAcknowledgementsResponse;
};
/** Msg defines the ibc/channel Msg service. */
export interface Msg {
    /** ChannelOpenInit defines a rpc handler method for MsgChannelOpenInit. */
    ChannelOpenInit(request: MsgChannelOpenInit): Promise<MsgChannelOpenInitResponse>;
    /** ChannelOpenTry defines a rpc handler method for MsgChannelOpenTry. */
    ChannelOpenTry(request: MsgChannelOpenTry): Promise<MsgChannelOpenTryResponse>;
    /** ChannelOpenAck defines a rpc handler method for MsgChannelOpenAck. */
    ChannelOpenAck(request: MsgChannelOpenAck): Promise<MsgChannelOpenAckResponse>;
    /** ChannelOpenConfirm defines a rpc handler method for MsgChannelOpenConfirm. */
    ChannelOpenConfirm(request: MsgChannelOpenConfirm): Promise<MsgChannelOpenConfirmResponse>;
    /** ChannelCloseInit defines a rpc handler method for MsgChannelCloseInit. */
    ChannelCloseInit(request: MsgChannelCloseInit): Promise<MsgChannelCloseInitResponse>;
    /**
     * ChannelCloseConfirm defines a rpc handler method for
     * MsgChannelCloseConfirm.
     */
    ChannelCloseConfirm(request: MsgChannelCloseConfirm): Promise<MsgChannelCloseConfirmResponse>;
    /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
    RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
    /** Timeout defines a rpc handler method for MsgTimeout. */
    Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
    /** TimeoutOnClose defines a rpc handler method for MsgTimeoutOnClose. */
    TimeoutOnClose(request: MsgTimeoutOnClose): Promise<MsgTimeoutOnCloseResponse>;
    /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
    Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse>;
    /** ChannelUpgradeInit defines a rpc handler method for MsgChannelUpgradeInit. */
    ChannelUpgradeInit(request: MsgChannelUpgradeInit): Promise<MsgChannelUpgradeInitResponse>;
    /** ChannelUpgradeTry defines a rpc handler method for MsgChannelUpgradeTry. */
    ChannelUpgradeTry(request: MsgChannelUpgradeTry): Promise<MsgChannelUpgradeTryResponse>;
    /** ChannelUpgradeAck defines a rpc handler method for MsgChannelUpgradeAck. */
    ChannelUpgradeAck(request: MsgChannelUpgradeAck): Promise<MsgChannelUpgradeAckResponse>;
    /** ChannelUpgradeConfirm defines a rpc handler method for MsgChannelUpgradeConfirm. */
    ChannelUpgradeConfirm(request: MsgChannelUpgradeConfirm): Promise<MsgChannelUpgradeConfirmResponse>;
    /** ChannelUpgradeOpen defines a rpc handler method for MsgChannelUpgradeOpen. */
    ChannelUpgradeOpen(request: MsgChannelUpgradeOpen): Promise<MsgChannelUpgradeOpenResponse>;
    /** ChannelUpgradeTimeout defines a rpc handler method for MsgChannelUpgradeTimeout. */
    ChannelUpgradeTimeout(request: MsgChannelUpgradeTimeout): Promise<MsgChannelUpgradeTimeoutResponse>;
    /** ChannelUpgradeCancel defines a rpc handler method for MsgChannelUpgradeCancel. */
    ChannelUpgradeCancel(request: MsgChannelUpgradeCancel): Promise<MsgChannelUpgradeCancelResponse>;
    /** UpdateChannelParams defines a rpc handler method for MsgUpdateParams. */
    UpdateChannelParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /** PruneAcknowledgements defines a rpc handler method for MsgPruneAcknowledgements. */
    PruneAcknowledgements(request: MsgPruneAcknowledgements): Promise<MsgPruneAcknowledgementsResponse>;
}
export declare const MsgServiceName = "ibc.core.channel.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ChannelOpenInit(request: MsgChannelOpenInit): Promise<MsgChannelOpenInitResponse>;
    ChannelOpenTry(request: MsgChannelOpenTry): Promise<MsgChannelOpenTryResponse>;
    ChannelOpenAck(request: MsgChannelOpenAck): Promise<MsgChannelOpenAckResponse>;
    ChannelOpenConfirm(request: MsgChannelOpenConfirm): Promise<MsgChannelOpenConfirmResponse>;
    ChannelCloseInit(request: MsgChannelCloseInit): Promise<MsgChannelCloseInitResponse>;
    ChannelCloseConfirm(request: MsgChannelCloseConfirm): Promise<MsgChannelCloseConfirmResponse>;
    RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
    Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
    TimeoutOnClose(request: MsgTimeoutOnClose): Promise<MsgTimeoutOnCloseResponse>;
    Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse>;
    ChannelUpgradeInit(request: MsgChannelUpgradeInit): Promise<MsgChannelUpgradeInitResponse>;
    ChannelUpgradeTry(request: MsgChannelUpgradeTry): Promise<MsgChannelUpgradeTryResponse>;
    ChannelUpgradeAck(request: MsgChannelUpgradeAck): Promise<MsgChannelUpgradeAckResponse>;
    ChannelUpgradeConfirm(request: MsgChannelUpgradeConfirm): Promise<MsgChannelUpgradeConfirmResponse>;
    ChannelUpgradeOpen(request: MsgChannelUpgradeOpen): Promise<MsgChannelUpgradeOpenResponse>;
    ChannelUpgradeTimeout(request: MsgChannelUpgradeTimeout): Promise<MsgChannelUpgradeTimeoutResponse>;
    ChannelUpgradeCancel(request: MsgChannelUpgradeCancel): Promise<MsgChannelUpgradeCancelResponse>;
    UpdateChannelParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    PruneAcknowledgements(request: MsgPruneAcknowledgements): Promise<MsgPruneAcknowledgementsResponse>;
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
