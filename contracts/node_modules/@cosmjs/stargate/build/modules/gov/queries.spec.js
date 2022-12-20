"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
const any_1 = require("cosmjs-types/google/protobuf/any");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
const signingstargateclient_1 = require("../../signingstargateclient");
const stargateclient_1 = require("../../stargateclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithGov(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupGovExtension), tmClient];
}
describe("GovExtension", () => {
    const defaultFee = {
        amount: (0, amino_1.coins)(25000, "ucosm"),
        gas: "1500000", // 1.5 million
    };
    const textProposal = gov_1.TextProposal.fromPartial({
        title: "Test Proposal",
        description: "This proposal proposes to test whether this proposal passes",
    });
    const initialDeposit = (0, amino_1.coins)(12300000, "ustake");
    const delegationVoter1 = (0, amino_1.coin)(424242, "ustake");
    const delegationVoter2 = (0, amino_1.coin)(777, "ustake");
    const voter1Address = testutils_spec_1.faucet.address1;
    const voter2Address = testutils_spec_1.faucet.address2;
    let proposalId;
    beforeAll(async () => {
        if ((0, testutils_spec_1.simappEnabled)()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic, {
                // Use address 1 and 2 instead of 0 to avoid conflicts with other delegation tests
                // This must match `voterAddress` above.
                hdPaths: [(0, amino_1.makeCosmoshubPath)(1), (0, amino_1.makeCosmoshubPath)(2)],
            });
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const proposalMsg = {
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: {
                    content: any_1.Any.fromPartial({
                        typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                        value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish()),
                    }),
                    proposer: voter1Address,
                    initialDeposit: initialDeposit,
                },
            };
            const proposalResult = await client.signAndBroadcast(voter1Address, [proposalMsg], defaultFee, "Test proposal for simd");
            (0, stargateclient_1.assertIsDeliverTxSuccess)(proposalResult);
            const logs = JSON.parse(proposalResult.rawLog || "");
            proposalId = logs[0].events
                .find(({ type }) => type === "submit_proposal")
                .attributes.find(({ key }) => key === "proposal_id").value;
            (0, utils_1.assert)(proposalId, "Proposal ID not found in events");
            (0, utils_1.assert)(proposalId.match(testutils_spec_1.nonNegativeIntegerMatcher));
            // Voter 1
            {
                // My vote only counts when I delegate
                if (!(await client.getDelegation(voter1Address, testutils_spec_1.validator.validatorAddress))) {
                    const msgDelegate = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: {
                            delegatorAddress: voter1Address,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: delegationVoter1,
                        },
                    };
                    const result = await client.signAndBroadcast(voter1Address, [msgDelegate], defaultFee);
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                }
                const voteMsg = {
                    typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                    value: {
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter1Address,
                        option: gov_1.VoteOption.VOTE_OPTION_YES,
                    },
                };
                const voteResult = await client.signAndBroadcast(voter1Address, [voteMsg], defaultFee);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(voteResult);
            }
            // Voter 2
            {
                // My vote only counts when I delegate
                if (!(await client.getDelegation(voter2Address, testutils_spec_1.validator.validatorAddress))) {
                    const msgDelegate = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: {
                            delegatorAddress: voter2Address,
                            validatorAddress: testutils_spec_1.validator.validatorAddress,
                            amount: delegationVoter2,
                        },
                    };
                    const result = await client.signAndBroadcast(voter2Address, [msgDelegate], defaultFee);
                    (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                }
                const voteMsg = {
                    typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                    value: {
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter2Address,
                        option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                    },
                };
                const voteResult = await client.signAndBroadcast(voter2Address, [voteMsg], defaultFee);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(voteResult);
            }
            await (0, utils_1.sleep)(75); // wait until transactions are indexed
            client.disconnect();
        }
    });
    describe("params", () => {
        it("works for deposit", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.params("deposit");
            expect(response).toEqual(jasmine.objectContaining({
                depositParams: {
                    minDeposit: testutils_spec_1.simapp.govMinDeposit,
                    maxDepositPeriod: {
                        seconds: long_1.default.fromNumber(172800, false),
                        nanos: 0,
                    },
                },
            }));
            tmClient.disconnect();
        });
        it("works for tallying", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.params("tallying");
            expect(response).toEqual(jasmine.objectContaining({
                tallyParams: {
                    // Why the f*** are we getting binary values here?
                    quorum: (0, encoding_1.toAscii)("334000000000000000"),
                    threshold: (0, encoding_1.toAscii)("500000000000000000"),
                    vetoThreshold: (0, encoding_1.toAscii)("334000000000000000"), // 0.334
                },
            }));
            tmClient.disconnect();
        });
        it("works for voting", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.params("voting");
            expect(response).toEqual(jasmine.objectContaining({
                votingParams: {
                    votingPeriod: {
                        seconds: long_1.default.fromNumber(172800, false),
                        nanos: 0,
                    },
                },
            }));
            tmClient.disconnect();
        });
    });
    describe("proposals", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.proposals(gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, voter1Address, voter1Address);
            expect(response.proposals.length).toBeGreaterThanOrEqual(1);
            expect(response.proposals[response.proposals.length - 1]).toEqual({
                content: any_1.Any.fromPartial({
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish()),
                }),
                proposalId: (0, queryclient_1.longify)(proposalId),
                status: gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
                submitTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                depositEndTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                totalDeposit: initialDeposit,
                votingStartTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                votingEndTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
            });
            tmClient.disconnect();
        });
    });
    describe("proposal", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.proposal(proposalId);
            expect(response.proposal).toEqual({
                content: any_1.Any.fromPartial({
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: Uint8Array.from(gov_1.TextProposal.encode(textProposal).finish()),
                }),
                proposalId: (0, queryclient_1.longify)(proposalId),
                status: gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                finalTallyResult: { yes: "0", abstain: "0", no: "0", noWithVeto: "0" },
                submitTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                depositEndTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                totalDeposit: initialDeposit,
                votingStartTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
                votingEndTime: { seconds: jasmine.any(long_1.default), nanos: jasmine.any(Number) },
            });
            tmClient.disconnect();
        });
    });
    describe("deposits", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.deposits(proposalId);
            expect(response.deposits).toEqual([
                {
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    depositor: voter1Address,
                    amount: initialDeposit,
                },
            ]);
            tmClient.disconnect();
        });
    });
    describe("deposit", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.deposit(proposalId, voter1Address);
            expect(response.deposit).toEqual({
                proposalId: (0, queryclient_1.longify)(proposalId),
                depositor: voter1Address,
                amount: initialDeposit,
            });
            tmClient.disconnect();
        });
    });
    describe("tally", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.tally(proposalId);
            expect(response.tally).toEqual({
                yes: delegationVoter1.amount,
                abstain: "0",
                no: "0",
                noWithVeto: delegationVoter2.amount,
            });
            tmClient.disconnect();
        });
    });
    describe("votes", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.votes(proposalId);
            if ((0, testutils_spec_1.simapp42Enabled)()) {
                expect(response.votes).toEqual([
                    // why is vote 2 first?
                    gov_1.Vote.fromPartial({
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter2Address,
                        option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                    }),
                    gov_1.Vote.fromPartial({
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter1Address,
                        option: gov_1.VoteOption.VOTE_OPTION_YES,
                    }),
                ]);
            }
            else {
                expect(response.votes).toEqual([
                    // why is vote 2 first?
                    gov_1.Vote.fromPartial({
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter2Address,
                        option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                        options: [
                            gov_1.WeightedVoteOption.fromPartial({
                                option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                                weight: "1000000000000000000",
                            }),
                        ],
                    }),
                    gov_1.Vote.fromPartial({
                        proposalId: (0, queryclient_1.longify)(proposalId),
                        voter: voter1Address,
                        option: gov_1.VoteOption.VOTE_OPTION_YES,
                        options: [
                            gov_1.WeightedVoteOption.fromPartial({
                                option: gov_1.VoteOption.VOTE_OPTION_YES,
                                weight: "1000000000000000000",
                            }),
                        ],
                    }),
                ]);
            }
            tmClient.disconnect();
        });
    });
    describe("vote", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assert)(proposalId, "Missing proposal ID");
            const [client, tmClient] = await makeClientWithGov(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.gov.vote(proposalId, voter1Address);
            if ((0, testutils_spec_1.simapp42Enabled)()) {
                expect(response.vote).toEqual(gov_1.Vote.fromPartial({
                    voter: voter1Address,
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    option: gov_1.VoteOption.VOTE_OPTION_YES,
                }));
            }
            else {
                expect(response.vote).toEqual(gov_1.Vote.fromPartial({
                    voter: voter1Address,
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    option: gov_1.VoteOption.VOTE_OPTION_YES,
                    options: [
                        gov_1.WeightedVoteOption.fromPartial({
                            option: gov_1.VoteOption.VOTE_OPTION_YES,
                            weight: "1000000000000000000",
                        }),
                    ],
                }));
            }
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map