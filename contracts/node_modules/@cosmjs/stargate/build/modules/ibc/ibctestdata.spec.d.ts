import { Channel, IdentifiedChannel, PacketState } from "cosmjs-types/ibc/core/channel/v1/channel";
import { ConnectionEnd, IdentifiedConnection } from "cosmjs-types/ibc/core/connection/v1/connection";
export declare const portId = "transfer";
export declare const channelId = "channel-0";
export declare const connectionId = "connection-0";
export declare const clientId = "07-tendermint-0";
export declare const channel: Channel;
export declare const identifiedChannel: IdentifiedChannel;
/**
 * ```
 * jq ".channel_genesis.commitments[0]" scripts/simapp42/genesis-ibc.json
 * ```
 */
export declare const commitment: {
    sequence: number;
    data: Uint8Array;
};
export declare const packetState: PacketState;
/**
 * Unfortunatly empty right now
 *
 * ```
 * jq ".channel_genesis.acknowledgements" scripts/simapp42/genesis-ibc.json
 * ```
 */
export declare const packetAcknowledgements: PacketState[];
export declare const connection: ConnectionEnd;
export declare const identifiedConnection: IdentifiedConnection;
