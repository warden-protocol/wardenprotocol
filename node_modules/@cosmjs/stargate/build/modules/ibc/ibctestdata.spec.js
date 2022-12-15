"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifiedConnection = exports.connection = exports.packetAcknowledgements = exports.packetState = exports.commitment = exports.identifiedChannel = exports.channel = exports.clientId = exports.connectionId = exports.channelId = exports.portId = void 0;
const encoding_1 = require("@cosmjs/encoding");
const channel_1 = require("cosmjs-types/ibc/core/channel/v1/channel");
const commitment_1 = require("cosmjs-types/ibc/core/commitment/v1/commitment");
const connection_1 = require("cosmjs-types/ibc/core/connection/v1/connection");
const long_1 = __importDefault(require("long"));
// From scripts/simapp42/genesis-ibc.json
exports.portId = "transfer";
exports.channelId = "channel-0";
exports.connectionId = "connection-0";
exports.clientId = "07-tendermint-0";
exports.channel = channel_1.Channel.fromPartial({
    state: channel_1.State.STATE_OPEN,
    ordering: channel_1.Order.ORDER_UNORDERED,
    counterparty: channel_1.Counterparty.fromPartial({
        portId: exports.portId,
        channelId: exports.channelId,
    }),
    connectionHops: [exports.connectionId],
    version: "ics20-1",
});
exports.identifiedChannel = channel_1.IdentifiedChannel.fromPartial({
    state: channel_1.State.STATE_OPEN,
    ordering: channel_1.Order.ORDER_UNORDERED,
    counterparty: channel_1.Counterparty.fromPartial({
        portId: exports.portId,
        channelId: "channel-0",
    }),
    connectionHops: [exports.connectionId],
    version: "ics20-1",
    portId: exports.portId,
    channelId: exports.channelId,
});
/**
 * ```
 * jq ".channel_genesis.commitments[0]" scripts/simapp42/genesis-ibc.json
 * ```
 */
exports.commitment = {
    sequence: 1,
    data: (0, encoding_1.fromBase64)("hYz5Dx6o09DcSEWZR6xlJYwLgYUnLithsXMGtujic4I="),
};
exports.packetState = channel_1.PacketState.fromPartial({
    portId: exports.portId,
    channelId: exports.channelId,
    sequence: long_1.default.fromInt(exports.commitment.sequence, true),
    data: exports.commitment.data,
});
/**
 * Unfortunatly empty right now
 *
 * ```
 * jq ".channel_genesis.acknowledgements" scripts/simapp42/genesis-ibc.json
 * ```
 */
exports.packetAcknowledgements = [];
exports.connection = connection_1.ConnectionEnd.fromPartial({
    clientId: exports.clientId,
    versions: [
        connection_1.Version.fromPartial({
            identifier: "1",
            features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
        }),
    ],
    state: connection_1.State.STATE_OPEN,
    counterparty: connection_1.Counterparty.fromPartial({
        clientId: "07-tendermint-0",
        connectionId: "connection-0",
        prefix: commitment_1.MerklePrefix.fromPartial({
            keyPrefix: (0, encoding_1.fromBase64)("aWJj"),
        }),
    }),
});
exports.identifiedConnection = connection_1.IdentifiedConnection.fromPartial({
    id: exports.connectionId,
    clientId: exports.clientId,
    versions: [
        connection_1.Version.fromPartial({
            identifier: "1",
            features: ["ORDER_ORDERED", "ORDER_UNORDERED"],
        }),
    ],
    state: connection_1.State.STATE_OPEN,
    counterparty: connection_1.Counterparty.fromPartial({
        clientId: "07-tendermint-0",
        connectionId: "connection-0",
        prefix: commitment_1.MerklePrefix.fromPartial({
            keyPrefix: (0, encoding_1.fromBase64)("aWJj"),
        }),
    }),
});
//# sourceMappingURL=ibctestdata.spec.js.map