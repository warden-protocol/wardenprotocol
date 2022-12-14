"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIbcExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const query_1 = require("cosmjs-types/ibc/applications/transfer/v1/query");
const channel_1 = require("cosmjs-types/ibc/core/channel/v1/channel");
const query_2 = require("cosmjs-types/ibc/core/channel/v1/query");
const query_3 = require("cosmjs-types/ibc/core/client/v1/query");
const query_4 = require("cosmjs-types/ibc/core/connection/v1/query");
const tendermint_1 = require("cosmjs-types/ibc/lightclients/tendermint/v1/tendermint");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
function decodeTendermintClientStateAny(clientState) {
    if ((clientState === null || clientState === void 0 ? void 0 : clientState.typeUrl) !== "/ibc.lightclients.tendermint.v1.ClientState") {
        throw new Error(`Unexpected client state type: ${clientState === null || clientState === void 0 ? void 0 : clientState.typeUrl}`);
    }
    return tendermint_1.ClientState.decode(clientState.value);
}
function decodeTendermintConsensusStateAny(clientState) {
    if ((clientState === null || clientState === void 0 ? void 0 : clientState.typeUrl) !== "/ibc.lightclients.tendermint.v1.ConsensusState") {
        throw new Error(`Unexpected client state type: ${clientState === null || clientState === void 0 ? void 0 : clientState.typeUrl}`);
    }
    return tendermint_1.ConsensusState.decode(clientState.value);
}
function setupIbcExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use these services to get easy typed access to query methods
    // These cannot be used for proof verification
    const channelQueryService = new query_2.QueryClientImpl(rpc);
    const clientQueryService = new query_3.QueryClientImpl(rpc);
    const connectionQueryService = new query_4.QueryClientImpl(rpc);
    const transferQueryService = new query_1.QueryClientImpl(rpc);
    return {
        ibc: {
            channel: {
                channel: async (portId, channelId) => channelQueryService.Channel({
                    portId: portId,
                    channelId: channelId,
                }),
                channels: async (paginationKey) => channelQueryService.Channels({
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allChannels: async () => {
                    var _a;
                    const channels = [];
                    let response;
                    let key;
                    do {
                        response = await channelQueryService.Channels({
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        channels.push(...response.channels);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        channels: channels,
                        height: response.height,
                    };
                },
                connectionChannels: async (connection, paginationKey) => channelQueryService.ConnectionChannels({
                    connection: connection,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allConnectionChannels: async (connection) => {
                    var _a;
                    const channels = [];
                    let response;
                    let key;
                    do {
                        response = await channelQueryService.ConnectionChannels({
                            connection: connection,
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        channels.push(...response.channels);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        channels: channels,
                        height: response.height,
                    };
                },
                clientState: async (portId, channelId) => channelQueryService.ChannelClientState({
                    portId: portId,
                    channelId: channelId,
                }),
                consensusState: async (portId, channelId, revisionNumber, revisionHeight) => channelQueryService.ChannelConsensusState({
                    portId: portId,
                    channelId: channelId,
                    revisionNumber: long_1.default.fromNumber(revisionNumber, true),
                    revisionHeight: long_1.default.fromNumber(revisionHeight, true),
                }),
                packetCommitment: async (portId, channelId, sequence) => channelQueryService.PacketCommitment({
                    portId: portId,
                    channelId: channelId,
                    sequence: sequence,
                }),
                packetCommitments: async (portId, channelId, paginationKey) => channelQueryService.PacketCommitments({
                    channelId: channelId,
                    portId: portId,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allPacketCommitments: async (portId, channelId) => {
                    var _a;
                    const commitments = [];
                    let response;
                    let key;
                    do {
                        response = await channelQueryService.PacketCommitments({
                            channelId: channelId,
                            portId: portId,
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        commitments.push(...response.commitments);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        commitments: commitments,
                        height: response.height,
                    };
                },
                packetReceipt: async (portId, channelId, sequence) => channelQueryService.PacketReceipt({
                    portId: portId,
                    channelId: channelId,
                    sequence: long_1.default.fromNumber(sequence, true),
                }),
                packetAcknowledgement: async (portId, channelId, sequence) => channelQueryService.PacketAcknowledgement({
                    portId: portId,
                    channelId: channelId,
                    sequence: long_1.default.fromNumber(sequence, true),
                }),
                packetAcknowledgements: async (portId, channelId, paginationKey) => channelQueryService.PacketAcknowledgements({
                    portId: portId,
                    channelId: channelId,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allPacketAcknowledgements: async (portId, channelId) => {
                    var _a;
                    const acknowledgements = [];
                    let response;
                    let key;
                    do {
                        response = await channelQueryService.PacketAcknowledgements({
                            channelId: channelId,
                            portId: portId,
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        acknowledgements.push(...response.acknowledgements);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        acknowledgements: acknowledgements,
                        height: response.height,
                    };
                },
                unreceivedPackets: async (portId, channelId, packetCommitmentSequences) => channelQueryService.UnreceivedPackets({
                    portId: portId,
                    channelId: channelId,
                    packetCommitmentSequences: packetCommitmentSequences.map((s) => long_1.default.fromNumber(s, true)),
                }),
                unreceivedAcks: async (portId, channelId, packetAckSequences) => channelQueryService.UnreceivedAcks({
                    portId: portId,
                    channelId: channelId,
                    packetAckSequences: packetAckSequences.map((s) => long_1.default.fromNumber(s, true)),
                }),
                nextSequenceReceive: async (portId, channelId) => channelQueryService.NextSequenceReceive({
                    portId: portId,
                    channelId: channelId,
                }),
            },
            client: {
                state: async (clientId) => clientQueryService.ClientState({ clientId }),
                states: async (paginationKey) => clientQueryService.ClientStates({
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allStates: async () => {
                    var _a;
                    const clientStates = [];
                    let response;
                    let key;
                    do {
                        response = await clientQueryService.ClientStates({
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        clientStates.push(...response.clientStates);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        clientStates: clientStates,
                    };
                },
                consensusState: async (clientId, consensusHeight) => clientQueryService.ConsensusState(query_3.QueryConsensusStateRequest.fromPartial({
                    clientId: clientId,
                    revisionHeight: consensusHeight !== undefined ? long_1.default.fromNumber(consensusHeight, true) : undefined,
                    latestHeight: consensusHeight === undefined,
                })),
                consensusStates: async (clientId, paginationKey) => clientQueryService.ConsensusStates({
                    clientId: clientId,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allConsensusStates: async (clientId) => {
                    var _a;
                    const consensusStates = [];
                    let response;
                    let key;
                    do {
                        response = await clientQueryService.ConsensusStates({
                            clientId: clientId,
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        consensusStates.push(...response.consensusStates);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        consensusStates: consensusStates,
                    };
                },
                params: async () => clientQueryService.ClientParams({}),
                stateTm: async (clientId) => {
                    const response = await clientQueryService.ClientState({ clientId });
                    return decodeTendermintClientStateAny(response.clientState);
                },
                statesTm: async (paginationKey) => {
                    const { clientStates } = await clientQueryService.ClientStates({
                        pagination: (0, queryclient_1.createPagination)(paginationKey),
                    });
                    return clientStates.map(({ clientState }) => decodeTendermintClientStateAny(clientState));
                },
                allStatesTm: async () => {
                    var _a;
                    const clientStates = [];
                    let response;
                    let key;
                    do {
                        response = await clientQueryService.ClientStates({
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        clientStates.push(...response.clientStates);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return clientStates.map(({ clientState }) => decodeTendermintClientStateAny(clientState));
                },
                consensusStateTm: async (clientId, consensusHeight) => {
                    const response = await clientQueryService.ConsensusState(query_3.QueryConsensusStateRequest.fromPartial({
                        clientId: clientId,
                        revisionHeight: consensusHeight === null || consensusHeight === void 0 ? void 0 : consensusHeight.revisionHeight,
                        revisionNumber: consensusHeight === null || consensusHeight === void 0 ? void 0 : consensusHeight.revisionNumber,
                        latestHeight: consensusHeight === undefined,
                    }));
                    return decodeTendermintConsensusStateAny(response.consensusState);
                },
            },
            connection: {
                connection: async (connectionId) => connectionQueryService.Connection({
                    connectionId: connectionId,
                }),
                connections: async (paginationKey) => connectionQueryService.Connections({
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allConnections: async () => {
                    var _a;
                    const connections = [];
                    let response;
                    let key;
                    do {
                        response = await connectionQueryService.Connections({
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        connections.push(...response.connections);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        connections: connections,
                        height: response.height,
                    };
                },
                clientConnections: async (clientId) => connectionQueryService.ClientConnections({
                    clientId: clientId,
                }),
                clientState: async (connectionId) => connectionQueryService.ConnectionClientState({
                    connectionId: connectionId,
                }),
                consensusState: async (connectionId, revisionHeight) => connectionQueryService.ConnectionConsensusState(query_4.QueryConnectionConsensusStateRequest.fromPartial({
                    connectionId: connectionId,
                    revisionHeight: long_1.default.fromNumber(revisionHeight, true),
                })),
            },
            transfer: {
                denomTrace: async (hash) => transferQueryService.DenomTrace({ hash: hash }),
                denomTraces: async (paginationKey) => transferQueryService.DenomTraces({
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                }),
                allDenomTraces: async () => {
                    var _a;
                    const denomTraces = [];
                    let response;
                    let key;
                    do {
                        response = await transferQueryService.DenomTraces({
                            pagination: (0, queryclient_1.createPagination)(key),
                        });
                        denomTraces.push(...response.denomTraces);
                        key = (_a = response.pagination) === null || _a === void 0 ? void 0 : _a.nextKey;
                    } while (key && key.length);
                    return {
                        denomTraces: denomTraces,
                    };
                },
                params: async () => transferQueryService.Params({}),
            },
            verified: {
                channel: {
                    channel: async (portId, channelId) => {
                        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L55-L65
                        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L117-L120
                        const key = (0, encoding_1.toAscii)(`channelEnds/ports/${portId}/channels/${channelId}`);
                        const responseData = await base.queryVerified("ibc", key);
                        return responseData.length ? channel_1.Channel.decode(responseData) : null;
                    },
                    packetCommitment: async (portId, channelId, sequence) => {
                        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L128-L133
                        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L183-L185
                        const key = (0, encoding_1.toAscii)(`commitments/ports/${portId}/channels/${channelId}/packets/${sequence}`);
                        const responseData = await base.queryVerified("ibc", key);
                        // keeper code doesn't parse, but returns raw
                        return responseData;
                    },
                    packetAcknowledgement: async (portId, channelId, sequence) => {
                        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L159-L166
                        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L153-L156
                        const key = (0, encoding_1.toAscii)(`acks/ports/${portId}/channels/${channelId}/acknowledgements/${sequence}`);
                        const responseData = await base.queryVerified("ibc", key);
                        // keeper code doesn't parse, but returns raw
                        return responseData;
                    },
                    nextSequenceReceive: async (portId, channelId) => {
                        // keeper: https://github.com/cosmos/cosmos-sdk/blob/3bafd8255a502e5a9cee07391cf8261538245dfd/x/ibc/04-channel/keeper/keeper.go#L92-L101
                        // key: https://github.com/cosmos/cosmos-sdk/blob/ef0a7344af345882729598bc2958a21143930a6b/x/ibc/24-host/keys.go#L133-L136
                        const key = (0, encoding_1.toAscii)(`seqAcks/ports/${portId}/channels/${channelId}/nextSequenceAck`);
                        const responseData = await base.queryVerified("ibc", key);
                        return responseData.length ? math_1.Uint64.fromBytes(responseData).toNumber() : null;
                    },
                },
            },
        },
    };
}
exports.setupIbcExtension = setupIbcExtension;
//# sourceMappingURL=queries.js.map