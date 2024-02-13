import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
import { Channel, Packet } from "./channel";
export declare const protobufPackage = "ibc.core.channel.v1";
/** ResponseResultType defines the possible outcomes of the execution of a message */
export declare enum ResponseResultType {
    /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
    RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
    /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
    RESPONSE_RESULT_TYPE_NOOP = 1,
    /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
    RESPONSE_RESULT_TYPE_SUCCESS = 2,
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
export declare const MsgChannelOpenInit: {
    encode(message: MsgChannelOpenInit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInit;
    fromJSON(object: any): MsgChannelOpenInit;
    toJSON(message: MsgChannelOpenInit): unknown;
    create<I extends {
        portId?: string;
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        };
        signer?: string;
    } & {
        portId?: string;
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        } & {
            state?: import("./channel").State;
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
        } & { [K_2 in Exclude<keyof I["channel"], keyof Channel>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgChannelOpenInit>]: never; }>(base?: I): MsgChannelOpenInit;
    fromPartial<I_1 extends {
        portId?: string;
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        };
        signer?: string;
    } & {
        portId?: string;
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        } & {
            state?: import("./channel").State;
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
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
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
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        } & {
            state?: import("./channel").State;
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
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
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
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
        } & {
            state?: import("./channel").State;
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
