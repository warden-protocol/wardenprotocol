"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
const testutils_spec_1 = require("../../testutils.spec");
const ibcTest = __importStar(require("./ibctestdata.spec"));
const queries_1 = require("./queries");
async function makeClientWithIbc(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupIbcExtension), tmClient];
}
describe("IbcExtension", () => {
    describe("channel", () => {
        describe("channel", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.channel(ibcTest.portId, ibcTest.channelId);
                expect(response.channel).toEqual(ibcTest.channel);
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
        describe("channels", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.channels();
                expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                expect(response.pagination).toBeDefined();
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allChannels", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.allChannels();
                expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                tmClient.disconnect();
            });
        });
        describe("connectionChannels", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.connectionChannels(ibcTest.connectionId);
                expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                expect(response.pagination).toBeDefined();
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allConnectionChannels", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.allConnectionChannels(ibcTest.connectionId);
                expect(response.channels).toEqual([ibcTest.identifiedChannel]);
                tmClient.disconnect();
            });
        });
        describe("clientState", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.clientState(ibcTest.portId, ibcTest.channelId);
                expect(response.identifiedClientState).toEqual({
                    clientId: ibcTest.clientId,
                    clientState: {
                        typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                        value: jasmine.any(Uint8Array),
                    },
                });
                tmClient.disconnect();
            });
        });
        describe("consensusState", () => {
            xit("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.consensusState(ibcTest.portId, ibcTest.channelId, 
                // TODO: Find valid values
                0, 0);
                expect(response.consensusState).toEqual({
                    typeUrl: "/haha",
                    value: jasmine.any(Uint8Array),
                });
                expect(response.clientId).toEqual(ibcTest.clientId);
                tmClient.disconnect();
            });
        });
        describe("packetCommitment", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.packetCommitment(ibcTest.portId, ibcTest.channelId, long_1.default.fromInt(ibcTest.commitment.sequence, true));
                expect(response.commitment).toEqual(ibcTest.commitment.data);
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
        describe("packetCommitments", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.packetCommitments(ibcTest.portId, ibcTest.channelId);
                expect(response.commitments).toEqual([ibcTest.packetState]);
                expect(response.pagination).toBeDefined();
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allPacketCommitments", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.allPacketCommitments(ibcTest.portId, ibcTest.channelId);
                expect(response.commitments).toEqual([ibcTest.packetState]);
                tmClient.disconnect();
            });
        });
        describe("packetReceipt", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.packetReceipt(ibcTest.portId, ibcTest.channelId, 1);
                expect(response.received).toEqual(false);
                tmClient.disconnect();
            });
        });
        describe("packetAcknowledgement", () => {
            it("works", async () => {
                pending("We don't have an acknowledgement for testing at the moment");
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.packetAcknowledgement(ibcTest.portId, ibcTest.channelId, ibcTest.commitment.sequence);
                expect(response.acknowledgement).toEqual(ibcTest.packetAcknowledgements[0].data);
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
        describe("packetAcknowledgements", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.packetAcknowledgements(ibcTest.portId, ibcTest.channelId);
                expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
                expect(response.pagination).toBeDefined();
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allPacketAcknowledgements", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.allPacketAcknowledgements(ibcTest.portId, ibcTest.channelId);
                expect(response.acknowledgements).toEqual(ibcTest.packetAcknowledgements);
                tmClient.disconnect();
            });
        });
        describe("unreceivedPackets", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.unreceivedPackets(ibcTest.portId, ibcTest.channelId, [1, 2, 3]);
                expect(response.sequences).toEqual([1, 2, 3].map((n) => long_1.default.fromInt(n, true)));
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("unreceivedAcks", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.unreceivedAcks(ibcTest.portId, ibcTest.channelId, [1, 2, 3, 4, 5, 6, 7]);
                expect(response.sequences).toEqual([long_1.default.fromInt(ibcTest.commitment.sequence, true)]);
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("nextSequenceReceive", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.channel.nextSequenceReceive(ibcTest.portId, ibcTest.channelId);
                expect(response.nextSequenceReceive).toEqual(long_1.default.fromInt(1, true));
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
    });
    describe("client", () => {
        describe("state", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.state(ibcTest.clientId);
                expect(response.clientState).toEqual({
                    typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                    value: jasmine.any(Uint8Array),
                });
                tmClient.disconnect();
            });
        });
        describe("states", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.states();
                expect(response.clientStates).toEqual([
                    {
                        clientId: ibcTest.clientId,
                        clientState: {
                            typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                            value: jasmine.any(Uint8Array),
                        },
                    },
                ]);
                expect(response.pagination).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allStates", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.allStates();
                expect(response.clientStates).toEqual([
                    {
                        clientId: ibcTest.clientId,
                        clientState: {
                            typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                            value: jasmine.any(Uint8Array),
                        },
                    },
                ]);
                tmClient.disconnect();
            });
        });
        describe("consensusState", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.consensusState(ibcTest.clientId);
                expect(response.consensusState).toEqual({
                    typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                    value: jasmine.any(Uint8Array),
                });
                tmClient.disconnect();
            });
        });
        describe("consensusStates", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.consensusStates(ibcTest.clientId);
                expect(response.consensusStates).toEqual(jasmine.arrayContaining([
                    {
                        height: jasmine.anything(),
                        consensusState: {
                            typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                            value: jasmine.any(Uint8Array),
                        },
                    },
                ]));
                tmClient.disconnect();
            });
        });
        describe("allConsensusStates", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.allConsensusStates(ibcTest.clientId);
                expect(response.consensusStates).toEqual(jasmine.arrayContaining([
                    {
                        height: jasmine.anything(),
                        consensusState: {
                            typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                            value: jasmine.any(Uint8Array),
                        },
                    },
                ]));
                tmClient.disconnect();
            });
        });
        describe("params", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.params();
                expect(response.params).toEqual({
                    allowedClients: ["06-solomachine", "07-tendermint"],
                });
                tmClient.disconnect();
            });
        });
        describe("stateTm", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.stateTm(ibcTest.clientId);
                expect(response.chainId).toEqual("ibc-1");
                // TODO: Fill these expectations out
                tmClient.disconnect();
            });
        });
        describe("statesTm", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.statesTm();
                expect(response).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({
                        chainId: "ibc-1",
                    }),
                ]));
                tmClient.disconnect();
            });
        });
        describe("allStatesTm", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.allStatesTm();
                expect(response).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({
                        chainId: "ibc-1",
                    }),
                ]));
                tmClient.disconnect();
            });
        });
        describe("consensusStateTm", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.client.consensusStateTm(ibcTest.clientId);
                expect(response.nextValidatorsHash).toEqual(jasmine.any(Uint8Array));
                // TODO: Fill out these expectations
                tmClient.disconnect();
            });
        });
    });
    describe("connection", () => {
        describe("connection", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.connection.connection(ibcTest.connectionId);
                expect(response.connection).toEqual(ibcTest.connection);
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
        describe("connections", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.connection.connections();
                expect(response.connections).toEqual([ibcTest.identifiedConnection]);
                expect(response.pagination).toBeDefined();
                expect(response.height).toBeDefined();
                tmClient.disconnect();
            });
        });
        describe("allConnections", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.connection.allConnections();
                expect(response.connections).toEqual([ibcTest.identifiedConnection]);
                tmClient.disconnect();
            });
        });
        describe("clientConnections", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.connection.clientConnections(ibcTest.clientId);
                expect(response.connectionPaths).toEqual([ibcTest.connectionId]);
                expect(response.proofHeight).toBeDefined();
                expect(response.proofHeight).not.toBeNull();
                tmClient.disconnect();
            });
        });
        describe("clientState", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                const response = await client.ibc.connection.clientState(ibcTest.connectionId);
                expect(response.identifiedClientState).toEqual({
                    clientId: ibcTest.clientId,
                    clientState: {
                        typeUrl: "/ibc.lightclients.tendermint.v1.ClientState",
                        value: jasmine.any(Uint8Array),
                    },
                });
                tmClient.disconnect();
            });
        });
        describe("consensusState", () => {
            xit("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp42)();
                const [client, tmClient] = await makeClientWithIbc(testutils_spec_1.simapp.tendermintUrl);
                // TODO: Find valid values
                const response = await client.ibc.connection.consensusState(ibcTest.connectionId, 1, 1);
                expect(response.clientId).toEqual(ibcTest.clientId);
                expect(response.consensusState).toEqual({
                    typeUrl: "/ibc.lightclients.tendermint.v1.ConsensusState",
                    value: jasmine.any(Uint8Array),
                });
                tmClient.disconnect();
            });
        });
    });
});
//# sourceMappingURL=queries.spec.js.map